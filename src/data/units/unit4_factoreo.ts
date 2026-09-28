// src/data/units/unit4_factoreo.ts
import type { TopicUnit } from '../../types/index';

export const unit4Factoreo: TopicUnit = {
  id: 4,
  slug: 'factoreo-racionales',
  title: 'Unidad 4: Factoreo y Expresiones Algebraicas Racionales',
  subtitle: 'Todos los casos de factoreo, simplificación de expresiones fraccionarias y operaciones algebraicas',
  manualPages: '214 a 223',
  keywords: [
    'Factoreo',
    'Factor Común',
    'Factor Común por Grupos',
    'Trinomio Cuadrado Perfecto',
    'Diferencia de Cuadrados',
    'Suma y Resta de Potencias',
    'Teorema de Gauss',
    'Expresiones Algebraicas Racionales',
    'Simplificación'
  ],
  prerequisites: [1, 3],
  videoTopics: [
    '1) Polinomios Factoreo 1',
    '2) Polinomios Factoreo 2',
    '3) Polinomios Factoreo 3',
    '4) Factor común - Factor común por grupos',
    '5) Trinomio cuadrado perfecto - Cuatrinomio cubo perfecto - Diferencia de cuadrados',
    '6) Suma o resta de potencias de igual exponente - Trinomio cuadrado imperfecto',
    '7) Teorema de Gauss',
    '8) Expresiones algebraicas racionales'
  ],
  whatYouWillLearn: [
    'Identificar y aplicar metódicamente los casos de factoreo convenientes según la cantidad de términos.',
    'Factorizar combinando múltiples casos sucesivos (ej: Trinomio Cuadrado Perfecto seguido de Diferencia de Cuadrados).',
    'Factorizar polinomios de grado superior mediante Factor Común por Grupos y suma de potencias.',
    'Operar con expresiones algebraicas fraccionarias: simplificar cancelando factores idénticos previa factorización.',
    'Multiplicar y dividir expresiones racionales invirtiendo el divisor y determinando restricciones de dominio.'
  ],
  summaryTheory: [
    {
      title: 'Estrategia General de Factoreo',
      content: 'Para factorizar un polinomio se sigue este orden jerárquico: 1) ¿Hay Factor Común numérico o de variables?; 2) Si tiene 2 términos: Diferencia de Cuadrados (a² - b² = (a-b)(a+b)) o Suma/Resta de potencias iguales; 3) Si tiene 3 términos: Trinomio Cuadrado Perfecto (a² ± 2ab + b² = (a ± b)²) o resolvente cuadrática; 4) Si tiene 4 o más términos pares: Factor Común por Grupos.',
      math: 'x^4 - 18x^2 + 81 = (x^2 - 9)^2 = [(x - 3)(x + 3)]^2 = (x - 3)^2(x + 3)^2'
    },
    {
      title: 'Factor Común por Grupos y Potencias Iguales',
      content: 'En polinomios como P(x) = x⁵ - 4x³ + 8x² - 32, se agrupan los dos primeros términos y los dos últimos. Luego se descompone la diferencia de cuadrados y la suma de cubos.',
      math: 'x^3(x^2 - 4) + 8(x^2 - 4) = (x^2 - 4)(x^3 + 8) = (x - 2)(x + 2)(x + 2)(x^2 - 2x + 4) = (x - 2)(x + 2)^2(x^2 - 2x + 4)'
    },
    {
      title: 'Operaciones con Expresiones Racionales',
      content: 'Para simplificar o dividir fracciones algebraicas: se factorizan TODOS los numeradores y denominadores al máximo. La división A/B : C/D se convierte en A/B · D/C. Solo se cancelan factores idénticos completos, NUNCA términos sumando.',
      math: '\\frac{A}{B} : \\frac{C}{D} = \\frac{A}{B} \\cdot \\frac{D}{C}'
    }
  ],
  keyFormulas: [
    {
      name: 'Diferencia de cuadrados',
      latex: 'a^2 - b^2 = (a - b)(a + b)',
      description: 'El caso más frecuente en exámenes. Recuerda que x⁴ - 16 = (x² - 4)(x² + 4) = (x - 2)(x + 2)(x² + 4).'
    },
    {
      name: 'Suma de cubos (Potencias de igual exponente)',
      latex: 'a^3 + b^3 = (a + b)(a^2 - ab + b^2)',
      description: 'x³ + 8 = (x + 2)(x² - 2x + 4). El factor cuadrático resultante tiene discriminante negativo (irreducible en R).'
    },
    {
      name: 'Trinomio de segundo grado con resolvente',
      latex: 'ax^2 + bx + c = a(x - x_1)(x - x_2)',
      description: 'No olvidar multiplicar por el coeficiente "a" si es distinto de 1.'
    }
  ],
  workedExample: {
    title: 'Operación con Fracciones Algebraicas (Examen Oficial Tema 2)',
    statement: 'Resolver simplificando todo lo posible: $$\\frac{2x^3 - 18x}{x^2 - x - 6} : \\frac{x^3 + 3x^2 + 4x + 12}{x^4 - 16}$$',
    steps: [
      {
        stepNumber: 1,
        title: 'Factorizar cada numerador y denominador',
        math: '2x^3 - 18x = 2x(x^2 - 9) = 2x(x - 3)(x + 3)',
        explanation: 'En 2x³ - 18x sacamos factor común 2x y luego diferencia de cuadrados.'
      },
      {
        stepNumber: 2,
        title: 'Factorizar denominador 1 con resolvente',
        math: 'x^2 - x - 6 = (x - 3)(x + 2)',
        explanation: 'Buscamos dos números que multiplicados den -6 y sumados den -1: son -3 y 2.'
      },
      {
        stepNumber: 3,
        title: 'Factorizar numerador 2 por grupos',
        math: 'x^3 + 3x^2 + 4x + 12 = x^2(x + 3) + 4(x + 3) = (x + 3)(x^2 + 4)',
        explanation: 'Agrupamos de a dos y sacamos factor común (x + 3).'
      },
      {
        stepNumber: 4,
        title: 'Factorizar denominador 2 con doble diferencia de cuadrados',
        math: 'x^4 - 16 = (x^2 - 4)(x^2 + 4) = (x - 2)(x + 2)(x^2 + 4)',
        explanation: 'Diferencia de cuadrados sucesiva. x² + 4 es irreducible en reales.'
      },
      {
        stepNumber: 5,
        title: 'Invertir la división y simplificar factores comunes',
        math: '\\frac{2x(x-3)(x+3)}{(x-3)(x+2)} \\cdot \\frac{(x-2)(x+2)(x^2+4)}{(x+3)(x^2+4)} = 2x(x - 2)',
        explanation: 'Cancelamos (x - 3), (x + 3), (x + 2) y (x² + 4). Queda únicamente 2x(x - 2).'
      }
    ],
    conclusion: 'La expresión final simplificada es: 2x(x - 2) = 2x² - 4x.'
  },
  explainFromScratch: {
    whatIsIt: 'Factorizar es escribir una suma o resta de términos como una multiplicación de factores más simples (como escribir 12 = 2 · 2 · 3).',
    whyExists: 'Porque en una multiplicación podemos simplificar términos idénticos de numerador y denominador, facilitando cálculos imposibles.',
    whatMeans: 'Expresar como producto significa que la última operación al evaluar debe ser una multiplicación entre paréntesis.',
    whenUsed: 'En el Ejercicio 4 del examen UNLaM siempre te piden "Expresar como producto aplicando todos los casos de factoreo posibles".',
    howRecognized: 'Contando la cantidad de términos: 2 términos (diferencia cuadrados), 3 términos (trinomio), 4 términos (por grupos).',
    correspondingFormula: 'a² - b² = (a - b)(a + b); (a ± b)² = a² ± 2ab + b²; a³ + b³ = (a + b)(a² - ab + b²).',
    howApplied: 'Siempre busca primero factor común. Luego fíjate si el paréntesis resultante se puede seguir factorizando.',
    commonMistakes: 'Dejar el ejercicio a mitad de camino (por ejemplo detenerse en (x² - 9)² sin factorizar x² - 9) o cancelar términos que están sumando.',
    howAppearsInExam: 'Aparece en el Ejercicio 4 con valor de 2 puntos o 20 puntos en todos los exámenes reales de la UNLaM.',
    checkpointQuestion: {
      question: 'Si factorizas A = x⁴ - 18x² + 81 y dejas como respuesta (x² - 9)², ¿por qué la cátedra de la UNLaM no te dará el puntaje completo?',
      options: [
        { text: 'Porque el enunciado exige "todos los casos posibles" y (x² - 9) es una diferencia de cuadrados que aún se descompone en (x - 3)(x + 3).', isCorrect: true, explanation: '¡Exacto! La respuesta completa debe ser (x - 3)²(x + 3)².' },
        { text: 'Porque (x² - 9)² no es equivalente al polinomio inicial.', isCorrect: false, explanation: 'Sí es equivalente algebraicamente, pero no está factorizado al máximo.' },
        { text: 'Porque el exponente debe ser siempre impar.', isCorrect: false, explanation: 'Falso. No tiene relación con la paridad del exponente.' }
      ]
    }
  },
  noEntiendoBackup: {
    simpleAnalogy: 'Factorizar es como desarmar un mueble en sus piezas más chicas para que quepa por la puerta. Si desarmas un armario en dos cajones grandes pero los cajones todavía se pueden desarmar más, no terminaste la tarea.',
    visualExplanation: 'x⁴ - 18x² + 81 es un trinomio cuadrado perfecto: (x²)² - 2(x²)(9) + 9² = (x² - 9)². Adentro de cada paréntesis tienes x² - 9 = (x-3)(x+3). Al elevarlo al cuadrado, queda (x-3)² (x+3)²',
    stepByStepFallback: [
      'Paso 1: ¿Tienen todos los términos una letra o número en común? Si sí, sácalo afuera (factor común).',
      'Paso 2: ¿Hay dos términos restándose con potencias pares? Aplica diferencia de cuadrados.',
      'Paso 3: ¿Hay tres términos? Verifica si el del medio es el doble producto (trinomio cuadrado perfecto).',
      'Paso 4: Repite el proceso con lo que te quedó adentro de cada paréntesis hasta que no se pueda achicar más.'
    ],
    simplerExample: {
      problem: 'Factorizar 3x² - 12',
      solution: '1) Factor común 3: 3(x² - 4). 2) Diferencia de cuadrados en x² - 4: 3(x - 2)(x + 2).'
    }
  },
  examTips: [
    'La frase "aplicando todos los casos posibles" es una advertencia de la cátedra: casi siempre hay un segundo caso escondido adentro del primer resultado.',
    'En el Tema 1 (10 pts): x⁴ - 18x² + 81 requiere trinomio cuadrado perfecto y luego diferencia de cuadrados al cuadrado.',
    'En el Tema 1 (100 pts): x⁵ - 4x³ + 8x² - 32 requiere factor común por grupos y suma de cubos.'
  ],
  exercises: [
    {
      id: 'u4_ex_01',
      unitId: 4,
      topic: 'Factoreo',
      subtopic: 'Trinomio y Diferencia de Cuadrados Sucesiva',
      title: 'Factoreo Oficial UNLaM Tema 1 (10 Pts)',
      statement: 'Expresar como producto aplicando todos los casos de factorización posibles el polinomio: $$A = x^4 - 18x^2 + 81$$',
      type: 'math_expression',
      difficulty: 4,
      examRelevance: 'EXAM_EXERCISE',
      sourceType: 'SOURCE',
      sourceReference: 'Examen Real UNLaM Tema 1 (Ejercicio 4 - 2 pts)',
      points: 20,
      correctAnswer: '(x - 3)^2 * (x + 3)^2',
      acceptableAnswers: [
        '(x - 3)^2(x + 3)^2',
        '(x + 3)^2(x - 3)^2',
        '(x - 3)^2 * (x + 3)^2',
        '[(x - 3)(x + 3)]^2',
        '(x-3)^2(x+3)^2'
      ],
      answerType: 'expression',
      hints: [
        'Observa que es un trinomio de tres términos con coeficientes 1, -18 y 81.',
        'Verifica si es un Trinomio Cuadrado Perfecto: ¿es (x²)² - 2(x²)(9) + 9²?',
        'Efectivamente es igual a (x² - 9)²',
        'Ahora observa la base: (x² - 9) es una diferencia de cuadrados: (x - 3)(x + 3).',
        'Eleva cada factor al cuadrado: [(x - 3)(x + 3)]² = (x - 3)² (x + 3)².'
      ],
      solution: {
        steps: [
          { text: 'Reconocer Trinomio Cuadrado Perfecto', math: 'x^4 - 18x^2 + 81 = (x^2)^2 - 2(x^2)(9) + 9^2 = (x^2 - 9)^2' },
          { text: 'Descomponer la base por Diferencia de Cuadrados', math: 'x^2 - 9 = (x - 3)(x + 3)' },
          { text: 'Distribuir la potencia al cuadrado en el producto', math: '[(x - 3)(x + 3)]^2 = (x - 3)^2 (x + 3)^2' }
        ],
        finalAnswer: '(x - 3)² (x + 3)²'
      },
      commonTraps: [
        {
          trapId: 'stopped_at_sq9',
          triggerAnswer: '(x^2 - 9)^2',
          diagnosis: 'Dejaste la base (x² - 9) sin descomponer. El enunciado pide aplicar TODOS los casos posibles.',
          remedy: 'Factoriza x² - 9 en (x - 3)(x + 3) y eleva ambos al cuadrado.'
        }
      ]
    },
    {
      id: 'u4_ex_02',
      unitId: 4,
      topic: 'Factoreo',
      subtopic: 'Factor común por grupos y suma de cubos',
      title: 'Factoreo Oficial UNLaM Tema 1 (100 Pts)',
      statement: 'Expresar el siguiente polinomio como producto, aplicando todos los casos de factoreo posibles: $$P(x) = x^5 - 4x^3 + 8x^2 - 32$$',
      type: 'math_expression',
      difficulty: 5,
      examRelevance: 'EXAM_EXERCISE',
      sourceType: 'SOURCE',
      sourceReference: 'Examen Real UNLaM Tema 1 (Ejercicio 4 - 20 pts)',
      points: 20,
      correctAnswer: '(x - 2)(x + 2)^2(x^2 - 2x + 4)',
      acceptableAnswers: [
        '(x - 2)*(x + 2)^2*(x^2 - 2x + 4)',
        '(x - 2)(x + 2)(x + 2)(x^2 - 2x + 4)',
        '(x+2)^2(x-2)(x^2-2x+4)',
        '(x - 2) * (x + 2)^2 * (x^2 - 2x + 4)'
      ],
      answerType: 'expression',
      hints: [
        'Agrupa en dos parejas: (x⁵ - 4x³) + (8x² - 32).',
        'Extrae factor común en cada pareja: x³(x² - 4) + 8(x² - 4).',
        'Saca factor común del binomio repetido: (x² - 4)(x³ + 8).',
        'Factoriza (x² - 4) como diferencia de cuadrados: (x - 2)(x + 2).',
        'Factoriza (x³ + 8) como suma de cubos (x³ + 2³): (x + 2)(x² - 2x + 4). Junta los términos (x + 2) en (x + 2)².'
      ],
      solution: {
        steps: [
          { text: 'Factor Común por Grupos', math: 'x^3(x^2 - 4) + 8(x^2 - 4) = (x^2 - 4)(x^3 + 8)' },
          { text: 'Diferencia de Cuadrados en x² - 4', math: 'x^2 - 4 = (x - 2)(x + 2)' },
          { text: 'Suma de Potencias de Igual Exponente (Cubos) en x³ + 8', math: 'x^3 + 2^3 = (x + 2)(x^2 - 2x + 4)' },
          { text: 'Multiplicar todos los factores agrupando repetidos', math: 'P(x) = (x - 2)(x + 2)(x + 2)(x^2 - 2x + 4) = (x - 2)(x + 2)^2 (x^2 - 2x + 4)' }
        ],
        finalAnswer: '(x - 2)(x + 2)²(x² - 2x + 4)'
      }
    },
    {
      id: 'u4_ex_03',
      unitId: 4,
      topic: 'Factoreo',
      subtopic: 'Operación y simplificación con expresiones fraccionarias',
      title: 'Simplificación Fraccionaria Oficial UNLaM Tema 2',
      statement: 'Resolver la siguiente operación simplificando todo lo que sea posible: $$\\frac{2x^3 - 18x}{x^2 - x - 6} : \\frac{x^3 + 3x^2 + 4x + 12}{x^4 - 16}$$',
      type: 'math_expression',
      difficulty: 5,
      examRelevance: 'EXAM_EXERCISE',
      sourceType: 'SOURCE',
      sourceReference: 'Examen Real UNLaM Tema 2 (Ejercicio 4 - 2 pts)',
      points: 20,
      correctAnswer: '2x(x - 2)',
      acceptableAnswers: ['2x^2 - 4x', '2*x*(x - 2)', '2x*(x-2)', '2x(x-2)'],
      answerType: 'expression',
      hints: [
        'Factoriza cada uno de los 4 polinomios que componen la división.',
        '2x³ - 18x = 2x(x - 3)(x + 3).',
        'x² - x - 6 = (x - 3)(x + 2).',
        'x³ + 3x² + 4x + 12 = x²(x + 3) + 4(x + 3) = (x + 3)(x² + 4).',
        'x⁴ - 16 = (x - 2)(x + 2)(x² + 4). Invierte la segunda fracción y cancela los factores idénticos.'
      ],
      solution: {
        steps: [
          { text: 'Factorizar los 4 polinomios', math: 'N_1 = 2x(x-3)(x+3), \\quad D_1 = (x-3)(x+2), \\quad N_2 = (x+3)(x^2+4), \\quad D_2 = (x-2)(x+2)(x^2+4)' },
          { text: 'Escribir la división como producto por el inverso', math: '\\frac{2x(x-3)(x+3)}{(x-3)(x+2)} \\cdot \\frac{(x-2)(x+2)(x^2+4)}{(x+3)(x^2+4)}' },
          { text: 'Cancelar factores idénticos', math: '\\text{Se cancelan: } (x-3), \\, (x+3), \\, (x+2) \\text{ y } (x^2+4)' },
          { text: 'Resultado irreducible', math: '2x(x - 2) = 2x^2 - 4x' }
        ],
        finalAnswer: '2x(x - 2)'
      }
    }
  ]
};
