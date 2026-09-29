# MATEMATIX UNLaM — Plataforma Interactiva de Preparación para Examen Final

[![License: MIT](https://img.shields.io/badge/Licencia-MIT-emerald.svg)](./LICENSE)
[![Autor: Leaa](https://img.shields.io/badge/Autor-Leaa-indigo.svg)](http://instagram.com/leaa.emanuel)
[![Instagram](https://img.shields.io/badge/Instagram-@leaa.emanuel-E4405F?logo=instagram&logoColor=white)](http://instagram.com/leaa.emanuel)
[![Tests: 144 pasados](https://img.shields.io/badge/Tests-144%20pasados-success.svg)](./test-math-engine.js)

Plataforma educativa de nivel profesional diseñada específicamente para preparar al estudiante para la **evaluación y examen final real de Matemática** del **Curso de Ingreso de la Universidad Nacional de La Matanza (Departamento de Ciencias Económicas)**.

---

## 📐 Cobertura Documental y de Examen (100%)

Construida con fidelidad matemática y pedagógica absoluta a partir de:
- **10 Fichas de Clase Oficiales** (`FICHA-DE-CLASE-Nro-1` a `Nro-10`).
- **3 Exámenes Finales Reales Oficiales** (Tema 1 de 10 puntos, Tema 1 de 100 puntos, Tema 2 de 10 puntos).
- **Manual de Cátedra UNLaM**: Páginas 190 a 261 y Anexo de Trigonometría en plataforma MIeL.

---

## 🚀 Cómo Iniciar la Plataforma

### 1. Iniciar el servidor de desarrollo:
```bash
npm run dev
```
La aplicación quedará disponible en `http://localhost:3000`.

### 2. Ejecutar la suite de tests automáticos:
```bash
npm test
```
Ejecuta los 144 tests automatizados que verifican el motor matemático (aritmética de fracciones, intervalos, expresiones algebraicas, diagnóstico de errores) y la integridad de las 10 unidades y exámenes.

### 3. Compilar para producción:
```bash
npm run build
```

---

## 🏛️ Estructura del Proyecto

```text
c:\matematix\
├── base\                     # Archivos fuente originales (PDFs de Fichas 1 a 10 y JPEGs de exámenes)
├── src\
│   ├── types\                # Tipos TypeScript (Mastery, Exercise, TopicUnit, ExamResult, etc.)
│   ├── math\                 # Motor de verificación matemática determinista y diagnóstico
│   │   └── mathEngine.ts
│   ├── data\
│   │   ├── units\            # Unidades 1 a 10 con teoría, fórmulas, ejemplos y ejercicios
│   │   ├── exams\            # Modelos oficiales de examen UNLaM (Tema 1, Tema 2)
│   │   └── courseData.ts     # Agregador central del mapa curricular
│   ├── components\
│   │   ├── common\           # MathView (KaTeX) y TraceabilityView (Matriz 100%)
│   │   ├── visualizers\      # Gráficos interactivos SVG (Recta numérica, Parábola, Rectas, etc.)
│   │   ├── exercises\        # Reproductor interactivo de ejercicios con 5 pistas y diagnóstico
│   │   ├── exam\             # Simulador de examen con cronómetro, banderas y corrección
│   │   ├── dashboard\        # Dashboard con "¿Estoy preparado?" y Mapa Curricular
│   │   ├── topic\            # Vista de tema con "Explícame desde cero" y control de comprensión
│   │   └── practice\         # Centro de práctica libre, por dificultad o banco de errores
│   ├── context\              # Persistencia local (localStorage), dominio y métricas reales
│   ├── App.tsx               # Aplicación principal y enrutador SPA
│   ├── main.tsx              # Punto de entrada React
│   └── index.css             # Estilos Tailwind v4 y tipografía matemática
├── test-math-engine.js       # Suite de pruebas automatizadas
└── package.json
```

---

## 🎯 Modos de Estudio Principales

1. **Dashboard y Diagnóstico de Preparación**:
   - Mide el porcentaje real de preparación para el examen mediante un índice ponderado:
     $$\text{Readiness} = 0.4 \times \text{Dominio de Temas} + 0.4 \times \text{Notas de Exámenes} + 0.2 \times \text{Precisión e Independencia}$$
   - Recomendador inteligente "Repasar Ahora" en los puntos débiles.

2. **Modo "Explícame desde Cero"**:
   - 9 preguntas fundamentales por unidad: ¿Qué es?, ¿Por qué existe?, ¿Qué significa?, ¿Cuándo se usa?, ¿Cómo se reconoce?, ¿Qué fórmula corresponde?, ¿Cómo se aplica?, ¿Qué errores suelen ocurrir?, ¿Cómo aparece en el examen?
   - Mini control de comprensión con feedback inmediato.

3. **Modo "No Entiendo"**:
   - Analogía cotidiana alternativa, explicación visual y paso a paso simplificado.

4. **Sistema de 5 Pistas Pedagógicas**:
   - Pista 1: Concepto Clave
   - Pista 2: Método Recomendado
   - Pista 3: Primer Paso
   - Pista 4: Procedimiento Parcial
   - Pista 5: Solución Completa de Cátedra

5. **Simulador de Examen Real UNLaM**:
   - Cronómetro regresivo con alertas.
   - Navegación y marcado de preguntas para revisión ("Flag").
   - Calificación oficial de cátedra con desglose por tema y recomendaciones.

6. **Visualizadores Interactivos**:
   - Recta numérica para inecuaciones y extremos abiertos/cerrados.
   - Plano cartesiano para rectas perpendiculares y punto de intersección.
   - Gráfica de parábola para raíces, vértice y conjunto imagen.
   - Funciones a tramos con saltos y extremos abiertos/cerrados.
   - Circunferencia trigonométrica unitaria con seno y coseno.

---

## 👤 Autor y Créditos

Este proyecto fue ideado, diseñado y desarrollado íntegramente por:

* **Autor**: **Leaa**
* **Instagram**: [@leaa.emanuel](http://instagram.com/leaa.emanuel)
* **GitHub**: [@leaatimberini](https://github.com/leaatimberini)
* **Repositorio**: [https://github.com/leaatimberini/matematix](https://github.com/leaatimberini/matematix)

Si este proyecto te ayudó en tu preparación para el examen o te resultó interesante, podés seguirme en Instagram y dejar una ⭐ en el repositorio.

---

## 📄 Licencia de Uso

Este proyecto se encuentra bajo la **Licencia MIT**. Esto significa que es de código abierto y podés utilizarlo, estudiarlo y compartirlo libremente.

Consulta el archivo [`LICENSE`](./LICENSE) para conocer los términos completos.
