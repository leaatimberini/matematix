// src/components/exercises/ExercisePlayer.tsx
import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import type { Exercise } from '../../types/index';
import { MathView } from '../common/MathView';
import { 
  verifyNumericAnswer, 
  verifyIntervalAnswer, 
  verifyCoordinateAnswer, 
  areAlgebraicExpressionsEquivalent,
  diagnoseError,
  type DetailedDiagnostic
} from '../../math/mathEngine';
import { MATH_STORIES } from '../../data/mathStories';
import { useUser } from '../../context/UserContext';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  Lightbulb, 
  AlertTriangle,
  RotateCcw,
  Sparkles,
  BookOpen,
  Info,
  Compass,
  ShieldAlert,
  Flame,
  Clock
} from 'lucide-react';

interface ExercisePlayerProps {
  exercise: Exercise;
  onCompleted?: (isCorrect: boolean, hintsUsed: number) => void;
  showNextButton?: boolean;
  onNext?: () => void;
  isExamMode?: boolean;
}

export const ExercisePlayer: React.FC<ExercisePlayerProps> = ({
  exercise,
  onCompleted,
  showNextButton = false,
  onNext,
  isExamMode = false
}) => {
  const { recordAttempt } = useUser();

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [textAnswer, setTextAnswer] = useState<string>('');
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [diagnostic, setDiagnostic] = useState<DetailedDiagnostic | null>(null);
  const [currentHintLevel, setCurrentHintLevel] = useState<number>(0); // 0 = none, 1..5
  const [showNoEntiendo, setShowNoEntiendo] = useState<boolean>(false);
  const [showStoryModal, setShowStoryModal] = useState<boolean>(false);
  const [startTime] = useState<number>(Date.now());

  const unitStory = MATH_STORIES[exercise.unitId];

  // Reset local state when exercise changes
  useEffect(() => {
    setSelectedOption(null);
    setTextAnswer('');
    setHasSubmitted(false);
    setIsCorrect(null);
    setDiagnostic(null);
    setCurrentHintLevel(0);
    setShowNoEntiendo(false);
    setShowStoryModal(false);
  }, [exercise.id]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (hasSubmitted) return;

    let correct = false;
    let userAns = '';

    if (exercise.type === 'multiple_choice' || exercise.type === 'true_false' || exercise.type === 'detect_error') {
      if (!selectedOption) return;
      const opt = exercise.options?.find(o => o.id === selectedOption);
      correct = !!opt?.isCorrect;
      userAns = opt?.text || selectedOption;

      if (!correct) {
        setDiagnostic({
          type: 'OPCION_INCORRECTA',
          title: 'Desvío Conceptual en la Opción Seleccionada',
          message: opt?.feedback || 'Elegiste una opción que contiene una trampa conceptual típica del examen de la UNLaM.',
          advice: 'Revisa con detenimiento las condiciones y restricciones del enunciado, o abre la explicación en forma de cuento.',
          whereItFailed: `Seleccionaste: "${opt?.text || selectedOption}"`,
          whyBrainDidIt: 'Esta opción suele coincidir con el resultado de omitir una regla obligatoria (como olvidar la condición de existencia, invertir signos o saltarse la tabla de signos).',
          howToPreventNextTime: 'Antes de marcar una opción, haz una verificación inversa: reemplaza el valor en la expresión original y constata si da una verdad matemática.',
          quickCheckTest: '¿Tu opción anula algún denominador o contradice el gráfico? Si produce 0 en un divisor o una raíz negativa, ¡queda automáticamente descartada!',
          storySnippet: 'En el examen no busques cuál opción se parece más a tu cálculo: busca cuál es matemáticamente infalible.'
        });
      }
    } else {
      userAns = textAnswer.trim();
      if (!userAns) return;

      const target = exercise.correctAnswer || '';
      const acceptable = exercise.acceptableAnswers || [];

      if (exercise.answerType === 'interval') {
        correct = verifyIntervalAnswer(userAns, target, acceptable);
      } else if (exercise.answerType === 'coordinate') {
        correct = verifyCoordinateAnswer(userAns, target);
      } else if (exercise.answerType === 'number' || exercise.answerType === 'fraction') {
        correct = verifyNumericAnswer(userAns, target, acceptable);
      } else if (exercise.answerType === 'expression') {
        correct = areAlgebraicExpressionsEquivalent(userAns, target) ||
                  userAns.toLowerCase().replace(/\s+/g, '') === target.toLowerCase().replace(/\s+/g, '') ||
                  acceptable.some(alt => areAlgebraicExpressionsEquivalent(userAns, alt) || userAns.toLowerCase().replace(/\s+/g, '') === alt.toLowerCase().replace(/\s+/g, ''));
      } else {
        correct = userAns.toLowerCase().replace(/\s+/g, '') === target.toLowerCase().replace(/\s+/g, '') ||
                  acceptable.some(alt => userAns.toLowerCase().replace(/\s+/g, '') === alt.toLowerCase().replace(/\s+/g, ''));
      }

      if (!correct) {
        const diag = diagnoseError(userAns, target, { topic: exercise.topic, subtopic: exercise.subtopic });
        setDiagnostic(diag);
      }
    }

    setIsCorrect(correct);
    setHasSubmitted(true);

    const elapsedSeconds = Math.round((Date.now() - startTime) / 1000);

    if (!isExamMode) {
      recordAttempt(
        exercise.unitId,
        exercise.id,
        correct,
        currentHintLevel,
        elapsedSeconds,
        userAns
      );

      if (correct) {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.8 }
        });
      }
    }

    if (onCompleted) {
      onCompleted(correct, currentHintLevel);
    }
  };

  const handleRevealHint = () => {
    if (currentHintLevel < 5) {
      setCurrentHintLevel(prev => prev + 1);
    }
  };

  const hintTitles = [
    'Pista 1: Concepto Clave',
    'Pista 2: Método Recomendado',
    'Pista 3: Primer Paso',
    'Pista 4: Procedimiento Parcial',
    'Pista 5: Solución Completa'
  ];

  return (
    <div className="bg-slate-800/95 border border-slate-700/80 rounded-2xl p-6 shadow-2xl relative">
      {/* Exercise Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-700/80">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            {exercise.topic}
          </span>
          <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
            exercise.sourceType === 'SOURCE' 
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
          }`}>
            {exercise.sourceType === 'SOURCE' ? '📌 Ejercicio de Examen Oficial' : '✏️ Práctica Generada'}
          </span>
          <span className="text-xs text-slate-400">
            Dificultad: {'⭐'.repeat(exercise.difficulty)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {unitStory && (
            <button
              type="button"
              onClick={() => setShowStoryModal(true)}
              className="text-xs font-bold text-amber-300 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
              title="Aprende la intuición de este tema narrada como un cuento"
            >
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>📖 Explicámelo como un cuento</span>
            </button>
          )}

          <div className="text-xs text-slate-400 flex items-center gap-1.5 font-mono hidden sm:flex">
            <Info className="w-3.5 h-3.5 text-slate-400" />
            <span>Fuente: {exercise.sourceReference}</span>
          </div>
        </div>
      </div>

      {/* Title & Statement */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-white mb-3">
          {exercise.title}
        </h3>
        <div className="text-slate-200 text-base leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-700/60">
          <MathView math={exercise.statement} block={exercise.statement.includes('$$')} />
        </div>
      </div>

      {/* Answer Input Section */}
      <form onSubmit={handleSubmit} className="mb-6">
        {exercise.type === 'multiple_choice' || exercise.type === 'true_false' || exercise.type === 'detect_error' ? (
          <div className="space-y-3">
            {exercise.options?.map(opt => {
              const isSelected = selectedOption === opt.id;
              let itemBorder = 'border-slate-700 hover:border-slate-500 bg-slate-900/40';
              if (isSelected) {
                itemBorder = 'border-indigo-500 bg-indigo-500/10 ring-1 ring-indigo-500';
              }
              if (hasSubmitted) {
                if (opt.isCorrect) {
                  itemBorder = 'border-emerald-500 bg-emerald-500/15 ring-1 ring-emerald-500';
                } else if (isSelected && !opt.isCorrect) {
                  itemBorder = 'border-rose-500 bg-rose-500/15 ring-1 ring-rose-500';
                }
              }

              return (
                <label
                  key={opt.id}
                  onClick={() => !hasSubmitted && setSelectedOption(opt.id)}
                  className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition-all ${itemBorder}`}
                >
                  <input
                    type="radio"
                    name={`opt-${exercise.id}`}
                    value={opt.id}
                    checked={isSelected}
                    onChange={() => !hasSubmitted && setSelectedOption(opt.id)}
                    disabled={hasSubmitted}
                    className="mt-1 accent-indigo-500"
                  />
                  <div className="flex-1 text-sm text-slate-100">
                    <span><MathView math={opt.text} /></span>
                    {opt.math && <MathView math={opt.math} className="ml-2" />}
                  </div>
                </label>
              );
            })}
          </div>
        ) : (
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Tu Respuesta ({exercise.answerType === 'interval' ? 'Intervalo, ej. (-2, 6]' : exercise.answerType === 'coordinate' ? 'Punto, ej. (2, -1)' : 'Expresión o número'}):
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={textAnswer}
                onChange={e => setTextAnswer(e.target.value)}
                disabled={hasSubmitted}
                placeholder={
                  exercise.answerType === 'interval' 
                    ? 'ej. (-2, 6] o (-inf, -5) U (-2, inf)'
                    : exercise.answerType === 'coordinate'
                    ? 'ej. (2, -1) o (-4/5, -17/5)'
                    : 'Introduce tu resultado aquí...'
                }
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white font-mono text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-70"
              />
              {!hasSubmitted && (
                <button
                  type="submit"
                  disabled={!textAnswer.trim()}
                  className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                >
                  <span>Verificar</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {textAnswer.trim() && (
              <div className="text-xs text-slate-400 flex items-center gap-2">
                <span>Vista matemática previa:</span>
                <span className="font-mono bg-slate-900/80 px-2 py-1 rounded text-indigo-300">
                  <MathView math={textAnswer} />
                </span>
              </div>
            )}
          </div>
        )}

        {/* Submit button for options if not submitted */}
        {!hasSubmitted && (exercise.type === 'multiple_choice' || exercise.type === 'true_false' || exercise.type === 'detect_error') && (
          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={() => handleSubmit()}
              disabled={!selectedOption}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
              <span>Confirmar Respuesta</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </form>

      {/* Result & Detailed Pedagogical Diagnostic Feedback Card */}
      {hasSubmitted && (
        <div className={`p-5 sm:p-6 rounded-2xl border mb-6 transition-all ${
          isCorrect 
            ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-100 shadow-lg shadow-emerald-950/20'
            : 'bg-rose-950/40 border-rose-500/50 text-rose-100 shadow-lg shadow-rose-950/20'
        }`}>
          <div className="flex items-start gap-3.5">
            {isCorrect ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
            )}
            <div className="flex-1 space-y-3">
              <h4 className="font-extrabold text-base sm:text-lg">
                {isCorrect ? '¡Excelente! Respuesta Matemáticamente Exacta' : diagnostic?.title || 'Respuesta Incorrecta'}
              </h4>

              {/* Rich Pedagogical Diagnostic Breakdown for Mistakes */}
              {!isCorrect && diagnostic && (
                <div className="space-y-3 pt-1">
                  {/* Where it failed */}
                  <div className="bg-rose-900/25 border border-rose-700/40 p-3.5 rounded-xl text-xs space-y-1">
                    <span className="font-bold text-rose-300 block uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                      <span>¿Dónde se produjo el desvío?</span>
                    </span>
                    <div className="text-rose-100/90 leading-relaxed">
                      <MathView math={diagnostic.whereItFailed} />
                    </div>
                  </div>

                  {/* Why the brain fell into it */}
                  <div className="bg-slate-900/80 border border-slate-700/80 p-3.5 rounded-xl text-xs space-y-1">
                    <span className="font-bold text-amber-300 block uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                      <span>🧠 ¿Por qué tu mente tendió a cometer este error?</span>
                    </span>
                    <div className="text-slate-300 leading-relaxed">
                      <MathView math={diagnostic.whyBrainDidIt} />
                    </div>
                  </div>

                  {/* How to prevent next time */}
                  <div className="bg-emerald-950/40 border border-emerald-500/40 p-3.5 rounded-xl text-xs space-y-1">
                    <span className="font-bold text-emerald-300 block uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
                      <span>🛡️ Cómo pensarlo para no volver a equivocarte nunca más:</span>
                    </span>
                    <div className="text-emerald-100/90 leading-relaxed">
                      <MathView math={diagnostic.howToPreventNextTime} />
                    </div>
                  </div>

                  {/* Quick 5-second check */}
                  {diagnostic.quickCheckTest && (
                    <div className="bg-indigo-950/40 border border-indigo-500/30 p-3 rounded-lg text-xs flex items-start gap-2 text-indigo-200">
                      <Clock className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-indigo-300">Chequeo de 5 segundos: </span>
                        <span><MathView math={diagnostic.quickCheckTest} /></span>
                      </div>
                    </div>
                  )}

                  {/* Story snippet / Real world analogy */}
                  {diagnostic.storySnippet && (
                    <div className="p-3 bg-amber-950/20 border border-amber-500/20 rounded-lg text-xs italic text-amber-200/90 flex items-start gap-2">
                      <Compass className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 not-italic" />
                      <span>"<MathView math={diagnostic.storySnippet} />"</span>
                    </div>
                  )}
                </div>
              )}

              {/* Correct answer display if wrong */}
              {!isCorrect && exercise.correctAnswer && (
                <div className="mt-2 text-xs bg-slate-900/90 p-3 rounded-xl border border-slate-700 flex items-center justify-between">
                  <span className="text-slate-400 font-medium">Solución esperada:</span>
                  <span className="font-mono text-emerald-400 font-bold text-sm">
                    <MathView math={exercise.correctAnswer} />
                  </span>
                </div>
              )}

              {/* Action buttons after submission */}
              <div className="mt-4 flex flex-wrap items-center gap-3 pt-2">
                {!isCorrect && (
                  <button
                    onClick={() => {
                      setHasSubmitted(false);
                      setIsCorrect(null);
                      setDiagnostic(null);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-xs font-bold text-slate-200 cursor-pointer shadow-sm transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Volver a Intentar con Mente Fresca</span>
                  </button>
                )}

                {unitStory && (
                  <button
                    onClick={() => setShowStoryModal(true)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 rounded-xl text-xs font-bold cursor-pointer transition-all"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>Ver la Historia & Analogía</span>
                  </button>
                )}

                <button
                  onClick={() => setShowNoEntiendo(true)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-300 rounded-xl text-xs font-bold cursor-pointer transition-all"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>¿No entiendo? Explicación simple</span>
                </button>

                {showNextButton && onNext && (
                  <button
                    onClick={onNext}
                    className="ml-auto bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <span>Siguiente Ejercicio</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hints Engine (5 Levels) */}
      {!isExamMode && (
        <div className="mt-6 pt-5 border-t border-slate-700/70">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Sistema de Pistas Pedagógicas ({currentHintLevel}/5)
              </span>
            </div>

            {currentHintLevel < 5 && (
              <button
                type="button"
                onClick={handleRevealHint}
                className="text-xs text-amber-300 hover:text-amber-200 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3 h-3" />
                <span>Revelar {hintTitles[currentHintLevel]}</span>
              </button>
            )}
          </div>

          {currentHintLevel > 0 && (
            <div className="space-y-2 mt-3">
              {exercise.hints.slice(0, currentHintLevel).map((hint, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/60 border border-amber-500/25 rounded-xl p-3 text-xs text-slate-200 flex items-start gap-2.5"
                >
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold font-mono text-[10px] shrink-0">
                    Nivel {idx + 1}
                  </span>
                  <div className="flex-1">
                    <span className="font-semibold text-amber-300 block mb-0.5">{hintTitles[idx]}</span>
                    <span><MathView math={hint} /></span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Complete Solution Section (Always Available After Submitting) */}
      {hasSubmitted && (
        <div className="mt-6 pt-5 border-t border-slate-700/70">
          <details className="group bg-slate-900/80 rounded-xl border border-slate-700/80 p-4">
            <summary className="text-xs font-bold text-indigo-300 uppercase tracking-wider cursor-pointer list-none flex items-center justify-between select-none">
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>Ver Procedimiento Completo Paso a Paso</span>
              </span>
              <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="mt-4 pt-3 border-t border-slate-800 space-y-3 text-xs text-slate-300">
              {exercise.solution.steps.map((st, i) => (
                <div key={i} className="p-3 bg-slate-800/60 rounded-lg border border-slate-700/50">
                  <div className="font-semibold text-slate-200 mb-1"><MathView math={st.text} /></div>
                  {st.math && <MathView math={st.math} block />}
                </div>
              ))}
              <div className="p-2.5 bg-emerald-950/40 border border-emerald-500/30 rounded-lg text-emerald-300 font-bold flex items-center justify-between">
                <span>Resultado final:</span>
                <span className="font-mono text-sm"><MathView math={exercise.solution.finalAnswer} /></span>
              </div>
            </div>
          </details>
        </div>
      )}

      {/* Dedicated Story & Intuition Modal */}
      {showStoryModal && unitStory && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                  <Compass className="w-4 h-4" />
                  <span>Aprende este tema como si fuera un cuento</span>
                </span>
                <h3 className="text-xl font-extrabold text-white">
                  {unitStory.storyTitle}
                </h3>
              </div>
              <button
                onClick={() => setShowStoryModal(false)}
                className="text-slate-400 hover:text-white text-xl font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Narrative */}
            <div className="text-xs sm:text-sm text-slate-200 space-y-3 italic font-serif leading-relaxed border-l-2 border-amber-500/40 pl-4">
              {unitStory.narrative.split('\n\n').map((par, i) => (
                <p key={i}>{par}</p>
              ))}
            </div>

            {/* Metaphor */}
            <div className="bg-amber-950/30 border border-amber-500/30 p-4 rounded-xl text-xs space-y-1">
              <span className="font-bold text-amber-300 block uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                <span>La Analogía de la Vida Real:</span>
              </span>
              <p className="text-amber-100/90 leading-relaxed">
                {unitStory.realWorldAnalogy}
              </p>
            </div>

            {/* The Why */}
            <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl text-xs space-y-3">
              <span className="font-bold text-indigo-300 block uppercase tracking-wider text-[11px]">
                💡 El Por Qué de las Fórmulas:
              </span>
              {unitStory.theWhy.slice(0, 2).map((item, i) => (
                <div key={i} className="space-y-0.5">
                  <span className="font-bold text-slate-200 block">{item.question}</span>
                  <p className="text-slate-300 leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>

            {/* Golden Rule */}
            <div className="bg-slate-800/80 border border-amber-500/30 p-3.5 rounded-xl text-center text-xs">
              <span className="text-amber-400 font-bold block mb-1">⭐ Regla de Oro:</span>
              <span className="text-slate-200 font-semibold italic">"{unitStory.goldenRule}"</span>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowStoryModal(false)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-all cursor-pointer shadow-lg shadow-indigo-600/30"
              >
                ¡Entendido! Volver al Ejercicio
              </button>
            </div>
          </div>
        </div>
      )}

      {/* "No Entiendo" Alternative Explanation Modal */}
      {showNoEntiendo && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-purple-300 flex items-center gap-2">
                <span>💡</span> Modo "No Entiendo": Explicación Alternativa
              </h3>
              <button
                onClick={() => setShowNoEntiendo(false)}
                className="text-slate-400 hover:text-white text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5 text-xs text-slate-200">
              <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
                <span className="text-amber-400 font-bold block mb-1 uppercase tracking-wider text-[11px]">Analogía Cotidiana:</span>
                <div className="leading-relaxed">
                  <MathView math={unitStory?.realWorldAnalogy || exercise.commonTraps?.[0]?.diagnosis || 'Imagina este ejercicio como una balanza de dos platos: lo que haces de un lado, debes hacerlo exactamente igual del otro.'} />
                </div>
              </div>

              <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
                <span className="text-indigo-400 font-bold block mb-1 uppercase tracking-wider text-[11px]">Estrategia Simplificada:</span>
                <div className="leading-relaxed">
                  <MathView math={exercise.hints[0]} />
                </div>
              </div>

              <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
                <span className="text-emerald-400 font-bold block mb-1 uppercase tracking-wider text-[11px]">Consejo para no equivocarse:</span>
                <div className="leading-relaxed">
                  <MathView math={exercise.hints[1]} />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowNoEntiendo(false)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer"
              >
                Entendido, volver a intentar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
