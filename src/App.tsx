// src/App.tsx
import React, { useState } from 'react';
import { useUser } from './context/UserContext';
import { ALL_UNITS, getUnitById } from './data/courseData';
import { Dashboard } from './components/dashboard/Dashboard';
import { CourseMap } from './components/dashboard/CourseMap';
import { TopicView } from './components/topic/TopicView';
import { PracticeHub } from './components/practice/PracticeHub';
import { ExamSimulator } from './components/exam/ExamSimulator';
import { TraceabilityView } from './components/common/TraceabilityView';
import { 
  Compass, 
  BookOpen, 
  Target, 
  GraduationCap, 
  ShieldCheck, 
  Flame, 
  Menu, 
  X,
  RotateCcw
} from 'lucide-react';

type NavView = 'dashboard' | 'map' | 'topic' | 'practice' | 'exam' | 'traceability';

export const AppContent: React.FC = () => {
  const { stats, getExamReadiness, resetProgress } = useUser();
  const readiness = getExamReadiness();

  const [currentView, setCurrentView] = useState<NavView>('dashboard');
  const [selectedUnitId, setSelectedUnitId] = useState<number>(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const handleSelectUnit = (unitId: number) => {
    setSelectedUnitId(unitId);
    setCurrentView('topic');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { id: 'dashboard', label: 'Mi Progreso', icon: Compass },
    { id: 'map', label: 'Mapa Curricular', icon: BookOpen },
    { id: 'practice', label: 'Entrenamiento', icon: Target },
    { id: 'exam', label: 'Simulador de Examen', icon: GraduationCap },
    { id: 'traceability', label: 'Auditoría & Fuentes', icon: ShieldCheck },
  ];

  const selectedUnit = getUnitById(selectedUnitId) || ALL_UNITS[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Global Navigation Bar */}
      <header className="bg-slate-900/90 border-b border-slate-800 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Institution */}
          <div 
            onClick={() => setCurrentView('dashboard')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-500 flex items-center justify-center text-xl shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              📐
            </div>
            <div>
              <div className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
                <span>MATEMATIX</span>
                <span className="text-xs px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">
                  UNLaM
                </span>
              </div>
              <span className="text-[10px] text-slate-400 block -mt-0.5">
                Curso de Ingreso • Cs. Económicas
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id as NavView)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Readiness & Streak Quick Pills */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/80 rounded-xl border border-slate-700/80 text-xs font-semibold">
              <Flame className="w-4 h-4 text-amber-400" />
              <span className="text-amber-300 font-mono font-bold">{stats.streakDays}</span>
              <span className="text-slate-400 text-[11px]">días racha</span>
            </div>

            <div 
              onClick={() => setCurrentView('dashboard')}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/80 hover:bg-slate-800 rounded-xl border border-slate-700/80 text-xs cursor-pointer transition-colors"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-slate-300">Preparación:</span>
              <span className="font-mono font-bold text-indigo-400">{readiness.score}%</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-4 space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id as NavView);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-3 ${
                    isActive ? 'bg-indigo-600 text-white font-bold' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'dashboard' && (
          <Dashboard
            onSelectUnit={handleSelectUnit}
            onGoToExams={() => setCurrentView('exam')}
            onGoToPractice={() => setCurrentView('practice')}
          />
        )}

        {currentView === 'map' && (
          <CourseMap
            onSelectUnit={handleSelectUnit}
            onGoToExams={() => setCurrentView('exam')}
          />
        )}

        {currentView === 'topic' && (
          <TopicView
            unit={selectedUnit}
            onBackToCourseMap={() => setCurrentView('map')}
          />
        )}

        {currentView === 'practice' && (
          <PracticeHub />
        )}

        {currentView === 'exam' && (
          <ExamSimulator />
        )}

        {currentView === 'traceability' && (
          <TraceabilityView />
        )}
      </main>

      {/* Platform Footer */}
      <footer className="bg-slate-900 border-t border-slate-800/80 py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-white">MATEMATIX UNLaM</span>
            <span>•</span>
            <span>Curso de Ingreso Universidad Nacional de La Matanza</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (window.confirm("¿Estás seguro de que deseas reiniciar tu progreso local?")) {
                  resetProgress();
                }
              }}
              className="text-slate-500 hover:text-rose-400 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar Progreso</span>
            </button>
            <span>•</span>
            <span className="text-slate-500 font-mono">Motor Matemático Determinista v1.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
