// src/data/units/unit9_exponenciales.ts
import type { TopicUnit } from '../../types/index';

export const unit9Exponenciales: TopicUnit = {
  id: 9,
  slug: 'exponenciales',
  title: 'Unidad 9: Ecuaciones y Funciones Exponenciales',
  subtitle: 'Métodos de igualación de bases, cambio de variable, asíntotas horizontales y verificación de soluciones',
  manualPages: '254 a 261',
  keywords: [
    'Ecuación Exponencial',
    'Bases Iguales',
    'Función Exponencial',
    'Asíntota Horizontal',
    'Cambio de Variable',
    'Verificación de Resultados',
    'Crecimiento Exponencial'
  ],
  prerequisites: [1, 7],
  videoTopics: [
    '1) (Exponenciales) Ecuaciones',
    '2) (Exponenciales) Funciones'
  ],
  whatYouWillLearn: [
    'Reconocer y resolver ecuaciones exponenciales mediante descomposición en factores primos e igualación de bases.',
    'Resolver ecuaciones con exponentes cuadráticos aplicando raíces o trinomios cuadrados perfectos.',
    'Resolver ecuaciones exponenciales reducibles a cuadráticas mediante la sustitución u = a^x.',
    'Verificar obligatoriamente cada solución encontrada reemplazándola en la ecuación original.',
    'Analizar y graficar funciones exponenciales identificando su asíntota horizontal y conjunto imagen.'
  ],
  summaryTheory: [
    {
      title: 'Método de Igualación de Bases',
      content: 'Si dos potencias con la misma base positiva distinta de 1 son iguales, sus exponentes deben ser obligatoriamente idénticos.',
      math: 'a^{f(x)} = a^{g(x)} \\iff f(x) = g(x) \\quad (a > 0, \\, a \\ne 1)'
    },
    {
      title: 'Exponentes Cuadráticos',
      content: 'Cuando el exponente es una expresión cuadrática como x² + 2x + 1, se iguala al exponente de la base descompuesta y se resuelve como una ecuación de segundo grado, obteniendo hasta dos soluciones reales.',
      math: '2^{x^2 + 2x + 1} = 16 = 2^4 \\implies x^2 + 2x + 1 = 4 \\implies (x + 1)^2 = 4 \\implies x + 1 = \\pm 2'
    },
    {
      title: 'Función Exponencial y Asíntota',
      content: 'f(x) = k · a^x + c. El dominio es todo ℝ. La recta horizontal y = c es la asíntota horizontal. La imagen es (c, ∞) si k > 0.',
      math: '\\text{Dom}(f) = \\mathbb{R}, \\quad \\text{Asíntota Horizontal: } y = c, \\quad \\text{Im}(f) = (c, \\infty)'
    }
  ],
  keyFormulas: [
    {
      name: 'Igualdad de exponentes',
      latex: 'b^{P(x)} = b^k \\implies P(x) = k',
      description: 'Permite bajar la incógnita desde el exponente para transformarla en una ecuación polinómica.'
    },
    {
      name: 'Propiedad de potencias sucesivas',
      latex: '(a^n)^m = a^{n \\cdot m}, \\quad a^n \\cdot a^m = a^{n+m}',
      description: 'Imprescindible para agrupar términos exponenciales.'
    }
  ],
  workedExample: {
    title: 'Ecuación Exponencial Oficial UNLaM Tema 1 (10 Pts)',
    statement: 'Resolver la siguiente ecuación exponencial y verificar los resultados obtenidos:\n$$2^{x^2 + 2x + 1} = 16$$',
    steps: [
      {
        stepNumber: 1,
        title: 'Descomponer 16 en potencias de base 2',
        math: '16 = 2^4 \\implies 2^{x^2 + 2x + 1} = 2^4',
        explanation: 'Escribimos ambos miembros con la misma base 2.'
      },
      {
        stepNumber: 2,
        title: 'Igualar los exponentes',
        math: 'x^2 + 2x + 1 = 4',
        explanation: 'Al ser iguales las bases, los exponentes deben coincidir.'
      },
      {
        stepNumber: 3,
        title: 'Resolver la ecuación cuadrática',
        math: '(x + 1)^2 = 4 \\iff x + 1 = \\pm \\sqrt{4} = \\pm 2',
        explanation: 'Reconocemos el trinomio cuadrado perfecto (x + 1)² o pasamos 4 restando: x² + 2x - 3 = 0.'
      },
      {
        stepNumber: 4,
        title: 'Hallar ambas soluciones',
        math: 'x_1 = 2 - 1 = 1, \\qquad x_2 = -2 - 1 = -3',
        explanation: 'Las dos posibles soluciones reales son x = 1 y x = -3.'
      },
      {
        stepNumber: 5,
        title: 'Verificación de ambas soluciones',
        math: '\\text{Para } x = 1: \\quad 2^{1^2 + 2(1) + 1} = 2^4 = 16 \\quad (\\text{Verifica}) \\\\\n\\text{Para } x = -3: \\quad 2^{(-3)^2 + 2(-3) + 1} = 2^{9 - 6 + 1} = 2^4 = 16 \\quad (\\text{Verifica})',
        explanation: 'Ambos valores satisfacen la ecuación original.'
      }
    ],
    conclusion: 'El conjunto solución es: S = {-3; 1}.'
  },
  explainFromScratch: {
    whatIsIt: 'Una ecuación exponencial es una ecuación donde la x está "volando" arriba, en el exponente de una potencia (como 2ˣ = 8).',
    whyExists: 'Porque describe fenómenos que se multiplican con el tiempo: reproducción de bacterias, crecimiento de inversiones a interés compuesto, etc.',
    whatMeans: 'Significa buscar qué potencia hace que la base alcance el número indicado.',
    whenUsed: 'En el Ejercicio 5 del Tema 1 de examen de la UNLaM.',
    howRecognized: 'Por tener una potencia con x en el exponente.',
    correspondingFormula: 'a^f(x) = a^k => f(x) = k.',
    howApplied: 'Descompón los números grandes en factores primos (16 = 2⁴, 27 = 3³, 125 = 5³). Cuando las bases sean iguales, tacha las bases y quédate solo con los exponentes.',
    commonMistakes: 'Olvidar la solución negativa al aplicar raíz cuadrada a una potencia: (x + 1)² = 4 da dos resultados (+2 y -2), no solo el 2 positivo.',
    howAppearsInExam: 'Te piden: "Resolver la siguiente ecuación exponencial y verificar los resultados obtenidos".',
    checkpointQuestion: {
      question: 'En la ecuación 2^(x² + 2x + 1) = 16, si un estudiante solo da como respuesta x = 1 y se olvida de x = -3, ¿qué error cometió?',
      options: [
        { text: 'Olvidó considerar las dos ramas de la raíz cuadrada (±2) al resolver (x + 1)² = 4.', isCorrect: true, explanation: '¡Correcto! Una ecuación cuadrática admite hasta dos raíces reales distintas.' },
        { text: '16 no es 2⁴.', isCorrect: false, explanation: '16 sí es 2⁴ (2·2·2·2 = 16).' },
        { text: 'Las ecuaciones exponenciales nunca admiten soluciones negativas.', isCorrect: false, explanation: 'Falso. El exponente x sí puede ser un número negativo.' }
      ]
    }
  },
  noEntiendoBackup: {
    simpleAnalogy: 'Imagina que tienes una llave con un código secreto en la etiqueta de arriba. Para que la cerradura de la derecha (16 = 2⁴) abra con la llave de la izquierda (2^...), el código de arriba tiene que ser exactamente el número 4.',
    visualExplanation: 'Escribe: 2^(algo) = 2⁴. Es obvio que ese "algo" tiene que valer 4. Luego resuelves qué números puestos en x hacen que el polinomio dé 4.',
    stepByStepFallback: [
      'Paso 1: ¿Cuál es la base? Es 2.',
      'Paso 2: ¿Cuántas veces multiplicas 2 para que dé 16? 2 · 2 · 2 · 2 = 16 (4 veces). Entonces 16 = 2⁴.',
      'Paso 3: Tacha los doses: x² + 2x + 1 = 4.',
      'Paso 4: Pasa el 4 restando: x² + 2x - 3 = 0 y aplica Bhaskara.',
      'Paso 5: Te dan dos números: 1 y -3. ¡Pon los dos en tu respuesta!'
    ],
    simplerExample: {
      problem: 'Resolver 3^(2x - 1) = 27',
      solution: '27 = 3³. Entonces 2x - 1 = 3 => 2x = 4 => x = 2. Verificación: 3^(4 - 1) = 3³ = 27.'
    }
  },
  examTips: [
    'Recuerda verificar AMBAS soluciones: si solo verificas una te descuentan puntaje.',
    'Escribe el conjunto solución entre llaves: S = {-3; 1}.'
  ],
  exercises: [
    {
      id: 'u9_ex_01',
      unitId: 9,
      topic: 'Ecuaciones Exponenciales',
      subtopic: 'Igualación de bases con exponente cuadrático',
      title: 'Ecuación Exponencial Oficial UNLaM Tema 1 (10 Pts)',
      statement: 'Resolver la siguiente ecuación exponencial y verificar los resultados obtenidos:\n$$2^{x^2 + 2x + 1} = 16$$',
      type: 'multiple_choice',
      difficulty: 3,
      examRelevance: 'EXAM_EXERCISE',
      sourceType: 'SOURCE',
      sourceReference: 'Examen Real UNLaM Tema 1 (Ejercicio 5 - 2 pts)',
      points: 20,
      options: [
        { id: 'opt1', text: 'S = {-3; 1} (ambos valores verifican 2⁴ = 16)', isCorrect: true, feedback: '¡Correcto! 16 = 2⁴. x² + 2x + 1 = 4 => (x + 1)² = 4 => x + 1 = ±2 => x₁ = 1, x₂ = -3. Ambos verifican.' },
        { id: 'opt2', text: 'S = {1} solamente', isCorrect: false, feedback: 'Olvidaste la solución negativa x = -3 proveniente de (x + 1) = -2.' },
        { id: 'opt3', text: 'S = {-1; 3}', isCorrect: false, feedback: 'Error de signos al despejar x + 1 = ±2.' },
        { id: 'opt4', text: 'S = ∅', isCorrect: false, feedback: 'La ecuación tiene dos soluciones reales válidas.' }
      ],
      hints: [
        'Descompón 16 como potencia de 2: 16 = 2⁴.',
        'Iguala los exponentes: x² + 2x + 1 = 4.',
        'Pasa el 4 restando para igualar a cero: x² + 2x - 3 = 0.',
        'Aplica Bhaskara con a = 1, b = 2, c = -3: Δ = 4 - 4(1)(-3) = 16. Raíces: (-2 ± 4) / 2.',
        'x₁ = 2/2 = 1 y x₂ = -6/2 = -3. Verifica ambos en la ecuación original.'
      ],
      solution: {
        steps: [
          { text: 'Descomponer en igual base', math: '2^{x^2 + 2x + 1} = 2^4' },
          { text: 'Igualar exponentes', math: 'x^2 + 2x + 1 = 4 \\implies x^2 + 2x - 3 = 0' },
          { text: 'Resolver cuadrática', math: 'x = \\frac{-2 \\pm \\sqrt{4 - 4(1)(-3)}}{2} = \\frac{-2 \\pm 4}{2} \\implies x_1 = 1, \\; x_2 = -3' },
          { text: 'Verificación x = 1', math: '2^{1 + 2 + 1} = 2^4 = 16 \\quad (\\text{Verifica})' },
          { text: 'Verificación x = -3', math: '2^{9 - 6 + 1} = 2^4 = 16 \\quad (\\text{Verifica})' }
        ],
        finalAnswer: 'S = {-3; 1}'
      }
    }
  ]
};
