// test-math-engine.js
import { 
  parseFraction, 
  simplifyFraction, 
  verifyNumericAnswer, 
  parseSingleInterval, 
  parseIntervalUnion, 
  areIntervalsEqual, 
  verifyIntervalAnswer,
  parseCoordinatePoint,
  verifyCoordinateAnswer,
  evaluateAlgebraicExpression,
  areAlgebraicExpressionsEquivalent,
  diagnoseError
} from './src/math/mathEngine';

import { ALL_UNITS, getAllExercises } from './src/data/courseData';
import { REAL_EXAMS } from './src/data/exams/realExams';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`  ✓ PASS: ${message}`);
  } else {
    failed++;
    console.error(`  ✗ FAIL: ${message}`);
  }
}

console.log("=== INICIANDO SUITE DE TESTS MATEMÁTICOS Y DE INTEGRIDAD ===");

// 1. Fracciones
console.log("\n[Test 1: Fracciones y Aritmética Racional]");
const f1 = parseFraction("7/6");
assert(f1 && f1.num === 7 && f1.den === 6, "parseFraction('7/6') da 7/6");

const f2 = parseFraction("0.5");
assert(f2 && f2.num === 1 && f2.den === 2, "parseFraction('0.5') simplifica a 1/2");

const f3 = parseFraction("-0.8");
assert(f3 && f3.num === -4 && f3.den === 5, "parseFraction('-0.8') simplifica a -4/5");

assert(verifyNumericAnswer("1/2", "0.5"), "1/2 equivale a 0.5");
assert(verifyNumericAnswer("2/4", "1/2"), "2/4 equivale a 1/2");
assert(verifyNumericAnswer("-0.2", "-1/5"), "-0.2 equivale a -1/5 (solución examen logarítmico)");
assert(verifyNumericAnswer("49/8", "6.125"), "49/8 equivale a 6.125 (vértice cuadrática)");

// 2. Intervalos Reales
console.log("\n[Test 2: Intervalos Reales e Inecuaciones]");
const int1 = parseSingleInterval("(-2; 6]");
assert(int1 && int1.leftOpen === true && int1.leftVal === -2 && int1.rightVal === 6 && int1.rightOpen === false, "parseSingleInterval('(-2; 6]') correcto");

const uInt1 = parseIntervalUnion("(-inf, -5) U (-2, inf)");
assert(uInt1 && uInt1.length === 2 && uInt1[0].rightVal === -5 && uInt1[1].leftVal === -2, "parseIntervalUnion con U correcto");

assert(verifyIntervalAnswer("(-2, 6]", "(-2; 6]"), "(-2, 6] equivale a (-2; 6]");
assert(verifyIntervalAnswer("(-inf; -5) ∪ (-2; inf)", "(-inf, -5) U (-2, inf)"), "Unión con U y ∪ equivalentes");
assert(verifyIntervalAnswer("(-inf, 1/6] U [7/6, inf)", "(-inf; 1/6] U [7/6; inf)"), "Intervalo con módulo examen 3 equivalente");
assert(!verifyIntervalAnswer("[-2, 6]", "(-2, 6]"), "[-2, 6] NO es igual a (-2, 6] (rechaza extremo cerrado)");

// 3. Puntos de Coordenadas
console.log("\n[Test 3: Puntos de Coordenadas]");
assert(verifyCoordinateAnswer("(2, -1)", "(2; -1)"), "(2, -1) y (2; -1) equivalentes");
assert(verifyCoordinateAnswer("(-0.8, -3.4)", "(-4/5; -17/5)"), "(-0.8, -3.4) equivale a (-4/5, -17/5)");

