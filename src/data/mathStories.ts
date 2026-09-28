// src/data/mathStories.ts
// Narrativas pedagógicas, analogías de la vida real, el "por qué" y el "cómo" desde cero
// diseñadas para el curso de ingreso a Ciencias Económicas de la UNLaM.

export interface MathStory {
  unitId: number;
  title: string;
  storyTitle: string;
  narrative: string;
  realWorldAnalogy: string;
  theWhy: {
    question: string;
    answer: string;
  }[];
  theHowIntuitive: {
    step: number;
    title: string;
    description: string;
  }[];
  goldenRule: string;
  unlamTrapMap: {
    trapTitle: string;
    commonMistake: string;
    whyBrainFalls: string;
    howToAvoid: string;
  }[];
}

export const MATH_STORIES: Record<number, MathStory> = {
  1: {
    unitId: 1,
    title: 'Números Reales, Exponentes y Racionalización',
    storyTitle: 'La Aldea del Trueque y el Misterio de la Porción Invisible',
    narrative: `Imagina una aldea antigua donde la gente solo sabía contar ovejas o bolsas enteras: 1, 2, 3... Eran los Números Naturales (ℕ). Un día, un comerciante se quedó sin nada y pidió prestado: inventaron el cero y los negativos (ℤ) para anotar deudas.

Tiempo después, dos hermanos campesinos tuvieron que repartir una bolsa de trigo entre 3 familias iguales. No alcanzaba con enteros: nació la fracción 1/3 (los Números Racionales, ℚ). Pero la verdadera revolución ocurrió cuando un carpintero quiso medir la diagonal exacta de una mesa cuadrada de 1 metro de lado. Al aplicar Pitágoras, la diagonal medía √2. Intentó medirla con reglas cada vez más diminutas: 1,4... 1,41... 1,4142135... ¡y los decimales continuaban para siempre sin repetirse nunca! No entraba en ninguna fracción conocida. Habían descubierto los Números Irracionales (𝕀).

Juntos, racionales e irracionales forman los Números Reales (ℝ): una alfombra continua y perfecta sobre la recta numérica donde no queda ni un solo agujero sin nombre.`,
    realWorldAnalogy: 'Las fracciones son como porciones exactas de una pizza cortada en porciones idénticas. Si trabajas con números con coma en la calculadora (como 0,333), estás mordiendo la pizza y perdiendo migajas; la fracción (1/3) guarda la pizza entera con precisión quirúrgica.',
    theWhy: [
      {
        question: '¿Por qué un exponente negativo invierte la base (a⁻¹ = 1/a)?',
        answer: 'Porque multiplicar y dividir son operaciones opuestas. Si un exponente positivo significa "multiplicar por la base repetidas veces" (2³ = 1 · 2 · 2 · 2), el exponente cero no hace nada (2⁰ = 1), y el exponente negativo hace lo contrario: ¡divide por la base! (2⁻¹ = 1/2). El signo menos en el techo indica dirección de división, no que el número sea negativo.'
      },
      {
        question: '¿Por qué 0,4̂ periódico es 4/9 y no 4/10?',
        answer: 'Porque el arquito periódico significa que el 4 se repite hasta el infinito: 0,4444... Si lo multiplicas por 10 te queda 4,4444... Al restar el original (10x - x = 4,444... - 0,444...), los infinitos decimales se aniquilan entre sí y te queda 9x = 4, de donde x = 4/9. ¡El 9 es el exterminador de infinitos!'
      },
      {
        question: '¿Por qué se racionalizan los denominadores?',
        answer: 'Antes de las computadoras, dividir 6 por 1,41421356... a mano a lápiz tomaba horas. Al multiplicar arriba y abajo por √2, la expresión se transformaba en (6√2)/2 = 3√2. Multiplicar 3 por 1,4142 es un juego de niños comparado con dividir por un número irracional infinito.'
      }
    ],
    theHowIntuitive: [
      {
        step: 1,
        title: 'Pasar todo a fracción de entrada',
        description: 'Apenas veas un decimal exacto o periódico (como 0,4̂ o 0,125), convertilo de inmediato a fracción irreducible (4/9 o 1/8). Prohibido operar con comas aproximadas.'
      },
      {
        step: 2,
        title: 'Resolver las potencias y raíces por separado',
        description: 'Recordá que la raíz se distribuye en el numerador y en el denominador: √(4/9) = √4 / √9 = 2/3.'
      },
      {
        step: 3,
        title: 'Buscar común denominador',
        description: 'Nunca sumes numeradores y denominadores derecho. Encontrá el múltiplo común y ajustá las porciones antes de juntar.'
      }
    ],
    goldenRule: 'La calculadora redondea y corta decimales; el examen de la UNLaM exige exactitud analítica absoluta: tu escudo protector es la fracción irreducible.',
    unlamTrapMap: [
      {
        trapTitle: 'Distribuir la raíz en la suma: √(a² + b²) = a + b',
        commonMistake: 'Escribir que √(9 + 16) = √9 + √16 = 3 + 4 = 7.',
        whyBrainFalls: 'El cerebro adora la simetría y recuerda que en la multiplicación sí se distribuye: √(a · b) = √a · √b.',
        howToAvoid: 'Hacé la prueba con números chicos: 9 + 16 = 25, y √25 = 5 (¡no 7!). La raíz y la potencia NUNCA se distribuyen sobre sumas ni restas.'
      },
      {
        trapTitle: 'Confundir 3⁻¹ con -3',
        commonMistake: 'Creer que el signo menos del exponente convierte al resultado en negativo.',
        whyBrainFalls: 'Vemos el signo menos y nuestro cerebro asocia automáticamente "deuda o número negativo".',
        howToAvoid: 'Pensá que el menos en el exponente es una flecha que dice "¡date vuelta!". 3/1 se transforma en 1/3. El signo del número sigue siendo positivo.'
      }
    ]
  },
  2: {
    unitId: 2,
    title: 'Intervalos, Inecuaciones y Módulo',
    storyTitle: 'El Radar de la Autopista y la Zona Segura',
    narrative: `En una autopista no te exigen que manejes a exactamente 80,000 km/h: te permiten una franja de velocidades razonables, por ejemplo entre 60 km/h y 120 km/h. Si vas a 95 km/h estás seguro; si vas a 50 km/h o a 130 km/h te multan.

Eso es un Intervalo Matemático: no es un punto solitario en el vacío, es una región continua de posibilidades. Una ecuación te dice "el culpable es exactamente Juan". Una inecuación te dice "los sospechosos tienen entre 20 y 35 años". En economía y en la vida real casi nunca trabajamos con certezas fijas, sino con rangos de tolerancia, presupuestos máximos y costos mínimos.

Y el Módulo o Valor Absoluto no es una regla caprichosa: es un velocímetro y una cinta métrica. Al velocímetro no le importa si vas marcha atrás o hacia adelante: mide tu rapidez sin el signo. El módulo mide la distancia entre dos puntos.`,
    realWorldAnalogy: 'Imagina que tienes una cuerda de 10 metros atada a un poste. Puedes moverte en cualquier dirección siempre que no te alejes más de 10 metros del poste. Esa zona circular de seguridad es el módulo: |x - poste| ≤ 10.',
    theWhy: [
      {
        question: '¿Por qué al multiplicar o dividir por un número negativo se da vuelta la desigualdad?',
        answer: 'Porque en la recta numérica los números negativos están en espejo. Si 5 es mayor que 2 (5 > 2), pero debes $5 estás en peor situación económica que quien debe $2: por ende, -5 < -2. Al cambiar el signo de toda una relación, lo que estaba a la derecha pasa a estar más a la izquierda: la desigualdad debe girar obligatoriamente.'
      },
      {
        question: '¿Por qué no se puede pasar multiplicando un denominador con x al otro lado?',
        answer: 'Porque no conoces el signo de x. Si lo que pasas multiplicando es positivo, la desigualdad se mantiene; pero si es negativo, se da vuelta. Como una x puede ser positiva o negativa según el caso, pasarla multiplicando es jugar a la ruleta rusa. Por eso se pasa restando, se busca común denominador y se hace la Tabla de Signos.'
      },
      {
        question: '¿Qué diferencia hay entre corchete [ ] y paréntesis ( )?',
        answer: 'El corchete significa que el límite está INCLUIDO en la fiesta (≤ o ≥). El paréntesis significa que es un límite estricto pero el número en sí queda AFUERA (< o >, en los infinitos ±∞, o en valores que anulan denominadores porque la división por cero está prohibida en el universo).'
      }
    ],
    theHowIntuitive: [
      {
        step: 1,
        title: 'Llevar todo a un miembro y dejar CERO del otro',
        description: 'Pasá todos los términos a la izquierda para que a la derecha te quede 0. Jamás multipliques cruzado con variables en el denominador.'
      },
      {
        step: 2,
        title: 'Buscar común denominador',
        description: 'Juntá las fracciones en una sola expresión racional N(x) / D(x) ≤ 0 o ≥ 0.'
      },
      {
        step: 3,
        title: 'Armar la Tabla de Signos (Regla de Bolzano)',
        description: 'Marcá las raíces del numerador y los valores prohibidos del denominador en la recta, dividí en intervalos y probá con un número testigo en cada zona.'
      }
    ],
    goldenRule: 'Denominador que anula, paréntesis que clausura: los valores que hacen cero el divisor NUNCA llevan corchete porque dividir por cero es imposible.',
    unlamTrapMap: [
      {
        trapTitle: 'Pasar (x + 1) multiplicando al otro lado',
        commonMistake: 'Si tenés (x - 3)/(x + 1) ≤ 0, escribir (x - 3) ≤ 0 · (x + 1) = 0.',
        whyBrainFalls: 'Estamos acostumbrados a despejar en las ecuaciones lineales de secundaria donde pasar multiplicando es legal.',
        howToAvoid: 'Grabate este mantra: en inecuaciones fraccionarias JAMÁS se pasa la x multiplicando. Se junta todo y se analiza el signo del cociente.'
      },
      {
        trapTitle: 'Poner corchete en el valor que anula el denominador',
        commonMistake: 'En (4 - x)/(x + 2) ≥ 0, poner el conjunto solución como [-2, 4].',
        whyBrainFalls: 'Como la inecuación tiene un "≥" (mayor o igual), el alumno cree que todos los extremos llevan corchete.',
        howToAvoid: 'El -2 hace cero el denominador (4 - (-2))/(-2 + 2) = 6/0 (¡indefinido!). Por eso el -2 lleva paréntesis: (-2, 4].'
      }
    ]
  },
  3: {
    unitId: 3,
    title: 'Polinomios y Regla de Ruffini',
    storyTitle: 'La Receta del Chef y la Llave Maestra de la Caja Fuerte',
    narrative: `Un polinomio es como la receta de un gran chef: P(x) = 2x³ - 5x² + 3x - 6. La "x" es el número de comensales que van a venir a cenar; los coeficientes (2, -5, 3, -6) son los gramos de harina, azúcar, sal y chocolate.

Evaluar un polinomio en x = 2 significa meter 2 comensales en la máquina y ver cuánto da el plato final. Ahora bien: ¿qué pasa si encuentras un número mágico "a" tal que al meterlo en la receta el resultado final da exactamente CERO? (P(a) = 0).

¡Ese número mágico es una RAÍZ! Una raíz es la llave maestra de una caja fuerte: cuando la encuentras, puedes abrir el polinomio y dividirlo en partes más pequeñas sin que sobre ni una sola migaja de resto (Resto = 0). Y la Regla de Ruffini es el atajo más brillante jamás inventado para hacer esa división en 30 segundos sin escribir letras ni una sola vez.`,
    realWorldAnalogy: 'Dividir polinomios es como empaquetar galletitas en cajas. Si tienes 20 galletitas y cajas de 4, empacas 5 cajas exactas y te sobran 0 (Resto = 0). Si tienes 22, te sobran 2 galletitas. El Teorema del Resto te dice cuántas galletitas sobran sin necesidad de abrir ningún paquete.',
    theWhy: [
      {
        question: '¿Por qué el Teorema del Resto dice que el resto de dividir por (x - a) es simplemente P(a)?',
        answer: 'Porque en cualquier división: Dividendo = Divisor · Cociente + Resto. En polinomios: P(x) = (x - a) · C(x) + R. Si reemplazas x por a: P(a) = (a - a) · C(a) + R = 0 · C(a) + R = R. ¡El cociente se multiplica por cero y desaparece, dejándote el Resto servido en bandeja!'
      },
      {
        question: '¿Por qué en la tabla de Ruffini se le cambia el signo al divisor?',
        answer: 'Si divides por (x - 2), la raíz que anula ese paréntesis es x = +2. Ruffini trabaja con la raíz directa, por eso en el rincón se coloca el valor que hace cero al divisor.'
      }
    ],
    theHowIntuitive: [
      {
        step: 1,
        title: 'Ordenar y Completar siempre',
        description: 'Escribí el polinomio desde la potencia más alta hasta el término independiente. Si falta alguna potencia intermedia (como x²), completala obligatoriamente con 0x².'
      },
      {
        step: 2,
        title: 'Bajar el primer coeficiente directo',
        description: 'El primer número cae sin cambios. Luego: multiplicar por el rincón, poner abajo del siguiente, sumar en columna y repetir.'
      },
      {
        step: 3,
        title: 'Interpretar el cociente',
        description: 'El resultado tiene un grado menos que el original: si arrancaste en grado 3, el cociente arranca en grado 2.'
      }
    ],
    goldenRule: 'Polinomio sin completar es ejercicio condenado a fallar: si falta un grado, poné un cero en Ruffini o todo el cálculo se desfasará.',
    unlamTrapMap: [
      {
        trapTitle: 'Olvidar completar con ceros antes de Ruffini',
        commonMistake: 'Al dividir P(x) = x³ - 8 por (x - 2), poner en la tabla solo los números [1, -8].',
        whyBrainFalls: 'Vemos solo dos términos en la hoja y los copiamos tal cual sin fijarnos en los huecos.',
        howToAvoid: 'Revisá la escalera de exponentes: 3, 2, 1, 0. Si falta el 2 y el 1, los coeficientes son [1, 0, 0, -8].'
      },
      {
        trapTitle: 'Poner el signo al revés en el rincón de Ruffini',
        commonMistake: 'Dividir por (x + 3) y poner +3 en vez de -3.',
        whyBrainFalls: 'Copiamos el signo que vemos escrito al lado de la x.',
        howToAvoid: 'Preguntate siempre: "¿Qué número hace que ese paréntesis valga 0?". Si x + 3 = 0, entonces x = -3.'
      }
    ]
  },
  4: {
    unitId: 4,
    title: 'Factoreo y Expresiones Algebraicas Racionales',
    storyTitle: 'El Taller de Desarmado de Motores y Piezas Lego',
    narrative: `Tener un polinomio en forma de suma: x² - 9, es como tener dos placas de metal soldadas con fuego: no puedes quitar una parte sin romper todo. Pero cuando lo factorizas como (x - 3)(x + 3), lo transformaste en piezas de encastre Lego.

¿Por qué los matemáticos y economistas aman las piezas Lego? Porque cuando tienes una fracción enorme llena de sumas y restas, no puedes simplificar nada (prohibido tachar en la suma). Pero cuando desarmas el numerador y el denominador en sus factores primos de Lego, ¡las piezas idénticas de arriba y de abajo se pueden cancelar limpiamente!

Factorizar no es memorizar 6 casos de memoria: es ser un detective de patrones que busca la forma más simple y desarmada de cualquier estructura algebraica.`,
    realWorldAnalogy: 'Imagina que tienes una fracción 60/84. Si la dejas así, es intimidante. Pero si factorizas 60 = 2 · 2 · 3 · 5 y 84 = 2 · 2 · 3 · 7, cancelas el 2, el otro 2 y el 3: te queda simplemente 5/7. Eso mismo hacemos con las x.',
    theWhy: [
      {
        question: '¿Por qué está terminantemente prohibido tachar términos en una suma (simplificar erróneamente)?',
        answer: 'Porque la división es la operación inversa de la multiplicación, no de la suma. Si tienes (4 + 2) / 2 = 6 / 2 = 3. Si tachas el 2 con el 2, te quedaría 4, ¡lo cual es una falsedad rotunda! Solo puedes cancelar factores que estén multiplicando a TODO el piso de arriba y a TODO el piso de abajo.'
      },
      {
        question: '¿Por qué (a + b)(a - b) da a² - b² (Diferencia de Cuadrados)?',
        answer: 'Al hacer distributiva: a · a - a · b + b · a - b · b = a² - ab + ba - b². Los dos términos del centro (-ab y +ba) son gemelos con signos opuestos: se aniquilan entre sí y solo sobreviven los extremos al cuadrado con una resta.'
      }
    ],
    theHowIntuitive: [
      {
        step: 1,
        title: 'Paso 0: Factor Común primero que nada',
        description: 'Antes de pensar en fórmulas raras, mirá si hay una letra o un número que se repita en todos los términos (ej: en 2x² - 8x, el 2x sale afuera: 2x(x - 4)).'
      },
      {
        step: 2,
        title: 'Contar cuántos términos quedan',
        description: 'Si quedan 2 términos con resta y potencias pares: Diferencia de Cuadrados. Si quedan 3 términos: Trinomio Cuadrado Perfecto o fórmula resolvente. Si quedan 4: Factor Común por Grupos.'
      },
      {
        step: 3,
        title: 'Verificar si se puede seguir factorizando',
        description: 'Nunca te detengas en la primera capa. Si te quedó un (x² - 9), ¡desarmalo en (x - 3)(x + 3)!'
      }
    ],
    goldenRule: 'Jamás taches nada que esté sumando o restando: primero convertí todo en multiplicaciones (factorizá) y recién ahí cancelá factores gemelos.',
    unlamTrapMap: [
      {
        trapTitle: 'Tachar la x en (x + 3) / x',
        commonMistake: 'Tachar la x de arriba con la de abajo y decir que el resultado es 3.',
        whyBrainFalls: 'El ojo ve una x arriba y una x abajo e instantáneamente siente ganas de eliminarlas.',
        howToAvoid: 'Acordate del contraejemplo de la pizza: (10 + 2) / 2 = 6. Si tachás el 2 te queda 10. ¡Prohibido!'
      },
      {
        trapTitle: 'Factoreo incompleto',
        commonMistake: 'En P(x) = x⁴ - 16, poner solo (x² - 4)(x² + 4) y dar por terminado el ejercicio.',
        whyBrainFalls: 'Hicimos un paso exitoso y nos relajamos pensando que ya terminamos.',
        howToAvoid: 'El examen de la UNLaM dice "aplicar TODOS los casos posibles". Si un factor todavía tiene x² y resta, ¡seguí desarmando! (x - 2)(x + 2)(x² + 4).'
      }
    ]
  },
  5: {
    unitId: 5,
    title: 'Funciones, Función Lineal y Rectas',
    storyTitle: 'El Taxímetro y la Rampa de la Montaña',
    narrative: `Te subes a un taxi en San Justo. Apenas el chofer aprieta el botón del reloj, la pantalla marca $800. Todavía no avanzaste ni un metro, pero ya debes $800: esa es la "Bajada de Bandera", el punto de partida, lo que en matemática llamamos la Ordenada al Origen (b).

El auto empieza a circular: por cada kilómetro recorrido, el taxímetro suma $300. Si recorres 1 km pagas 1100; si recorres 2 km pagas 1400. La cuenta de tu viaje es: y = 300x + 800.

Ese 300 es la Pendiente (m): la velocidad con la que sube la cuenta, la inclinación de la rampa. Si la pendiente es positiva, subes la montaña; si es negativa, vas bajando; si es cero, caminas por un piso totalmente horizontal. Todas las relaciones directas y constantes de la economía y la física se apoyan en esta bellísima línea recta.`,
    realWorldAnalogy: 'La pendiente es la inclinación de un techo o una escalera. Si sube 2 metros por cada 1 metro de avance horizontal, m = 2/1 = 2. Si dos techos tienen la misma inclinación (m₁ = m₂), son paralelos y nunca se tocan.',
    theWhy: [
      {
        question: '¿Por qué dos rectas perpendiculares tienen pendientes opuestas e inversas (m₂ = -1/m₁)?',
        answer: 'Porque para cruzarse en un ángulo recto perfecto de 90°, una recta debe cambiar completamente de sentido (si una sube, la otra debe caer: signo opuesto) y sus ejes horizontal y vertical deben intercambiar sus roles (lo que avanzaba en x ahora sube en y: inversión de la fracción).'
      },
      {
        question: '¿Qué es la Raíz de una recta y en qué se diferencia de la Ordenada al Origen?',
        answer: 'La Ordenada al Origen (0, b) es el punto de partida en el eje vertical (donde x = 0). La Raíz (x₀, 0) es el momento en que la recta toca el suelo, el corte con el eje horizontal (donde y = 0). Son dos puntos totalmente distintos.'
      }
    ],
    theHowIntuitive: [
      {
        step: 1,
        title: 'Identificar los dos parámetros sagrados: m y b',
        description: 'Toda recta tiene la forma y = m·x + b. Si te la dan desordenada (como 2x + y - 4 = 0), despejá "y" para ver con claridad quién es la pendiente y quién es la ordenada.'
      },
      {
        step: 2,
        title: 'Aplicar la condición pedida (paralela o perpendicular)',
        description: 'Si piden paralela: copiá la misma m. Si piden perpendicular: dala vuelta y cambiale el signo (ej: de 2/3 pasa a -3/2).'
      },
      {
        step: 3,
        title: 'Reemplazar el punto de paso para hallar b',
        description: 'Poné las coordenadas del punto P(x₀, y₀) en la ecuación y despejá el valor exacto de la nueva ordenada al origen b.'
      }
    ],
    goldenRule: 'Rectas perpendiculares: invertí la fracción y cambiale el signo (m₂ = -1/m₁). Si te olvidás de cualquiera de los dos cambios, la recta no será perpendicular.',
    unlamTrapMap: [
      {
        trapTitle: 'Invertir la pendiente pero olvidar cambiarle el signo',
        commonMistake: 'Dada y = 3x + 1, decir que la perpendicular tiene m = 1/3.',
        whyBrainFalls: 'Recordamos que "se da vuelta" pero nos olvidamos de la regla del signo opuesto.',
        howToAvoid: 'Visualizalo en tu cabeza: si una recta va hacia arriba (positiva), la perpendicular TIENE que ir hacia abajo (negativa). Por ende m₂ = -1/3.'
      },
      {
        trapTitle: 'Confundir las coordenadas al reemplazar el punto',
        commonMistake: 'En el punto P(2, -5), poner x = -5 e y = 2.',
        whyBrainFalls: 'Escribir rápido en el examen sin mirar el orden (x; y).',
        howToAvoid: 'Escribí siempre con lápiz chiquito arriba del punto: x arriba del primer número, y arriba del segundo.'
      }
    ]
  },
  6: {
    unitId: 6,
    title: 'Sistemas de Ecuaciones y Funciones a Trozos',
    storyTitle: 'El Encuentro de Dos Trenes en la Vía',
    narrative: `Dos trenes salen de distintas estaciones y viajan por diferentes vías a distintas velocidades. El maquinista del tren A sigue la regla horaria y = 2x + 1. El maquinista del tren B sigue la regla y = -x + 7. ¿Habrá algún lugar y algún minuto exacto donde ambos trenes se crucen en el mapa?

Resolver un Sistema de Ecuaciones Lineales es exactamente eso: encontrar el único punto de encuentro (x; y) que satisface las dos realidades al mismo tiempo. Si las vías son paralelas, nunca se cruzan (Sistema Incompatible, sin solución). Si son la misma vía duplicada, se tocan en todos los puntos (Sistema Compatible Indeterminado).

Y una Función a Trozos (definida por ramas) es como un semáforo ferroviario inteligente: si tu tren circula a la izquierda del kilómetro 1 (x < 1), se aplica el motor de baja velocidad f₁(x) = 2 - x. Pero en cuanto cruzas la frontera del kilómetro 1 (x ≥ 1), el semáforo cambia de color y tu tren pasa a obedecer la ley f₂(x) = 3x - 1.`,
    realWorldAnalogy: 'Una función a trozos es como la tarifa de estacionamiento: la primera hora te cobran $500 fijos; pero a partir de la segunda hora te cobran $300 por cada hora extra. La regla cambia de acuerdo al intervalo de tiempo donde estés parado.',
    theWhy: [
      {
        question: '¿Por qué en un sistema se debe reemplazar en la OTRA ecuación y no en la misma?',
        answer: 'Porque si despejas x de la primera ecuación y la vuelves a meter en esa misma primera ecuación, llegas a la verdad inútil 0 = 0 o 3 = 3. Para cruzar las dos historias, debes inyectar la información de una línea dentro del universo de la otra.'
      },
      {
        question: '¿Qué significa el punto lleno (●) y el punto vacío (○) en una función a trozos?',
        answer: 'El punto lleno indica que en esa frontera exacta se incluye el valor (con ≤ o ≥). El punto vacío indica que la rama llega justo hasta ese borde pero no toca ese punto (con < o >).'
      }
    ],
    theHowIntuitive: [
      {
        step: 1,
        title: 'Elegir el método más limpio',
        description: 'Sustitución es ideal si hay una variable con coeficiente 1 o -1 suelta. Igualación es perfecto si ambas ecuaciones tienen "y" despejada.'
      },
      {
        step: 2,
        title: 'Hallar la primera incógnita y no festejar antes de tiempo',
        description: 'Si encontraste x = 2, ¡el ejercicio está a la mitad! Reemplazá ese 2 para hallar el valor de y. La solución siempre es un par ordenado (x; y).'
      },
      {
        step: 3,
        title: 'En funciones a trozos, respetar estrictamente el dominio de cada rama',
        description: 'Dibujá una línea imaginaria vertical en el punto de cambio de rama. A la izquierda graficás solo la rama 1; a la derecha, solo la rama 2.'
      }
    ],
    goldenRule: 'La solución de un sistema es un punto completo con dos coordenadas: S = {(x₀; y₀)}. Nunca des por terminado el ejercicio con una sola letra.',
    unlamTrapMap: [
      {
        trapTitle: 'Graficar ambas ramas en todo el plano',
        commonMistake: 'Dibujar las dos rectas completas de punta a punta cruzándose por todo el gráfico.',
        whyBrainFalls: 'Graficamos mecánicamente como si fueran dos rectas separadas sin prestar atención a las condiciones x < c y x ≥ c.',
        howToAvoid: 'Marcá la frontera en el eje x con una línea punteada y borrá la parte de la recta que invada el territorio prohibido.'
      },
      {
        trapTitle: 'Olvidar el punto vacío y el punto lleno',
        commonMistake: 'Dibujar los extremos de las ramas sin aclarar si el punto pertenece o no.',
        whyBrainFalls: 'Parece un detalle estético menor, pero en la UNLaM te descuentan puntos si no demuestras que sabes si el punto está incluido o excluido.',
        howToAvoid: 'Mirá el signo: si tiene la rayita abajo (≤ o ≥) va punto relleno ●; si es estricto (< o >) va anillo hueco ○.'
      }
    ]
  },
  7: {
    unitId: 7,
    title: 'Función Cuadrática y Parábolas',
    storyTitle: 'El Tiro del Cañón y la Altura del Vértice',
    narrative: `Disparas una bala de cañón desde el suelo o pateas una pelota de tiro libre por encima de la barrera. Al principio, la potencia de tu patada la hace subir a toda velocidad (término lineal bx). Pero desde el primer milisegundo, la gravedad del planeta Tierra la tira hacia abajo con aceleración constante (término cuadrático -ax²).

La batalla entre la velocidad inicial que empuja hacia arriba y la gravedad que tira hacia abajo dibuja en el aire una curva majestuosa y perfectamente simétrica: la Parábola.

En esa trayectoria hay un instante supremo: el Vértice. Es el punto más alto del cielo donde por una milésima de segundo la pelota deja de subir, se queda flotando inmóvil en el aire, y comienza su descenso inevitable. En economía, el vértice de una parábola representa el punto de máxima ganancia o de mínimo costo de una empresa.`,
    realWorldAnalogy: 'El vértice de la parábola es como la cima de una montaña rusa: estuviste subiendo con esfuerzo, llegas al punto culminante donde tienes la mejor vista panorámica (máximo), y a partir de allí la gravedad te hace descender a toda velocidad.',
    theWhy: [
      {
        question: '¿Por qué la coordenada x del vértice es exactamente xv = -b / (2a)?',
        answer: 'Porque las parábolas son un monumento a la simetría perfecta. Las raíces se calculan con la fórmula resolvente: x = (-b ± √Δ) / (2a). El vértice está exactamente en el centro, a mitad de camino entre ambas raíces: si promedias las dos raíces, el término ±√Δ se cancela y te queda exactamente -b / (2a).'
      },
      {
        question: '¿Qué te dice el signo del coeficiente principal "a"?',
        answer: 'Si a > 0 (positivo), la parábola "sonríe": tiene las ramas hacia arriba y posee un piso mínimo. Si a < 0 (negativo), la parábola "está triste": tiene las ramas hacia abajo y posee un techo máximo.'
      },
      {
        question: '¿Qué significa que el Discriminante (Δ = b² - 4ac) sea negativo?',
        answer: 'Significa que la parábola flota en el aire o está sumergida por completo: ¡nunca llega a tocar ni a cortar el eje x! Por eso no tiene raíces reales.'
      }
    ],
    theHowIntuitive: [
      {
        step: 1,
        title: 'Hallar el Vértice primero que nada',
        description: 'Calculá xv = -b / (2a). Luego meté ese número dentro de la función para sacar yv = f(xv). El vértice V(xv; yv) es el corazón de la parábola.'
      },
      {
        step: 2,
        title: 'Calcular las Raíces con la Resolvente (Bhaskara)',
        description: 'Usá x₁,₂ = (-b ± √(b² - 4ac)) / (2a). Esos son los dos cortes con el suelo (eje x).'
      },
      {
        step: 3,
        title: 'Marcar la Ordenada al Origen y el punto simétrico',
        description: 'El corte con el eje vertical es el punto (0, c). Por simetría respecto al eje vertical del vértice, tenés un punto gemelo gratis del otro lado.'
      }
    ],
    goldenRule: 'El vértice es un punto con dos coordenadas V(xv; yv): xv te dice CUÁNDO ocurre el máximo o mínimo; yv te dice CUÁNTO VALE ese máximo o mínimo.',
    unlamTrapMap: [
      {
        trapTitle: 'Error de signos con -b cuando b ya es negativo',
        commonMistake: 'En f(x) = -2x² - x + 6, donde b = -1, escribir -b como -1 en vez de +1.',
        whyBrainFalls: 'Vemos el signo menos de la fórmula y no lo combinamos con el menos del número.',
        howToAvoid: 'Poné paréntesis de protección: -b = -(-1) = +1. Siempre que un número sea negativo, protegelo con paréntesis.'
      },
      {
        trapTitle: 'Confundir el punto vértice con el conjunto imagen',
        commonMistake: 'Dar como imagen (-∞, xv] en vez de usar la coordenada vertical yv.',
        whyBrainFalls: 'Mezclamos la variable horizontal x con la altura vertical y.',
        howToAvoid: 'La Imagen mide alturas (eje y). Si las ramas van hacia abajo, la imagen va desde el fondo hasta la cima: Im = (-∞; yv].'
      }
    ]
  },
  8: {
    unitId: 8,
    title: 'Función Logarítmica',
    storyTitle: 'La Lupa que Domó a los Gigantes y la Escala de Richter',
    narrative: `Hace 400 años, los astrónomos y científicos se enfrentaban a una tortura matemática: calcular multiplicaciones de números con 15 cifras a mano. Y los sismólogos tenían un problema visual tremendo: ¿cómo graficar en la misma hoja un temblor casi imperceptible de 10 unidades de energía y un terremoto destructivo de 10.000.000.000 de unidades? Si le dabas 1 centímetro al temblor chico, ¡el terremoto grande requería un papel de 10.000 kilómetros de largo!

El matemático escocés John Napier inventó una herramienta mágica: el Logaritmo.

El logaritmo es una máquina de contar ceros y medir escalas. El logaritmo en base 10 de 10 es apenas 1. El de 100 es 2. El de 1.000.000 es 6. Y el de 10.000.000.000 es apenas 10. El logaritmo comprimió las distancias descomunales del universo para que cupieran en la palma de una mano en una escala de bolsillo (como la Escala de Richter de los terremotos o los decibeles del sonido).`,
    realWorldAnalogy: 'El logaritmo es como una balanza que te pregunta: "¿A qué número tengo que elevar la base para llegar a este peso?". Si log₂(8) = ?, la balanza pregunta: "¿Cuántas veces tengo que duplicar el 2 para llegar al 8?". La respuesta es 3 veces (2³ = 8).',
    theWhy: [
      {
        question: '¿Por qué el logaritmo convierte multiplicaciones en sumas (log(a · b) = log(a) + log(b))?',
        answer: 'Porque los logaritmos son simplemente exponentes con otro nombre. Cuando multiplicas potencias de igual base, los exponentes se suman (10² · 10³ = 10⁵). El logaritmo se queda solo con los exponentes: 2 + 3 = 5. ¡Transformó una multiplicación pesada en una suma liviana!'
      },
      {
        question: '¿Por qué el argumento del logaritmo TIENE que ser mayor que cero (> 0)?',
        answer: 'Porque ninguna base positiva elevada a cualquier número puede dar cero ni un número negativo (2ˣ > 0 siempre). No existe ningún exponente que haga que 2 elevado a algo te dé -4 o 0. Por eso el logaritmo de cero o de negativos no existe en el mundo real.'
      }
    ],
    theHowIntuitive: [
      {
        step: 1,
        title: 'Escribir la Condición de Existencia (Dominio) antes de tocar una sola fórmula',
        description: 'Apenas veas log(expresión), obligá a que expresión > 0. Esa es tu aduana: cualquier resultado final que no pase por esta aduana será eliminado.'
      },
      {
        step: 2,
        title: 'Juntar los logaritmos con sus propiedades',
        description: 'Suma de logaritmos se junta en logaritmo del producto: log(A) + log(B) = log(A · B). Resta se junta en cociente: log(A) - log(B) = log(A / B).'
      },
      {
        step: 3,
        title: 'Aplicar la definición de logaritmo o cancelar logaritmos gemelos',
        description: 'Si log_b(A) = C, entonces A = b^C. Despejá x y verificá obligatoriamente contra la Condición de Existencia del Paso 1.'
      }
    ],
    goldenRule: 'En logaritmos la verificación final no es un consejo optativo: es obligatoria. El 80% de los aplazos en este tema se deben a no descartar soluciones que hacen negativo el argumento.',
    unlamTrapMap: [
      {
        trapTitle: 'Distribuir el logaritmo en una suma: log(a + b) = log(a) + log(b)',
        commonMistake: 'Escribir que log(x + 5) = log(x) + log(5).',
        whyBrainFalls: 'Creemos falsamente que la palabra "log" multiplica al paréntesis.',
        howToAvoid: 'El logaritmo NO es una multiplicación, es una función. La propiedad dice que el logaritmo del PRODUCTO es la suma de logaritmos, nunca al revés.'
      },
      {
        trapTitle: 'Dar como válida una solución que hace negativo el argumento',
        commonMistake: 'Obtener x = -3 y x = 5 en log(x + 1) y poner ambas en el conjunto solución.',
        whyBrainFalls: 'Llegamos al final de la cuadrática y asumimos mecánicamente que las dos raíces sirven.',
        howToAvoid: 'Reemplazá x = -3 en el argumento original: (-3 + 1) = -2. ¡Logaritmo de número negativo no existe! La única solución real es x = 5.'
      }
    ]
  },
  9: {
    unitId: 9,
    title: 'Función Exponencial',
    storyTitle: 'El Grano de Arroz del Rey y la Placa de Bacterias',
    narrative: `Cuenta una célebre leyenda que el sabio inventor del ajedrez fue llevado ante el Rey de la India. Fascinado por el juego, el monarca le dijo: "Pídeme la recompensa que desees, oro, joyas o palacios".

El sabio hizo un pedido aparentemente humilde: "Señor, póngame un grano de arroz en el primer casillero del tablero; dos granos en el segundo; cuatro granos en el tercero; ocho granos en el cuarto... y así sucesivamente, duplicando la cantidad en cada casillero hasta completar los 64 (2ˣ)".

El Rey se rio pensando que era una tontería barata. Pero cuando los matemáticos reales hicieron la cuenta, descubrieron aterrados que en el casillero 64 se necesitaban 18 trillones de granos de arroz: ¡ni cosechando todo el planeta Tierra durante 500 años se podía pagar esa deuda!

Esa es la potencia colosal de la Función Exponencial: un crecimiento donde la variable no está en el piso como multiplicador, sino en el techo como potencia. Crece más rápido que cualquier cohete, bacteria o polinomio en el universo.`,
    realWorldAnalogy: 'El crecimiento exponencial es como una colonia de bacterias donde cada bacteria se divide en dos cada media hora: en pocas horas, un microorganismo invisible se convierte en una masa de miles de millones de células.',
    theWhy: [
      {
        question: '¿Por qué la función exponencial f(x) = aˣ nunca toca el cero (asíntota horizontal y = 0)?',
        answer: 'Porque si multiplicas un número positivo por sí mismo (como 2 · 2 · 2), siempre obtienes un número positivo. Y si usas exponentes negativos enormes como 2⁻¹⁰⁰⁰ = 1 / (2¹⁰⁰⁰), obtienes una fracción microscópica, pero jamás cero absoluto. Nunca puedes vaciar el frasco por completo.'
      },
      {
        question: '¿Por qué en ecuaciones exponenciales se busca igualar las bases a entrambi lados?',
        answer: 'Porque si tienes 2^(3x - 1) = 2^8, como la base (2) es idéntica y la función exponencial es estrictamente creciente (inyectiva), la única forma física de que ambos miembros sean iguales es que sus techos sean exactamente idénticos: 3x - 1 = 8.'
      }
    ],
    theHowIntuitive: [
      {
        step: 1,
        title: 'Descomponer los números en sus bases primas comunes',
        description: 'Si ves un 4, escribilo como 2². Si ves un 8, como 2³. Si ves 1/9, como 3⁻². Llevá todo a la misma base.'
      },
      {
        step: 2,
        title: 'Aplicar potencia de otra potencia',
        description: 'Recordá que (aⁿ)ᵐ = a^(n·m). Multiplicá los exponentes protegiendo los binomios con paréntesis.'
      },
      {
        step: 3,
        title: 'Igualar exponentes o hacer cambio de variable',
        description: 'Si te quedó base^A = base^B, cancelás las bases e igualás A = B. Si ves términos como 4ˣ y 2ˣ, hacé el cambio de variable u = 2ˣ para resolver una cuadrática común.'
      }
    ],
    goldenRule: 'Bases iguales, techos iguales: si logras que el número de abajo sea el mismo en ambos lados de la ecuación, puedes tachar las bases y resolver los exponentes.',
    unlamTrapMap: [
      {
        trapTitle: 'Sumar bases distintas: 2ˣ + 3ˣ = 5ˣ',
        commonMistake: 'Juntar bases sumando como si fueran números comunes.',
        whyBrainFalls: 'Confundir las reglas de multiplicación con las de suma.',
        howToAvoid: '2ˣ + 3ˣ no se puede juntar nunca directamente. Solo se pueden operar potencias cuando las bases son exactamente las mismas.'
      },
      {
        trapTitle: 'Aceptar soluciones negativas en el cambio de variable',
        commonMistake: 'Haciendo u = 2ˣ, la cuadrática da u₁ = 4 y u₂ = -2, y el alumno intenta resolver 2ˣ = -2.',
        whyBrainFalls: 'Olvidamos que u representaba a una potencia exponencial 2ˣ.',
        howToAvoid: 'Recordá que 2ˣ NUNCA puede ser negativo. La rama 2ˣ = -2 se tacha de inmediato como "sin solución real". Solo sobrevive 2ˣ = 4 => x = 2.'
      }
    ]
  },
  10: {
    unitId: 10,
    title: 'Trigonometría',
    storyTitle: 'La Rueda Gigante de la Vuelta al Mundo y la Sombra del Sol',
    narrative: `Imagina que estás subido a la "Vuelta al Mundo" (la rueda gigante del parque de diversiones) en una canastilla. La rueda tiene un radio perfecto de 1 metro y gira en sentido antihorario.

A medida que la rueda gira un ángulo α desde el piso horizontal:
- Tu altura exacta respecto del piso del eje central es el SENO (sin α).
- Tu distancia horizontal hacia adelante o atrás del poste de apoyo es el COSENO (cos α).
- Y si proyectaras una linterna horizontalmente contra una pared vertical tangente, la altura de la sombra sería la TANGENTE (tan α).

La trigonometría no es una colección de fórmulas aburridas: es el estudio de la rotación circular y de los triángulos rectángulos. Y la fórmula más famosa de todas, sin²(α) + cos²(α) = 1, no es magia caída del cielo: ¡es simplemente el Teorema de Pitágoras (base² + altura² = hipotenusa²) aplicado a la rueda giratoria!`,
    realWorldAnalogy: 'El seno y el coseno son como las manecillas de un reloj o una rueda de bicicleta: cuando una sube al máximo, la otra está en cero. A los 90° estás en lo más alto (seno = 1, coseno = 0); a los 0° estás completamente a la derecha (seno = 0, coseno = 1).',
    theWhy: [
      {
        question: '¿Por qué una ecuación trigonométrica como sin(x) = 1/2 tiene dos soluciones en la primera vuelta [0, 2π)?',
        answer: 'Porque en una vuelta completa de la rueda pasas por la misma altura dos veces: una cuando vas subiendo en el primer cuadrante (a los 30° o π/6), y otra cuando vas bajando en el segundo cuadrante (a los 150° o 5π/6). Si solo das la respuesta de la calculadora, perdiste la mitad del puntaje del examen.'
      },
      {
        question: '¿Por qué se usan radianes en lugar de grados?',
        answer: 'Porque los 360 grados son una convención inventada por los babilonios basada en los días del año. Los radianes, en cambio, miden la longitud real del arco recorrido sobre la circunferencia: una vuelta completa de radio 1 mide exactamente 2π de perímetro.'
      }
    ],
    theHowIntuitive: [
      {
        step: 1,
        title: 'Despejar la función trigonométrica',
        description: 'Dejá sin(x) o cos(x) sola de un lado (ej: 2·sin(x) - 1 = 0 => sin(x) = 1/2).'
      },
      {
        step: 2,
        title: 'Hallar el ángulo del primer cuadrante (x₁)',
        description: 'Identificá el ángulo notable en radianes: si sin(x) = 1/2, x₁ = π/6 (30°).'
      },
      {
        step: 3,
        title: 'Buscar el ángulo hermano en el otro cuadrante (x₂)',
        description: 'Para el seno: x₂ = π - x₁ (segundo cuadrante). Para el coseno: x₂ = 2π - x₁ (cuarto cuadrante). Siempre da las dos soluciones dentro de [0, 2π).'
      }
    ],
    goldenRule: 'En el examen de la UNLaM toda ecuación en [0, 2π) tiene al menos dos soluciones simétricas: la calculadora te da una sola; la segunda la encuentras tú con la simetría de la rueda.',
    unlamTrapMap: [
      {
        trapTitle: 'Olvidar la segunda solución x₂ en el examen',
        commonMistake: 'En sin(x) = 1/2, poner solo x = π/6.',
        whyBrainFalls: 'Apretamos shift + seno en la calculadora y nos confiamos con el único número que devuelve la pantalla.',
        howToAvoid: 'Visualizá la rueda: a la altura 1/2 estás en 30° (π/6) y también en 150° (5π/6). Ambas son obligatorias.'
      },
      {
        trapTitle: 'Tener la calculadora en modo DEG y contestar en grados',
        commonMistake: 'Poner x₁ = 30° en vez de x₁ = π/6 rad cuando el enunciado pide x ∈ [0, 2π).',
        whyBrainFalls: 'Comodidad con los grados de la escuela primaria.',
        howToAvoid: 'Si el intervalo de la consigna dice [0, 2π), el examen te está exigiendo explícitamente radianes. Multiplicá por π/180 para pasar a radianes.'
      }
    ]
  }
};
