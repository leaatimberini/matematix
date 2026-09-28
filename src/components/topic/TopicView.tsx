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
import { MATH_STORIES } from '../../data/mathStories';
import { 
  BookOpen, 
  HelpCircle, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight, 
  AlertCircle,
  Lightbulb,
  FileText,
  PlayCircle,
  Compass,
  ShieldAlert,
  ArrowRight,
  Flame,
  Award
} from 'lucide-react';

interface TopicViewProps {
  unit: TopicUnit;
  onBackToCourseMap?: () => void;
}

export const TopicView: React.FC<TopicViewProps> = ({ unit, onBackToCourseMap }) => {
  const [activeTab, setActiveTab] = useState<'story' | 'explain_scratch' | 'learn' | 'practice'>('story');
  const [currentExerciseIdx, setCurrentExerciseIdx] = useState<number>(0);
  const [checkpointAnswer, setCheckpointAnswer] = useState<number | null>(null);
  const [checkpointChecked, setCheckpointChecked] = useState<boolean>(false);

  const story = MATH_STORIES[unit.id];

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
            onClick={() => setActiveTab('story')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'story'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30 ring-1 ring-amber-400'
                : 'bg-slate-900/60 text-slate-300 hover:bg-slate-700/60'
            }`}
          >
            <Compass className="w-4 h-4 text-amber-300" />
            <span>📖 El Cuento & Intuición</span>
          </button>

          <button
            onClick={() => setActiveTab('explain_scratch')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'explain_scratch'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 ring-1 ring-purple-400'
                : 'bg-slate-900/60 text-slate-300 hover:bg-slate-700/60'
            }`}
          >
            <Sparkles className="w-4 h-4 text-purple-300" />
            <span>Desglose en 9 Preguntas</span>
          </button>

          <button
            onClick={() => setActiveTab('learn')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'learn'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400'
                : 'bg-slate-900/60 text-slate-300 hover:bg-slate-700/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Teoría & Fórmulas</span>
          </button>

          <button
            onClick={() => setActiveTab('practice')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'practice'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-1 ring-emerald-400'
                : 'bg-slate-900/60 text-slate-300 hover:bg-slate-700/60'
            }`}
          >
            <PlayCircle className="w-4 h-4" />
            <span>Ejercicios Prácticos ({unit.exercises.length})</span>
          </button>
        </div>
      </div>

      {/* TAB 0: El Cuento Matemático & Intuición desde Cero */}
      {activeTab === 'story' && story && (
        <div className="space-y-6">
          {/* Main Story Narrative Card */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950/70 border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none text-amber-300">
              <Compass className="w-48 h-48" />
            </div>

            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Storytelling Matemático • Aprender desde Cero</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-200 mb-4 tracking-tight">
              {story.storyTitle}
            </h2>

            <div className="prose prose-invert max-w-none text-slate-200 text-sm sm:text-base leading-relaxed space-y-4 border-l-2 border-amber-500/40 pl-4 sm:pl-6 italic font-serif">
              {story.narrative.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Real World Analogy Box */}
            <div className="mt-6 bg-amber-950/30 border border-amber-500/40 rounded-xl p-4 sm:p-5 flex items-start gap-3.5 not-italic font-sans">
              <div className="p-2 rounded-lg bg-amber-500/20 text-amber-300 shrink-0 mt-0.5">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
                  La Metáfora Cotidiana (Cómo imaginártelo en la vida diaria):
                </h4>
                <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
                  {story.realWorldAnalogy}
                </p>
              </div>
            </div>
          </div>

          {/* The "Why" - Desarmando el misterio de las fórmulas */}
          <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-5 h-5 text-rose-400" />
              <h3 className="text-lg font-bold text-white">
                El "Por Qué": Entendiendo la Lógica Profunda (Sin magia)
              </h3>
            </div>
            <p className="text-xs text-slate-300 mb-6">
              Las fórmulas no cayeron del cielo ni son un capricho para hacerte sufrir en el examen: cada una nació para resolver una necesidad lógica irremediable.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {story.theWhy.map((item, idx) => (
                <div key={idx} className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-5 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-indigo-300 mb-2.5 flex items-start gap-2">
                      <span className="text-indigo-400 font-mono text-xs">P{idx + 1}.</span>
                      <span><MathView math={item.question} /></span>
                    </h4>
                    <div className="text-xs text-slate-300 leading-relaxed">
                      <MathView math={item.answer} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* The "How" - Los Pasos Mentales Intuitivos */}
          <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-bold text-white">
                El "Cómo": La Secuencia Mental para Resolver Cualquier Ejercicio
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {story.theHowIntuitive.map((st) => (
                <div key={st.step} className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-5 relative">
                  <span className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold font-mono text-xs flex items-center justify-center mb-3">
                    {st.step}
                  </span>
                  <h4 className="text-sm font-bold text-slate-100 mb-2">
                    {st.title}
                  </h4>
                  <div className="text-xs text-slate-300 leading-relaxed">
                    <MathView math={st.description} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Golden Rule Card */}
          <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-amber-950/60 border border-amber-500/50 rounded-2xl p-6 shadow-xl text-center">
            <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-xs font-bold uppercase tracking-wider inline-block mb-2">
              ⭐ La Regla de Oro Inolvidable
            </span>
            <div className="text-base sm:text-lg font-bold text-amber-200 max-w-3xl mx-auto leading-relaxed">
              "<MathView math={story.goldenRule} />"
            </div>
          </div>

          {/* UNLaM Trap Map */}
          <div className="bg-slate-800/90 border border-rose-500/30 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
              <h3 className="text-lg font-bold text-white">
                Mapa de Trampas Mentales del Examen UNLaM (Donde cae el 80%)
              </h3>
            </div>
            <p className="text-xs text-slate-300 mb-6">
              El examen no premia memorizar; está diseñado para detectar confusiones conceptuales típicas. Así es como tu cerebro tiende a equivocarse y el escudo para que nunca te pase:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {story.unlamTrapMap.map((trap, idx) => (
                <div key={idx} className="bg-slate-900/90 border border-rose-500/30 rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-rose-300 font-bold text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span><MathView math={trap.trapTitle} /></span>
                  </div>

                  <div className="bg-rose-950/20 border border-rose-900/40 p-3 rounded-lg text-xs text-rose-200">
                    <span className="font-semibold block mb-0.5 text-rose-400">Error clásico:</span>
                    <MathView math={trap.commonMistake} />
                  </div>

                  <div className="text-xs text-slate-300">
                    <span className="font-semibold text-slate-200 block mb-0.5">🧠 ¿Por qué la mente cae en esto?</span>
                    <MathView math={trap.whyBrainFalls} />
                  </div>

                  <div className="bg-emerald-950/30 border border-emerald-500/30 p-3 rounded-lg text-xs text-emerald-200">
                    <span className="font-semibold text-emerald-400 block mb-0.5">🛡️ Cómo evitarlo (El antídoto):</span>
                    <MathView math={trap.howToAvoid} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick CTA to Practice */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-indigo-950/40 border border-indigo-500/30 rounded-2xl">
            <div>
              <h4 className="text-sm font-bold text-white">¿Entendiste la historia y el concepto fundamental?</h4>
              <p className="text-xs text-slate-300">Da el siguiente paso: mira las fórmulas formales de cátedra o lánzate a los ejercicios de examen.</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('learn')}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-600 transition-all cursor-pointer"
              >
                Ver Fórmulas Formales
              </button>
              <button
                onClick={() => setActiveTab('practice')}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Practicar Ejercicios</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

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
                  <span><MathView math={obj} /></span>
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
                  <div className="text-xs text-slate-400 mt-2 pt-2 border-t border-slate-800">
                    <MathView math={kf.description} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Theory Cards */}
          <div className="space-y-4">
            {unit.summaryTheory.map((st, i) => (
              <div key={i} className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 shadow-xl">
                <h4 className="text-base font-bold text-white mb-2">{st.title}</h4>
                <div className="text-xs text-slate-300 leading-relaxed mb-3">
                  <MathView math={st.content} />
                </div>
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
                  <div className="text-xs text-slate-400 mt-1">
                    <MathView math={st.explanation} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-semibold flex items-center gap-2">
              <span>✓</span>
              <MathView math={unit.workedExample.conclusion} />
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
                  <span className="flex-1"><MathView math={tip} /></span>
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
            <span className="px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-lg text-xs font-bold uppercase tracking-wider inline-block mb-2">
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
              <div className="text-slate-200 leading-relaxed"><MathView math={unit.explainFromScratch.whatIsIt} /></div>
            </div>

            <div className="bg-slate-800/90 border border-slate-700 p-5 rounded-2xl shadow-lg">
              <span className="text-indigo-400 font-bold block mb-1 text-[11px] uppercase">2. ¿Por qué existe y para qué sirve?</span>
              <div className="text-slate-200 leading-relaxed"><MathView math={unit.explainFromScratch.whyExists} /></div>
            </div>

            <div className="bg-slate-800/90 border border-slate-700 p-5 rounded-2xl shadow-lg">
              <span className="text-indigo-400 font-bold block mb-1 text-[11px] uppercase">3. ¿Qué significa el resultado?</span>
              <div className="text-slate-200 leading-relaxed"><MathView math={unit.explainFromScratch.whatMeans} /></div>
            </div>

            <div className="bg-slate-800/90 border border-slate-700 p-5 rounded-2xl shadow-lg">
              <span className="text-indigo-400 font-bold block mb-1 text-[11px] uppercase">4. ¿Cuándo se utiliza?</span>
              <div className="text-slate-200 leading-relaxed"><MathView math={unit.explainFromScratch.whenUsed} /></div>
            </div>

            <div className="bg-slate-800/90 border border-slate-700 p-5 rounded-2xl shadow-lg">
              <span className="text-indigo-400 font-bold block mb-1 text-[11px] uppercase">5. ¿Cómo se reconoce en un ejercicio?</span>
              <div className="text-slate-200 leading-relaxed"><MathView math={unit.explainFromScratch.howRecognized} /></div>
            </div>

            <div className="bg-slate-800/90 border border-slate-700 p-5 rounded-2xl shadow-lg">
              <span className="text-indigo-400 font-bold block mb-1 text-[11px] uppercase">6. ¿Qué fórmula o método corresponde?</span>
              <div className="text-slate-200 leading-relaxed font-mono text-[11px] bg-slate-900/60 p-2 rounded overflow-x-auto">
                <MathView math={unit.explainFromScratch.correspondingFormula} block={unit.explainFromScratch.correspondingFormula.includes('$$')} />
              </div>
            </div>

            <div className="bg-slate-800/90 border border-slate-700 p-5 rounded-2xl shadow-lg">
              <span className="text-indigo-400 font-bold block mb-1 text-[11px] uppercase">7. ¿Cómo se aplica paso a paso?</span>
              <div className="text-slate-200 leading-relaxed"><MathView math={unit.explainFromScratch.howApplied} /></div>
            </div>

            <div className="bg-slate-800/90 border border-slate-700 p-5 rounded-2xl shadow-lg">
              <span className="text-rose-400 font-bold block mb-1 text-[11px] uppercase">8. ¿Qué errores suelen ocurrir?</span>
              <div className="text-slate-200 leading-relaxed"><MathView math={unit.explainFromScratch.commonMistakes} /></div>
            </div>
          </div>

          <div className="bg-slate-800/90 border border-amber-500/40 p-5 rounded-2xl shadow-lg text-xs">
            <span className="text-amber-400 font-bold block mb-1 text-[11px] uppercase">9. ¿Cómo aparece en el examen de la UNLaM?</span>
            <div className="text-slate-200 leading-relaxed"><MathView math={unit.explainFromScratch.howAppearsInExam} /></div>
          </div>

          {/* Checkpoint Question */}
          <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 shadow-xl">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
              Control de Comprensión Inmediato
            </span>
            <h3 className="text-sm font-bold text-white mb-4">
              <MathView math={unit.explainFromScratch.checkpointQuestion.question} />
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
                  <div className="font-semibold"><MathView math={opt.text} /></div>
                  {checkpointChecked && checkpointAnswer === idx && (
                    <div className={`mt-2 pt-2 border-t text-[11px] ${opt.isCorrect ? 'text-emerald-300 border-emerald-500/30' : 'text-rose-300 border-rose-500/30'}`}>
                      <MathView math={opt.explanation} />
                    </div>
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