// 4. Expresiones Algebraicas y Polinomios
console.log("\n[Test 4: Expresiones Algebraicas Simbólicas]");
assert(areAlgebraicExpressionsEquivalent("2x(x - 2)", "2x^2 - 4x"), "2x(x-2) equivale a 2x^2 - 4x (examen 3 simplificación)");
assert(areAlgebraicExpressionsEquivalent("(x - 3)^2 * (x + 3)^2", "x^4 - 18x^2 + 81"), "Factoreo examen 1 equivale al polinomio original");
assert(areAlgebraicExpressionsEquivalent("-3x + 1", "1 - 3x"), "-3x + 1 equivale a 1 - 3x (recta perpendicular)");

// 5. Diagnóstico de Errores Pedagógicos
console.log("\n[Test 5: Diagnóstico de Errores]");
const diagSign = diagnoseError("2", "-2");
assert(diagSign.type === "ERROR_DE_SIGNO", "Detecta error de signo correctamente");

const diagExtr = diagnoseError("[-2, 6]", "(-2, 6]");
assert(diagExtr.type === "ERROR_EXTREMOS_INTERVALO" || diagExtr.type === "VALOR_PROHIBIDO_DENOMINADOR", "Detecta error de corchete en valor prohibido");

const diagFact = diagnoseError("(x^2 - 9)^2", "(x - 3)^2 (x + 3)^2");
assert(diagFact.type === "FACTOREO_INCOMPLETO", "Detecta factoreo incompleto");

// 6. Integridad de las 10 Unidades del Material Oficial
console.log("\n[Test 6: Integridad Curricular de Fichas de Clase]");
assert(ALL_UNITS.length === 10, "Existen exactamente 10 unidades que corresponden a las 10 Fichas de Clase de UNLaM");

ALL_UNITS.forEach((unit, idx) => {
  assert(unit.id === idx + 1, `Unidad ${unit.id} tiene ID correlativo correcto`);
  assert(unit.title.length > 5, `Unidad ${unit.id} tiene título descriptivo`);
  assert(unit.manualPages.length > 0, `Unidad ${unit.id} tiene referencia al manual de cátedra`);
  assert(unit.whatYouWillLearn.length >= 3, `Unidad ${unit.id} tiene al menos 3 objetivos de aprendizaje`);
  assert(unit.keyFormulas.length >= 1, `Unidad ${unit.id} tiene fórmulas clave formalizadas`);
  assert(unit.explainFromScratch.checkpointQuestion.options.some(o => o.isCorrect), `Unidad ${unit.id} tiene pregunta de control con respuesta correcta`);
  assert(unit.exercises.length >= 1, `Unidad ${unit.id} tiene ejercicios asignados`);
});

// 7. Integridad de los Ejercicios de Examen Real
console.log("\n[Test 7: Integridad de Exámenes Reales UNLaM]");
assert(REAL_EXAMS.length === 3, "Existen exactamente 3 modelos de examen real");

REAL_EXAMS.forEach(exam => {
  assert(exam.exercises.length === 5, `Examen ${exam.code} tiene exactamente 5 ejercicios de examen`);
  const pointsSum = exam.exercises.reduce((acc, e) => acc + e.points, 0);
  assert(pointsSum === exam.totalPoints, `Puntaje total del examen ${exam.code} suma ${exam.totalPoints} puntos exactos`);
  
  exam.exercises.forEach((ex, eIdx) => {
    assert(ex.hints.length === 5, `Ejercicio ${eIdx + 1} del examen ${exam.code} tiene las 5 pistas pedagógicas`);
    assert(ex.solution.steps.length >= 1, `Ejercicio ${eIdx + 1} del examen ${exam.code} tiene solución paso a paso`);
    assert(ex.sourceType === 'SOURCE', `Ejercicio ${eIdx + 1} del examen ${exam.code} está registrado con trazabilidad SOURCE`);
  });
});

console.log(`\n========================================`);
console.log(`RESULTADOS: ${passed} PASADOS, ${failed} FALLADOS`);
console.log(`========================================`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log("¡TODOS LOS TESTS DE MATEMÁTICA, DATOS E INTEGRIDAD PASARON CON ÉXITO!");
}
