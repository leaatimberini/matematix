// src/components/exam/ExamSimulator.tsx
import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { REAL_EXAMS, ExamDefinition } from '../../data/exams/realExams';
import type { Exercise, ExamResult, ExamQuestionAttempt } from '../../types';
import { MathView } from '../common/MathView';
import { 
  verifyNumericAnswer, 
  verifyIntervalAnswer, 
  verifyCoordinateAnswer, 
  areAlgebraicExpressionsEquivalent,
  diagnoseError
} from '../../math/mathEngine';
import { MATH_STORIES } from '../../data/mathStories';
import { useUser } from '../../context/UserContext';
import { 
  Clock, 
  Flag, 
  CheckCircle, 
  AlertCircle, 
  ChevronLeft, 
  ChevronRight, 
  Award, 
  RotateCcw,
  FileCheck,
  CheckCircle2,
  XCircle,
  TrendingUp,
  BookOpen,
  Compass,
  Lightbulb,
  ShieldAlert
} from 'lucide-react';

export const ExamSimulator: React.FC = () => {
  const { recordExamResult } = useUser();

  const [selectedExam, setSelectedExam] = useState<ExamDefinition | null>(null);
  const [examStarted, setExamStarted] = useState<boolean>(false);
  const [examSubmitted, setExamSubmitted] = useState<boolean>(false);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flags, setFlags] = useState<Record<string, boolean>>({});
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [examResult, setExamResult] = useState<ExamResult | null>(null);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState<boolean>(false);
  const [storyModalUnitId, setStoryModalUnitId] = useState<number | null>(null);

  // Timer countdown
  useEffect(() => {
    if (!examStarted || examSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examStarted, examSubmitted]);

  const handleStartExam = (exam: ExamDefinition) => {
    setSelectedExam(exam);
    setTimeLeft(exam.durationMinutes * 60);
    setCurrentIdx(0);
    setAnswers({});
    setFlags({});
    setExamStarted(true);
    setExamSubmitted(false);
    setExamResult(null);
  };

  const handleToggleFlag = (exerciseId: string) => {
    setFlags(prev => ({ ...prev, [exerciseId]: !prev[exerciseId] }));
  };

  const handleAnswerChange = (exerciseId: string, val: string) => {
    setAnswers(prev => ({ ...prev, [exerciseId]: val }));
  };

  const handleSubmitExam = () => {
    if (!selectedExam || examSubmitted) return;

    setShowConfirmSubmit(false);
    setExamSubmitted(true);

    let totalPointsEarned = 0;
    const attempts: ExamQuestionAttempt[] = [];
    const topicStats: Record<number, { title: string; correct: number; total: number }> = {};

    selectedExam.exercises.forEach(ex => {
      const userAns = (answers[ex.id] || '').trim();
      let isCorrect = false;

      if (ex.type === 'multiple_choice' || ex.type === 'true_false' || ex.type === 'detect_error') {
        const correctOpt = ex.options?.find(o => o.isCorrect);
        isCorrect = userAns === correctOpt?.id;
      } else {
        const target = ex.correctAnswer || '';
        const acceptable = ex.acceptableAnswers || [];

        if (ex.answerType === 'interval') {
          isCorrect = verifyIntervalAnswer(userAns, target, acceptable);
        } else if (ex.answerType === 'coordinate') {
          isCorrect = verifyCoordinateAnswer(userAns, target);
        } else if (ex.answerType === 'number' || ex.answerType === 'fraction') {
          isCorrect = verifyNumericAnswer(userAns, target, acceptable);
        } else if (ex.answerType === 'expression') {
          isCorrect = areAlgebraicExpressionsEquivalent(userAns, target) ||
                      userAns.toLowerCase().replace(/\s+/g, '') === target.toLowerCase().replace(/\s+/g, '') ||
                      acceptable.some(alt => areAlgebraicExpressionsEquivalent(userAns, alt) || userAns.toLowerCase().replace(/\s+/g, '') === alt.toLowerCase().replace(/\s+/g, ''));
        } else {
          isCorrect = userAns.toLowerCase().replace(/\s+/g, '') === target.toLowerCase().replace(/\s+/g, '') ||
                      acceptable.some(alt => userAns.toLowerCase().replace(/\s+/g, '') === alt.toLowerCase().replace(/\s+/g, ''));
        }
      }

      const pointsEarned = isCorrect ? ex.points : 0;
      totalPointsEarned += pointsEarned;

      attempts.push({
        exerciseId: ex.id,
        userAnswer: userAns,
        isCorrect,
        timeSpentSeconds: 0,
        hintsUsedCount: 0,
        pointsEarned,
        maxPoints: ex.points,
        flaggedForReview: !!flags[ex.id]
      });

      if (!topicStats[ex.unitId]) {
        topicStats[ex.unitId] = { title: ex.topic, correct: 0, total: 0 };
      }
      topicStats[ex.unitId].total += 1;
      if (isCorrect) topicStats[ex.unitId].correct += 1;
    });

    const scorePercentage = Math.round((totalPointsEarned / selectedExam.totalPoints) * 100);
    const passed = totalPointsEarned >= selectedExam.passingScore;

    const topicBreakdown = Object.entries(topicStats).map(([uId, data]) => ({
      unitId: parseInt(uId),
      unitTitle: data.title,
      correctCount: data.correct,
      totalCount: data.total,
      percentage: Math.round((data.correct / data.total) * 100)
    }));

    const recommendations: string[] = [];
    topicBreakdown.forEach(tb => {
      if (tb.percentage < 70) {
        recommendations.push(`Reforzar ${tb.unitTitle} (Unidad ${tb.unitId}) mediante ejercicios de práctica y revisión de errores.`);
      }
    });
    if (recommendations.length === 0) {
      recommendations.push('¡Excelente desempeño! Mantén la práctica con exámenes cronometrados para asegurar tu velocidad.');
    }

    const result: ExamResult = {
      id: `res_${Date.now()}`,
      examId: selectedExam.id,
      examTitle: selectedExam.title,
      timestamp: Date.now(),
      totalTimeSeconds: (selectedExam.durationMinutes * 60) - timeLeft,
      totalScore: totalPointsEarned,
      maxScore: selectedExam.totalPoints,
      scorePercentage,
      passed,
      topicBreakdown,
      attempts,
      recommendations
    };

    setExamResult(result);
    recordExamResult(result);

    if (passed) {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.6 }
      });
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Exam Selection Screen
  if (!examStarted) {
    return (
      <div className="space-y-6">
        <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="max-w-3xl">
            <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-bold uppercase tracking-wider inline-block mb-3">
              Simulador de Examen Real UNLaM
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              Exámenes Finales Oficiales — Ciencias Económicas
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Evalúate bajo condiciones reales con los modelos de examen exactos tomados por la Universidad Nacional de La Matanza. Cada modelo incluye tiempo límite, sin pistas y con corrección matemática estricta.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REAL_EXAMS.map(exam => (
            <div
              key={exam.id}
              className="bg-slate-800/90 border border-slate-700/80 hover:border-indigo-500/60 rounded-2xl p-6 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-indigo-500/10"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-indigo-400 font-bold">
                    {exam.code}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{exam.durationMinutes} min</span>
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1.5 leading-snug">
                  {exam.title}
                </h3>
                <p className="text-xs text-slate-400 mb-4">
                  {exam.subtitle}
                </p>

                <div className="space-y-2 text-xs text-slate-300 mb-6 bg-slate-900/60 p-3.5 rounded-xl border border-slate-700/60">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Ejercicios:</span>
                    <span className="font-semibold text-white">{exam.exercises.length} problemas completos</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Puntaje Total:</span>
                    <span className="font-semibold text-white">{exam.totalPoints} puntos</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Aprobación:</span>
                    <span className="font-semibold text-amber-400">{exam.passingScore} puntos o más</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleStartExam(exam)}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Rendir Examen</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Active Exam Interface
  if (!examSubmitted && selectedExam) {
    const currentEx = selectedExam.exercises[currentIdx];
    const isAnswered = !!answers[currentEx.id]?.trim();
    const isFlagged = !!flags[currentEx.id];
    const isTimeUrgent = timeLeft < 900; // < 15 min

    return (
      <div className="space-y-6">
        {/* Top Header Bar */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-wrap items-center justify-between gap-4 sticky top-4 z-30 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 bg-slate-900 text-indigo-400 rounded-lg text-xs font-mono font-bold border border-slate-700">
              {selectedExam.code}
            </span>
            <span className="text-sm font-bold text-white hidden sm:inline">
              Pregunta {currentIdx + 1} de {selectedExam.exercises.length}
            </span>
          </div>

          {/* Countdown Clock */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-mono font-bold text-base ${
            isTimeUrgent 
              ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 animate-pulse'
              : 'bg-slate-900 border-slate-700 text-slate-200'
          }`}>
            <Clock className={`w-5 h-5 ${isTimeUrgent ? 'text-rose-400' : 'text-slate-400'}`} />
            <span>{formatTimer(timeLeft)}</span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleToggleFlag(currentEx.id)}
              className={`p-2 sm:px-3 sm:py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                isFlagged 
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                  : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              <Flag className="w-4 h-4" />
              <span className="hidden sm:inline">{isFlagged ? 'Marcada' : 'Marcar para revisar'}</span>
            </button>

            <button
              onClick={() => setShowConfirmSubmit(true)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-md shadow-emerald-600/30 flex items-center gap-1.5 cursor-pointer"
            >
              <FileCheck className="w-4 h-4" />
              <span>Finalizar Examen</span>
            </button>
          </div>
        </div>

        {/* Question Palette */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 shadow-md flex items-center gap-2 overflow-x-auto">
          {selectedExam.exercises.map((ex, idx) => {
            const hasAns = !!answers[ex.id]?.trim();
            const flagged = !!flags[ex.id];
            const isCurrent = idx === currentIdx;

            return (
              <button
                key={ex.id}
                onClick={() => setCurrentIdx(idx)}
                className={`w-10 h-10 rounded-xl font-mono text-sm font-bold flex items-center justify-center relative transition-all cursor-pointer ${
                  isCurrent
                    ? 'ring-2 ring-indigo-400 bg-indigo-600 text-white'
                    : hasAns
                    ? 'bg-emerald-600/30 border border-emerald-500/50 text-emerald-300'
                    : 'bg-slate-900 border border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                <span>{idx + 1}</span>
                {flagged && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-slate-900" />
                )}
              </button>
            );
          })}
        </div>

        {/* Current Question Statement & Answer Field */}
        <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center justify-between pb-3 mb-5 border-b border-slate-700">
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                {currentEx.topic} — {currentEx.subtopic}
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">
                Ejercicio {currentIdx + 1}: {currentEx.title}
              </h3>
            </div>
            <span className="px-3 py-1 bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-amber-300 rounded-lg">
              {currentEx.points} Puntos
            </span>
          </div>

          <div className="text-slate-100 text-base leading-relaxed bg-slate-900/60 p-5 rounded-xl border border-slate-700/60 mb-6">
            <MathView math={currentEx.statement} block={currentEx.statement.includes('$$')} />
          </div>

          {/* Interactive Answer Input for Exam */}
          {currentEx.type === 'multiple_choice' || currentEx.type === 'true_false' ? (
            <div className="space-y-3 mb-6">
              {currentEx.options?.map(opt => (
                <label
                  key={opt.id}
                  onClick={() => handleAnswerChange(currentEx.id, opt.id)}
                  className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition-all ${
                    answers[currentEx.id] === opt.id
                      ? 'border-indigo-500 bg-indigo-500/15 ring-1 ring-indigo-500'
                      : 'border-slate-700 hover:border-slate-500 bg-slate-900/40'
                  }`}
                >
                  <input
                    type="radio"
                    name={`exam-opt-${currentEx.id}`}
                    value={opt.id}
                    checked={answers[currentEx.id] === opt.id}
                    onChange={() => handleAnswerChange(currentEx.id, opt.id)}
                    className="mt-1 accent-indigo-500"
                  />
                  <div className="flex-1 text-sm text-slate-100">
                    <span>{opt.text}</span>
                    {opt.math && <MathView math={opt.math} className="ml-2" />}
                  </div>
                </label>
              ))}
            </div>
          ) : (
            <div className="space-y-3 mb-6">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Tu Respuesta ({currentEx.answerType === 'interval' ? 'Intervalo, ej. (-2, 6]' : currentEx.answerType === 'coordinate' ? 'Punto, ej. (2, -1)' : 'Expresión o número'}):
              </label>
              <input
                type="text"
                value={answers[currentEx.id] || ''}
                onChange={e => handleAnswerChange(currentEx.id, e.target.value)}
                placeholder="Escribe tu resultado aquí..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white font-mono text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {answers[currentEx.id]?.trim() && (
                <div className="text-xs text-slate-400 flex items-center gap-2">
                  <span>Vista matemática:</span>
                  <span className="font-mono bg-slate-900 px-2 py-0.5 rounded text-indigo-300">
                    <MathView math={answers[currentEx.id]} />
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-5 border-t border-slate-700">
            <button
              onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
              disabled={currentIdx === 0}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-700 disabled:opacity-40 border border-slate-700 rounded-xl text-xs font-semibold text-slate-200 flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            <button
              onClick={() => setCurrentIdx(prev => Math.min(selectedExam.exercises.length - 1, prev + 1))}
              disabled={currentIdx === selectedExam.exercises.length - 1}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
            >
              <span>Siguiente</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirmSubmit && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-400" />
                <span>¿Entregar y Corregir Examen?</span>
              </h3>

              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 text-xs space-y-2">
                <div className="flex justify-between text-slate-300">
                  <span>Preguntas respondidas:</span>
                  <span className="font-bold text-emerald-400">
                    {Object.values(answers).filter(a => a.trim().length > 0).length} de {selectedExam.exercises.length}
                  </span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Preguntas marcadas para revisar:</span>
                  <span className="font-bold text-amber-400">
                    {Object.values(flags).filter(f => f).length}
                  </span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Tiempo restante:</span>
                  <span className="font-mono text-white font-bold">{formatTimer(timeLeft)}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowConfirmSubmit(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 border border-slate-700 cursor-pointer"
                >
                  Seguir revisando
                </button>
                <button
                  onClick={handleSubmitExam}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2 rounded-xl transition-all shadow-lg shadow-emerald-600/30 cursor-pointer"
                >
                  Sí, entregar ahora
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Post-Exam Results Screen
  if (examSubmitted && examResult && selectedExam) {
    return (
      <div className="space-y-6">
        {/* Score Card Header */}
        <div className={`p-6 sm:p-8 rounded-2xl border shadow-2xl ${
          examResult.passed 
            ? 'bg-gradient-to-br from-emerald-950/60 to-slate-900 border-emerald-500/50' 
            : 'bg-gradient-to-br from-rose-950/60 to-slate-900 border-rose-500/50'
        }`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider inline-block mb-2 ${
                examResult.passed ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
              }`}>
                {examResult.passed ? '🎉 ¡EXAMEN APROBADO!' : '⚠️ EXAMEN NO APROBADO'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {selectedExam.title}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Tiempo empleado: {Math.floor(examResult.totalTimeSeconds / 60)} min {examResult.totalTimeSeconds % 60} seg
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-center bg-slate-900/80 px-6 py-4 rounded-2xl border border-slate-700">
                <span className="text-xs text-slate-400 uppercase tracking-wider block">Nota Oficial</span>
                <span className={`text-4xl font-black font-mono ${examResult.passed ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {examResult.totalScore}/{examResult.maxScore}
                </span>
                <span className="text-xs text-slate-400 block mt-1">({examResult.scorePercentage}%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Diagnostic Breakdown by Topic */}
        <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 shadow-xl">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-400" />
            <span>Desglose por Tema del Material</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {examResult.topicBreakdown.map(tb => (
              <div key={tb.unitId} className="bg-slate-900/70 p-4 rounded-xl border border-slate-700">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-semibold text-slate-200">{tb.unitTitle}</span>
                  <span className={`font-mono font-bold text-xs px-2 py-0.5 rounded ${
                    tb.percentage >= 70 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                  }`}>
                    {tb.percentage}%
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${tb.percentage >= 70 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                    style={{ width: `${tb.percentage}%` }}
                  />
                </div>
                <span className="text-[11px] text-slate-400 mt-2 block">
                  {tb.correctCount} de {tb.totalCount} correctas
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Actionable Recommendations */}
        <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 shadow-xl">
          <h3 className="text-base font-bold text-amber-300 mb-3 flex items-center gap-2">
            <span>💡</span> Recomendaciones Pedagógicas Personalizadas
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            {examResult.recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-2 bg-slate-900/60 p-3 rounded-lg border border-slate-700/60">
                <span className="text-amber-400 font-bold">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Question-by-Question Solution Review */}
        <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 shadow-xl">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            <span>Revisión Detallada de cada Ejercicio y Solución de Cátedra</span>
          </h3>

          <div className="space-y-6">
            {selectedExam.exercises.map((ex, idx) => {
              const attempt = examResult.attempts.find(a => a.exerciseId === ex.id);
              const isCorrect = !!attempt?.isCorrect;

              return (
                <div key={ex.id} className="p-5 bg-slate-900/80 rounded-xl border border-slate-700/80">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                      Ejercicio {idx + 1}: {ex.title} ({ex.points} pts)
                    </span>
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1 ${
                      isCorrect ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}>
                      {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                      <span>{isCorrect ? 'Correcto' : 'Incorrecto'}</span>
                    </span>
                  </div>

                  <div className="text-slate-200 text-sm mb-3">
                    <MathView math={ex.statement} block={ex.statement.includes('$$')} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
                    <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                      <span className="text-slate-400 block mb-0.5">Tu respuesta:</span>
                      <span className={`font-mono font-bold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {attempt?.userAnswer || '(Sin respuesta)'}
                      </span>
                    </div>
                    <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                      <span className="text-slate-400 block mb-0.5">Solución oficial de cátedra:</span>
                      <span className="font-mono font-bold text-emerald-400">
                        {ex.correctAnswer || ex.solution.finalAnswer}
                      </span>
                    </div>
                  </div>

                  {/* Diagnostic Breakdown for Incorrect Question */}
                  {!isCorrect && (() => {
                    const diag = diagnoseError(
                      attempt?.userAnswer || '', 
                      ex.correctAnswer || ex.solution.finalAnswer, 
                      { topic: ex.topic, subtopic: ex.subtopic }
                    );
                    return (
                      <div className="mt-3 p-4 bg-rose-950/20 border border-rose-500/30 rounded-xl space-y-2.5 text-xs text-rose-100">
                        <div className="font-bold text-rose-300 flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <AlertCircle className="w-4 h-4 text-rose-400" />
                            <span>Diagnóstico Pedagógico: {diag.title}</span>
                          </span>
                          <button
                            onClick={() => setStoryModalUnitId(ex.unitId)}
                            className="text-amber-300 hover:text-amber-200 bg-amber-500/15 border border-amber-500/30 px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-all"
                          >
                            <Compass className="w-3 h-3 text-amber-400" />
                            <span>Ver Cuento del Tema</span>
                          </button>
                        </div>
                        <p className="text-rose-200/90 leading-relaxed">
                          <span className="font-semibold text-rose-300">¿Dónde se produjo el desvío? </span>
                          {diag.whereItFailed}
                        </p>
                        <p className="text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded-lg border border-slate-700/50">
                          <span className="font-semibold text-amber-300">🧠 Trampa mental: </span>
                          {diag.whyBrainDidIt}
                        </p>
                        <p className="text-emerald-200/90 leading-relaxed bg-emerald-950/30 p-2.5 rounded-lg border border-emerald-500/30">
                          <span className="font-semibold text-emerald-300">🛡️ Cómo evitarlo en el examen: </span>
                          {diag.howToPreventNextTime}
                        </p>
                      </div>
                    );
                  })()}

                  {/* Step by Step Details */}
                  <details className="mt-3 text-xs text-slate-300">
                    <summary className="text-indigo-300 cursor-pointer font-semibold hover:text-indigo-200">
                      Ver procedimiento analítico completo paso a paso
                    </summary>
                    <div className="mt-3 space-y-2 pt-2 border-t border-slate-800">
                      {ex.solution.steps.map((st, i) => (
                        <div key={i} className="p-2.5 bg-slate-800/60 rounded border border-slate-700/40">
                          <span className="font-semibold text-slate-200 block mb-1">{st.text}</span>
                          {st.math && <MathView math={st.math} block />}
                        </div>
                      ))}
                    </div>
                  </details>
                </div>
              );
            })}
          </div>
        </div>

        {/* Story Modal inside Exam Review */}
        {storyModalUnitId && MATH_STORIES[storyModalUnitId] && (() => {
          const st = MATH_STORIES[storyModalUnitId];
          return (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-4 my-8 max-h-[90vh] overflow-y-auto">
                <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                      <Compass className="w-4 h-4" />
                      <span>El Cuento Matemático & Intuición</span>
                    </span>
                    <h3 className="text-xl font-extrabold text-white">
                      {st.storyTitle}
                    </h3>
                  </div>
                  <button
                    onClick={() => setStoryModalUnitId(null)}
                    className="text-slate-400 hover:text-white text-xl font-bold p-1 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div className="text-xs sm:text-sm text-slate-200 space-y-3 italic font-serif leading-relaxed border-l-2 border-amber-500/40 pl-4">
                  {st.narrative.split('\n\n').map((par, i) => (
                    <p key={i}>{par}</p>
                  ))}
                </div>

                <div className="bg-amber-950/30 border border-amber-500/30 p-3.5 rounded-xl text-xs space-y-1">
                  <span className="font-bold text-amber-300 block uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                    <span>La Metáfora Cotidiana:</span>
                  </span>
                  <p className="text-amber-100/90 leading-relaxed">
                    {st.realWorldAnalogy}
                  </p>
                </div>

                <div className="bg-slate-800/80 border border-amber-500/30 p-3 rounded-xl text-center text-xs">
                  <span className="text-amber-400 font-bold block mb-0.5">⭐ Regla de Oro:</span>
                  <span className="text-slate-200 font-semibold italic">"{st.goldenRule}"</span>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setStoryModalUnitId(null)}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer"
                  >
                    Entendido, Volver a la Revisión
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Back to selection */}
        <div className="flex justify-center pt-4">
          <button
            onClick={() => {
              setExamStarted(false);
              setExamSubmitted(false);
            }}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg cursor-pointer text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Volver a la Lista de Exámenes</span>
          </button>
        </div>
      </div>
    );
  }

  return null;
};
