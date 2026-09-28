// src/data/units/unit3_polinomios.ts
import type { TopicUnit } from '../../types/index';

export const unit3Polinomios: TopicUnit = {
  id: 3,
  slug: 'polinomios',
  title: 'Unidad 3: Polinomios y Operaciones',
  subtitle: 'Suma, resta, producto, Regla de Ruffini, Teorema del Resto y problemas con parámetro k',
  manualPages: '208 a 215',
  keywords: [
    'Polinomios',
    'Monomios',
    'Grado',
    'Coeficiente Principal',
    'Regla de Ruffini',
    'Teorema del Resto',
    'Divisibilidad',
    'Parámetro k'
  ],
  prerequisites: [1],
  videoTopics: [
    '1) Polinomios - Operaciones - Teoría',
    '2) Polinomios - Operaciones Práctica',
    '3) Regla de Ruffini',
    '4) Teorema del resto',
    '5) Teorema del resto - Divisibilidad',
    '6) Teorema del resto - Regla de Ruffini - Ejercicio con parámetro "k"'
  ],
  whatYouWillLearn: [
    'Operar con monomios y polinomios: sumar, restar y multiplicar ordenando por potencias decrecientes.',
    'Aplicar correctamente la Regla de Ruffini completando los términos faltantes con coeficientes cero.',
    'Aplicar e interpretar el Teorema del Resto para calcular el resto de $P(x) : (x - a)$ mediante $P(a)$.',
    'Determinar si un polinomio es divisible por un binomio $(x - a)$ verificando si $P(a) = 0$.',
    'Plantear y resolver ecuaciones para hallar el valor de un parámetro $k$ que cumpla condiciones de divisibilidad.'
  ],
  summaryTheory: [
    {
      title: 'Estructura de un Polinomio',
      content: 'Un polinomio en una variable x es una suma algebraica de términos a_n x^n. El grado es el mayor exponente con coeficiente distinto de cero. El polinomio debe completarse con ceros y ordenarse en forma decreciente antes de aplicar algoritmos de división.',
      math: 'P(x) = a_n x^n + a_{n-1} x^{n-1} + \\dots + a_1 x + a_0, \\quad a_n \\ne 0'
    },
    {
      title: 'Regla de Ruffini',
      content: 'Es un método abreviado para dividir un polinomio P(x) por un binomio de la forma (x - a). En la esquina inferior izquierda se coloca el valor "a" (con signo cambiado respecto al binomio). Se baja el primer coeficiente, se multiplica por a y se suma a la siguiente columna.',
      math: 'P(x) : (x - a) \\implies \\text{Cociente } C(x), \\quad \\text{Resto numérico } R'
    },
    {
      title: 'Teorema del Resto y Divisibilidad',
      content: 'El resto de la división de un polinomio P(x) por un binomio (x - a) es igual al valor numérico del polinomio evaluado en x = a. Además, P(x) es divisible por (x - a) si y solo si el resto es cero (es decir, P(a) = 0).',
      math: 'R = P(a), \\qquad P(x) \\text{ es divisible por } (x - a) \\iff P(a) = 0'
    }
  ],
  keyFormulas: [
    {
      name: 'Teorema del Resto',
      latex: 'R = P(a) \\quad \\text{en la división } P(x) : (x - a)',
      description: 'Permite hallar el resto instantáneamente sin necesidad de realizar todo el cuadro de Ruffini.'
    },
    {
      name: 'Condición de divisibilidad con parámetro k',
      latex: 'P(a) = 0 \\implies \\text{Despejar el valor de } k',
      description: 'Clásico ejercicio de examen para evaluar comprensión conceptual del teorema.'
    }
  ],
  workedExample: {
    title: 'Ejercicio con Parámetro k de Cátedra UNLaM',
    statement: 'Hallar el valor de $k$ para que el polinomio $$P(x) = 2x^3 - kx^2 + 5x - 6$$ sea divisible por $(x - 2)$.',
    steps: [
      {
        stepNumber: 1,
        title: 'Aplicar condición de divisibilidad',
        math: 'P(x) \\text{ es divisible por } (x - 2) \\iff P(2) = 0',
        explanation: 'Por el Teorema del Resto, si la división es exacta, el resto evaluado en x = 2 debe ser nulo.'
      },
      {
        stepNumber: 2,
        title: 'Evaluar el polinomio en x = 2',
        math: 'P(2) = 2(2)^3 - k(2)^2 + 5(2) - 6 = 2(8) - 4k + 10 - 6 = 16 - 4k + 4 = 20 - 4k',
        explanation: 'Reemplazamos x por 2 en cada término y resolvemos las potencias y productos.'
      },
      {
        stepNumber: 3,
        title: 'Igualar a cero y despejar k',
        math: '20 - 4k = 0 \\iff 4k = 20 \\iff k = \\frac{20}{4} = 5',
        explanation: 'Despejamos la incógnita k mediante una ecuación lineal simple.'
      }
    ],
    conclusion: 'El valor requerido es k = 5.'
  },
  explainFromScratch: {
    whatIsIt: 'Un polinomio es una combinación de sumas y restas de potencias enteras positivas de una variable x, como 3x² - 5x + 2.',
    whyExists: 'Porque son las funciones algebraicas más dóciles y fundamentales para modelar curvas, ingresos, costos y raíces de ecuaciones.',
    whatMeans: 'Dividir por (x - a) y que el resto sea cero significa que "a" es una raíz exacta del polinomio, lo cual permite factorizarlo.',
    whenUsed: 'En el cálculo de raíces, factorización y simplificación de expresiones algebraicas complejas.',
    howRecognized: 'Por las potencias de x: grado 1 (lineal), grado 2 (cuadrático), grado 3 (cúbico), etc.',
    correspondingFormula: 'Resto = P(a). En Ruffini, si divides por (x - 3), en la casilla pones 3. Si divides por (x + 2), en la casilla pones -2.',
    howApplied: 'Para calcular el resto rápidamente, nunca hagas la división larga: evalúa P(a).',
    commonMistakes: 'Olvidar completar con coeficientes 0 en términos que no están (ej: en x³ - 4 faltan x² y x, debe ser 1, 0, 0, -4).',
    howAppearsInExam: 'Aparece como preguntas teóricas de divisibilidad con parámetro k o como paso previo indispensable para el factoreo del Ejercicio 4.',
    checkpointQuestion: {
      question: 'Si dividimos P(x) = x³ - 2x + 7 por (x + 1), ¿cuál es el resto de la división?',
      options: [
        { text: '8', isCorrect: true, explanation: '¡Correcto! Por el Teorema del Resto, R = P(-1) = (-1)³ - 2(-1) + 7 = -1 + 2 + 7 = 8.' },
        { text: '6', isCorrect: false, explanation: 'Incorrecto. Recuerda que (-1)³ = -1 y -2(-1) = +2.' },
        { text: '-10', isCorrect: false, explanation: 'Incorrecto. Revisa los signos al evaluar en x = -1.' }
      ]
    }
  },
  noEntiendoBackup: {
    simpleAnalogy: 'El Teorema del Resto es como un atajo mágico. En vez de hacer una división de 10 minutos con columnas y cuentas, simplemente enchufas el número en la x y te dice exactamente el resto en 5 segundos.',
    visualExplanation: 'Imagina una máquina: entra x = -1, la máquina calcula (-1)³ - 2(-1) + 7, y sale por la pantalla el número 8.',
    stepByStepFallback: [
      'Paso 1: Mira el binomio divisor: si es (x - 2), tu número clave es a = 2. Si es (x + 2), tu número clave es a = -2 (signo opuesto).',
      'Paso 2: Reemplaza cada x del polinomio por ese número clave entre paréntesis.',
      'Paso 3: Resuelve primero las potencias, luego las multiplicaciones y al final las sumas.',
      'Paso 4: El número final es el resto.'
    ],
    simplerExample: {
      problem: '¿Es P(x) = x² - 9 divisible por (x - 3)?',
      solution: 'Evaluamos P(3) = 3² - 9 = 9 - 9 = 0. Como el resto es 0, SÍ es divisible.'
    }
  },
  examTips: [
    'En ejercicios con parámetro k, plantea siempre P(a) = 0 y despeja k.',
    'Cuidado con potencias de base negativa: (-2)³ = -8 (impar mantiene signo menos) y (-2)² = +4 (par queda positivo).'
  ],
  exercises: [
    {
      id: 'u3_ex_01',
      unitId: 3,
      topic: 'Polinomios',
      subtopic: 'Teorema del Resto y Parámetro k',
      title: 'Cálculo de parámetro k para divisibilidad',
      statement: 'Determinar el valor de $k$ para que el polinomio $$P(x) = 2x^3 - kx^2 + 5x - 6$$ sea divisible por $(x - 2)$.',
      type: 'numeric',
      difficulty: 2,
      examRelevance: 'EXAM_PATTERN',
      sourceType: 'SOURCE',
      sourceReference: 'Ficha 3 p. 212 - Ejercicio Modelo Cátedra',
      points: 10,
      correctAnswer: '5',
      acceptableAnswers: ['5.0', 'k=5'],
      answerType: 'number',
      hints: [
        'Aplica el Teorema del Resto: P(x) es divisible por (x - 2) si y solo si P(2) = 0.',
        'Sustituye x por 2 en P(x): 2(2)³ - k(2)² + 5(2) - 6.',
        'Calcula las potencias: 2³ = 8 y 2² = 4.',
        'Queda: 2(8) - 4k + 10 - 6 = 16 - 4k + 4 = 20 - 4k.',
        'Iguala a cero: 20 - 4k = 0 => 4k = 20 => k = 5.'
      ],
      solution: {
        steps: [
          { text: 'Condición de divisibilidad', math: 'P(2) = 0' },
          { text: 'Evaluar en x = 2', math: 'P(2) = 2(2)^3 - k(2)^2 + 5(2) - 6 = 16 - 4k + 10 - 6 = 20 - 4k' },
          { text: 'Despejar k', math: '20 - 4k = 0 \\iff 4k = 20 \\iff k = 5' }
        ],
        finalAnswer: '5'
      }
    },
    {
      id: 'u3_ex_02',
      unitId: 3,
      topic: 'Polinomios',
      subtopic: 'Regla de Ruffini',
      title: 'Cociente por Ruffini completando con ceros',
      statement: 'Al dividir $P(x) = x^3 - 8$ por $(x - 2)$ aplicando la Regla de Ruffini, ¿cuál es el cociente $C(x)$ obtenido?',
      type: 'multiple_choice',
      difficulty: 2,
      examRelevance: 'PRACTICE',
      sourceType: 'DERIVED',
      sourceReference: 'Ficha 3 p. 210 - Ejercicios del Manual 18 y 19',
      points: 10,
      options: [
        { id: 'opt1', text: 'x² + 2x + 4', math: 'x^2 + 2x + 4', isCorrect: true, feedback: '¡Correcto! Coeficientes completos: 1, 0, 0, -8. Al aplicar Ruffini con 2 da cociente 1, 2, 4 y resto 0.' },
        { id: 'opt2', text: 'x² - 4', math: 'x^2 - 4', isCorrect: false, feedback: 'Olvidaste completar los términos de grado 2 y grado 1 con ceros.' },
        { id: 'opt3', text: 'x² - 2x + 4', math: 'x^2 - 2x + 4', isCorrect: false, feedback: 'Error de signos en la suma de columnas de Ruffini.' },
        { id: 'opt4', text: 'x² + 4', math: 'x^2 + 4', isCorrect: false, feedback: 'Incorrecto. Revisa el procedimiento completo de Ruffini.' }
      ],
      hints: [
        'Primero completa y ordena P(x): 1x³ + 0x² + 0x - 8.',
        'Arma la tabla de Ruffini con los coeficientes [1, 0, 0, -8] y el valor a = 2.',
        'Baja el 1. Multiplica 1 · 2 = 2. Suma 0 + 2 = 2.',
        'Multiplica 2 · 2 = 4. Suma 0 + 4 = 4.',
        'Multiplica 4 · 2 = 8. Suma -8 + 8 = 0 (resto). Los coeficientes del cociente son [1, 2, 4] => x² + 2x + 4.'
      ],
      solution: {
        steps: [
          { text: 'Completar polinomio', math: 'P(x) = x^3 + 0x^2 + 0x - 8' },
          { text: 'Aplicar Ruffini con a = 2', math: '\\text{Coeficientes resultantes: } 1, \\, 2, \\, 4, \\quad \\text{Resto: } 0' },
          { text: 'Escribir el cociente', math: 'C(x) = x^2 + 2x + 4' }
        ],
        finalAnswer: 'x² + 2x + 4'
      }
    }
  ]
};
