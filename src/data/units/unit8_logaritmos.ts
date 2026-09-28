// src/data/units/unit8_logaritmos.ts
import type { TopicUnit } from '../../types/index';

export const unit8Logaritmos: TopicUnit = {
  id: 8,
  slug: 'logaritmos',
  title: 'Unidad 8: Logaritmos y Ecuaciones Logarítmicas',
  subtitle: 'Definición, propiedades algebraicas, resolución de ecuaciones y verificación estricta del dominio',
  manualPages: '251 a 261',
  keywords: [
    'Logaritmo',
    'Base',
    'Argumento',
    'Propiedades de Logaritmos',
    'Ecuación Logarítmica',
    'Condición de Existencia',
    'Verificación Obligatoria',
    'Cambio de Base'
  ],
  prerequisites: [1, 4],
  videoTopics: [
    '1) Logaritmos - Definición',
    '2) Propiedades - Logaritmos',
    '3) Ecuaciones logarítmicas',
    '4) Logaritmos - Función Logarítmica'
  ],
  whatYouWillLearn: [
    'Comprender y aplicar la definición formal: $\\log_b(a) = c \\iff b^c = a$.',
    'Aplicar propiedades: logaritmo de un producto (suma), cociente (resta) y potencia (multiplicación por el exponente).',
    'Reconocer que el número 1 equivale a $\\log_b(b)$ (ej: $1 = \\log_{10}(10)$ o $1 = \\log_2(2)$).',
    'Resolver ecuaciones logarítmicas aplicando propiedades y simplificando expresiones racionales.',
    'REALIZAR LA VERIFICACIÓN OBLIGATORIA: descartar raíces que hagan negativos o nulos los argumentos originales.',
    'Escribir el conjunto solución formal $S = \\{x\\}$.'
  ],
  summaryTheory: [
    {
      title: 'Definición y Restricciones de Existencia',
      content: 'El logaritmo en base b de un número a es el exponente c al que hay que elevar b para obtener a. Es indispensable que el argumento sea estrictamente positivo (a > 0) y la base sea positiva y distinta de 1 (b > 0, b ≠ 1). No existen logaritmos de números negativos ni de cero en ℝ.',
      math: '\\log_b(a) = c \\iff b^c = a, \\quad \\text{con } a > 0, \\, b > 0, \\, b \\ne 1'
    },
    {
      title: 'Propiedades Fundamentales',
      content: '1) Suma: log_b(x · y) = log_b(x) + log_b(y); 2) Resta: log_b(x / y) = log_b(x) - log_b(y); 3) Potencia: log_b(x^k) = k · log_b(x); 4) Base idéntica: log_b(b) = 1; 5) Logaritmo de 1: log_b(1) = 0.',
      math: '\\log_b\\left(\\frac{x}{y}\\right) = \\log_b(x) - \\log_b(y), \\qquad \\log_{10}(10) = 1'
    },
    {
      title: 'Regla de Oro UNLaM: Verificación de Ecuaciones',
      content: 'En las correcciones de examen de la UNLaM, si el estudiante no escribe la verificación explícita reemplazando el valor obtenido en los argumentos originales para demostrar que son positivos (> 0), se descuenta el 50% del puntaje del ejercicio.',
      math: '\\text{Para todo } x \\in S: \\quad \\text{Argumento}_i(x) > 0'
    }
  ],
  keyFormulas: [
    {
      name: 'Resta de logaritmos a cociente',
      latex: '\\log_b(A) - \\log_b(B) = \\log_b\\left(\\frac{A}{B}\\right)',
      description: 'Permite unificar dos logaritmos restando en uno solo para luego aplicar la definición.'
    },
    {
      name: 'Conversión de número entero a logaritmo',
      latex: '1 = \\log(10), \\quad k = \\log_b(b^k)',
      description: 'Clave en ecuaciones como log(10 - x) - 1 = log(...) donde el 1 se reemplaza por log(10).'
    }
  ],
  workedExample: {
    title: 'Ecuación Logarítmica Oficial UNLaM Tema 2 (10 Pts)',
    statement: 'Resolver y verificar la siguiente ecuación logarítmica: $$\\log(10 - x) - 1 = \\log\\left(2x - \\frac{37}{5}\\right)$$',
    steps: [
      {
        stepNumber: 1,
        title: 'Reemplazar 1 por log(10)',
        math: '\\log(10 - x) - \\log(10) = \\log\\left(2x - \\frac{37}{5}\\right)',
        explanation: 'Como los demás logaritmos son decimales (base 10), escribimos 1 como log(10).'
      },
      {
        stepNumber: 2,
        title: 'Aplicar la propiedad del cociente en el primer miembro',
        math: '\\log\\left(\\frac{10 - x}{10}\\right) = \\log\\left(2x - \\frac{37}{5}\\right)',
        explanation: 'La resta de dos logaritmos de igual base se convierte en el logaritmo del cociente.'
      },
      {
        stepNumber: 3,
        title: 'Igualar argumentos y resolver la ecuación lineal',
        math: '\\frac{10 - x}{10} = 2x - \\frac{37}{5} \\implies 10 - x = 10\\left(2x - \\frac{37}{5}\\right) \\implies 10 - x = 20x - 74',
        explanation: 'Multiplicamos ambos miembros por 10 para eliminar las fracciones.'
      },
      {
        stepNumber: 4,
        title: 'Despejar la incógnita x',
        math: '10 + 74 = 20x + x \\iff 84 = 21x \\iff x = \\frac{84}{21} = 4',
        explanation: 'Obtenemos x = 4 como candidato a solución.'
      },
      {
        stepNumber: 5,
        title: 'Verificación estricta de condiciones de existencia',
        math: '10 - 4 = 6 > 0; \\quad 2(4) - \\frac{37}{5} = \\frac{40 - 37}{5} = \\frac{3}{5} > 0 \\implies \\log(6) - 1 = \\log\\left(\\frac{6}{10}\\right) = \\log\\left(\\frac{3}{5}\\right)',
        explanation: 'Ambos argumentos son estrictamente positivos y la igualdad se cumple perfectamente.'
      }
    ],
    conclusion: 'El conjunto solución es: S = {4}.'
  },
  explainFromScratch: {
    whatIsIt: 'El logaritmo responde a la pregunta: ¿A qué número tengo que elevar la base para que me dé el argumento? Por ejemplo, log₂(8) = 3 porque 2³ = 8.',
    whyExists: 'Porque cuando la incógnita está atrapada en un exponente o cuando las magnitudes son gigantescas (como la escala de Richter o el pH), el logaritmo las transforma en sumas sencillas.',
    whatMeans: 'log(10 - x) solo existe si 10 - x es positivo (> 0), es decir, si x es menor que 10.',
    whenUsed: 'En el Ejercicio 5 de los exámenes de la UNLaM.',
    howRecognized: 'Por la palabra log o ln.',
    correspondingFormula: 'log(A) - log(B) = log(A/B); log(A) + log(B) = log(A·B).',
    howApplied: '1) Convierte los números sueltos en logaritmos (1 = log 10). 2) Agrupa en un solo logaritmo por lado. 3) Cancela los logaritmos igualando argumentos. 4) ¡VERIFICA!',
    commonMistakes: 'Olvidar verificar la solución (costo: 50% de la nota) o inventar propiedades absurdas como que log(A + B) es log A + log B.',
    howAppearsInExam: 'Te piden: "Resolver la siguiente ecuación logarítmica y verificar los resultados obtenidos".',
    checkpointQuestion: {
      question: 'Si al resolver una ecuación logarítmica obtienes como posibles respuestas x = 3 y x = -4, y al verificar encuentras que x = -4 produce el término log(-2), ¿cuál es el conjunto solución?',
      options: [
        { text: 'S = {3} (se descarta x = -4 porque no existe el logaritmo de números negativos).', isCorrect: true, explanation: '¡Correcto! El argumento de un logaritmo debe ser estrictamente mayor a cero (> 0).' },
        { text: 'S = {3, -4}', isCorrect: false, explanation: 'Error gravísimo: aceptar un argumento negativo anula la verificación.' },
        { text: 'S = ∅', isCorrect: false, explanation: 'Incorrecto. La solución x = 3 sí verifica correctamente.' }
      ]
    }
  },
  noEntiendoBackup: {
    simpleAnalogy: 'El logaritmo es como una balanza que cuenta cuántas veces multiplicaste un número. Pero esa balanza tiene una regla de oro de seguridad: si intentas poner un número negativo o cero en el plato, la balanza explota.',
    visualExplanation: 'La curva del logaritmo viene desde el fondo del abismo por la derecha del cero, cruza el eje x en el 1, y sube suavemente. A la izquierda del cero no hay dibujo: está prohibido.',
    stepByStepFallback: [
      'Paso 1: Si ves un "1" restando, cámbialo por "- log(10)".',
      'Paso 2: Junta los dos logaritmos que se restan en una sola fracción: log(arriba / abajo).',
      'Paso 3: Tacha la palabra log de los dos lados de la igualdad.',
      'Paso 4: Resuelve la ecuación de primer grado como en la escuela.',
      'Paso 5: Reemplaza tu número final en los logaritmos del inicio: si todo adentro es positivo, ¡es la respuesta correcta!'
    ],
    simplerExample: {
      problem: 'Resolver log₂(x) + log₂(4) = 3',
      solution: 'log₂(4x) = 3 => 4x = 2³ = 8 => x = 2. Verificación: log₂(2) + 2 = 1 + 2 = 3. S = {2}.'
    }
  },
  examTips: [
    'Nunca entregues el examen sin escribir el título "VERIFICACIÓN:" con el cálculo de los argumentos positivos.',
    'En el Tema 1 (100 pts), factoriza el trinomio 5x² + 15x + 10 = 5(x + 1)(x + 2) para simplificar con el denominador (x + 2).'
  ],
  exercises: [
    {
      id: 'u8_ex_01',
      unitId: 8,
      topic: 'Logaritmos',
      subtopic: 'Ecuación logarítmica con resta y número entero',
      title: 'Ecuación Logarítmica Oficial UNLaM Tema 2 (10 Pts)',
      statement: 'Resolver la siguiente ecuación logarítmica y verificar los resultados obtenidos:\n$$\\log(10 - x) - 1 = \\log\\left(2x - \\frac{37}{5}\\right)$$',
      type: 'numeric',
      difficulty: 4,
      examRelevance: 'EXAM_EXERCISE',
      sourceType: 'SOURCE',
      sourceReference: 'Examen Real UNLaM Tema 2 (Ejercicio 5 - 2 pts)',
      points: 20,
      correctAnswer: '4',
      acceptableAnswers: ['4.0', 'x=4', 'S={4}'],
      answerType: 'number',
      hints: [
        'Escribe el número 1 como log(10).',
        'Aplica la propiedad de resta de logaritmos: log(10 - x) - log(10) = log((10 - x)/10).',
        'Iguala los argumentos: (10 - x)/10 = 2x - 37/5.',
        'Multiplica todo por 10: 10 - x = 20x - 74 => 84 = 21x => x = 4.',
        'Verifica: 10 - 4 = 6 > 0; 2(4) - 37/5 = 3/5 > 0. log(6/10) = log(3/5). Cumple.'
      ],
      solution: {
        steps: [
          { text: 'Sustituir 1 por log(10)', math: '\\log(10 - x) - \\log(10) = \\log\\left(2x - \\frac{37}{5}\\right)' },
          { text: 'Propiedad del cociente', math: '\\log\\left(\\frac{10 - x}{10}\\right) = \\log\\left(2x - \\frac{37}{5}\\right)' },
          { text: 'Igualar argumentos', math: '\\frac{10 - x}{10} = 2x - \\frac{37}{5} \\implies 10 - x = 20x - 74' },
          { text: 'Despejar x', math: '84 = 21x \\implies x = 4' },
          { text: 'Verificación', math: '10 - 4 = 6 > 0; \\quad 2(4) - \\frac{37}{5} = \\frac{3}{5} > 0 \\implies S = \\{4\\}' }
        ],
        finalAnswer: 'x = 4'
      }
    },
    {
      id: 'u8_ex_02',
      unitId: 8,
      topic: 'Logaritmos',
      subtopic: 'Ecuación logarítmica con factorización de argumento',
      title: 'Ecuación Logarítmica Oficial UNLaM Tema 1 (100 Pts)',
      statement: 'Resolver la siguiente ecuación logarítmica y verificar los resultados obtenidos:\n$$\\log_2(5x^2 + 15x + 10) - \\log_2(x + 2) = 2$$',
      type: 'numeric',
      difficulty: 5,
      examRelevance: 'EXAM_EXERCISE',
      sourceType: 'SOURCE',
      sourceReference: 'Examen Real UNLaM Tema 1 (Ejercicio 5 - 20 pts)',
      points: 20,
      correctAnswer: '-1/5',
      acceptableAnswers: ['-0.2', '-1/5', 'x=-1/5', 'x=-0.2', 'S={-1/5}'],
      answerType: 'fraction',
      hints: [
        'Aplica la propiedad del cociente: log₂((5x² + 15x + 10) / (x + 2)) = 2.',
        'Factoriza el trinomio: 5(x² + 3x + 2) = 5(x + 1)(x + 2).',
        'Simplifica el factor (x + 2) del numerador y denominador (para x ≠ -2).',
        'Queda: log₂(5(x + 1)) = 2 => 5x + 5 = 2² = 4 => 5x = -1 => x = -1/5 = -0.2.',
        'Verifica: x + 2 = -0.2 + 2 = 1.8 > 0. El trinomio 5(-0.2)² + 15(-0.2) + 10 = 0.2 - 3 + 10 = 7.2 > 0. log₂(7.2/1.8) = log₂(4) = 2. Verifica.'
      ],
      solution: {
        steps: [
          { text: 'Propiedad del cociente', math: '\\log_2\\left(\\frac{5x^2 + 15x + 10}{x + 2}\\right) = 2' },
          { text: 'Factorizar el numerador', math: '5x^2 + 15x + 10 = 5(x + 1)(x + 2)' },
          { text: 'Simplificar cociente', math: '\\log_2(5(x + 1)) = 2 \\iff 5x + 5 = 2^2 = 4' },
          { text: 'Despejar x', math: '5x = 4 - 5 = -1 \\implies x = -\\frac{1}{5} = -0.2' },
          { text: 'Verificación', math: 'x + 2 = \\frac{9}{5} > 0; \\quad 5x^2 + 15x + 10 = \\frac{36}{5} > 0 \\implies S = \\left\\{-\\frac{1}{5}\\right\\}' }
        ],
        finalAnswer: 'x = -1/5 (o -0.2)'
      }
    }
  ]
};
