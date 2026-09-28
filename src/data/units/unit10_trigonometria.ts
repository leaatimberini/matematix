// src/data/units/unit10_trigonometria.ts
import type { TopicUnit } from '../../types/index';

export const unit10Trigonometria: TopicUnit = {
  id: 10,
  slug: 'trigonometria',
  title: 'Unidad 10: Trigonometría, Identidades y Ecuaciones',
  subtitle: 'Sistemas sexagesimal y radial, razones trigonométricas, identidades fundamentales y ecuaciones en [0, 2π)',
  manualPages: 'Anexo MIeL Ingreso',
  keywords: [
    'Trigonometría',
    'Radianes',
    'Grados Sexagesimales',
    'Razones Trigonométricas',
    'Circunferencia Trigonométrica',
    'Identidades Trigonométricas',
    'Ecuaciones Trigonométricas',
    'Período y Amplitud'
  ],
  prerequisites: [1, 5],
  videoTopics: [
    '1) Parte 1 - Sistemas Medición de Ángulos',
    '2) Parte 2 - Razones Trigonométricas',
    '3) Parte 3 - Funciones Trigonométricas',
    '4) Parte 4 - Transformaciones de las Funciones Trigonométricas',
    '5) Parte 5 - Identidades trigonométricas',
    '6) Parte 6 - Identidades trigonométricas',
    '7) El uso de la calculadora para trigonometría'
  ],
  whatYouWillLearn: [
    'Reconocer los distintos sistemas de medición angular (sexagesimal y radial) y convertir entre ellos.',
    'Calcular razones trigonométricas (seno, coseno, tangente) en triángulos rectángulos y circunferencia unitaria.',
    'Comprender los signos de las funciones en los 4 cuadrantes.',
    'Demostrar y simplificar identidades trigonométricas usando $\\sin^2(x) + \\cos^2(x) = 1$.',
    'Resolver ecuaciones trigonométricas encontrando todas las soluciones en el intervalo $[0, 2\\pi)$.'
  ],
  summaryTheory: [
    {
      title: 'Sistemas de Medición Angular',
      content: 'Un giro completo equivale a 360° en el sistema sexagesimal o a 2π radianes en el sistema circular. La fórmula de conversión fundamental es: 180° = π rad.',
      math: '\\frac{\\alpha^\\circ}{180^\\circ} = \\frac{\\alpha \\text{ rad}}{\\pi} \\implies \\alpha \\text{ rad} = \\alpha^\\circ \\cdot \\frac{\\pi}{180^\\circ}'
    },
    {
      title: 'Identidad Pitagórica Fundamental',
      content: 'Para todo ángulo x, la suma de los cuadrados del seno y del coseno es idénticamente igual a 1.',
      math: '\\sin^2(x) + \\cos^2(x) = 1 \\implies \\sin^2(x) = 1 - \\cos^2(x), \\quad \\cos^2(x) = 1 - \\sin^2(x)'
    },
    {
      title: 'Ecuaciones Trigonométricas en [0, 2π)',
      content: 'Al resolver una ecuación como sin(x) = k con |k| <= 1, siempre existen generalmente dos ángulos en una vuelta completa (excepto en los extremos ±1). Hay que identificar el ángulo de referencia del primer cuadrante y luego trasladarlo al cuadrante correspondiente según el signo.',
      math: '\\sin(x) = \\frac{1}{2} \\implies x_1 = \\frac{\\pi}{6} \\; (30^\\circ), \\quad x_2 = \\pi - \\frac{\\pi}{6} = \\frac{5\\pi}{6} \\; (150^\\circ)'
    }
  ],
  keyFormulas: [
    {
      name: 'Identidad pitagórica',
      latex: '\\sin^2(x) + \\cos^2(x) = 1, \\quad \\tan(x) = \\frac{\\sin(x)}{\\cos(x)}',
      description: 'Base para resolver todas las identidades y simplificaciones del curso.'
    },
    {
      name: 'Conversión de radianes a grados',
      latex: 'x^\\circ = x \\text{ rad} \\cdot \\frac{180^\\circ}{\\pi}',
      description: 'Por ejemplo: π/3 rad = 60°, π/4 rad = 45°, π/6 rad = 30°.'
    }
  ],
  workedExample: {
    title: 'Resolución de Ecuación Trigonométrica en [0, 2π)',
    statement: 'Resolver la siguiente ecuación trigonométrica en el intervalo [0, 2π):\n$$2\\sin(x) - 1 = 0$$',
    steps: [
      {
        stepNumber: 1,
        title: 'Despejar la función seno',
        math: '2\\sin(x) = 1 \\iff \\sin(x) = \\frac{1}{2}',
        explanation: 'Aislamos el término trigonométrico fundamental.'
      },
      {
        stepNumber: 2,
        title: 'Hallar el ángulo notable del primer cuadrante',
        math: '\\sin\\left(\\frac{\\pi}{6}\\right) = \\frac{1}{2} \\implies x_1 = \\frac{\\pi}{6} \\quad (30^\\circ)',
        explanation: 'En el primer cuadrante el ángulo cuyo seno es 1/2 es 30° (π/6 radianes).'
      },
      {
        stepNumber: 3,
        title: 'Hallar el ángulo del segundo cuadrante con seno positivo',
        math: 'x_2 = \\pi - \\frac{\\pi}{6} = \\frac{5\\pi}{6} \\quad (150^\\circ)',
        explanation: 'El seno es positivo en el I y II cuadrante. En el II cuadrante se calcula como π - α.'
      }
    ],
    conclusion: 'El conjunto solución en [0, 2π) es: S = {π/6; 5π/6}.'
  },
  explainFromScratch: {
    whatIsIt: 'La trigonometría estudia la relación entre los lados y los ángulos de un triángulo, y las ondas periódicas que se repiten una y otra vez (como los latidos del corazón o los ciclos económicos).',
    whyExists: 'Porque todo en la naturaleza y en los ciclos del mercado oscila con patrones periódicos.',
    whatMeans: 'sin²(x) + cos²(x) = 1 significa que sin importar qué ángulo elijas, la distancia desde el centro al borde de la circunferencia siempre es exactamente 1.',
    whenUsed: 'En cálculos de distancias, vectores y modelado de funciones periódicas.',
    howRecognized: 'Por las palabras sen, cos, tan y la letra griega π o radianes.',
    correspondingFormula: 'sin(x) = opuesto / hipotenusa, cos(x) = adyacente / hipotenusa.',
    howApplied: 'Despeja la razón trigonométrica como si fuera una incógnita común, y luego busca en qué cuadrantes da ese valor.',
    commonMistakes: 'Dar solo la solución del primer cuadrante y olvidar la del segundo (el seno es positivo en I y II; el coseno en I y IV).',
    howAppearsInExam: 'Aparece como simplificación de identidades o ecuaciones trigonométricas en [0, 2π).',
    checkpointQuestion: {
      question: '¿En qué cuadrantes la función coseno es positiva?',
      options: [
        { text: 'En el I y en el IV cuadrante.', isCorrect: true, explanation: '¡Correcto! En la circunferencia trigonométrica el coseno corresponde al eje horizontal x, que es positivo a la derecha (cuadrantes I y IV).' },
        { text: 'En el I y en el II cuadrante.', isCorrect: false, explanation: 'En el I y II es positivo el seno (eje vertical y).' },
        { text: 'En el II y en el III cuadrante.', isCorrect: false, explanation: 'Allí el coseno es negativo.' }
      ]
    }
  },
  noEntiendoBackup: {
    simpleAnalogy: 'Imagina una rueda gigante de parque de diversiones con radio 1 metro. La altura a la que estás del suelo en cada momento es el seno. La distancia horizontal al poste central es el coseno.',
    visualExplanation: 'En el círculo de radio 1: cuando subes 1/2 metro de altura, puedes estar subiendo por la derecha (30° o π/6) o bajando por la izquierda (150° o 5π/6). Por eso hay dos respuestas.',
    stepByStepFallback: [
      'Paso 1: Despeja sen(x) o cos(x).',
      'Paso 2: Con la calculadora saca el ángulo base (shift + sin).',
      'Paso 3: Fíjate en los signos de los cuadrantes para encontrar la segunda respuesta.',
      'Paso 4: Escribe ambas respuestas en radianes.'
    ],
    simplerExample: {
      problem: 'Pasar 90° a radianes',
      solution: '90° · (π / 180°) = π/2 radianes.'
    }
  },
  examTips: [
    'Verifica siempre que la calculadora esté configurada en RAD (radianes) si operas con π, o en DEG (grados) si operas con números sexagesimales.',
    'Escribe siempre ambas soluciones dentro del intervalo [0, 2π).'
  ],
  visualizerType: 'trig_circle',
  exercises: [
    {
      id: 'u10_ex_01',
      unitId: 10,
      topic: 'Trigonometría',
      subtopic: 'Ecuaciones trigonométricas',
      title: 'Ecuación con Seno en [0, 2π)',
      statement: 'Resolver la siguiente ecuación trigonométrica para $x \\in [0, 2\\pi)$:\n$$2\\sin(x) - 1 = 0$$',
      type: 'multiple_choice',
      difficulty: 3,
      examRelevance: 'EXAM_PATTERN',
      sourceType: 'SOURCE',
      sourceReference: 'Ficha 10 - Ejercicio del Manual 14',
      points: 20,
      options: [
        { id: 'opt1', text: 'S = {π/6; 5π/6}', isCorrect: true, feedback: '¡Correcto! sin(x) = 1/2 tiene soluciones en el cuadrante I (π/6) y cuadrante II (π - π/6 = 5π/6).' },
        { id: 'opt2', text: 'S = {π/6} solamente', isCorrect: false, feedback: 'Olvidaste la solución del segundo cuadrante (5π/6).' },
        { id: 'opt3', text: 'S = {π/3; 2π/3}', isCorrect: false, feedback: 'Para π/3 el seno vale √3/2, no 1/2.' },
        { id: 'opt4', text: 'S = {π/6; 7π/6}', isCorrect: false, feedback: 'En el tercer cuadrante (7π/6) el seno es negativo (-1/2).' }
      ],
      hints: [
        'Despeja: 2 sin(x) = 1 => sin(x) = 1/2.',
        '¿Para qué ángulo notable de la tabla el seno vale 1/2? Para 30° o π/6 radianes.',
        '¿En qué otro cuadrante el seno es positivo? En el segundo cuadrante.',
        'La fórmula del segundo cuadrante es: x₂ = π - α = π - π/6 = 5π/6.',
        'Las dos soluciones en una vuelta son {π/6; 5π/6}.'
      ],
      solution: {
        steps: [
          { text: 'Despejar función seno', math: '\\sin(x) = \\frac{1}{2}' },
          { text: 'Solución del I Cuadrante', math: 'x_1 = \\arcsin(1/2) = \\frac{\\pi}{6}' },
          { text: 'Solución del II Cuadrante', math: 'x_2 = \\pi - \\frac{\\pi}{6} = \\frac{5\\pi}{6}' }
        ],
        finalAnswer: 'S = {π/6; 5π/6}'
      },
      visualizerType: 'trig_circle'
    },
    {
      id: 'u10_ex_02',
      unitId: 10,
      topic: 'Trigonometría',
      subtopic: 'Identidades trigonométricas',
      title: 'Simplificación de Expresión Trigonométrica',
      statement: 'Al simplificar la expresión trigonométrica $$\\frac{1 - \\sin^2(x)}{\\cos(x)}$$ se obtiene:',
      type: 'multiple_choice',
      difficulty: 2,
      examRelevance: 'PRACTICE',
      sourceType: 'DERIVED',
      sourceReference: 'Ficha 10 - Ejercicio del Manual 7',
      points: 10,
      options: [
        { id: 'opt1', text: 'cos(x)', math: '\\cos(x)', isCorrect: true, feedback: '¡Correcto! Por la identidad pitagórica, 1 - sin²(x) = cos²(x). Al dividir por cos(x) queda cos(x).' },
        { id: 'opt2', text: 'sin(x)', math: '\\sin(x)', isCorrect: false, feedback: 'Incorrecto. 1 - sin²(x) es cos²(x), no sin²(x).' },
        { id: 'opt3', text: 'tan(x)', math: '\\tan(x)', isCorrect: false, feedback: 'tan(x) es sin(x)/cos(x).' },
        { id: 'opt4', text: '1', math: '1', isCorrect: false, feedback: 'No se cancela a 1.' }
      ],
      hints: [
        'Recuerda la identidad fundamental: sin²(x) + cos²(x) = 1.',
        'Despeja: cos²(x) = 1 - sin²(x).',
        'Reemplaza el numerador: cos²(x) / cos(x).',
        'Cancela una potencia de cos(x).',
        'El resultado final simplificado es cos(x).'
      ],
      solution: {
        steps: [
          { text: 'Aplicar identidad pitagórica', math: '1 - \\sin^2(x) = \\cos^2(x)' },
          { text: 'Simplificar cociente', math: '\\frac{\\cos^2(x)}{\\cos(x)} = \\cos(x)' }
        ],
        finalAnswer: 'cos(x)'
      }
    }
  ]
};
