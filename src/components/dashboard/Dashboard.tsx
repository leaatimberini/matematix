// src/components/dashboard/Dashboard.tsx
import React from 'react';
import { useUser } from '../../context/UserContext';
import { ALL_UNITS, getExerciseById, getUnitById } from '../../data/courseData';
import { 
  Trophy, 
  Flame, 
  Target, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight, 
  RotateCcw,
  Sparkles,
  Award
} from 'lucide-react';

interface DashboardProps {
  onSelectUnit: (unitId: number) => void;
  onGoToExams: () => void;
  onGoToPractice: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onSelectUnit,
  onGoToExams,
  onGoToPractice
}) => {
  const { stats, getExamReadiness } = useUser();
  const readiness = getExamReadiness();

  // Find weakest unit
  let weakestUnitId: number | null = null;
  let lowestScore = 999;
  ALL_UNITS.forEach(u => {
    const s = stats.topicMastery[u.id]?.score ?? 0;
    if (s < lowestScore) {
      lowestScore = s;
      weakestUnitId = u.id;
    }
  });

  const weakestUnit = weakestUnitId ? getUnitById(weakestUnitId) : null;

  const hours = Math.floor(stats.totalStudyTimeSeconds / 3600);
  const minutes = Math.floor((stats.totalStudyTimeSeconds % 3600) / 60);

  return (
    <div className="space-y-6">
      {/* "¿Estoy Preparado para el Examen?" Hero Card */}
      <div className="bg-gradient-to-br from-indigo-950/70 via-slate-800 to-slate-900 border border-indigo-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                <span>Índice de Preparación Real para el Examen</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              ¿Estoy preparado para el Examen Final UNLaM?
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              {readiness.details}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onGoToExams}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Hacer Simulacro de Examen</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              {weakestUnit && (
                <button
                  onClick={() => onSelectUnit(weakestUnit.id)}
                  className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Repasar Punto Débil: {weakestUnit.title.split(':')[1]}</span>
                </button>
              )}
            </div>
          </div>

          {/* Big Readiness Score Dial */}
          <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 text-center min-w-[200px] shrink-0 self-center lg:self-auto shadow-xl">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-1">
              Nivel de Dominio
            </span>
            <div className="text-5xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-300 my-1">
              {readiness.score}%
            </div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mt-1 ${
              readiness.isReady 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
            }`}>
              {readiness.label}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-2xl shadow-md">
          <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
            <Clock className="w-4 h-4 text-sky-400" />
            <span>Tiempo de Estudio</span>
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {hours > 0 ? `${hours}h ` : ''}{minutes}m
          </div>
          <span className="text-[11px] text-slate-500">Sesión persistida</span>
        </div>

        <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-2xl shadow-md">
          <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Racha de Días</span>
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {stats.streakDays} {stats.streakDays === 1 ? 'Día' : 'Días'}
          </div>
          <span className="text-[11px] text-amber-400/80 font-medium">¡Mantén el ritmo!</span>
        </div>

        <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-2xl shadow-md">
          <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Precisión</span>
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {stats.accuracyPercentage}%
          </div>
          <span className="text-[11px] text-slate-500">{stats.totalCorrect} de {stats.totalAnswered} resueltos</span>
        </div>

        <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-2xl shadow-md">
          <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
            <Trophy className="w-4 h-4 text-purple-400" />
            <span>Simulacros Rendidos</span>
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {stats.examHistory.length}
          </div>
          <span className="text-[11px] text-purple-400/80 font-medium">Modelos oficiales</span>
        </div>
      </div>

      {/* Mastery by Unit Progress */}
      <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-400" />
            <span>Dominio Curricular por Ficha de Clase</span>
          </h3>
          <span className="text-xs text-slate-400">10 Unidades Oficiales</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {ALL_UNITS.map(unit => {
            const mastery = stats.topicMastery[unit.id] || { status: 'NOT_STARTED', score: 0 };
            return (
              <div
                key={unit.id}
                onClick={() => onSelectUnit(unit.id)}
                className="p-3 bg-slate-900/60 rounded-xl border border-slate-700/60 hover:border-slate-500 transition-all cursor-pointer flex items-center justify-between gap-3 group"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-semibold text-slate-200 truncate group-hover:text-indigo-300">
                      {unit.id}. {unit.title.split(':')[1] || unit.title}
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-300 ml-2">
                      {mastery.score}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        mastery.score >= 80 ? 'bg-emerald-500' : mastery.score >= 50 ? 'bg-indigo-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${mastery.score}%` }}
                    />
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Mistake Bank ("Mis Errores") */}
      {stats.mistakeBank.length > 0 && (
        <div className="bg-slate-800/90 border border-rose-500/40 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-rose-300 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
              <span>Banco de Errores para Refuerzo ({stats.mistakeBank.length})</span>
            </h3>
            <span className="text-xs text-rose-300/80">Reintenta para dominar</span>
          </div>

          <div className="space-y-2.5">
            {stats.mistakeBank.slice(0, 4).map((m, idx) => {
              const ex = getExerciseById(m.exerciseId);
              if (!ex) return null;

              return (
                <div
                  key={idx}
                  className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div>
                    <span className="text-xs font-bold text-indigo-400 block mb-0.5">{ex.topic}</span>
                    <span className="text-xs text-slate-200 font-medium">{ex.title}</span>
                  </div>

                  <button
                    onClick={() => onSelectUnit(ex.unitId)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 rounded-lg text-xs font-bold transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reintentar</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Exam History Card */}
      {stats.examHistory.length > 0 && (
        <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 shadow-xl">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span>Historial de Evaluaciones Rendidas</span>
          </h3>

          <div className="space-y-3">
            {stats.examHistory.map(res => (
              <div
                key={res.id}
                className="bg-slate-900/70 p-4 rounded-xl border border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <span className="font-bold text-white block text-sm">{res.examTitle}</span>
                  <span className="text-slate-400">
                    Fecha: {new Date(res.timestamp).toLocaleDateString()} — Tiempo: {Math.floor(res.totalTimeSeconds / 60)}m
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-lg font-mono font-bold text-sm ${
                    res.passed ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                  }`}>
                    {res.totalScore} / {res.maxScore} ({res.scorePercentage}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
