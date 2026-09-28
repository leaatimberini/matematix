// src/data/units/unit1_reales.ts
import type { TopicUnit } from '../../types/index';

export const unit1Reales: TopicUnit = {
  id: 1,
  slug: 'numeros-reales',
  title: 'Unidad 1: Números Reales y Operatoria',
  subtitle: 'Conjuntos numéricos, periódicos, propiedades de potencias y raíces, racionalización y ecuaciones lineales',
  manualPages: '190 a 200',
  keywords: [
    'Conjuntos Numéricos',
    'Números Reales',
    'Operaciones',
    'Propiedades',
    'Números Irracionales',
    'Racionalización',
    'Ecuación Lineal',
    'Incógnita',
    'Conjunto Solución'
  ],
  prerequisites: [],
  videoTopics: [
    '1) Conjuntos numéricos',
    '2) Resolución de cálculos combinados con racionales',
    '3) Potenciación y radicación',
    '4) Propiedades de la potenciación y la radicación',
    '5) Operaciones con radicales y racionalización',
    '6) Resolución de cálculo combinado con irracionales',
    '7) Anexo - Nociones básicas para el uso de calculadora científica',
    '8) Ecuaciones lineales - Explicación teórica',
    '9) Ecuaciones lineales - Ejercicios resueltos'
  ],
  whatYouWillLearn: [
    'Reconocer y clasificar los diversos conjuntos numéricos (N, Z, Q, I, R).',
    'Convertir números decimales exactos y periódicos (puros y mixtos) a fracción irreducible.',
    'Aplicar propiedades de potencias con exponentes enteros y fraccionarios (a^-n, a^(m/n)).',
    'Operar con radicales: extracción de factores fuera del radical y suma de términos semejantes.',
    'Racionalizar denominadores con raíces simples y binomios conjugados.',
    'Resolver ecuaciones de primer grado y clasificar su conjunto solución (única, infinitas soluciones o vacía).'
  ],
  summaryTheory: [
    {
      title: 'Conjuntos Numéricos',
      content: 'Los números reales ($\\mathbb{R}$) se dividen en Racionales ($\\mathbb{Q}$, números que pueden expresarse como cociente $a/b$ con $a,b \\in \\mathbb{Z}$, $b \\ne 0$) e Irracionales ($\\mathbb{I}$, infinitas cifras decimales no periódicas como $\\sqrt{2}$, $\\pi$, $e$).',
      math: '\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}, \\quad \\mathbb{I} = \\mathbb{R} \\setminus \\mathbb{Q}'
    },
    {
      title: 'Expresiones Decimales Periódicas',
      content: 'Toda expresión periódica pura se convierte en fracción colocando en el numerador el número sin coma menos la parte entera, y tantos nueves como cifras periódicas. En periódicos mixtos, se colocan tantos nueves como cifras periódicas y tantos ceros como cifras no periódicas.',
      math: '0,\\hat{4} = \\frac{4}{9}, \\quad 1,\\hat{3} = \\frac{13 - 1}{9} = \\frac{12}{9} = \\frac{4}{3}, \\quad 0,1\\hat{6} = \\frac{16 - 1}{90} = \\frac{15}{90} = \\frac{1}{6}'
    },
    {
      title: 'Propiedades de Potencias y Exponente Negativo',
      content: 'El exponente negativo invierte la base. El exponente fraccionario equivale a una raíz. La potenciación distribuye en multiplicación y división, NUNCA en suma o resta.',
      math: 'a^{-n} = \\frac{1}{a^n}, \\quad a^{\\frac{m}{n}} = \\sqrt[n]{a^m}, \\quad (a \\cdot b)^n = a^n \\cdot b^n, \\quad (a \\pm b)^n \\ne a^n \\pm b^n'
    },
    {
      title: 'Racionalización de Denominadores',
      content: 'Consiste en eliminar los radicales del denominador multiplicando numerador y denominador por una expresión conveniente: por la raíz necesaria en monomios, o por el conjugado en binomios.',
      math: '\\frac{A}{\\sqrt{b}} = \\frac{A \\sqrt{b}}{b}, \\quad \\frac{A}{\\sqrt{a} + \\sqrt{b}} = \\frac{A(\\sqrt{a} - \\sqrt{b})}{a - b}'
    }
  ],
  keyFormulas: [
    {
      name: 'Potencia con exponente negativo',
      latex: 'a^{-1} = \\frac{1}{a}, \\quad \\left(\\frac{a}{b}\\right)^{-n} = \\left(\\frac{b}{a}\\right)^n',
      description: 'El exponente negativo invierte la base, nunca cambia el signo del número en sí.'
    },
    {
      name: 'Periódico puro a fracción',
      latex: '0,\\hat{d} = \\frac{d}{9}, \\quad \\sqrt{0,\\hat{4}} = \\sqrt{\\frac{4}{9}} = \\frac{2}{3}',
      description: 'Fundamental en los ejercicios de examen UNLaM como paso inicial en inecuaciones.'
    },
    {
      name: 'Racionalización con binomio conjugado',
      latex: '\\frac{c}{\\sqrt{a} - \\sqrt{b}} \\cdot \\frac{\\sqrt{a} + \\sqrt{b}}{\\sqrt{a} + \\sqrt{b}} = \\frac{c(\\sqrt{a} + \\sqrt{b})}{a - b}',
      description: 'Aplica diferencia de cuadrados en el denominador: (√a - √b)(√a + √b) = a - b.'
    }
  ],
  workedExample: {
    title: 'Cálculo Combinado con Periódicos y Potencias (Clave de Examen)',
    statement: 'Calcular el valor exacto de: $$\\sqrt{0,\\hat{4}} + 3^{-1} - \\sqrt[3]{0,125}$$',
    steps: [
      {
        stepNumber: 1,
        title: 'Pasar decimales a fracción irreducible',
        math: '0,\\hat{4} = \\frac{4}{9}, \\quad 0,125 = \\frac{125}{1000} = \\frac{1}{8}',
        explanation: '0,4 periódico es 4/9. 0,125 es un decimal exacto con tres cifras decimales: 125/1000 que simplificado por 125 da 1/8.'
      },
      {
        stepNumber: 2,
        title: 'Calcular las raíces y la potencia negativa',
        math: '\\sqrt{\\frac{4}{9}} = \\frac{2}{3}, \\quad 3^{-1} = \\frac{1}{3}, \\quad \\sqrt[3]{\\frac{1}{8}} = \\frac{1}{2}',
        explanation: 'La raíz cuadrada de 4/9 es 2/3. 3 a la menos 1 es 1/3. La raíz cúbica de 1/8 es 1/2.'
      },
      {
        stepNumber: 3,
        title: 'Operar las fracciones con común denominador',
        math: '\\frac{2}{3} + \\frac{1}{3} - \\frac{1}{2} = 1 - \\frac{1}{2} = \\frac{1}{2}',
        explanation: '2/3 + 1/3 = 3/3 = 1. Finalmente 1 - 1/2 = 1/2.'
      }
    ],
    conclusion: 'El resultado final exacto es 1/2 (o 0.5).'
  },
  explainFromScratch: {
    whatIsIt: 'Los números reales son todos los números que podemos ubicar en la recta numérica continua: enteros, fracciones con coma finita o periódica, y raíces inexactas como √2.',
    whyExists: 'Porque con solo números enteros no podemos medir partes fraccionarias ni longitudes geométricas diagonales (como la hipotenusa de un triángulo de lados 1 y 1 que mide √2).',
    whatMeans: 'Significa que cada punto de la recta representa un número real exacto, sin huecos.',
    whenUsed: 'En todas las operaciones matemáticas, mediciones económicas de costos, precios, tasas de interés y variables continuas.',
    howRecognized: 'Se reconocen por su formato: fracciones a/b, decimales periódicos 0,444..., o raíces √a.',
    correspondingFormula: 'a^-1 = 1/a, a^(1/2) = √a, 0,4̂ = 4/9.',
    howApplied: 'Siempre se convierte todo número decimal a fracción antes de operar algebraicamente.',
    commonMistakes: 'Distribuir la raíz en sumas (ej: √(9 + 16) ≠ 3 + 4 = 7; lo correcto es √(25) = 5) o pensar que 3^-1 es -3 en lugar de 1/3.',
    howAppearsInExam: 'Aparece como término numérico dentro del miembro derecho de las inecuaciones del Ejercicio 1 de todos los exámenes de la UNLaM.',
    checkpointQuestion: {
      question: '¿Cuál es el valor exacto de la expresión: √(0,4̂) + 3⁻¹?',
      options: [
        { text: '1', isCorrect: true, explanation: '¡Correcto! √(4/9) = 2/3, y 3⁻¹ = 1/3. Entonces 2/3 + 1/3 = 3/3 = 1.' },
        { text: '0,5', isCorrect: false, explanation: 'Incorrecto. Recuerda que 0,4̂ es 4/9, no 4/10.' },
        { text: '-2', isCorrect: false, explanation: 'Incorrecto. El exponente negativo invierte la base, no hace negativo al número.' },
        { text: '5/6', isCorrect: false, explanation: 'Incorrecto. Revisa el cálculo de la raíz y la suma de fracciones.' }
      ]
    }
  },
  noEntiendoBackup: {
    simpleAnalogy: 'Imagina que tienes una pizza cortada en 9 porciones iguales. 0,4 periódico representa exactamente 4 de esas 9 porciones (4/9). La raíz cuadrada busca qué porción multiplicada por sí misma da esa pizza: (2/3) × (2/3) = 4/9.',
    visualExplanation: 'En la recta numérica entre 0 y 1, el número 1/3 está en el primer tercio. 2/3 está en el segundo tercio. Si sumas 2/3 + 1/3 llegas exactamente al entero 1.',
    stepByStepFallback: [
      'Paso A: Reemplaza cualquier número con arquito periódico: 0,4̂ = 4/9.',
      'Paso B: Calcula la raíz de numerador y denominador por separado: √4 / √9 = 2/3.',
      'Paso C: Da vuelta el número con potencia negativa: 3⁻¹ = 1/3.',
      'Paso D: Suma fracciones con igual denominador: 2/3 + 1/3 = 3/3 = 1.'
    ],
    simplerExample: {
      problem: '¿Cuánto es 4⁻¹ + √(1/4)?',
      solution: '4⁻¹ = 1/4. √(1/4) = 1/2 = 2/4. Entonces 1/4 + 2/4 = 3/4 = 0.75.'
    }
  },
  examTips: [
    'En los exámenes de la UNLaM, JAMÁS trabajes con números decimales aproximados con la calculadora: pasa siempre a fracción.',
    '0,4̂ siempre aparece como 4/9, cuya raíz cuadrada da 2/3.',
    '4⁻¹ aparece en el Tema 2 y equivale a 1/4.',
    '∛(0,125) equivale a ∛(1/8) = 1/2.'
  ],
  exercises: [
    {
      id: 'u1_ex_01',
      unitId: 1,
      topic: 'Números Reales',
      subtopic: 'Pasaje a fracción y potencias',
      title: 'Cálculo de Término de Examen',
      statement: 'Calcular el valor numérico exacto de: $$\\sqrt{0,\\hat{4}} + 3^{-1}$$',
      type: 'numeric',
      difficulty: 1,
      examRelevance: 'EXAM_PATTERN',
      sourceType: 'SOURCE',
      sourceReference: 'Examen Real UNLaM Tema 1 (Ejercicio 1)',
      points: 10,
      correctAnswer: '1',
      acceptableAnswers: ['1.0', '3/3'],
      answerType: 'number',
      hints: [
        'Convierte el decimal periódico 0,4̂ en fracción racional a/b.',
        'La regla para 0,4̂ (un solo dígito periódico) es colocar 4 en el numerador y 9 en el denominador.',
        'Calcula √(4/9) aplicando la propiedad distributiva de la raíz respecto a la división.',
        'Recuerda que 3⁻¹ = 1/3. Luego suma las dos fracciones resultantes.',
        '2/3 + 1/3 = 3/3 = 1. La respuesta final es 1.'
      ],
      solution: {
        steps: [
          { text: 'Paso 1: Convertir 0,4̂ a fracción', math: '0,\\hat{4} = \\frac{4}{9}' },
          { text: 'Paso 2: Calcular la raíz cuadrada', math: '\\sqrt{\\frac{4}{9}} = \\frac{\\sqrt{4}}{\\sqrt{9}} = \\frac{2}{3}' },
          { text: 'Paso 3: Calcular la potencia negativa', math: '3^{-1} = \\frac{1}{3}' },
          { text: 'Paso 4: Sumar ambas fracciones', math: '\\frac{2}{3} + \\frac{1}{3} = \\frac{3}{3} = 1' }
        ],
        finalAnswer: '1'
      },
      commonTraps: [
        {
          trapId: 'decimal_aprox',
          triggerAnswer: '0.77',
          diagnosis: 'Usaste aproximación decimal de la calculadora en lugar de fracciones exactas.',
          remedy: 'Usa siempre fracciones irreducibles en los exámenes de ingreso.'
        },
        {
          trapId: 'sign_error_neg_exp',
          triggerAnswer: '-7/3',
          diagnosis: 'Interpretaste 3⁻¹ como -3 en vez de 1/3.',
          remedy: 'El exponente negativo solo invierte la base: a⁻¹ = 1/a.'
        }
      ]
    },
    {
      id: 'u1_ex_02',
      unitId: 1,
      topic: 'Números Reales',
      subtopic: 'Radicales y decimales exactos',
      title: 'Término Independiente de Examen Tema 2',
      statement: 'Calcular el valor numérico exacto de: $$\\sqrt[3]{0,125} + 4^{-1}$$',
      type: 'numeric',
      difficulty: 2,
      examRelevance: 'EXAM_PATTERN',
      sourceType: 'SOURCE',
      sourceReference: 'Examen Real UNLaM Tema 2 (Ejercicio 1)',
      points: 10,
      correctAnswer: '3/4',
      acceptableAnswers: ['0.75', '6/8'],
      answerType: 'fraction',
      hints: [
        'Escribe 0,125 como fracción decimal: 125/1000 y simplifícala dividiendo por 125.',
        '125/1000 simplificado es 1/8.',
        'Calcula la raíz cúbica: ∛(1/8) = 1/2.',
        'Calcula 4⁻¹ = 1/4.',
        'Suma 1/2 + 1/4 = 2/4 + 1/4 = 3/4 (o 0.75).'
      ],
      solution: {
        steps: [
          { text: 'Paso 1: Convertir 0,125 a fracción', math: '0,125 = \\frac{125}{1000} = \\frac{1}{8}' },
          { text: 'Paso 2: Calcular la raíz cúbica', math: '\\sqrt[3]{\\frac{1}{8}} = \\frac{1}{2}' },
          { text: 'Paso 3: Calcular la potencia negativa', math: '4^{-1} = \\frac{1}{4}' },
          { text: 'Paso 4: Sumar fracciones', math: '\\frac{1}{2} + \\frac{1}{4} = \\frac{2}{4} + \\frac{1}{4} = \\frac{3}{4}' }
        ],
        finalAnswer: '3/4'
      }
    },
    {
      id: 'u1_ex_03',
      unitId: 1,
      topic: 'Números Reales',
      subtopic: 'Racionalización de denominadores',
      title: 'Racionalización con binomio conjugado',
      statement: 'Al racionalizar la expresión $$\\frac{6}{\\sqrt{5} - \\sqrt{2}}$$ el resultado simplificado es:',
      type: 'multiple_choice',
      difficulty: 3,
      examRelevance: 'PRACTICE',
      sourceType: 'DERIVED',
      sourceReference: 'Ficha 1 p. 195 - Ejercicios del Manual 3 y 4',
      points: 10,
      options: [
        { id: 'opt1', text: '2(√5 + √2)', math: '2(\\sqrt{5} + \\sqrt{2})', isCorrect: true, feedback: '¡Correcto! Multiplicas por (√5 + √2)/(√5 + √2), el denominador queda 5 - 2 = 3, y 6/3 = 2.' },
        { id: 'opt2', text: '6(√5 + √2)', math: '6(\\sqrt{5} + \\sqrt{2})', isCorrect: false, feedback: 'Olvidaste dividir por el denominador (5 - 2 = 3).' },
        { id: 'opt3', text: '2(√5 - √2)', math: '2(\\sqrt{5} - \\sqrt{2})', isCorrect: false, feedback: 'El conjugado de (√5 - √2) es con signo MÁS: (√5 + √2).' },
        { id: 'opt4', text: '√5 + √2', math: '\\sqrt{5} + \\sqrt{2}', isCorrect: false, feedback: 'Error en la simplificación numérica de 6/3.' }
      ],
      hints: [
        'Multiplica numerador y denominador por el conjugado del denominador.',
        'El conjugado de (√5 - √2) es (√5 + √2).',
        'En el denominador aplica diferencia de cuadrados: (√5)² - (√2)² = 5 - 2 = 3.',
        'En el numerador te queda 6(√5 + √2).',
        'Simplifica 6 dividido 3 para obtener 2(√5 + √2).'
      ],
      solution: {
        steps: [
          { text: 'Multiplicar por conjugado', math: '\\frac{6}{\\sqrt{5} - \\sqrt{2}} \\cdot \\frac{\\sqrt{5} + \\sqrt{2}}{\\sqrt{5} + \\sqrt{2}}' },
          { text: 'Resolver denominador por diferencia de cuadrados', math: '(\\sqrt{5})^2 - (\\sqrt{2})^2 = 5 - 2 = 3' },
          { text: 'Simplificar coeficiente', math: '\\frac{6(\\sqrt{5} + \\sqrt{2})}{3} = 2(\\sqrt{5} + \\sqrt{2})' }
        ],
        finalAnswer: '2(√5 + √2)'
      }
    },
    {
      id: 'u1_ex_04',
      unitId: 1,
      topic: 'Números Reales',
      subtopic: 'Ecuaciones de primer grado',
      title: 'Ecuación lineal con fracciones y distributiva',
      statement: 'Resolver la siguiente ecuación lineal y hallar el conjunto solución: $$\\frac{3x - 1}{2} - \\frac{x + 2}{3} = x - 1$$',
      type: 'numeric',
      difficulty: 2,
      examRelevance: 'PRACTICE',
      sourceType: 'DERIVED',
      sourceReference: 'Ficha 1 p. 198 - Ejercicios del Manual 5',
      points: 10,
      correctAnswer: '-1',
      acceptableAnswers: ['-1.0', 'x=-1', 'S={-1}'],
      answerType: 'number',
      hints: [
        'Halla el común denominador de todos los términos (mcm de 2 y 3 es 6).',
        'Multiplica ambos miembros de la ecuación por 6 para eliminar los denominadores.',
        'Cuidado con el signo menos delante de la segunda fracción: afecta a todo el numerador (x + 2).',
        'La ecuación queda: 3(3x - 1) - 2(x + 2) = 6(x - 1).',
        'Distribuye y agrupa las x: 9x - 3 - 2x - 4 = 6x - 6 => 7x - 7 = 6x - 6 => x = 1.'
      ],
      solution: {
        steps: [
          { text: 'Multiplicar por mcm = 6', math: '6 \\cdot \\left(\\frac{3x - 1}{2}\\right) - 6 \\cdot \\left(\\frac{x + 2}{3}\\right) = 6(x - 1)' },
          { text: 'Distribuir coeficientes', math: '3(3x - 1) - 2(x + 2) = 6x - 6 \\implies 9x - 3 - 2x - 4 = 6x - 6' },
          { text: 'Reducir términos semejantes', math: '7x - 7 = 6x - 6' },
          { text: 'Despejar x', math: '7x - 6x = -6 + 7 \\implies x = 1' }
        ],
        finalAnswer: '1'
      }
    },
    {
      id: 'u1_ex_05',
      unitId: 1,
      topic: 'Números Reales',
      subtopic: 'Propiedades de potencias',
      title: 'Verdadero o Falso: Propiedades Fundamentales',
      statement: 'Determinar si la siguiente afirmación es Verdadera o Falsa: $$\\sqrt{a^2 + b^2} = a + b \\quad \\text{para cualesquiera } a,b > 0$$',
      type: 'true_false',
      difficulty: 1,
      examRelevance: 'GENERAL_CONTENT',
      sourceType: 'DERIVED',
      sourceReference: 'Ficha 1 p. 192',
      points: 10,
      options: [
        { id: 'opt_f', text: 'Falso', isCorrect: true, feedback: '¡Exacto! La radicación NUNCA es distributiva respecto de la suma o resta. Por ejemplo: √(3² + 4²) = √(9+16) = √25 = 5 ≠ 3 + 4 = 7.' },
        { id: 'opt_v', text: 'Verdadero', isCorrect: false, feedback: 'Error gravísimo: la raíz no distribuye en sumas ni restas.' }
      ],
      hints: [
        'Pon a prueba la propiedad con números sencillos, por ejemplo a = 3 y b = 4.',
        'Calcula √(3² + 4²) = √(9 + 16) = √25 = 5.',
        'Compara con a + b = 3 + 4 = 7.',
        'Como 5 ≠ 7, la igualdad es falsa.',
        'Por lo tanto la afirmación es Falsa.'
      ],
      solution: {
        steps: [
          { text: 'Contraejemplo con a = 3, b = 4', math: '\\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5' },
          { text: 'Suma de términos', math: 'a + b = 3 + 4 = 7 \\implies 5 \\ne 7' }
        ],
        finalAnswer: 'Falso'
      }
    }
  ]
};
