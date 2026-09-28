// src/math/mathEngine.ts

/**
 * Motor de Verificación Matemática Determinista para Matematix UNLaM
 * Incluye aritmética exacta de fracciones, parser de intervalos,
 * evaluación algebraica simbólica y diagnóstico pedagógico de errores.
 */

export interface Fraction {
  num: number;
  den: number;
}

export function gcd(a: number, b: number): number {
  let x = Math.abs(Math.round(a));
  let y = Math.abs(Math.round(b));
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

export function simplifyFraction(f: Fraction): Fraction {
  if (f.den === 0) throw new Error("División por cero en fracción");
  let num = f.num;
  let den = f.den;
  if (den < 0) {
    num = -num;
    den = -den;
  }
  const g = gcd(num, den);
  return { num: num / g, den: den / g };
}

export function parseFraction(str: string): Fraction | null {
  if (!str) return null;
  const s = str.trim().replace(/\s+/g, '');
  
  // Fraction format a/b
  if (s.includes('/')) {
    const parts = s.split('/');
    if (parts.length === 2) {
      const num = parseFloat(parts[0].replace(',', '.'));
      const den = parseFloat(parts[1].replace(',', '.'));
      if (!isNaN(num) && !isNaN(den) && den !== 0) {
        return simplifyFraction({ num, den });
      }
    }
    return null;
  }

  // Decimal or integer format
  const val = parseFloat(s.replace(',', '.'));
  if (isNaN(val)) return null;

  // Convert decimal to fraction (up to 6 decimal places)
  const precision = 1000000;
  const num = Math.round(val * precision);
  const den = precision;
  return simplifyFraction({ num, den });
}

export function fractionToFloat(f: Fraction): number {
  return f.num / f.den;
}

export function areFractionsEqual(f1: Fraction, f2: Fraction): boolean {
  const s1 = simplifyFraction(f1);
  const s2 = simplifyFraction(f2);
  return s1.num === s2.num && s1.den === s2.den;
}

export function areNumbersClose(n1: number, n2: number, eps = 1e-4): boolean {
  return Math.abs(n1 - n2) < eps;
}

/**
 * Normaliza y compara respuestas numéricas o de fracciones.
 * Admite: "0.5", "1/2", "2/4", "-0.8", "-4/5", etc.
 */
export function verifyNumericAnswer(userAns: string, correctAns: string, acceptable: string[] = []): boolean {
  if (!userAns || !correctAns) return false;
  const u = userAns.trim();
  const c = correctAns.trim();

  if (u.toLowerCase() === c.toLowerCase()) return true;

  // Check acceptable list
  for (const alt of acceptable) {
    if (u.toLowerCase() === alt.trim().toLowerCase()) return true;
  }

  const userFrac = parseFraction(u);
  const correctFrac = parseFraction(c);

  if (userFrac && correctFrac) {
    if (areFractionsEqual(userFrac, correctFrac)) return true;
    if (areNumbersClose(fractionToFloat(userFrac), fractionToFloat(correctFrac))) return true;
  }

  for (const alt of acceptable) {
    const altFrac = parseFraction(alt);
    if (userFrac && altFrac && areFractionsEqual(userFrac, altFrac)) return true;
  }

  return false;
}

export interface IntervalPiece {
  leftOpen: boolean;
  leftVal: number;
  rightVal: number;
  rightOpen: boolean;
}

/**
 * Parsea un intervalo individual como "(-2; 6]", "[-inf, 1/6]", "[-0.25; inf)"
 */
export function parseSingleInterval(str: string): IntervalPiece | null {
  const s = str.trim().replace(/\s+/g, '');
  if (!s) return null;

  const leftBracket = s[0];
  const rightBracket = s[s.length - 1];

  if ((leftBracket !== '(' && leftBracket !== '[') || (rightBracket !== ')' && rightBracket !== ']')) {
    return null;
  }

  const leftOpen = leftBracket === '(';
  const rightOpen = rightBracket === ')';

  const inner = s.substring(1, s.length - 1);
  // Split by either ';' or ',' (if ';' is used, comma is decimal; if only comma, look for split)
  let parts: string[];
  if (inner.includes(';')) {
    parts = inner.split(';');
  } else {
    parts = inner.split(',');
  }

  if (parts.length !== 2) return null;

  function parseEndpoint(p: string): number {
    const t = p.trim().toLowerCase().replace('+', '');
    if (t === '-inf' || t === '-infinity' || t === '-∞') return -Infinity;
    if (t === 'inf' || t === 'infinity' || t === '∞') return Infinity;
    const f = parseFraction(t);
    return f ? fractionToFloat(f) : parseFloat(t.replace(',', '.'));
  }

  const leftVal = parseEndpoint(parts[0]);
  const rightVal = parseEndpoint(parts[1]);

  if (isNaN(leftVal) || isNaN(rightVal)) return null;

  return { leftOpen, leftVal, rightVal, rightOpen };
}

/**
 * Parsea una unión de intervalos: "(-inf, -5) U (-2, inf)" o "(-inf; 1/6] U [7/6; inf)"
 */
export function parseIntervalUnion(str: string): IntervalPiece[] | null {
  if (!str) return null;
  let s = str.trim();
  // Handle empty set
  if (s === '∅' || s.toLowerCase() === 'vacio' || s.toLowerCase() === 's={}' || s.toLowerCase() === 's=∅') {
    return [];
  }
  // Remove "S = " or "x ∈ "
  s = s.replace(/^[Ss]\s*=\s*/, '').replace(/^[Xx]\s*∈\s*/, '').trim();

  // Split by Union operators: 'U', 'u', '∪'
  const segments = s.split(/\s*(?:[Uu]|∪)\s*/);
  const pieces: IntervalPiece[] = [];

  for (const seg of segments) {
    const p = parseSingleInterval(seg);
    if (!p) return null;
    pieces.push(p);
  }

  // Sort pieces by left value
  pieces.sort((a, b) => a.leftVal - b.leftVal);
  return pieces;
}

export function areIntervalsEqual(pieces1: IntervalPiece[], pieces2: IntervalPiece[], eps = 1e-3): boolean {
  if (pieces1.length !== pieces2.length) return false;

  for (let i = 0; i < pieces1.length; i++) {
    const p1 = pieces1[i];
    const p2 = pieces2[i];

    if (p1.leftOpen !== p2.leftOpen) return false;
    if (p1.rightOpen !== p2.rightOpen) return false;

    if (p1.leftVal === -Infinity && p2.leftVal !== -Infinity) return false;
    if (p1.leftVal !== -Infinity && Math.abs(p1.leftVal - p2.leftVal) > eps) return false;

    if (p1.rightVal === Infinity && p2.rightVal !== Infinity) return false;
    if (p1.rightVal !== Infinity && Math.abs(p1.rightVal - p2.rightVal) > eps) return false;
  }

  return true;
}

export function verifyIntervalAnswer(userAns: string, correctAns: string, acceptable: string[] = []): boolean {
  if (!userAns || !correctAns) return false;

  const uRaw = userAns.trim().replace(/\s+/g, '');
  const cRaw = correctAns.trim().replace(/\s+/g, '');

  if (uRaw.toLowerCase() === cRaw.toLowerCase()) return true;

  const uPieces = parseIntervalUnion(userAns);
  const cPieces = parseIntervalUnion(correctAns);

  if (uPieces && cPieces) {
    if (areIntervalsEqual(uPieces, cPieces)) return true;
  }

  for (const alt of acceptable) {
    if (uRaw.toLowerCase() === alt.trim().replace(/\s+/g, '').toLowerCase()) return true;
    const aPieces = parseIntervalUnion(alt);
    if (uPieces && aPieces && areIntervalsEqual(uPieces, aPieces)) return true;
  }

  return false;
}

/**
 * Parsea un punto de coordenadas (x; y) o (x, y)
 */
export function parseCoordinatePoint(str: string): { x: number; y: number } | null {
  const s = str.trim().replace(/\s+/g, '');
  if (!s.startsWith('(') || !s.endsWith(')')) return null;
  const inner = s.substring(1, s.length - 1);
  let parts: string[];
  if (inner.includes(';')) {
    parts = inner.split(';');
  } else {
    parts = inner.split(',');
  }
  if (parts.length !== 2) return null;

  const fx = parseFraction(parts[0]);
  const fy = parseFraction(parts[1]);

  if (!fx || !fy) return null;
  return { x: fractionToFloat(fx), y: fractionToFloat(fy) };
}

export function verifyCoordinateAnswer(userAns: string, correctAns: string, eps = 1e-3): boolean {
  const uPt = parseCoordinatePoint(userAns);
  const cPt = parseCoordinatePoint(correctAns);
  if (uPt && cPt) {
    return Math.abs(uPt.x - cPt.x) < eps && Math.abs(uPt.y - cPt.y) < eps;
  }
  return userAns.trim().toLowerCase().replace(/\s+/g, '') === correctAns.trim().toLowerCase().replace(/\s+/g, '');
}

/**
 * Evalúa una expresión algebraica en una variable x.
 * Soporta expresiones como: "2x^2 - 4x", "2*x*(x-2)", "(x-3)^2*(x+3)^2", "x^4 - 18x^2 + 81"
 */
export function evaluateAlgebraicExpression(expr: string, xVal: number): number {
  let e = expr.trim();
  // Strip "y = " or "f(x) = " or "P(x) = "
  e = e.replace(/^[a-zA-Z](\([a-zA-Z]\))?\s*=\s*/, '');
  
  // Replace implicit multiplication: e.g. 2x -> 2*x, 3( -> 3*(, )x -> )*x, )( -> )*(
  e = e.replace(/(\d)([a-zA-Z(])/g, '$1*$2');
  e = e.replace(/([a-zA-Z)])(\d)/g, '$1*$2');
  e = e.replace(/([a-zA-Z])([(])/g, '$1*$2');
  e = e.replace(/([)])([a-zA-Z(])/g, '$1*$2');

  // Replace power ^ with **
  e = e.replace(/\^/g, '**');

  // Replace variable x with numeric value
  // Ensure we match isolated x
  e = e.replace(/\bx\b/gi, `(${xVal})`);

  try {
    // Safe mathematical eval using Function with restricted scope
    // Only allow Math functions and standard operators
    const sanitized = e.replace(/[^0-9+\-*/().*eE]/g, '');
    const fn = new Function(`return ${sanitized};`);
    return fn();
  } catch {
    return NaN;
  }
}

/**
 * Comprueba equivalencia matemática determinista de dos expresiones algebraicas
 * testeando sobre múltiples puntos numéricos.
 */
export function areAlgebraicExpressionsEquivalent(expr1: string, expr2: string, testPoints = [1.3, 2.7, -0.85, 3.42, -2.1]): boolean {
  // Direct text match
  const clean1 = expr1.trim().replace(/\s+/g, '').toLowerCase();
  const clean2 = expr2.trim().replace(/\s+/g, '').toLowerCase();
  if (clean1 === clean2) return true;

  for (const pt of testPoints) {
    const val1 = evaluateAlgebraicExpression(expr1, pt);
    const val2 = evaluateAlgebraicExpression(expr2, pt);

    if (isNaN(val1) || isNaN(val2)) return false;
    if (Math.abs(val1 - val2) > 1e-4) return false;
  }

  return true;
}

/**
 * Diagnostic Engine: Detecta el tipo y motivo de un error estudiantil
 */
export function diagnoseError(userAns: string, correctAns: string, context?: { topic?: string; subtopic?: string }): {
  type: string;
  message: string;
  advice: string;
} {
  const u = userAns.trim();
  const c = correctAns.trim();

  // Check for inverted signs (e.g. 2 instead of -2, or -1/5 instead of 1/5)
  const uFrac = parseFraction(u);
  const cFrac = parseFraction(c);
  if (uFrac && cFrac && Math.abs(fractionToFloat(uFrac) + fractionToFloat(cFrac)) < 1e-4) {
    return {
      type: "ERROR_DE_SIGNO",
      message: "Tu valor numérico es correcto en magnitud, pero tiene el signo opuesto.",
      advice: "Revisa con atención los pasajes de términos y la regla de los signos (especialmente al pasar multiplicando o dividiendo números negativos)."
    };
  }

  // Check for open vs closed bracket in intervals
  if (u.includes('(') || u.includes('[') || c.includes('(') || c.includes('[')) {
    const uClean = u.replace(/[()[\]]/g, '');
    const cClean = c.replace(/[()[\]]/g, '');
    if (uClean === cClean) {
      return {
        type: "ERROR_EXTREMOS_INTERVALO",
        message: "Los números de los extremos son correctos, pero los corchetes o paréntesis están invertidos.",
        advice: "Recuerda: corchete '[' o ']' significa que el extremo ESTÁ incluido (ej. con ≤ o ≥). Paréntesis '(' o ')' significa que NO está incluido (con < o >, en infinitos ±∞ o si anula un denominador)."
      };
    }
  }

  // Check for incomplete factoring
  if (c.includes('(x - 3)^2') && u.includes('(x^2 - 9)')) {
    return {
      type: "FACTOREO_INCOMPLETO",
      message: "Factorizaste el trinomio, pero dejaste una diferencia de cuadrados sin descomponer.",
      advice: "El enunciado pide aplicar 'todos los casos posibles': descompón (x² - 9) en (x - 3)(x + 3)."
    };
  }

  // Check for denominator restriction omission
  if (c.includes('(-2') && u.includes('[-2')) {
    return {
      type: "VALOR_PROHIBIDO_DENOMINADOR",
      message: "Incluiste el valor x = -2 en el intervalo, pero -2 anula el denominador (división por cero).",
      advice: "Los valores que hacen cero el denominador NUNCA pueden pertenecer al conjunto solución. Deben llevar paréntesis '(' o ')'."
    };
  }

  // Check for perpendicular slope error (inverted but forgot negative, or vice versa)
  if (context?.topic === 'linear' || c.includes('y =')) {
    if (u.includes('y = 3x') && c.includes('y = -3x')) {
      return {
        type: "PENDIENTE_PERPENDICULAR_SIGNO",
        message: "Invertiste la pendiente pero olvidaste el cambio de signo para rectas perpendiculares.",
        advice: "La condición de perpendicularidad es m₂ = -1/m₁. Si m₁ = 1/3, entonces m₂ = -3."
      };
    }
  }

  // General fallback diagnostic
  return {
    type: "ERROR_PROCEDIMIENTO",
    message: "El resultado no coincide con la solución analítica.",
    advice: "Te sugerimos revisar el paso a paso en las pistas progresivas o pulsar 'No entiendo' para ver una explicación detallada."
  };
}
