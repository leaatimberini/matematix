// src/components/dashboard/CourseMap.tsx
import React from 'react';
import { ALL_UNITS } from '../../data/courseData';
import { useUser } from '../../context/UserContext';
import type { MasteryStatus } from '../../types/index';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Sparkles, 
  ChevronRight,
  GraduationCap
} from 'lucide-react';

interface CourseMapProps {
  onSelectUnit: (unitId: number) => void;
  onGoToExams: () => void;
}

export const CourseMap: React.FC<CourseMapProps> = ({ onSelectUnit, onGoToExams }) => {
  const { stats } = useUser();

  const getStatusBadge = (status: MasteryStatus, score: number) => {
    switch (status) {
      case 'EXAM_READY':
        return (
          <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Listo para Examen ({score}%)</span>
          </span>
        );
      case 'MASTERED':
        return (
          <span className="px-2.5 py-1 bg-teal-500/20 text-teal-400 border border-teal-500/30 rounded-lg text-xs font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Dominado ({score}%)</span>
          </span>
        );
      case 'IMPROVING':
        return (
          <span className="px-2.5 py-1 bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-lg text-xs font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Avanzando ({score}%)</span>
          </span>
        );
      case 'WEAK':
        return (
          <span className="px-2.5 py-1 bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-lg text-xs font-bold flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Necesita Repaso ({score}%)</span>
          </span>
        );
      case 'LEARNING':
      case 'PRACTICING':
        return (
          <span className="px-2.5 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-lg text-xs font-semibold flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>En Práctica ({score}%)</span>
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 bg-slate-800 text-slate-400 border border-slate-700 rounded-lg text-xs font-medium">
            Por Iniciar
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-xl">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
          Ruta Curricular y Mapa del Curso
        </h2>
        <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
          Estructura secuencial completa de las 10 Fichas de Clase oficiales del Curso de Ingreso UNLaM (Ciencias Económicas) que culmina en el Simulador de Examen Real.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ALL_UNITS.map(unit => {
          const mastery = stats.topicMastery[unit.id] || { status: 'NOT_STARTED', score: 0 };
          return (
            <div
              key={unit.id}
              onClick={() => onSelectUnit(unit.id)}
              className="bg-slate-800/90 border border-slate-700/80 hover:border-indigo-500/60 rounded-2xl p-5 transition-all hover:shadow-xl hover:shadow-indigo-500/10 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="px-2.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-indigo-400">
                    Ficha N°{unit.id}
                  </span>
                  {getStatusBadge(mastery.status, mastery.score)}
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors mb-1">
                  {unit.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                  {unit.subtitle}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {unit.keywords.slice(0, 3).map((kw, i) => (
                    <span key={i} className="text-[10px] bg-slate-900/60 px-2 py-0.5 rounded text-slate-400 border border-slate-800">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
                <span>{unit.exercises.length} ejercicios verificados</span>
                <span className="text-indigo-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                  <span>Estudiar</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Culmination Exam Card */}
      <div 
        onClick={onGoToExams}
        className="bg-gradient-to-r from-amber-950/60 via-slate-800 to-indigo-950/60 border border-amber-500/40 hover:border-amber-400 rounded-2xl p-6 transition-all hover:shadow-xl hover:shadow-amber-500/10 cursor-pointer flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              Meta Final: Simulador de Examen Real UNLaM
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Pon a prueba todo lo aprendido con los 3 modelos oficiales reales de evaluación y cronómetro activo.
            </p>
          </div>
        </div>

        <button className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-md shadow-amber-500/30 flex items-center gap-1.5 shrink-0 cursor-pointer">
          <span>Ir a Simulacros</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
