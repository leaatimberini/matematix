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
  RotateCcw,
  Heart
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
      <footer className="bg-slate-900 border-t border-slate-800/80 py-10 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Branding & Platform info */}
            <div className="text-center md:text-left space-y-1">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="font-extrabold text-white text-sm tracking-wide">MATEMATIX UNLaM</span>
                <span className="text-slate-600">•</span>
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 font-semibold text-[11px] border border-indigo-500/30">
                  Open Source
                </span>
              </div>
              <p className="text-slate-400 text-xs">
                Plataforma interactiva de preparación para el examen de ingreso de Matemática (Ciencias Económicas, UNLaM).
              </p>
            </div>

            {/* Author Credits Badge */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700 text-slate-300">
                <span className="text-slate-400">Desarrollado con</span>
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
                <span className="text-slate-400">por</span>
                <a
                  href="http://instagram.com/leaa.emanuel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-white hover:text-amber-300 transition-colors flex items-center gap-1.5 group"
                >
                  <span className="bg-gradient-to-r from-amber-400 to-rose-400 bg-clip-text text-transparent group-hover:underline">
                    Leaa
                  </span>
                  <span className="text-[11px] text-slate-400 group-hover:text-amber-300 font-mono">
                    (@leaa.emanuel)
                  </span>
                </a>
              </div>

              <a
                href="http://instagram.com/leaa.emanuel"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-gradient-to-tr from-amber-500/20 via-rose-500/20 to-purple-500/20 hover:from-amber-500/30 hover:via-rose-500/30 hover:to-purple-500/30 border border-rose-500/30 text-rose-300 transition-all flex items-center gap-1.5"
                title="Instagram de Leaa"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
                <span className="font-semibold text-[11px]">Instagram</span>
              </a>

              <a
                href="https://github.com/leaatimberini/matematix"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition-all flex items-center gap-1.5"
                title="Repositorio en GitHub"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
                <span className="font-semibold text-[11px]">GitHub</span>
              </a>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
            <div className="flex items-center gap-2">
              <span>Distribuido bajo Licencia MIT</span>
              <span>•</span>
              <span>Uso libre y educativo</span>
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
              <span className="font-mono">Motor Matemático Determinista v1.0</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
