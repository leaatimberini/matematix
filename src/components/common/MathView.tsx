// src/components/common/MathView.tsx
import React, { useMemo } from 'react';
import katex from 'katex';

interface MathViewProps {
  math?: string;
  block?: boolean;
  className?: string;
}

export const MathView: React.FC<MathViewProps> = ({ math, block = false, className = '' }) => {
  if (!math) return null;

  const html = useMemo(() => {
    try {
      // Strip outer $$ or $ if present
      let clean = math.trim();
      if (clean.startsWith('$$') && clean.endsWith('$$')) {
        clean = clean.slice(2, -2).trim();
      } else if (clean.startsWith('$') && clean.endsWith('$')) {
        clean = clean.slice(1, -1).trim();
      }
      return katex.renderToString(clean, {
        displayMode: block,
        throwOnError: false,
        output: 'html'
      });
    } catch (e) {
      console.warn("KaTeX render error:", e);
      return `<span>${math}</span>`;
    }
  }, [math, block]);

  return (
    <span
      className={`${block ? 'block my-2 text-center' : 'inline-block'} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
