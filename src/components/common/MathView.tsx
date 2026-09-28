// src/components/common/MathView.tsx
import React, { useMemo } from 'react';
import katex from 'katex';

interface MathViewProps {
  math?: string;
  block?: boolean;
  className?: string;
}

function escapeAndFormatText(str: string): string {
  let s = str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br />');

  // Convert **bold** to <strong>bold</strong>
  s = s.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  return s;
}

function isLikelyMath(str: string): boolean {
  const trimmed = str.trim();
  // If it has backslash, it's LaTeX
  if (trimmed.includes('\\')) return true;
  // If it has common math symbols
  if (/[\^=_<>+\*]/.test(trimmed)) return true;
  // If it's a number or simple fraction like 3/4, -1, 5.2
  if (/^[-+]?\d+(\.\d+)?(\/\d+)?$/.test(trimmed)) return true;
  // If it's an interval or tuple like (-2, 6], [-1, 4), (3, -2)
  if (/^[\[\(]\s*[-+]?\d+(\.\d+)?\s*[,;]\s*[-+]?\d+(\.\d+)?\s*[\]\)]$/.test(trimmed)) return true;
  // If it's an algebraic expression like 2x - 3 or f(x)
  if (/^[0-9xya-zA-Z\s\+\-\*\/\(\)]+$/.test(trimmed)) {
    const words = trimmed.match(/[a-zA-ZáéíóúñÁÉÍÓÚÑ]+/g) || [];
    const mathFuncs = new Set(['sin', 'cos', 'tan', 'tg', 'cotg', 'sec', 'csc', 'log', 'ln', 'exp', 'lim', 'det', 'max', 'min', 'inf']);
    const nonMathWords = words.filter(w => w.length >= 3 && !mathFuncs.has(w.toLowerCase()));
    if (nonMathWords.length > 0) {
      const textWords = ['verdadero', 'falso', 'ninguna', 'todas', 'tiene', 'pendiente', 'recta', 'punto', 'solucion', 'real'];
      if (nonMathWords.some(w => textWords.includes(w.toLowerCase()))) {
        return false;
      }
    }
    if (/[0-9][a-zA-Z]|[a-zA-Z][0-9]|[a-zA-Z]\([a-zA-Z0-9]+\)/.test(trimmed)) {
      return true;
    }
    if (/^[a-zA-Z]$/.test(trimmed)) return true;
  }
  return false;
}

function hasProseWords(str: string): boolean {
  const words = str.match(/[a-zA-ZáéíóúñÁÉÍÓÚÑ]{3,}/g) || [];
  const mathCommands = new Set([
    'frac', 'sqrt', 'mathbb', 'text', 'cdot', 'times', 'left', 'right',
    'begin', 'cases', 'bmatrix', 'pmatrix', 'end', 'sum', 'lim', 'int',
    'log', 'ln', 'sin', 'cos', 'tan', 'cot', 'sec', 'csc', 'forall', 'exists',
    'infty', 'partial', 'alpha', 'beta', 'gamma', 'delta', 'theta', 'lambda',
    'sigma', 'omega', 'approx', 'equiv', 'circ', 'pm', 'mp', 'div', 'ne', 'le',
    'ge', 'cup', 'cap', 'subset', 'in', 'notin', 'quad', 'qquad'
  ]);
  const nonMathWords = words.filter(w => !mathCommands.has(w.toLowerCase()));
  return nonMathWords.length >= 2;
}

export function renderMathAndText(text: string, defaultBlock: boolean = false): string {
  if (!text) return '';
  let trimmed = text.trim();

  // If the whole string is enclosed in $$...$$ without other outer text
  if (trimmed.startsWith('$$') && trimmed.endsWith('$$') && trimmed.indexOf('$$', 2) === trimmed.length - 2) {
    try {
      return katex.renderToString(trimmed.slice(2, -2).trim(), { displayMode: true, throwOnError: false });
    } catch {
      return escapeAndFormatText(trimmed);
    }
  }

  // If the whole string is enclosed in $...$ (and has no other $ in between)
  if (trimmed.startsWith('$') && trimmed.endsWith('$') && trimmed.indexOf('$', 1) === trimmed.length - 1) {
    try {
      return katex.renderToString(trimmed.slice(1, -1).trim(), { displayMode: defaultBlock, throwOnError: false });
    } catch {
      return escapeAndFormatText(trimmed);
    }
  }

  // If the text does not contain $, but has backslashes and prose words, auto-wrap LaTeX commands
  if (!trimmed.includes('$') && trimmed.includes('\\') && hasProseWords(trimmed)) {
    // Wrap LaTeX environments first
    trimmed = trimmed.replace(/\\begin\{([a-zA-Z*]+)\}[\s\S]*?\\end\{\1\}/g, (m) => '$$' + m + '$$');
    // Wrap LaTeX commands with arguments or symbols
    trimmed = trimmed.replace(/\\[a-zA-Z]+(?:\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\})*/g, (m) => '$' + m + '$');
  }

  // If it contains embedded $ or $$ (mixed text and math)
  if (trimmed.includes('$')) {
    let result = '';
    const regex = /\$\$([\s\S]*?)\$\$|\$([^\$\n]+?)\$/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(trimmed)) !== null) {
      if (match.index > lastIndex) {
        const plain = trimmed.substring(lastIndex, match.index);
        result += escapeAndFormatText(plain);
      }
      try {
        if (match[1] !== undefined) {
          // $$...$$ block
          result += katex.renderToString(match[1].trim(), { displayMode: true, throwOnError: false });
        } else if (match[2] !== undefined) {
          // $...$ inline
          result += katex.renderToString(match[2].trim(), { displayMode: false, throwOnError: false });
        }
      } catch {
        result += escapeAndFormatText(match[0]);
      }
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < trimmed.length) {
      result += escapeAndFormatText(trimmed.substring(lastIndex));
    }
    return result;
  }

  // If no $ is present, check if it's likely a math formula
  if (isLikelyMath(trimmed)) {
    try {
      const rendered = katex.renderToString(trimmed, { displayMode: defaultBlock, throwOnError: false });
      if (!rendered.includes('class="katex-error"')) {
        return rendered;
      }
    } catch {
      // Fall through to plain text
    }
  }

  return escapeAndFormatText(trimmed);
}

export const MathView: React.FC<MathViewProps> = ({ math, block = false, className = '' }) => {
  if (!math) return null;

  const html = useMemo(() => {
    return renderMathAndText(math, block);
  }, [math, block]);

  const hasDisplayMath = html.includes('katex-display');

  return (
    <span
      className={`${block || hasDisplayMath ? 'block my-2 text-center' : 'inline-block'} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
