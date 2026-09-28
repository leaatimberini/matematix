// src/components/topic/TopicView.tsx
import React, { useState } from 'react';
import type { TopicUnit } from '../../types';
import { MathView } from '../common/MathView';
import { ExercisePlayer } from '../exercises/ExercisePlayer';
import { NumberLineVisualizer } from '../visualizers/NumberLineVisualizer';
import { LinearPlotter } from '../visualizers/LinearPlotter';
import { ParabolaVisualizer } from '../visualizers/ParabolaVisualizer';
import { PiecewisePlotter } from '../visualizers/PiecewisePlotter';
import { TrigCircleVisualizer } from '../visualizers/TrigCircleVisualizer';
import { 
  BookOpen, 
  HelpCircle, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight, 
  AlertCircle,
  Lightbulb,
  FileText,
  PlayCircle
} from 'lucide-react';

interface TopicViewProps {
  unit: TopicUnit;
  onBackToCourseMap?: () => void;
}

export const TopicView: React.FC<TopicViewProps> = ({ unit, onBackToCourseMap }) => {
  const [activeTab, setActiveTab] = useState<'learn' | 'explain_scratch' | 'practice'>('learn');
  const [currentExerciseIdx, setCurrentExerciseIdx] = useState<number>(0);
  const [checkpointAnswer, setCheckpointAnswer] = useState<number | null>(null);
  const [checkpointChecked, setCheckpointChecked] = useState<boolean>(false);

  const renderVisualizer = () => {
    switch (unit.visualizerType) {
      case 'number_line':
        return <NumberLineVisualizer />;
      case 'linear_plot':
        return <LinearPlotter />;
      case 'parabola':
        return <ParabolaVisualizer />;
      case 'piecewise':
        return <PiecewisePlotter />;
      case 'trig_circle':
        return <TrigCircleVisualizer />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Unit Header Banner */}
      <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-lg text-xs font-bold font-mono">
              Ficha de Clase N°{unit.id}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Manual Páginas: {unit.manualPages}
            </span>
          </div>

          {onBackToCourseMap && (
            <button
              onClick={onBackToCourseMap}
              className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>← Volver al Mapa Curricular</span>
            </button>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
          {unit.title}
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed max-w-3xl mb-4">
          {unit.subtitle}
        </p>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-700/60">
          <button
            onClick={() => setActiveTab('learn')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'learn'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-900/60 text-slate-300 hover:bg-slate-700/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Teoría & Fórmulas</span>
          </button>

          <button
            onClick={() => setActiveTab('explain_scratch')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'explain_scratch'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                : 'bg-slate-900/60 text-slate-300 hover:bg-slate-700/60'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Explícame desde Cero</span>
          </button>

          <button
            onClick={() => setActiveTab('practice')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'practice'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'bg-slate-900/60 text-slate-300 hover:bg-slate-700/60'
            }`}
          >
            <PlayCircle className="w-4 h-4" />
            <span>Ejercicios Prácticos ({unit.exercises.length})</span>
          </button>
        </div>
      </div>

      {/* TAB 1: Theory, Visualizer & Worked Examples */}
      {activeTab === 'learn' && (
        <div className="space-y-6">
          {/* Learning Objectives */}
          <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 shadow-xl">
            <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              <span>¿Qué vas a poder hacer luego de esta clase?</span>
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs text-slate-200">
              {unit.whatYouWillLearn.map((obj, i) => (
                <li key={i} className="flex items-start gap-2 bg-slate-900/50 p-2.5 rounded-lg border border-slate-700/40">
                  <span className="text-indigo-400 font-bold shrink-0">•</span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive Visualizer if available */}
          {unit.visualizerType && (
            <div>{renderVisualizer()}</div>
          )}

          {/* Key Formulas Grid */}
          <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 shadow-xl">
            <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>Fórmulas Fundamentales de Cátedra</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {unit.keyFormulas.map((kf, i) => (
                <div key={i} className="bg-slate-900/80 p-4 rounded-xl border border-slate-700/80 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-200 block mb-1">{kf.name}</span>
                    <div className="py-2 text-indigo-300 font-mono text-sm overflow-x-auto">
                      <MathView math={kf.latex} block />
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-2 pt-2 border-t border-slate-800">
                    {kf.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Theory Cards */}
          <div className="space-y-4">
            {unit.summaryTheory.map((st, i) => (
              <div key={i} className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 shadow-xl">
                <h4 className="text-base font-bold text-white mb-2">{st.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">{st.content}</p>
                {st.math && (
                  <div className="bg-slate-900/70 p-3.5 rounded-xl border border-slate-700 text-indigo-300 text-xs overflow-x-auto">
                    <MathView math={st.math} block />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Guided Worked Example */}
          <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 shadow-xl">
            <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span>✍️</span> Ejemplo Resuelto y Comentado
            </h3>
            <h4 className="text-base font-bold text-white mb-3">{unit.workedExample.title}</h4>
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700 text-slate-200 text-sm mb-4">
              <MathView math={unit.workedExample.statement} block />
            </div>

            <div className="space-y-3">
              {unit.workedExample.steps.map(st => (
                <div key={st.stepNumber} className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/60">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold font-mono text-xs">
                      Paso {st.stepNumber}
                    </span>
                    <span className="text-xs font-semibold text-slate-200">{st.title}</span>
                  </div>
                  <div className="py-1 text-slate-100 text-xs">
                    <MathView math={st.math} block />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{st.explanation}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-semibold">
              ✓ {unit.workedExample.conclusion}
            </div>
          </div>

          {/* Exam Tips */}
          <div className="bg-slate-800/90 border border-amber-500/40 rounded-2xl p-6 shadow-xl">
            <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <span>Consejos Clave para el Examen Real UNLaM</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              {unit.examTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-700/60">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* TAB 2: Explain from Scratch (9 Questions & Checkpoint) */}
      {activeTab === 'explain_scratch' && (
        <div className="space-y-6">
          <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 shadow-xl">
            <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-bold uppercase tracking-wider inline-block mb-2">
              Modo Didáctico Paso a Paso
            </span>
            <h2 className="text-xl font-bold text-white mb-1">
              "Explícame desde Cero": Desglose en 9 Preguntas Esenciales
            </h2>
            <p className="text-xs text-slate-400">
              Aprende el sentido intuitivo, por qué existe y cómo resolver este tema sin frustración.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-800/90 border border-slate-700 p-5 rounded-2xl shadow-lg">
              <span className="text-indigo-400 font-bold block mb-1 text-[11px] uppercase">1. ¿Qué es exactamente?</span>
              <p className="text-slate-200 leading-relaxed">{unit.explainFromScratch.whatIsIt}</p>
            </div>

            <div className="bg-slate-800/90 border border-slate-700 p-5 rounded-2xl shadow-lg">
              <span className="text-indigo-400 font-bold block mb-1 text-[11px] uppercase">2. ¿Por qué existe y para qué sirve?</span>
              <p className="text-slate-200 leading-relaxed">{unit.explainFromScratch.whyExists}</p>
            </div>

            <div className="bg-slate-800/90 border border-slate-700 p-5 rounded-2xl shadow-lg">
              <span className="text-indigo-400 font-bold block mb-1 text-[11px] uppercase">3. ¿Qué significa el resultado?</span>
              <p className="text-slate-200 leading-relaxed">{unit.explainFromScratch.whatMeans}</p>
            </div>

            <div className="bg-slate-800/90 border border-slate-700 p-5 rounded-2xl shadow-lg">
              <span className="text-indigo-400 font-bold block mb-1 text-[11px] uppercase">4. ¿Cuándo se utiliza?</span>
              <p className="text-slate-200 leading-relaxed">{unit.explainFromScratch.whenUsed}</p>
            </div>

            <div className="bg-slate-800/90 border border-slate-700 p-5 rounded-2xl shadow-lg">
              <span className="text-indigo-400 font-bold block mb-1 text-[11px] uppercase">5. ¿Cómo se reconoce en un ejercicio?</span>
              <p className="text-slate-200 leading-relaxed">{unit.explainFromScratch.howRecognized}</p>
            </div>

            <div className="bg-slate-800/90 border border-slate-700 p-5 rounded-2xl shadow-lg">
              <span className="text-indigo-400 font-bold block mb-1 text-[11px] uppercase">6. ¿Qué fórmula o método corresponde?</span>
              <p className="text-slate-200 leading-relaxed font-mono text-[11px] bg-slate-900/60 p-2 rounded">
                {unit.explainFromScratch.correspondingFormula}
              </p>
            </div>

            <div className="bg-slate-800/90 border border-slate-700 p-5 rounded-2xl shadow-lg">
              <span className="text-indigo-400 font-bold block mb-1 text-[11px] uppercase">7. ¿Cómo se aplica paso a paso?</span>
              <p className="text-slate-200 leading-relaxed">{unit.explainFromScratch.howApplied}</p>
            </div>

            <div className="bg-slate-800/90 border border-slate-700 p-5 rounded-2xl shadow-lg">
              <span className="text-rose-400 font-bold block mb-1 text-[11px] uppercase">8. ¿Qué errores suelen ocurrir?</span>
              <p className="text-slate-200 leading-relaxed">{unit.explainFromScratch.commonMistakes}</p>
            </div>
          </div>

          <div className="bg-slate-800/90 border border-amber-500/40 p-5 rounded-2xl shadow-lg text-xs">
            <span className="text-amber-400 font-bold block mb-1 text-[11px] uppercase">9. ¿Cómo aparece en el examen de la UNLaM?</span>
            <p className="text-slate-200 leading-relaxed">{unit.explainFromScratch.howAppearsInExam}</p>
          </div>

          {/* Checkpoint Question */}
          <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 shadow-xl">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
              Control de Comprensión Inmediato
            </span>
            <h3 className="text-sm font-bold text-white mb-4">
              {unit.explainFromScratch.checkpointQuestion.question}
            </h3>

            <div className="space-y-2.5">
              {unit.explainFromScratch.checkpointQuestion.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCheckpointAnswer(idx);
                    setCheckpointChecked(true);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all cursor-pointer ${
                    checkpointAnswer === idx
                      ? opt.isCorrect
                        ? 'bg-emerald-500/15 border-emerald-500 text-white'
                        : 'bg-rose-500/15 border-rose-500 text-white'
                      : 'bg-slate-900/60 border-slate-700 hover:border-slate-500 text-slate-200'
                  }`}
                >
                  <div className="font-semibold">{opt.text}</div>
                  {checkpointChecked && checkpointAnswer === idx && (
                    <p className={`mt-2 pt-2 border-t text-[11px] ${opt.isCorrect ? 'text-emerald-300 border-emerald-500/30' : 'text-rose-300 border-rose-500/30'}`}>
                      {opt.explanation}
                    </p>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Exercise Practice Ladder */}
      {activeTab === 'practice' && (
        <div className="space-y-6">
          <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-5 shadow-xl flex items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-slate-400">Progreso en esta unidad:</span>
              <div className="text-sm font-bold text-white">
                Ejercicio {currentExerciseIdx + 1} de {unit.exercises.length}
              </div>
            </div>

            <div className="flex gap-2">
              {unit.exercises.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentExerciseIdx(i)}
                  className={`w-8 h-8 rounded-lg font-mono text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                    i === currentExerciseIdx
                      ? 'bg-indigo-600 text-white ring-2 ring-indigo-400'
                      : 'bg-slate-900 border border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          <ExercisePlayer
            key={unit.exercises[currentExerciseIdx].id}
            exercise={unit.exercises[currentExerciseIdx]}
            showNextButton={currentExerciseIdx < unit.exercises.length - 1}
            onNext={() => setCurrentExerciseIdx(prev => prev + 1)}
          />
        </div>
      )}
    </div>
  );
};
