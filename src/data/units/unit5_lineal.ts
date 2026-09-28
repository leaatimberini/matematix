// src/data/units/unit5_lineal.ts
import type { TopicUnit } from '../../types/index';

export const unit5Lineal: TopicUnit = {
  id: 5,
  slug: 'funcion-lineal',
  title: 'Unidad 5: Funciones, Función Lineal y Rectas',
  subtitle: 'Estructura de la recta, pendiente, ordenada al origen, rectas paralelas y perpendiculares',
  manualPages: '225 a 237',
  keywords: [
    'Función Lineal',
    'Pendiente',
    'Ordenada al Origen',
    'Ecuación Punto-Pendiente',
    'Rectas Paralelas',
    'Rectas Perpendiculares',
    'Punto de Intersección',
    'Gráfica en Ejes Cartesianos'
  ],
  prerequisites: [1],
  videoTopics: [
    '1) Función - Introducción',
    '2) Función Lineal',
    '3) Ejercicios Modelo'
  ],
  whatYouWillLearn: [
    'Reconocer las condiciones de existencia y unicidad para que una relación sea función.',
    'Identificar los parámetros m (pendiente) y b (ordenada al origen) de la ecuación explícita y = mx + b.',
    'Calcular la pendiente de una recta a partir de dos puntos: m = (y₂ - y₁) / (x₂ - x₁).',
    'Hallar la ecuación de la recta que pasa por un punto dado conocida su pendiente: y - y₀ = m(x - x₀).',
    'Aplicar la condición de paralelismo (m₁ = m₂) y de perpendicularidad (m₂ = -1/m₁).',
    'Calcular analítica y gráficamente el punto de intersección entre dos rectas secantes.'
  ],
  summaryTheory: [
    {
      title: 'Ecuación Explícita de la Recta',
      content: 'Toda recta no vertical tiene una ecuación de la forma y = mx + b, donde m es la pendiente (inclinación: variación vertical sobre horizontal Δy/Δx) y b es la ordenada al origen (punto de corte con el eje vertical: (0, b)). La raíz o corte con el eje x se obtiene haciendo y = 0: x = -b/m.',
      math: 'y = mx + b, \\quad m = \\frac{\\Delta y}{\\Delta x}, \\quad \\text{Corte eje y: } (0, b), \\quad \\text{Corte eje x: } \\left(-\\frac{b}{m}, 0\\right)'
    },
    {
      title: 'Condición de Perpendicularidad',
      content: 'Dos rectas r₁ y r₂ son perpendiculares si y solo si el producto de sus pendientes es igual a -1, lo que significa que sus pendientes son opuestas e inversas (recíprocas).',
      math: 'r_1 \\perp r_2 \\iff m_1 \\cdot m_2 = -1 \\iff m_2 = -\\frac{1}{m_1}'
    },
    {
      title: 'Intersección entre dos Rectas',
      content: 'Para hallar el punto de corte P(x, y) entre dos rectas r₁: y = m₁x + b₁ y r₂: y = m₂x + b₂, se igualan ambas expresiones: m₁x + b₁ = m₂x + b₂. Se despeja x y luego se sustituye en cualquiera de las rectas para obtener y.',
      math: 'm_1 x + b_1 = m_2 x + b_2 \\implies x = \\frac{b_2 - b_1}{m_1 - m_2}, \\quad y = m_1 x + b_1'
    }
  ],
  keyFormulas: [
    {
      name: 'Recta por un punto con pendiente dada',
      latex: 'y - y_0 = m(x - x_0) \\implies y = m \\cdot x - m \\cdot x_0 + y_0',
      description: 'Fórmula fundamental para resolver las preguntas de recta perpendicular del examen.'
    },
    {
      name: 'Pendiente perpendicular',
      latex: 'm_\\perp = -\\frac{1}{m}',
      description: 'Si m = 1/3, entonces m_perpendicular = -3. Si m = -2, entonces m_perpendicular = 1/2.'
    }
  ],
  workedExample: {
    title: 'Recta Perpendicular Oficial UNLaM Tema 1 (10 Pts)',
    statement: 'Hallar la ecuación de la recta $r_2$ que es perpendicular a la recta $r_1: y = \\frac{1}{3}x + 2$ y pasa por el punto $P = (1; -2)$.',
    steps: [
      {
        stepNumber: 1,
        title: 'Determinar la pendiente de la recta perpendicular',
        math: 'm_1 = \\frac{1}{3} \\implies m_2 = -\\frac{1}{m_1} = -\\frac{1}{1/3} = -3',
        explanation: 'Invertimos la fracción (de 1/3 a 3) y le cambiamos el signo (a negativo).'
      },
      {
        stepNumber: 2,
        title: 'Aplicar la ecuación punto-pendiente con P(1; -2)',
        math: 'y - (-2) = -3(x - 1) \\iff y + 2 = -3x + 3',
        explanation: 'Reemplazamos x₀ = 1 y y₀ = -2.'
      },
      {
        stepNumber: 3,
        title: 'Despejar y para obtener la forma explícita',
        math: 'y = -3x + 3 - 2 \\implies y = -3x + 1',
        explanation: 'Pasamos el 2 restando al segundo miembro.'
      }
    ],
    conclusion: 'La ecuación de la recta solicitada es: y = -3x + 1.'
  },
  explainFromScratch: {
    whatIsIt: 'Una recta es una función donde el cambio en y es siempre proporcional al cambio en x: por cada paso que avanzas a la derecha, subes o bajas una cantidad fija llamada pendiente m.',
    whyExists: 'Porque representa relaciones de proporcionalidad constante: costo fijo más costo unitario, velocidad constante, etc.',
    whatMeans: 'm = -3 significa que por cada unidad que avanzas en el eje x, la recta desciende 3 unidades en el eje y.',
    whenUsed: 'En los ejercicios 2 o 3 de todos los exámenes de la UNLaM.',
    howRecognized: 'Por la forma y = mx + b (ninguna x está elevada al cuadrado ni en un denominador).',
    correspondingFormula: 'y - y₀ = m(x - x₀). Para perpendicular: m₂ = -1/m₁.',
    howApplied: '1) Miras la pendiente de la recta que te dieron. 2) La das vuelta y le cambias el signo. 3) Usas el punto que te dieron para despejar la ordenada b.',
    commonMistakes: 'Cambiar el signo pero olvidar invertir la fracción (o viceversa: poner 3 en vez de -3), o confundir la coordenada x con la y al sustituir el punto.',
    howAppearsInExam: 'Te dan una recta r₁, te piden la perpendicular r₂ que pasa por un punto P, y luego hallar el punto de intersección analítica y gráficamente.',
    checkpointQuestion: {
      question: 'Si una recta tiene pendiente m = -2/5, ¿cuál es la pendiente de cualquier recta perpendicular a ella?',
      options: [
        { text: '5/2', isCorrect: true, explanation: '¡Correcto! Das vuelta la fracción (5/2) y le cambias el signo negativo a positivo (+5/2).' },
        { text: '-5/2', isCorrect: false, explanation: 'Incorrecto. Debes cambiar también el signo: menos pasa a más.' },
        { text: '2/5', isCorrect: false, explanation: 'Incorrecto. No solo cambias el signo, debes invertir el numerador y denominador.' }
      ]
    }
  },
  noEntiendoBackup: {
    simpleAnalogy: 'Dos rectas perpendiculares se cruzan formando una cruz perfecta de 90 grados (como las esquinas de una hoja de papel). Si una recta sube suavemente (pendiente 1/3), la otra tiene que caer en picada (pendiente -3) para formar el ángulo recto.',
    visualExplanation: 'Dibuja un plano cartesiano. Ubica el punto (1, -2). Desde ese punto, si la pendiente es -3, caminas 1 paso a la derecha y bajas 3 pasos.',
    stepByStepFallback: [
      'Paso 1: Mira la recta del enunciado: ¿qué número está multiplicando a la x? Esa es m₁.',
      'Paso 2: Da vuelta ese número como una tortilla y cámbiale el signo: esa es tu nueva m₂.',
      'Paso 3: Escribe: y = m₂ · x + b.',
      'Paso 4: Pon el punto que te dieron: en lugar de x pon el primer número, en lugar de y pon el segundo número.',
      'Paso 5: Despeja b.'
    ],
    simplerExample: {
      problem: 'Hallar la recta perpendicular a y = 2x + 1 que pasa por (0, 4)',
      solution: 'm₁ = 2 => m₂ = -1/2. Como pasa por (0, 4), la ordenada es b = 4. Recta: y = -1/2 x + 4.'
    }
  },
  examTips: [
    'Siempre te piden dos partes: a) Hallar la ecuación de la recta, y b) Hallar el punto de intersección analítica y gráficamente.',
    'Para la gráfica: marca la ordenada al origen sobre el eje y, y desde allí muévete según la pendiente (denominador hacia la derecha, numerador hacia arriba si es positivo o hacia abajo si es negativo).'
  ],
  visualizerType: 'linear_plot',
  exercises: [
    {
      id: 'u5_ex_01',
      unitId: 5,
      topic: 'Función Lineal',
      subtopic: 'Recta perpendicular por un punto',
      title: 'Recta Perpendicular Oficial UNLaM Tema 1 (10 Pts)',
      statement: 'Hallar la ecuación de la recta $r_2$ que es perpendicular a la recta $r_1: y = \\frac{1}{3}x + 2$ y pasa por el punto $P = (1; -2)$.',
      type: 'math_expression',
      difficulty: 3,
      examRelevance: 'EXAM_EXERCISE',
      sourceType: 'SOURCE',
      sourceReference: 'Examen Real UNLaM Tema 1 (Ejercicio 3a - 1 pt)',
      points: 20,
      correctAnswer: 'y = -3x + 1',
      acceptableAnswers: ['y=-3x+1', '-3x + 1', 'y = 1 - 3x', 'y=1-3x', '-3x+1'],
      answerType: 'expression',
      hints: [
        'Identifica la pendiente de r₁: m₁ = 1/3.',
        'Calcula la pendiente perpendicular: m₂ = -1 / (1/3) = -3.',
        'Plantea la ecuación explícita: y = -3x + b.',
        'Reemplaza las coordenadas de P(1; -2): -2 = -3(1) + b.',
        'Despeja b: -2 = -3 + b => b = 1. La ecuación es y = -3x + 1.'
      ],
      solution: {
        steps: [
          { text: 'Identificar pendiente de r₁', math: 'm_1 = \\frac{1}{3}' },
          { text: 'Calcular pendiente perpendicular', math: 'm_2 = -\\frac{1}{1/3} = -3' },
          { text: 'Plantear ecuación punto-pendiente con P(1; -2)', math: 'y - (-2) = -3(x - 1)' },
          { text: 'Despejar forma explícita', math: 'y + 2 = -3x + 3 \\implies y = -3x + 1' }
        ],
        finalAnswer: 'y = -3x + 1'
      },
      visualizerType: 'linear_plot',
      visualizerData: {
        lines: [
          { m: 1/3, b: 2, label: 'r₁: y = 1/3 x + 2', color: '#38bdf8' },
          { m: -3, b: 1, label: 'r₂: y = -3x + 1', color: '#f43f5e' }
        ],
        points: [{ x: 1, y: -2, label: 'P(1; -2)' }]
      }
    },
    {
      id: 'u5_ex_02',
      unitId: 5,
      topic: 'Función Lineal',
      subtopic: 'Recta perpendicular e intersección',
      title: 'Recta Perpendicular e Intersección UNLaM Tema 1 (100 Pts)',
      statement: 'Dada la recta $R_2: y = -2x + 3$:\na) Hallar la ecuación de la recta $R_1$ perpendicular a $R_2$ que pase por el punto $(4; 0)$.\nb) Hallar las coordenadas del punto de intersección entre $R_1$ y $R_2$.',
      type: 'math_expression',
      difficulty: 4,
      examRelevance: 'EXAM_EXERCISE',
      sourceType: 'SOURCE',
      sourceReference: 'Examen Real UNLaM Tema 1 (Ejercicio 2 - 20 pts)',
      points: 20,
      correctAnswer: '(2, -1)',
      acceptableAnswers: ['(2; -1)', 'P=(2, -1)', 'P=(2; -1)', 'x=2, y=-1', 'x=2; y=-1'],
      answerType: 'coordinate',
      hints: [
        'Pendiente de R₂: m₂ = -2. La pendiente de R₁ es m₁ = -1/(-2) = 1/2.',
        'R₁ pasa por (4, 0): y - 0 = (1/2)(x - 4) => R₁: y = (1/2)x - 2.',
        'Para el punto de intersección, iguala ambas ecuaciones: (1/2)x - 2 = -2x + 3.',
        'Suma 2x a ambos lados: (5/2)x = 5 => x = 2.',
        'Reemplaza x = 2 en cualquiera de las rectas: y = -2(2) + 3 = -1. Punto: (2, -1).'
      ],
      solution: {
        steps: [
          { text: 'Hallar pendiente perpendicular', math: 'm_1 = -\\frac{1}{-2} = \\frac{1}{2}' },
          { text: 'Hallar ecuación de R₁ con (4, 0)', math: 'y - 0 = \\frac{1}{2}(x - 4) \\implies y = \\frac{1}{2}x - 2' },
          { text: 'Igualar para hallar intersección', math: '\\frac{1}{2}x - 2 = -2x + 3 \\iff \\frac{5}{2}x = 5 \\iff x = 2' },
          { text: 'Calcular coordenada y', math: 'y = -2(2) + 3 = -1 \\implies P = (2; -1)' }
        ],
        finalAnswer: '(2; -1)'
      },
      visualizerType: 'linear_plot',
      visualizerData: {
        lines: [
          { m: -2, b: 3, label: 'R₂: y = -2x + 3', color: '#38bdf8' },
          { m: 0.5, b: -2, label: 'R₁: y = 0.5x - 2', color: '#f43f5e' }
        ],
        points: [
          { x: 4, y: 0, label: '(4; 0)' },
          { x: 2, y: -1, label: 'Intersección (2; -1)' }
        ]
      }
    },
    {
      id: 'u5_ex_03',
      unitId: 5,
      topic: 'Función Lineal',
      subtopic: 'Recta perpendicular e intersección fraccionaria',
      title: 'Recta e Intersección Oficial UNLaM Tema 2',
      statement: 'Dada la recta $R_2: y = \\frac{1}{2}x - 3$:\na) Hallar la ecuación de la recta $R_1$ perpendicular a $R_2$ que pase por el punto $(-3; 1)$.\nb) Hallar las coordenadas del punto de intersección entre $R_1$ y $R_2$.',
      type: 'math_expression',
      difficulty: 4,
      examRelevance: 'EXAM_EXERCISE',
      sourceType: 'SOURCE',
      sourceReference: 'Examen Real UNLaM Tema 2 (Ejercicio 2 - 2 pts)',
      points: 20,
      correctAnswer: '(-4/5, -17/5)',
      acceptableAnswers: [
        '(-4/5; -17/5)',
        '(-0.8, -3.4)',
        '(-0.8; -3.4)',
        'P=(-4/5, -17/5)',
        'P=(-0.8; -3.4)'
      ],
      answerType: 'coordinate',
      hints: [
        'Pendiente de R₂: m₂ = 1/2. Pendiente perpendicular: m₁ = -1/(1/2) = -2.',
        'Ecuación de R₁: y - 1 = -2(x - (-3)) = -2(x + 3) = -2x - 6 => R₁: y = -2x - 5.',
        'Iguala ambas ecuaciones: -2x - 5 = (1/2)x - 3.',
        'Agrupa las x: -2x - (1/2)x = -3 + 5 => -(5/2)x = 2 => x = -4/5 = -0.8.',
        'Reemplaza x = -4/5: y = -2(-4/5) - 5 = 8/5 - 25/5 = -17/5 = -3.4. Punto: (-4/5; -17/5).'
      ],
      solution: {
        steps: [
          { text: 'Hallar pendiente de R₁', math: 'm_1 = -\\frac{1}{1/2} = -2' },
          { text: 'Hallar ecuación de R₁ con (-3, 1)', math: 'y - 1 = -2(x + 3) \\implies y = -2x - 5' },
          { text: 'Igualar ecuaciones para la intersección', math: '-2x - 5 = \\frac{1}{2}x - 3 \\iff -\\frac{5}{2}x = 2 \\iff x = -\\frac{4}{5}' },
          { text: 'Calcular coordenada y', math: 'y = -2\\left(-\\frac{4}{5}\\right) - 5 = \\frac{8}{5} - 5 = -\\frac{17}{5}' }
        ],
        finalAnswer: '(-4/5; -17/5) o (-0.8; -3.4)'
      },
      visualizerType: 'linear_plot',
      visualizerData: {
        lines: [
          { m: 0.5, b: -3, label: 'R₂: y = 0.5x - 3', color: '#38bdf8' },
          { m: -2, b: -5, label: 'R₁: y = -2x - 5', color: '#f43f5e' }
        ],
        points: [
          { x: -3, y: 1, label: '(-3; 1)' },
          { x: -0.8, y: -3.4, label: 'Intersección (-4/5; -17/5)' }
        ]
      }
    }
  ]
};
