// src/data/units/unit7_cuadratica.ts
import type { TopicUnit } from '../../types/index';

export const unit7Cuadratica: TopicUnit = {
  id: 7,
  slug: 'funcion-cuadratica',
  title: 'Unidad 7: Función Cuadrática',
  subtitle: 'Parábolas, raíces por resolvente, coordenadas del vértice, formas polinómica/canónica/factorizada y conjunto imagen',
  manualPages: '244 a 251',
  keywords: [
    'Función Cuadrática',
    'Parábola',
    'Vértice',
    'Raíces',
    'Fórmula de Bhaskara',
    'Discriminante',
    'Eje de Simetría',
    'Ordenada al Origen',
    'Conjunto Imagen',
    'Concavidad'
  ],
  prerequisites: [1, 5],
  videoTopics: [
    '1) Función Cuadrática - Teoría',
    '2) Función Cuadrática - Práctica',
    '3) Función cuadrática - Forma factorizada',
    '4) Función cuadrática - Forma canónica',
    '5) Sistemas mixtos - Problema de aplicación'
  ],
  whatYouWillLearn: [
    'Determinar el número y tipo de raíces evaluando el signo del discriminante $\\Delta = b^2 - 4ac$.',
    'Calcular las raíces reales mediante la fórmula resolvente de Bhaskara.',
    'Hallar las coordenadas del vértice $V(x_v, y_v)$ usando $x_v = -\\frac{b}{2a}$ e $y_v = f(x_v)$.',
    'Identificar la concavidad (ramas hacia arriba si $a > 0$, ramas hacia abajo si $a < 0$).',
    'Calcular el conjunto imagen: $[y_v, \\infty)$ si $a > 0$, o $(-\\infty, y_v]$ si $a < 0$.',
    'Realizar el pasaje entre formas polinómica, canónica $a(x - x_v)^2 + y_v$ y factorizada $a(x - x_1)(x - x_2)$.'
  ],
  summaryTheory: [
    {
      title: 'Estructura Polinómica y Concavidad',
      content: 'f(x) = ax² + bx + c con a ≠ 0. El coeficiente a determina la concavidad: si a > 0 la parábola es cóncava hacia arriba (tiene un mínimo en el vértice); si a < 0 es cóncava hacia abajo (tiene un máximo en el vértice). La ordenada al origen es el punto (0, c).',
      math: 'a > 0 \\implies \\bigcup, \\quad a < 0 \\implies \\bigcap, \\quad f(0) = c'
    },
    {
      title: 'Vértice y Eje de Simetría',
      content: 'El eje de simetría es la recta vertical x = x_v. El vértice V(x_v, y_v) es el punto cúspide o más bajo de la curva.',
      math: 'x_v = -\\frac{b}{2a} = \\frac{x_1 + x_2}{2}, \\qquad y_v = f(x_v) = c - \\frac{b^2}{4a}'
    },
    {
      title: 'Conjunto Imagen',
      content: 'A diferencia de las funciones lineales donde la imagen es todo ℝ, la imagen de una parábola siempre está acotada por la coordenada vertical del vértice y_v.',
      math: 'a > 0 \\implies \\text{Im}(f) = [y_v, \\infty), \\qquad a < 0 \\implies \\text{Im}(f) = (-\\infty, y_v]'
    }
  ],
  keyFormulas: [
    {
      name: 'Fórmula Resolvente (Bhaskara)',
      latex: 'x_{1,2} = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
      description: 'Calcula las intersecciones con el eje horizontal x.'
    },
    {
      name: 'Coordenadas del vértice',
      latex: 'V = (x_v; y_v) = \\left(-\\frac{b}{2a}; \\; f(x_v)\\right)',
      description: 'Define el máximo o mínimo absoluto y el conjunto imagen.'
    },
    {
      name: 'Forma canónica',
      latex: 'f(x) = a(x - x_v)^2 + y_v',
      description: 'Permite leer directamente el vértice y realizar traslaciones.'
    }
  ],
  workedExample: {
    title: 'Análisis Completo de Cuadrática (Examen Oficial Tema 2)',
    statement: 'Dada la función $$f(x) = -2x^2 - x + 6$$:\na) Hallar raíces, vértice y ordenada al origen.\nb) Graficar e indicar el conjunto imagen.',
    steps: [
      {
        stepNumber: 1,
        title: 'Identificar coeficientes',
        math: 'a = -2, \\quad b = -1, \\quad c = 6',
        explanation: 'Como a = -2 < 0, la parábola abre hacia abajo (cóncava hacia abajo, tiene un máximo).'
      },
      {
        stepNumber: 2,
        title: 'Hallar raíces con la fórmula resolvente',
        math: '\\Delta = (-1)^2 - 4(-2)(6) = 1 + 48 = 49 = 7^2 \\implies x = \\frac{-(-1) \\pm 7}{2(-2)} = \\frac{1 \\pm 7}{-4}',
        explanation: 'x₁ = (1 + 7)/(-4) = 8/(-4) = -2; x₂ = (1 - 7)/(-4) = -6/(-4) = 3/2 = 1.5.'
      },
      {
        stepNumber: 3,
        title: 'Calcular vértice y eje de simetría',
        math: 'x_v = -\\frac{-1}{2(-2)} = -\\frac{1}{4} = -0.25; \\quad y_v = f(-1/4) = -2(-1/4)^2 - (-1/4) + 6 = -\\frac{1}{8} + \\frac{2}{8} + \\frac{48}{8} = \\frac{49}{8} = 6.125',
        explanation: 'Vértice V = (-1/4; 49/8) o (-0.25; 6.125).'
      },
      {
        stepNumber: 4,
        title: 'Ordenada al origen y Conjunto Imagen',
        math: 'f(0) = 6 \\implies (0, 6); \\qquad \\text{Como } a < 0 \\implies \\text{Im}(f) = \\left(-\\infty, \\frac{49}{8}\\right]',
        explanation: 'La función toma valores desde -∞ hasta el punto más alto y_v = 49/8 (con corchete cerrado).'
      }
    ],
    conclusion: 'Raíces: x₁ = -2, x₂ = 3/2; Vértice: (-1/4; 49/8); Ordenada: (0; 6); Imagen: (-∞; 49/8].'
  },
  explainFromScratch: {
    whatIsIt: 'Una función cuadrática es una curva con forma de U (si a > 0) o de montaña (si a < 0) llamada parábola.',
    whyExists: 'Porque modela lanzamientos de proyectiles, ingresos máximos de una empresa o áreas óptimas.',
    whatMeans: 'El vértice es la cima de la montaña (si abre hacia abajo) o el fondo del pozo (si abre hacia arriba).',
    whenUsed: 'En el Ejercicio 3 del Tema 2 de examen de la UNLaM.',
    howRecognized: 'Porque tiene un término con x².',
    correspondingFormula: 'x_v = -b/(2a), y_v = f(x_v). Resolvente: (-b ± √(b² - 4ac)) / (2a).',
    howApplied: '1) Anota a, b y c. 2) Saca las raíces con la resolvente. 3) Saca x_v y enchúfalo en la función para hallar y_v. 4) La imagen va de -∞ a y_v si abre hacia abajo.',
    commonMistakes: 'Olvidar el signo menos en la fórmula de x_v = -b/(2a), o poner en el conjunto imagen el valor de x_v en vez de y_v.',
    howAppearsInExam: 'Te piden explícitamente: "a) Hallar raíces, vértice y ordenada al origen. b) Graficar e indicar el conjunto imagen".',
    checkpointQuestion: {
      question: 'Si una parábola tiene vértice en V(-1/4; 49/8) y su coeficiente principal es a = -2, ¿cuál es su conjunto imagen?',
      options: [
        { text: '(-∞; 49/8]', isCorrect: true, explanation: '¡Correcto! Como a = -2 es negativo, las ramas apuntan hacia abajo y el valor más alto posible para y es 49/8, alcanzando todos los valores menores hasta -∞.' },
        { text: '[49/8; ∞)', isCorrect: false, explanation: 'Incorrecto. Esto sería si a fuera positivo (ramas hacia arriba).' },
        { text: '(-∞; -1/4]', isCorrect: false, explanation: 'Error común: pusiste x_v en vez de y_v. La imagen se mide en el eje y.' }
      ]
    }
  },
  noEntiendoBackup: {
    simpleAnalogy: 'Imagina patear una pelota de fútbol hacia arriba. La pelota sube, llega a una altura máxima (el vértice) y luego cae de vuelta al suelo tocándolo en dos puntos (las raíces).',
    visualExplanation: 'La pelota sube hasta 49/8 metros (6.125). Las alturas posibles de la pelota van desde abajo de todo (-∞) hasta ese techo máximo de 49/8.',
    stepByStepFallback: [
      'Paso 1: Escribe cuánto valen a, b y c. Si la x² tiene un menos adelante, a = -1 (o -2).',
      'Paso 2: Calcula el discriminante: b² - 4ac. Si te da 49, su raíz es 7.',
      'Paso 3: Saca las dos raíces con Bhaskara.',
      'Paso 4: x_v está justo en el medio de las dos raíces: (-b) / (2a).',
      'Paso 5: Reemplaza ese x_v en la función para encontrar y_v.',
      'Paso 6: Si a es negativo, la imagen es (-∞; y_v].'
    ],
    simplerExample: {
      problem: 'Hallar vértice e imagen de f(x) = -x² + 4',
      solution: 'a = -1, b = 0, c = 4. x_v = 0, y_v = 4. V = (0; 4). Como a < 0, Im(f) = (-∞; 4].'
    }
  },
  examTips: [
    'En el examen de la UNLaM puntúan cada ítem por separado: raíces (0.5 pts), vértice (0.5 pts), ordenada (0.25 pts), gráfica (0.5 pts) e imagen (0.25 pts). ¡No olvides ninguno!',
    'Escribe las fracciones irreducibles: x_v = -1/4, y_v = 49/8, raíces -2 y 3/2.'
  ],
  visualizerType: 'parabola',
  exercises: [
    {
      id: 'u7_ex_01',
      unitId: 7,
      topic: 'Función Cuadrática',
      subtopic: 'Raíces, Vértice e Imagen',
      title: 'Cuadrática Oficial UNLaM Tema 2 (10 Pts)',
      statement: 'Dada la función cuadrática $f(x) = -2x^2 - x + 6$:\na) Hallar las raíces reales.\nb) Hallar las coordenadas del vértice $V(x_v; y_v)$.\nc) Indicar el Conjunto Imagen.',
      type: 'math_expression',
      difficulty: 4,
      examRelevance: 'EXAM_EXERCISE',
      sourceType: 'SOURCE',
      sourceReference: 'Examen Real UNLaM Tema 2 (Ejercicio 3 - 2 pts)',
      points: 20,
      correctAnswer: '(-inf, 49/8]',
      acceptableAnswers: [
        '(-inf; 49/8]',
        '(-∞, 49/8]',
        '(-∞; 49/8]',
        '(-inf, 6.125]',
        '(-inf; 6.125]',
        '(-∞, 6.125]'
      ],
      answerType: 'interval',
      hints: [
        'Identifica los coeficientes: a = -2, b = -1, c = 6.',
        'Aplica Bhaskara: discriminante Δ = (-1)² - 4(-2)(6) = 1 + 48 = 49. Las raíces son x = (1 ± 7)/(-4) => x₁ = -2, x₂ = 3/2.',
        'Calcula x_v = -b/(2a) = 1/(2(-2)) = -1/4 = -0.25.',
        'Calcula y_v = f(-1/4) = -2(1/16) - (-1/4) + 6 = -1/8 + 2/8 + 48/8 = 49/8 = 6.125.',
        'Como a = -2 < 0, la parábola es cóncava hacia abajo. La imagen es (-∞; 49/8] o (-∞; 6.125].'
      ],
      solution: {
        steps: [
          { text: 'Raíces con Bhaskara', math: 'x_{1,2} = \\frac{-(-1) \\pm \\sqrt{49}}{2(-2)} \\implies x_1 = -2, \\; x_2 = \\frac{3}{2}' },
          { text: 'Coordenadas del vértice', math: 'x_v = -\\frac{1}{4}, \\quad y_v = -2\\left(-\\frac{1}{4}\\right)^2 - \\left(-\\frac{1}{4}\\right) + 6 = \\frac{49}{8} \\implies V\\left(-\\frac{1}{4}; \\frac{49}{8}\\right)' },
          { text: 'Ordenada al origen', math: 'f(0) = 6 \\implies (0; 6)' },
          { text: 'Conjunto imagen', math: 'a = -2 < 0 \\implies \\text{Im}(f) = \\left(-\\infty, \\frac{49}{8}\\right]' }
        ],
        finalAnswer: 'Im(f) = (-∞, 49/8]'
      },
      visualizerType: 'parabola',
      visualizerData: {
        a: -2,
        b: -1,
        c: 6,
        roots: [-2, 1.5],
        vertex: { x: -0.25, y: 6.125 },
        yIntercept: 6,
        imageInterval: '(-∞; 49/8]'
      }
    }
  ]
};
