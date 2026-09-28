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

export interface DetailedDiagnostic {
  type: string;
  title: string;
  message: string;
  advice: string;
  whereItFailed: string;
  whyBrainDidIt: string;
  howToPreventNextTime: string;
  quickCheckTest: string;
  storySnippet?: string;
}

/**
 * Diagnostic Engine: Detecta con precisión pedagógica el tipo y motivo de un error estudiantil,
 * explicando el qué, el por qué la mente cayó en la trampa y cómo evitarlo en el examen.
 */
export function diagnoseError(userAns: string, correctAns: string, context?: { topic?: string; subtopic?: string }): DetailedDiagnostic {
  const u = userAns.trim();
  const c = correctAns.trim();

  // 1. Check for inverted signs (e.g. 2 instead of -2, or -1/5 instead of 1/5)
  const uFrac = parseFraction(u);
  const cFrac = parseFraction(c);
  if (uFrac && cFrac && Math.abs(fractionToFloat(uFrac) + fractionToFloat(cFrac)) < 1e-4) {
    return {
      type: "ERROR_DE_SIGNO",
      title: "Desvío de Signo (+ / -)",
      message: "Tu valor numérico es correcto en magnitud, pero tiene el signo opuesto al resultado exacto.",
      advice: "Revisa con atención los pasajes de términos y la regla de los signos (especialmente al pasar multiplicando o dividiendo números negativos).",
      whereItFailed: "El número o fracción que calculaste tiene la distancia correcta, pero cayó del lado equivocado del cero en la recta numérica.",
      whyBrainDidIt: "Al hacer varios pasajes de términos sucesivos en un borrador rápido, nuestro cerebro tiende a olvidar que un término que suma pasa restando, o que distribuir un signo negativo adelante de un paréntesis le cambia el signo a TODO lo que está adentro: -(a - b) = -a + b.",
      howToPreventNextTime: "Hacé una verificación inversa en 5 segundos: poné tu número en la primera ecuación original. Si te queda 4 = -4, sabés al instante que se te escapó un signo menos en el camino.",
      quickCheckTest: "¿Pasaste un número dividiendo? Recuerda: si pasas -3 dividiendo, el -3 se lleva su signo menos al denominador, ¡no se vuelve positivo!",
      storySnippet: "En economía, tener $1000 a favor en la cuenta bancaria es un éxito, pero deber $1000 es una deuda: un signo menos no es un detalle, ¡define si ganas o pierdes!"
    };
  }

  // 2. Check for denominator restriction omission
  if ((c.includes('(-2') && u.includes('[-2')) || (c.includes('(') && u.includes('[') && (context?.subtopic?.includes('racional') || context?.topic?.includes('Inecuaciones')))) {
    return {
      type: "VALOR_PROHIBIDO_DENOMINADOR",
      title: "Trampa Mortal: División por Cero en el Extremo",
      message: "Incluiste con corchete un número que hace CERO al denominador de la fracción.",
      advice: "Los valores que anulan el denominador NUNCA pueden pertenecer al conjunto solución. Deben llevar obligatoriamente paréntesis '(' o ')'.",
      whereItFailed: "Pusiste corchete [ ] en un valor prohibido que produce una división por cero (indefinida en los números reales).",
      whyBrainDidIt: "Como la inecuación de la consigna tenía el símbolo '≥' o '≤' (mayor o igual / menor o igual), la inercia mental te llevó a poner corchete en todos los números por igual sin discriminar el piso de la fracción.",
      howToPreventNextTime: "Apenas arranca el ejercicio, marcá en rojo el valor prohibido del denominador: ese número nace con orden de alejamiento y JAMÁS puede llevar corchete.",
      quickCheckTest: "Reemplazá el número del extremo en el denominador: si el denominador da 0, ¡ese extremo OBLIGATORIAMENTE lleva paréntesis!",
      storySnippet: "El corchete [ ] es una invitación formal a entrar a la fiesta; pero dividir por cero es como querer repartir pizzas entre cero personas: ¡el universo explota! Por eso la puerta queda cerrada con paréntesis ( )."
    };
  }

  // 3. Check for open vs closed bracket in intervals
  if (u.includes('(') || u.includes('[') || c.includes('(') || c.includes('[')) {
    const uClean = u.replace(/[()[\]]/g, '');
    const cClean = c.replace(/[()[\]]/g, '');
    if (uClean === cClean) {
      return {
        type: "ERROR_EXTREMOS_INTERVALO",
        title: "Confusión de Corchetes [ ] y Paréntesis ( )",
        message: "Los números de los extremos son perfectos, pero los corchetes o paréntesis están invertidos.",
        advice: "Recuerda: corchete '[' o ']' significa que el extremo ESTÁ incluido (con ≤ o ≥). Paréntesis '(' o ')' significa que NO está incluido (con < o >, en infinitos ±∞ o si anula un denominador).",
        whereItFailed: "Elegiste el símbolo de inclusión equivocado en uno o ambos extremos del intervalo.",
        whyBrainDidIt: "Nuestra mente agota su energía calculando las raíces y los números, y al llegar al final relaja la atención pensando que el tipo de paréntesis es un detalle cosmético.",
        howToPreventNextTime: "Asocia visualmente: rayita abajo en la desigualdad (≤ o ≥) = corchete recto [ ]. Sin rayita (< o >) o en ±∞ = paréntesis curvo ( ).",
        quickCheckTest: "Los infinitos (-∞ y +∞) NUNCA llevan corchete porque el infinito no es un número donde puedas detenerte.",
        storySnippet: "El corchete es una cerca con candado que incluye el terreno; el paréntesis es una línea divisoria imaginaria que puedes rozar pero nunca pisar."
      };
    }
  }

  // 4. Check for incomplete factoring
  if ((c.includes('(x -') || c.includes('(x +')) && (u.includes('^2') || u.includes('^3'))) {
    return {
      type: "FACTOREO_INCOMPLETO",
      title: "Factoreo Incompleto (A mitad de camino)",
      message: "Hiciste un paso válido de factorización, pero dejaste términos que se pueden seguir descomponiendo.",
      advice: "El enunciado pide explícitamente 'aplicar todos los casos posibles': revisa si te quedó alguna diferencia de cuadrados como (x² - 9) = (x - 3)(x + 3) o trinomios resolubles.",
      whereItFailed: "Te detuviste tras el primer caso de factoreo sin comprobar si los factores resultantes todavía eran reducibles.",
      whyBrainDidIt: "Sentiste el alivio de haber resuelto la primera fórmula y diste por concluido el problema prematuramente.",
      howToPreventNextTime: "Regla de la cebolla: cada vez que saques un factor, mira lo que queda adentro. Si adentro hay x² con una resta o un trinomio, preguntate: '¿Se puede desarmar un nivel más?'.",
      quickCheckTest: "¿Quedó alguna potencia x² adentro de un paréntesis? Si es una resta con un número cuadrado perfecto (1, 4, 9, 16, 25...), ¡aplica diferencia de cuadrados de inmediato!",
      storySnippet: "Factorizar es como desarmar un motor en piezas Lego: si dejas dos bloques soldados juntos cuando podías separarlos en ladrillitos individuales, el trabajo quedó a medio terminar."
    };
  }

  // 5. Check for perpendicular slope error
  if (context?.topic === 'linear' || c.includes('y =') || c.includes('m =')) {
    if ((u.includes('y = 2x') && c.includes('y = -1/2x')) || (u.includes('3') && c.includes('-1/3'))) {
      return {
        type: "PENDIENTE_PERPENDICULAR_SIGNO",
        title: "Condición de Perpendicularidad Incompleta",
        message: "Para hallar la recta perpendicular debes INVERTIR la fracción Y CAMBIARLE el signo.",
        advice: "La condición obligatoria de perpendicularidad es m₂ = -1/m₁. Si m₁ = 1/2, entonces m₂ = -2.",
        whereItFailed: "Olvidas aplicar la doble transformación (inversión + cambio de signo).",
        whyBrainDidIt: "Es común recordar una sola de las dos reglas: recordar que 'se da vuelta' pero olvidar el signo negativo, o cambiar el signo sin invertir.",
        howToPreventNextTime: "Mnemotecnia 'Gira y Opone': si una recta sube en el cerro, la perpendicular tiene que caer en picada a 90 grados. Si m₁ es positiva, m₂ TIENE que ser negativa.",
        quickCheckTest: "Multiplicá ambas pendientes: m₁ · m₂ DEBE dar exactamente -1.",
        storySnippet: "Dos rectas perpendiculares son como las dos calles de una esquina en cruz: no basta con doblar la esquina, ¡tienes que cambiar de dirección por completo!"
      };
    }
  }

  // 6. Check for distributive trap with roots or powers
  if (u.includes('+') && !c.includes('+') && (u.includes('a + b') || u.includes('x +'))) {
    return {
      type: "TRAMPA_DISTRIBUTIVA_SUMA",
      title: "Trampa Clásica: Distribuir Potencias o Raíces en Suma",
      message: "Distribuiste una potencia o raíz sobre una suma o resta: (a + b)² ≠ a² + b² y √(a + b) ≠ √a + √b.",
      advice: "La potenciación y radicación SOLO distribuyen en multiplicación y división. En sumas, aplica la fórmula del binomio: (a + b)² = a² + 2ab + b².",
      whereItFailed: "Eliminaste el término central del doble producto (2ab) o separaste una raíz sobre una suma.",
      whyBrainDidIt: "Nuestro cerebro extrapola la propiedad distributiva de la multiplicación porque es cómoda y simétrica.",
      howToPreventNextTime: "Comprobación aritmética de 3 segundos: √(9 + 16) = √25 = 5. Si distribuyes: √9 + √16 = 3 + 4 = 7 (¡7 no es 5!).",
      quickCheckTest: "Cada vez que veas una suma bajo una raíz o potencia, ¡frena de golpe! No se puede separar término a término.",
      storySnippet: "Una suma bajo una raíz es como un pastel horneado con harina y azúcar: no puedes sacar la harina por un lado y el azúcar por el otro sin deshacer la masa."
    };
  }

  // 7. General fallback diagnostic
  return {
    type: "ERROR_PROCEDIMIENTO",
    title: "Desvío en el Procedimiento Analítico",
    message: "El resultado no coincide con la solución analítica esperada.",
    advice: "Te sugerimos revisar el paso a paso en las pistas pedagógicas progresivas o presionar 'Explicámelo como un cuento' para entender la intuición fundamental del ejercicio.",
    whereItFailed: "Hubo un desfasaje en los pasos intermedios de despeje, simplificación o aplicación de propiedades.",
    whyBrainDidIt: "En problemas de examen de la UNLaM suelen combinarse 2 o 3 conceptos simultáneos (ej: inecuación + fracción periódica + exponente negativo). Si uno de los engranajes patina, el resultado final se desvía.",
    howToPreventNextTime: "Desglosa el problema en etapas aisladas: Paso 1 pasar a fracción, Paso 2 simplificar, Paso 3 resolver la estructura principal. No intentes saltar directo al final.",
    quickCheckTest: "Revisa la primera línea de tu desarrollo escrito y compárala con el Paso 1 de la solución guiada.",
    storySnippet: "Resolver matemáticas es como armar un mueble de muchas piezas: si ajustas mal el primer tornillo, la puerta del final no cerrará derecha. ¡Revisemos el primer tornillo!"
  };
}
