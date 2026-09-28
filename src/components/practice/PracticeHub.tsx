// src/components/practice/PracticeHub.tsx
import React, { useState } from 'react';
import { ALL_UNITS, getAllExercises } from '../../data/courseData';
import type { Exercise } from '../../types';
import { ExercisePlayer } from '../exercises/ExercisePlayer';
import { useUser } from '../../context/UserContext';
import { 
  Play, 
  RotateCcw, 
  Layers, 
  Star, 
  Zap, 
  CheckCircle2, 
  ChevronRight,
  Filter
} from 'lucide-react';

export const PracticeHub: React.FC = () => {
  const { stats } = useUser();
  const allExercises = getAllExercises();

  const [filterMode, setFilterMode] = useState<'all' | 'unit' | 'difficulty' | 'mistakes'>('all');
  const [selectedUnitId, setSelectedUnitId] = useState<number>(1);
  const [selectedDifficulty, setSelectedDifficulty] = useState<number>(3);
  const [currentIdx, setCurrentIdx] = useState<number>(0);

  // Compute active exercise pool
  let activePool: Exercise[] = [];

  if (filterMode === 'all') {
    activePool = allExercises;
  } else if (filterMode === 'unit') {
    activePool = allExercises.filter(e => e.unitId === selectedUnitId);
  } else if (filterMode === 'difficulty') {
    activePool = allExercises.filter(e => e.difficulty === selectedDifficulty);
  } else if (filterMode === 'mistakes') {
    const mistakeIds = new Set(stats.mistakeBank.map(m => m.exerciseId));
    activePool = allExercises.filter(e => mistakeIds.has(e.id));
    if (activePool.length === 0) {
      activePool = allExercises.slice(0, 3); // fallback if no mistakes
    }
  }

  const currentExercise = activePool[currentIdx % (activePool.length || 1)];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 shadow-xl">
        <h2 className="text-2xl font-extrabold text-white mb-2 flex items-center gap-2.5">
          <span>🎯</span> Centro de Práctica y Entrenamiento Adaptativo
        </h2>
        <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
          Entrena ejercicios individuales con pistas de 5 niveles, retroalimentación diagnóstica inmediata y modo "No Entiendo".
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2.5 mt-5">
          <button
            onClick={() => { setFilterMode('all'); setCurrentIdx(0); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterMode === 'all'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Práctica Libre (Todos)
          </button>

          <button
            onClick={() => { setFilterMode('unit'); setCurrentIdx(0); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterMode === 'unit'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Por Ficha de Clase
          </button>

          <button
            onClick={() => { setFilterMode('difficulty'); setCurrentIdx(0); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterMode === 'difficulty'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Por Nivel de Dificultad
          </button>

          <button
            onClick={() => { setFilterMode('mistakes'); setCurrentIdx(0); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              filterMode === 'mistakes'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-slate-900 border border-slate-700 text-rose-300 hover:bg-slate-700'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Mis Errores ({stats.mistakeBank.length})</span>
          </button>
        </div>

        {/* Secondary Selectors */}
        {filterMode === 'unit' && (
          <div className="mt-4 pt-3 border-t border-slate-700 flex flex-wrap gap-2">
            {ALL_UNITS.map(u => (
              <button
                key={u.id}
                onClick={() => { setSelectedUnitId(u.id); setCurrentIdx(0); }}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold font-mono transition-all cursor-pointer ${
                  selectedUnitId === u.id
                    ? 'bg-indigo-500 text-white'
                    : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                Ficha {u.id}
              </button>
            ))}
          </div>
        )}

        {filterMode === 'difficulty' && (
          <div className="mt-4 pt-3 border-t border-slate-700 flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map(d => (
              <button
                key={d}
                onClick={() => { setSelectedDifficulty(d); setCurrentIdx(0); }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedDifficulty === d
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {'⭐'.repeat(d)} {d === 1 ? 'Muy fácil' : d === 2 ? 'Básico' : d === 3 ? 'Intermedio' : d === 4 ? 'Examen' : 'Desafío'}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Exercise Pool Progress & Navigator */}
      {activePool.length > 0 && currentExercise ? (
        <div className="space-y-4">
          <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl flex items-center justify-between">
            <span className="text-xs text-slate-300 font-semibold">
              Ejercicio {currentIdx + 1} de {activePool.length} en este filtro
            </span>

            <div className="flex gap-2">
              <button
                onClick={() => setCurrentIdx(prev => (prev > 0 ? prev - 1 : activePool.length - 1))}
                className="px-3 py-1 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-300 hover:text-white cursor-pointer"
              >
                Anterior
              </button>
              <button
                onClick={() => setCurrentIdx(prev => (prev + 1) % activePool.length)}
                className="px-3 py-1 bg-indigo-600 rounded-lg text-xs text-white font-bold cursor-pointer"
              >
                Siguiente
              </button>
            </div>
          </div>

          <ExercisePlayer
            key={currentExercise.id}
            exercise={currentExercise}
            showNextButton={true}
            onNext={() => setCurrentIdx(prev => (prev + 1) % activePool.length)}
          />
        </div>
      ) : (
        <div className="bg-slate-800/80 border border-slate-700 p-12 text-center rounded-2xl">
          <p className="text-slate-400 text-sm">No hay ejercicios para el filtro seleccionado.</p>
        </div>
      )}
    </div>
  );
};
