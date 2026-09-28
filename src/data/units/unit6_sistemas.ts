// src/data/units/unit6_sistemas.ts
import type { TopicUnit } from '../../types/index';

export const unit6Sistemas: TopicUnit = {
  id: 6,
  slug: 'sistemas-lineales',
  title: 'Unidad 6: Sistemas Lineales y Funciones a Tramos',
  subtitle: 'Clasificación de sistemas (SCD, SCI, SI), resolución gráfica y análisis de funciones definidas por tramos',
  manualPages: '237 a 244',
  keywords: [
    'Sistema de Ecuaciones',
    'Compatible Determinado',
    'Incompatible',
    'Compatible Indeterminado',
    'Rectas Paralelas',
    'Función a Tramos',
    'Dominio',
    'Imagen',
    'Punto de Empalme'
  ],
  prerequisites: [1, 5],
  videoTopics: [
    '1) Sistemas de Ecuaciones - Conceptos y Clasificación',
    '2) Sistemas de Ecuaciones - Métodos Analíticos de Resolución',
    '3) Sistemas de Ecuaciones - Resolución y Clasificación de Sistemas',
    '4) Sistemas de ecuaciones - Planteo y Resolución de Problemas',
    '5) Función Definida a Tramos - Conceptos gráficos y Análisis'
  ],
  whatYouWillLearn: [
    'Resolver sistemas 2x2 por sustitución, igualación o determinantes.',
    'Interpretar geométricamente el sistema como dos rectas en el plano cartesiano.',
    'Clasificar formalmente el sistema: SCD (secantes), SCI (coincidentes) o SI (paralelas distintas).',
    'Graficar funciones definidas a tramos respetando los puntos abiertos (<, >) y cerrados (<=, >=).',
    'Determinar con precisión matemática el dominio y el conjunto imagen de funciones a tramos.'
  ],
  summaryTheory: [
    {
      title: 'Clasificación de Sistemas de Ecuaciones Lineales',
      content: 'Un sistema lineal de dos ecuaciones con dos incógnitas ax + by = c y dx + ey = f se clasifica según su conjunto solución: 1) Compatible Determinado (SCD): solución única (x₀, y₀), rectas secantes; 2) Incompatible (SI): ninguna solución S = ∅, se llega a una contradicción analítica como 0 = 4 o 6 = 10, gráficamente son rectas paralelas no coincidentes; 3) Compatible Indeterminado (SCI): infinitas soluciones, se llega a una identidad 0 = 0, rectas coincidentes.',
      math: '\\text{SI: } m_1 = m_2 \\land b_1 \\ne b_2 \\implies S = \\emptyset'
    },
    {
      title: 'Funciones Definidas a Tramos',
      content: 'Una función a tramos asigna distintas fórmulas según el intervalo de x. Para analizar su dominio, se unen los intervalos donde está definida. Para su imagen, se analiza el rango de valores y que devuelve cada tramo y se unen los resultados.',
      math: 'f(x) = \\begin{cases} f_1(x) & x < c \\\\ f_2(x) & x \\ge c \\end{cases}'
    }
  ],
  keyFormulas: [
    {
      name: 'Condición de Sistema Incompatible',
      latex: '\\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\ne \\frac{c_1}{c_2} \\implies \\text{Incompatible (Sin solución)}',
      description: 'Misma pendiente m, distinta ordenada al origen b.'
    },
    {
      name: 'Imagen de función a tramos',
      latex: '\\text{Im}(f) = \\text{Im}(f_1) \\cup \\text{Im}(f_2)',
      description: 'Cuidado al unir los conjuntos imagen: si un tramo cubre valores del otro, la unión los abarca a todos.'
    }
  ],
  workedExample: {
    title: 'Resolución de Sistema Incompatible (Examen Oficial Tema 1)',
    statement: 'Resolver analítica y gráficamente el siguiente sistema y clasificarlo:\n$$\\begin{cases} 2x + y = 3 \\\\ 4x + 2y = 10 \\end{cases}$$',
    steps: [
      {
        stepNumber: 1,
        title: 'Despejar y en ambas ecuaciones (Método de igualación)',
        math: 'y_1 = -2x + 3, \\qquad 2y = -4x + 10 \\implies y_2 = -2x + 5',
        explanation: 'Ambas rectas tienen exactamente la misma pendiente m = -2 pero distinta ordenada al origen (b₁ = 3 y b₂ = 5).'
      },
      {
        stepNumber: 2,
        title: 'Igualar las ecuaciones analíticamente',
        math: '-2x + 3 = -2x + 5 \\iff -2x + 2x = 5 - 3 \\iff 0x = 2 \\iff 0 = 2 \\quad (\\text{Absurdo})',
        explanation: 'Llegamos a una contradicción matemática que no depende de x.'
      },
      {
        stepNumber: 3,
        title: 'Clasificar el sistema',
        math: 'S = \\emptyset \\quad \\implies \\text{Sistema Incompatible (SI)}',
        explanation: 'No existe ningún punto (x, y) que satisfaga ambas ecuaciones simultáneamente.'
      }
    ],
    conclusion: 'El sistema es Incompatible (SI), su conjunto solución es vacío (S = ∅) y su gráfica son dos rectas paralelas.'
  },
  explainFromScratch: {
    whatIsIt: 'Un sistema de ecuaciones son dos condiciones que deben cumplirse al mismo tiempo. Resolverlo gráficamente es buscar dónde se cruzan los dos caminos.',
    whyExists: 'Porque modela situaciones de equilibrio: oferta igual a demanda, costos iguales a ingresos, trayectorias que chocan.',
    whatMeans: 'Si las dos rectas son paralelas con la misma inclinación pero separadas, jamás se cruzan. Por eso no hay solución (Sistema Incompatible).',
    whenUsed: 'En el Ejercicio 2 del Tema 1 de examen de la UNLaM.',
    howRecognized: 'Por las dos ecuaciones con llave { .',
    correspondingFormula: 'Despejar y = mx + b en ambas. Si m₁ = m₂ y b₁ ≠ b₂ => Incompatible.',
    howApplied: 'Despeja y en las dos, iguálalas. Si se cancela la x y queda algo absurdo como 0 = 4, es Incompatible.',
    commonMistakes: 'Decir que "x = 0" en lugar de "no tiene solución" o "S = ∅".',
    howAppearsInExam: 'Te piden: a) Resolver analítica y gráficamente; b) Clasificar de acuerdo a las soluciones encontradas.',
    checkpointQuestion: {
      question: 'Si al resolver un sistema lineal de ecuaciones por igualación obtienes la igualdad 6 = 10, ¿cómo se clasifica el sistema?',
      options: [
        { text: 'Sistema Incompatible (SI), no tiene solución.', isCorrect: true, explanation: '¡Correcto! Una igualdad absurda indica que las rectas son paralelas y no se intersectan jamás (S = ∅).' },
        { text: 'Sistema Compatible Determinado con x = 6 e y = 10.', isCorrect: false, explanation: 'Incorrecto. 6 = 10 es una contradicción, no los valores de las incógnitas.' },
        { text: 'Sistema Compatible Indeterminado con infinitas soluciones.', isCorrect: false, explanation: 'Incorrecto. Infinitas soluciones ocurren cuando da 0 = 0 (identidad).' }
      ]
    }
  },
  noEntiendoBackup: {
    simpleAnalogy: 'Imagina dos vías de tren perfectamente paralelas. ¿Se cruzan alguna vez? No, corren una al lado de la otra a la misma distancia. Ese es un Sistema Incompatible.',
    visualExplanation: 'La recta 1 corta al eje y en el 3 y baja con pendiente -2. La recta 2 corta al eje y en el 5 y baja con la misma pendiente -2. Son dos líneas gemelas paralelas.',
    stepByStepFallback: [
      'Paso 1: Despeja la letra y de la primera ecuación.',
      'Paso 2: Despeja la letra y de la segunda ecuación.',
      'Paso 3: Mira el número que acompaña a la x en ambas: si es idéntico, ¡tienen la misma pendiente!',
      'Paso 4: Si las ordenadas al origen son distintas, el sistema es Incompatible (sin solución).'
    ],
    simplerExample: {
      problem: 'Clasificar: { y = 3x + 1 ; y = 3x - 4 }',
      solution: 'Ambas rectas tienen pendiente 3 y distintas ordenadas (1 y -4). Son paralelas. Clasificación: Incompatible (SI).'
    }
  },
  examTips: [
    'Debes escribir la justificación completa: analítica (0 = 2 absurdo), gráfica (rectas paralelas) y la sigla formal: "Sistema Incompatible (SI), S = ∅".',
    'En funciones a tramos: dibuja un punto blanco/vacío donde esté el signo estricto (< o >) y un punto relleno donde esté el signo con igual (<= o >=).'
  ],
  visualizerType: 'piecewise',
  exercises: [
    {
      id: 'u6_ex_01',
      unitId: 6,
      topic: 'Sistemas Lineales',
      subtopic: 'Clasificación de Sistemas 2x2',
      title: 'Sistema Oficial UNLaM Tema 1 (10 Pts)',
      statement: 'Dado el sistema de ecuaciones:\n$$\\begin{cases} 2x + y = 3 \\\\ 4x + 2y = 10 \\end{cases}$$\na) Resolver analíticamente e indicar el conjunto solución.\nb) Clasificarlo de acuerdo a las soluciones encontradas.',
      type: 'multiple_choice',
      difficulty: 3,
      examRelevance: 'EXAM_EXERCISE',
      sourceType: 'SOURCE',
      sourceReference: 'Examen Real UNLaM Tema 1 (Ejercicio 2 - 2 pts)',
      points: 20,
      options: [
        { id: 'opt_si', text: 'Sistema Incompatible (SI), S = ∅ (rectas paralelas sin intersección)', isCorrect: true, feedback: '¡Correcto! Al despejar queda y = -2x + 3 e y = -2x + 5. Al igualar da 3 = 5 (absurdo). Las rectas son paralelas no coincidentes.' },
        { id: 'opt_scd', text: 'Sistema Compatible Determinado (SCD), solución única (2; -1)', isCorrect: false, feedback: 'Incorrecto. Ese punto no verifica ambas ecuaciones.' },
        { id: 'opt_sci', text: 'Sistema Compatible Indeterminado (SCI), infinitas soluciones', isCorrect: false, feedback: 'Incorrecto. Para que sea indeterminado ambas rectas deberían ser idénticas.' },
        { id: 'opt_x0', text: 'S = {(0; 0)}', isCorrect: false, feedback: 'Incorrecto. (0; 0) da 0 = 3 (falso).' }
      ],
      hints: [
        'Despeja y de la primera ecuación: y = -2x + 3.',
        'Despeja y de la segunda ecuación dividiendo todo por 2: 2x + y = 5 => y = -2x + 5.',
        'Compara las dos ecuaciones: tienen la misma pendiente m = -2 pero distinta ordenada al origen (3 y 5).',
        'Al intentar igualarlas se cancela x y queda 3 = 5, lo cual es una contradicción.',
        'Por lo tanto el sistema no tiene solución: es Incompatible (SI) y S = ∅.'
      ],
      solution: {
        steps: [
          { text: 'Despejar y en ambas ecuaciones', math: 'y = -2x + 3, \\qquad y = -2x + 5' },
          { text: 'Igualar ecuaciones', math: '-2x + 3 = -2x + 5 \\implies 3 = 5 \\quad (\\text{Absurdo})' },
          { text: 'Clasificar geométricamente', math: 'm_1 = m_2 = -2 \\land b_1 \\ne b_2 \\implies \\text{Rectas paralelas}' },
          { text: 'Conclusión y conjunto solución', math: 'S = \\emptyset, \\quad \\text{Sistema Incompatible (SI)}' }
        ],
        finalAnswer: 'Sistema Incompatible (SI), S = ∅'
      },
      visualizerType: 'linear_plot',
      visualizerData: {
        lines: [
          { m: -2, b: 3, label: 'r₁: 2x + y = 3 (y = -2x + 3)', color: '#38bdf8' },
          { m: -2, b: 5, label: 'r₂: 4x + 2y = 10 (y = -2x + 5)', color: '#f59e0b' }
        ]
      }
    },
    {
      id: 'u6_ex_02',
      unitId: 6,
      topic: 'Funciones a Tramos',
      subtopic: 'Dominio e Imagen de función a tramos',
      title: 'Función a Tramos Oficial UNLaM Tema 1 (100 Pts)',
      statement: 'Dada la siguiente función definida a tramos:\n$$f(x) = \\begin{cases} 2 - x & \\text{si } x < 1 \\\\ 3x - 1 & \\text{si } x \\ge 1 \\end{cases}$$\na) Indicar el Dominio de $f(x)$.\nb) Indicar el Conjunto Imagen de $f(x)$.',
      type: 'multiple_choice',
      difficulty: 4,
      examRelevance: 'EXAM_EXERCISE',
      sourceType: 'SOURCE',
      sourceReference: 'Examen Real UNLaM Tema 1 (Ejercicio 3 - 20 pts)',
      points: 20,
      options: [
        { id: 'opt1', text: 'Dom(f) = ℝ, Im(f) = (1, ∞)', math: '\\text{Dom}(f) = \\mathbb{R}, \\quad \\text{Im}(f) = (1, \\infty)', isCorrect: true, feedback: '¡Excelente! Dom(f) = (-∞, 1) ∪ [1, ∞) = ℝ. Para x < 1, 2 - x toma todos los valores mayores a 1 (1, ∞). Para x ≥ 1, 3x - 1 toma valores desde 2 en adelante [2, ∞). Como [2, ∞) está contenido dentro de (1, ∞), la imagen total es (1, ∞).' },
        { id: 'opt2', text: 'Dom(f) = ℝ, Im(f) = [2, ∞)', math: '\\text{Dom}(f) = \\mathbb{R}, \\quad \\text{Im}(f) = [2, \\infty)', isCorrect: false, feedback: 'Olvidaste los valores entre 1 y 2 que toma el tramo izquierdo (por ejemplo x = 0.5 da f(x) = 1.5).' },
        { id: 'opt3', text: 'Dom(f) = (-∞, 1), Im(f) = ℝ', math: '\\text{Dom}(f) = (-\\infty, 1), \\quad \\text{Im}(f) = \\mathbb{R}', isCorrect: false, feedback: 'El dominio incluye también a [1, ∞).' },
        { id: 'opt4', text: 'Dom(f) = ℝ, Im(f) = (1, 2] ∪ [2, ∞)', math: '\\text{Dom}(f) = \\mathbb{R}, \\quad \\text{Im}(f) = (1, 2] \\cup [2, \\infty)', isCorrect: false, feedback: 'La unión de (1, 2] y [2, ∞) se escribe simplemente como (1, ∞).' }
      ],
      hints: [
        'Dominio: junta las dos condiciones de x: (-∞, 1) y [1, ∞). Su unión cubre todos los números reales ℝ.',
        'Tramo 1 (x < 1): cuando x se acerca a 1 por la izquierda, 2 - x se acerca a 1 (punto abierto (1; 1)). Cuando x tiende a -∞, 2 - (-∞) se va a +∞. Rango tramo 1: (1, ∞).',
        'Tramo 2 (x >= 1): cuando x = 1, 3(1) - 1 = 2 (punto cerrado (1; 2)). Cuando x crece, 3x - 1 crece a +∞. Rango tramo 2: [2, ∞).',
        'Une ambos rangos: (1, ∞) ∪ [2, ∞).',
        'Como [2, ∞) ya está contenido adentro de (1, ∞), la unión final es exactamente (1, ∞).'
      ],
      solution: {
        steps: [
          { text: 'Análisis del Dominio', math: '\\text{Dom}(f) = (-\\infty, 1) \\cup [1, \\infty) = \\mathbb{R}' },
          { text: 'Imagen del tramo izquierdo (x < 1)', math: 'x < 1 \\implies -x > -1 \\implies 2 - x > 1 \\implies \\text{Im}_1 = (1, \\infty)' },
          { text: 'Imagen del tramo derecho (x >= 1)', math: 'x \\ge 1 \\implies 3x \\ge 3 \\implies 3x - 1 \\ge 2 \\implies \\text{Im}_2 = [2, \\infty)' },
          { text: 'Unión de imágenes', math: '\\text{Im}(f) = (1, \\infty) \\cup [2, \\infty) = (1, \\infty)' }
        ],
        finalAnswer: 'Dom(f) = ℝ, Im(f) = (1, ∞)'
      },
      visualizerType: 'piecewise',
      visualizerData: {
        branch1: { expr: '2 - x', domain: 'x < 1', openEnd: { x: 1, y: 1 } },
        branch2: { expr: '3x - 1', domain: 'x >= 1', closedStart: { x: 1, y: 2 } }
      }
    }
  ]
};
