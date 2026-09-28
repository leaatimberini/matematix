// src/data/units/unit2_inecuaciones.ts
import type { TopicUnit } from '../../types/index';

export const unit2Inecuaciones: TopicUnit = {
  id: 2,
  slug: 'inecuaciones-modulo',
  title: 'Unidad 2: Intervalos Reales, Inecuaciones y Módulo',
  subtitle: 'Inecuaciones racionales fraccionarias, tabla de signos, ecuaciones e inecuaciones con valor absoluto',
  manualPages: '200 a 208',
  keywords: [
    'Intervalo Real',
    'Inecuación Racional',
    'Conjunto Solución',
    'Recta Numérica',
    'Módulo',
    'Valor Absoluto',
    'Tabla de Signos',
    'Restricción de Denominador'
  ],
  prerequisites: [1],
  videoTopics: [
    '1) Intervalos reales - Explicación teórica',
    '2) Intervalos reales - Ejercicios resueltos',
    '3) Inecuaciones - Explicación teórica',
    '4) Inecuaciones - Ejercicios resueltos',
    '5) Teoría - Ecuaciones e inecuaciones con módulo',
    '6) Práctica - Ecuaciones e inecuaciones con módulo'
  ],
  whatYouWillLearn: [
    'Representar gráficamente intervalos reales en la recta numérica y expresarlos como unión o intersección.',
    'Resolver inecuaciones lineales teniendo en cuenta la inversión del sentido al multiplicar o dividir por un negativo.',
    'Resolver inecuaciones racionales fraccionarias igualando a cero y armando la tabla de signos (método de intervalos).',
    'Reconocer que el denominador NUNCA puede anularse (siempre lleva paréntesis abierto en la solución).',
    'Aplicar propiedades del valor absoluto: |A| <= k (conjunción) y |A| >= k (disyunción).',
    'Escribir el conjunto solución formal y representarlo en la recta numérica tal como lo exige el examen UNLaM.'
  ],
  summaryTheory: [
    {
      title: 'Inecuaciones Racionales Fraccionarias',
      content: 'Para resolver P(x)/Q(x) <= k, NUNCA se pasa multiplicando el denominador Q(x) al otro miembro porque desconocemos su signo. El procedimiento obligatorio de cátedra es: 1) Pasar k restando e igualar a 0; 2) Sacar común denominador y simplificar el numerador; 3) Hallar ceros de numerador y denominador; 4) Armar la tabla de signos evaluando intervalos.',
      math: '\\frac{P(x)}{Q(x)} \\le k \\iff \\frac{P(x) - k \\cdot Q(x)}{Q(x)} \\le 0, \\quad \\text{con } Q(x) \\ne 0'
    },
    {
      title: 'Módulo o Valor Absoluto',
      content: 'El módulo representa la distancia al origen. Las propiedades fundamentales para inecuaciones con k > 0 son:',
      math: '|A| \\le k \\iff -k \\le A \\le k, \\qquad |A| \\ge k \\iff A \\ge k \\;\\lor\\; A \\le -k'
    },
    {
      title: 'Regla Crítica de Examen UNLaM: Denominadores',
      content: 'Si la inecuación tiene ≤ o ≥, las raíces del numerador llevan corchete [ ], pero las raíces del denominador SIEMPRE llevan paréntesis ( ) porque no se puede dividir por cero.',
      math: '\\frac{x - a}{x - b} \\le 0 \\implies x \\in [a, b) \\quad \\text{o} \\quad x \\in (b, a]'
    }
  ],
  keyFormulas: [
    {
      name: 'Propiedad de módulo "menor o igual"',
      latex: '|f(x)| \\le k \\iff -k \\le f(x) \\le k',
      description: 'Genera un intervalo acotado o intersección.'
    },
    {
      name: 'Propiedad de módulo "mayor o igual"',
      latex: '|f(x)| \\ge k \\iff f(x) \\ge k \\;\\lor\\; f(x) \\le -k',
      description: 'Genera dos semirrectas hacia el infinito o unión de intervalos: (-∞, a] ∪ [b, ∞).'
    },
    {
      name: 'Inversión del sentido de la desigualdad',
      latex: '-c \\cdot x \\le d \\iff x \\ge -\\frac{d}{c} \\quad (c > 0)',
      description: 'Al dividir o multiplicar por un número negativo, la desigualdad se invierte obligatoriamente.'
    }
  ],
  workedExample: {
    title: 'Resolución de Inecuación Racional de Examen Oficial',
    statement: 'Resolver la inecuación: \\frac{3x - 2}{2x + 4} \\le \\sqrt{0,\\hat{4}} + 3^{-1}',
    steps: [
      {
        stepNumber: 1,
        title: 'Calcular el miembro derecho exacto',
        math: '\\sqrt{0,\\hat{4}} + 3^{-1} = \\sqrt{\\frac{4}{9}} + \\frac{1}{3} = \\frac{2}{3} + \\frac{1}{3} = 1',
        explanation: 'Reemplazamos el miembro derecho por el número 1.'
      },
      {
        stepNumber: 2,
        title: 'Pasar el 1 restando y buscar común denominador',
        math: '\\frac{3x - 2}{2x + 4} - 1 \\le 0 \\iff \\frac{3x - 2 - (2x + 4)}{2x + 4} \\le 0 \\iff \\frac{x - 6}{2x + 4} \\le 0',
        explanation: 'Restamos 1 sacando común denominador (2x + 4). Ojo con el paréntesis al restar.'
      },
      {
        stepNumber: 3,
        title: 'Hallar raíces y restricción de dominio',
        math: 'x - 6 = 0 \\implies x = 6; \\quad 2x + 4 = 0 \\implies x = -2 \\quad (\\text{Restricción: } x \\ne -2)',
        explanation: 'El numerador se anula en x = 6. El denominador se anula en x = -2 (no está definido en -2).'
      },
      {
        stepNumber: 4,
        title: 'Analizar signos por intervalos',
        math: '(-\\infty, -2): (+), \\quad (-2, 6]: (-), \\quad (6, \\infty): (+)',
        explanation: 'En (-2, 6], por ejemplo evaluando x = 0: (0 - 6)/(0 + 4) = -6/4 = -1.5 <= 0 (cumple). En 6 da 0 <= 0 (cumple, lleva corchete). En -2 no existe división por cero (lleva paréntesis).'
      }
    ],
    conclusion: 'El conjunto solución es: S = (-2, 6]'
  },
  explainFromScratch: {
    whatIsIt: 'Una inecuación es una desigualdad matemática (con signos <, >, <= o >=) cuya solución no es un único número, sino un conjunto infinito de números que forman uno o más intervalos en la recta numérica.',
    whyExists: 'Porque en la vida real y en economía las restricciones son rangos: presupuestos máximos, capacidad de producción mínima, puntos de equilibrio.',
    whatMeans: 'S = (-2, 6] significa que cualquier número real mayor que -2 y menor o igual que 6 cumple la condición.',
    whenUsed: 'Siempre que haya condiciones de acotación o valores absolutos de tolerancia.',
    howRecognized: 'Por la presencia de fracciones con la incógnita en el denominador o barras de módulo |...|.',
    correspondingFormula: 'f(x)/g(x) <= 0 se resuelve por tabla de signos. |A| >= k se separa en A >= k o A <= -k.',
    howApplied: 'Paso 1: Todo a un solo miembro contra el cero. Paso 2: Factorizar y buscar raíces. Paso 3: Probar signos en cada intervalo.',
    commonMistakes: 'Pasar multiplicando el denominador con x al otro lado (anula el examen de inmediato) o poner corchete en el valor que anula el denominador.',
    howAppearsInExam: 'Es el EJERCICIO 1 SIEMPRE en los exámenes de ingreso UNLaM (vale 2 puntos o 20 puntos según el modelo).',
    checkpointQuestion: {
      question: 'En la inecuación (x - 6)/(2x + 4) <= 0, ¿por qué el -2 lleva paréntesis y el 6 lleva corchete en S = (-2, 6]?',
      options: [
        { text: 'Porque x = -2 anula el denominador (división por cero no permitida) y x = 6 anula el numerador satisfaciendo el <= 0.', isCorrect: true, explanation: '¡Excelente! El denominador nunca puede valer cero, por lo que -2 jamás puede incluirse en el conjunto solución.' },
        { text: 'Porque -2 es un número negativo y los negativos siempre llevan paréntesis.', isCorrect: false, explanation: 'Falso. El signo positivo o negativo no define el corchete, sino si el punto está incluido o no.' },
        { text: 'Porque el 6 es mayor que el -2.', isCorrect: false, explanation: 'Falso. Los extremos cerrados dependen únicamente del signo <= o >= y de no anular denominadores.' }
      ]
    }
  },
  noEntiendoBackup: {
    simpleAnalogy: 'Piensa en un semáforo de dos interruptores. La fracción es negativa (-) cuando uno de los dos interruptores es positivo y el otro negativo (+ / - o - / +). En la recta, eso solo ocurre en el tramo entre -2 y 6.',
    visualExplanation: 'Dibuja una recta horizontal. Marca el -2 con un círculo vacío (hueco, no se toca). Marca el 6 con un círculo relleno (se incluye). Pinta todo el segmento intermedio.',
    stepByStepFallback: [
      'Paso 1: NUNCA toques el denominador ni lo pases multiplicando.',
      'Paso 2: Pasa todo restando al lado izquierdo para que a la derecha quede un cero.',
      'Paso 3: Junta todo en una sola fracción con común denominador.',
      'Paso 4: Encuentra qué números hacen cero arriba y abajo.',
      'Paso 5: Elige un número testigo en cada tramo y fíjate qué signo da.'
    ],
    simplerExample: {
      problem: 'Resolver (x - 1)/(x + 3) <= 0',
      solution: 'Raíz del numerador: 1 (lleva corchete). Raíz del denominador: -3 (lleva paréntesis). Entre -3 y 1 la fracción es negativa. Solución: S = (-3, 1].'
    }
  },
  examTips: [
    'Punto garantizado si no cometes la falta grave de pasar el denominador multiplicando.',
    'Verifica siempre que el número que hace cero el denominador tenga paréntesis en la solución final.',
    'Grafica la recta numérica con regla: raya sombreada, corchete en 6, paréntesis en -2.'
  ],
  visualizerType: 'number_line',
  exercises: [
    {
      id: 'u2_ex_01',
      unitId: 2,
      topic: 'Inecuaciones y Módulo',
      subtopic: 'Inecuación racional con periódicos',
      title: 'Inecuación Oficial UNLaM Tema 1',
      statement: 'Resolver la siguiente inecuación y expresar el conjunto solución como intervalo: $$\\frac{3x - 2}{2x + 4} \\le \\sqrt{0,\\hat{4}} + 3^{-1}$$',
      type: 'math_expression',
      difficulty: 4,
      examRelevance: 'EXAM_EXERCISE',
      sourceType: 'SOURCE',
      sourceReference: 'Examen Real UNLaM Tema 1 (Ejercicio 1 - 2 pts)',
      points: 20,
      correctAnswer: '(-2, 6]',
      acceptableAnswers: ['(-2; 6]', 'S=(-2, 6]', 'S=(-2; 6]', 'x ∈ (-2, 6]'],
      answerType: 'interval',
      hints: [
        'Calcula primero el miembro derecho: √(4/9) + 1/3 = 2/3 + 1/3 = 1.',
        'Pasa el 1 restando al miembro izquierdo: (3x - 2)/(2x + 4) - 1 <= 0.',
        'Saca común denominador (2x + 4): [(3x - 2) - (2x + 4)] / (2x + 4) <= 0.',
        'El numerador simplificado queda x - 6. Los puntos críticos son x = 6 y x = -2.',
        'En (-2, 6] la expresión es <= 0. Recuerda que x = -2 anula el denominador, por lo que lleva paréntesis abierto (-2, 6].'
      ],
      solution: {
        steps: [
          { text: 'Resolver miembro derecho', math: '\\sqrt{0,\\hat{4}} + 3^{-1} = \\frac{2}{3} + \\frac{1}{3} = 1' },
          { text: 'Restar 1 y unificar fracciones', math: '\\frac{3x - 2}{2x + 4} - 1 \\le 0 \\iff \\frac{3x - 2 - (2x + 4)}{2x + 4} \\le 0' },
          { text: 'Simplificar numerador', math: '\\frac{x - 6}{2x + 4} \\le 0' },
          { text: 'Identificar ceros y restricciones', math: 'x_1 = 6, \\quad x \\ne -2' },
          { text: 'Estudio de signos en la recta', math: 'S = (-2; 6]' }
        ],
        finalAnswer: '(-2, 6]'
      },
      commonTraps: [
        {
          trapId: 'closed_both',
          triggerAnswer: '[-2, 6]',
          diagnosis: 'Pusiste corchete en -2. ¡x = -2 anula el denominador y la división por cero no existe!',
          remedy: 'Los ceros del denominador SIEMPRE llevan paréntesis abierto.'
        },
        {
          trapId: 'cross_mult',
          triggerAnswer: '(-inf, 6]',
          diagnosis: 'Pasaste (2x + 4) multiplicando como si fuera una ecuación ordinaria perdiendo la mitad del análisis de signos.',
          remedy: 'Pasa el término restando e iguala a cero para armar la tabla de signos.'
        }
      ],
      visualizerType: 'number_line',
      visualizerData: {
        intervals: [{ left: -2, right: 6, leftOpen: true, rightOpen: false }]
      }
    },
    {
      id: 'u2_ex_02',
      unitId: 2,
      topic: 'Inecuaciones y Módulo',
      subtopic: 'Inecuación racional con unión de intervalos',
      title: 'Inecuación Oficial UNLaM Tema 1 (100 Puntos)',
      statement: 'Resolver la siguiente inecuación y expresar el conjunto solución como intervalo o unión de intervalos: $$\\frac{4 - x}{x + 5} < 2$$',
      type: 'math_expression',
      difficulty: 4,
      examRelevance: 'EXAM_EXERCISE',
      sourceType: 'SOURCE',
      sourceReference: 'Examen Real UNLaM Tema 1 (Ejercicio 1 - 20 pts)',
      points: 20,
      correctAnswer: '(-inf, -5) U (-2, inf)',
      acceptableAnswers: [
        '(-inf; -5) U (-2; inf)',
        '(-∞, -5) U (-2, ∞)',
        '(-inf; -5) ∪ (-2; inf)',
        '(-∞; -5) ∪ (-2; ∞)'
      ],
      answerType: 'interval',
      hints: [
        'Pasa el 2 restando al primer miembro: (4 - x)/(x + 5) - 2 < 0.',
        'Saca común denominador (x + 5): [4 - x - 2(x + 5)] / (x + 5) < 0.',
        'Distribuye y simplifica el numerador: 4 - x - 2x - 10 = -3x - 6.',
        'Puntos críticos: numerador -3x - 6 = 0 => x = -2; denominador x + 5 = 0 => x = -5.',
        'Evalúa los tres intervalos: (-∞, -5), (-5, -2) y (-2, ∞). La solución es la unión (-∞, -5) ∪ (-2, ∞).'
      ],
      solution: {
        steps: [
          { text: 'Pasar 2 restando', math: '\\frac{4 - x}{x + 5} - 2 < 0' },
          { text: 'Común denominador', math: '\\frac{4 - x - 2(x + 5)}{x + 5} < 0 \\implies \\frac{-3x - 6}{x + 5} < 0' },
          { text: 'Ceros del numerador y denominador', math: '-3x - 6 = 0 \\implies x = -2; \\quad x + 5 = 0 \\implies x = -5' },
          { text: 'Tabla de signos', math: 'x < -5: (-)/(-) = (+) \\dots \\text{¡Ojo: } -3(-6)-6 = +12, -6+5 = -1 \\implies 12/(-1) = -12 < 0 \\text{ (Cumple)}' },
          { text: 'Intervalo medio (-5, -2)', math: 'x = -3 \\implies \\frac{-3(-3)-6}{-3+5} = \\frac{3}{2} > 0 \\text{ (No cumple)}' },
          { text: 'Intervalo derecho (-2, ∞)', math: 'x = 0 \\implies \\frac{-6}{5} < 0 \\text{ (Cumple)}' }
        ],
        finalAnswer: '(-∞, -5) ∪ (-2, ∞)'
      },
      visualizerType: 'number_line',
      visualizerData: {
        intervals: [
          { left: -Infinity, right: -5, leftOpen: true, rightOpen: true },
          { left: -2, right: Infinity, leftOpen: true, rightOpen: true }
        ]
      }
    },
    {
      id: 'u2_ex_03',
      unitId: 2,
      topic: 'Inecuaciones y Módulo',
      subtopic: 'Inecuaciones con Módulo',
      title: 'Inecuación con Módulo Oficial UNLaM Tema 2',
      statement: 'Resolver la siguiente inecuación con módulo y expresar el conjunto solución: $$\\left|\\frac{3}{2}x - 1\\right| - 4^{-1} \\ge \\sqrt[3]{0,125}$$',
      type: 'math_expression',
      difficulty: 4,
      examRelevance: 'EXAM_EXERCISE',
      sourceType: 'SOURCE',
      sourceReference: 'Examen Real UNLaM Tema 2 (Ejercicio 1 - 2 pts)',
      points: 20,
      correctAnswer: '(-inf, 1/6] U [7/6, inf)',
      acceptableAnswers: [
        '(-inf; 1/6] U [7/6; inf)',
        '(-∞, 1/6] U [7/6, ∞)',
        '(-inf; 1/6] ∪ [7/6; inf)',
        '(-∞; 1/6] ∪ [7/6; ∞)'
      ],
      answerType: 'interval',
      hints: [
        'Calcula primero los valores numéricos: 4⁻¹ = 1/4 y ∛(0,125) = 1/2.',
        'Pasa el 1/4 sumando: |(3/2)x - 1| >= 1/2 + 1/4 = 3/4.',
        'Aplica la propiedad |A| >= k: A >= 3/4 o A <= -3/4.',
        'Rama 1: (3/2)x - 1 >= 3/4 => (3/2)x >= 7/4 => x >= (7/4)*(2/3) = 7/6.',
        'Rama 2: (3/2)x - 1 <= -3/4 => (3/2)x <= 1/4 => x <= (1/4)*(2/3) = 1/6. Unión: (-∞, 1/6] ∪ [7/6, ∞).'
      ],
      solution: {
        steps: [
          { text: 'Aislar el módulo', math: '\\left|\\frac{3}{2}x - 1\\right| \\ge \\frac{1}{2} + \\frac{1}{4} = \\frac{3}{4}' },
          { text: 'Desdoblar por propiedad de módulo', math: '\\frac{3}{2}x - 1 \\ge \\frac{3}{4} \\quad \\lor \\quad \\frac{3}{2}x - 1 \\le -\\frac{3}{4}' },
          { text: 'Resolver primera rama', math: '\\frac{3}{2}x \\ge \\frac{7}{4} \\implies x \\ge \\frac{7}{4} \\cdot \\frac{2}{3} = \\frac{7}{6}' },
          { text: 'Resolver segunda rama', math: '\\frac{3}{2}x \\le \\frac{1}{4} \\implies x \\le \\frac{1}{4} \\cdot \\frac{2}{3} = \\frac{1}{6}' },
          { text: 'Conjunto solución final', math: 'S = \\left(-\\infty, \\frac{1}{6}\\right] \\cup \\left[\\frac{7}{6}, \\infty\\right)' }
        ],
        finalAnswer: '(-∞, 1/6] ∪ [7/6, ∞)'
      },
      visualizerType: 'number_line',
      visualizerData: {
        intervals: [
          { left: -Infinity, right: 1/6, leftOpen: true, rightOpen: false },
          { left: 7/6, right: Infinity, leftOpen: false, rightOpen: true }
        ]
      }
    },
    {
      id: 'u2_ex_04',
      unitId: 2,
      topic: 'Inecuaciones y Módulo',
      subtopic: 'Detección de error conceptual',
      title: 'Detectar el Error Típico de Inecuaciones',
      statement: 'Un estudiante resolvió la inecuación $\\frac{x - 3}{x + 1} \\le 0$ de la siguiente manera:\n\n**Paso 1:** $(x - 3) \\le 0 \\cdot (x + 1)$\n**Paso 2:** $x - 3 \\le 0$\n**Paso 3:** $x \\le 3$\n**Paso 4:** $S = (-\\infty, 3]$\n\n¿En qué paso se cometió el error conceptual que invalida la resolución?',
      type: 'detect_error',
      difficulty: 2,
      examRelevance: 'EXAM_PATTERN',
      sourceType: 'DERIVED',
      sourceReference: 'Ficha 2 p. 203 - Errores Frecuentes',
      points: 10,
      errorStepIndex: 1,
      errorExplanation: 'En el Paso 1 pasó multiplicando el denominador (x + 1). Esto es incorrecto porque si (x + 1) es negativo, la desigualdad debería invertirse. No se puede multiplicar por una variable de signo desconocido.',
      options: [
        { id: 'p1', text: 'En el Paso 1: pasó multiplicando una expresión con incógnita sin conocer su signo.', isCorrect: true, feedback: '¡Exacto! Ese es el error número 1 penalizado en el examen de la UNLaM.' },
        { id: 'p2', text: 'En el Paso 2: 0 · (x + 1) no es igual a 0.', isCorrect: false, feedback: 'Cero por cualquier número real sí es cero. El error está antes.' },
        { id: 'p3', text: 'En el Paso 3: pasó el 3 sumando cuando debía pasar restando.', isCorrect: false, feedback: '-3 pasa sumando a +3 correctamente.' },
        { id: 'p4', text: 'En el Paso 4: el corchete debía ser paréntesis en el 3.', isCorrect: false, feedback: 'El error fundamental ocurrió en el Paso 1.' }
      ],
      hints: [
        '¿Se puede pasar multiplicando un denominador con x en una inecuación?',
        '¿Sabemos si (x + 1) es positivo o negativo para cualquier valor de x?',
        'Si multiplicas una inecuación por un número negativo, ¿qué ocurre con el signo <=?',
        'El método correcto es mantener la fracción y armar la tabla de signos.',
        'Por lo tanto el error conceptual ocurrió en el Paso 1.'
      ],
      solution: {
        steps: [
          { text: 'Identificación del error', math: '\\text{En el Paso 1 se multiplicó por } (x + 1)' },
          { text: 'Resolución correcta', math: '\\text{Ceros: } x = 3, \\, x = -1 \\implies S = (-1, 3]' }
        ],
        finalAnswer: 'Paso 1'
      }
    }
  ]
};
