// src/context/UserContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserStats, MasteryStatus, ExamResult } from '../types';
import { ALL_UNITS } from '../data/courseData';

const STORAGE_KEY = 'matematix_unlam_user_stats_v1';

const defaultStats: UserStats = {
  totalStudyTimeSeconds: 0,
  streakDays: 1,
  lastStudyDate: new Date().toISOString().split('T')[0],
  totalAnswered: 0,
  totalCorrect: 0,
  accuracyPercentage: 0,
  topicMastery: {
    1: { status: 'NOT_STARTED', score: 0, attemptCount: 0, correctCount: 0, hintsUsedCount: 0, lastPracticed: 0 },
    2: { status: 'NOT_STARTED', score: 0, attemptCount: 0, correctCount: 0, hintsUsedCount: 0, lastPracticed: 0 },
    3: { status: 'NOT_STARTED', score: 0, attemptCount: 0, correctCount: 0, hintsUsedCount: 0, lastPracticed: 0 },
    4: { status: 'NOT_STARTED', score: 0, attemptCount: 0, correctCount: 0, hintsUsedCount: 0, lastPracticed: 0 },
    5: { status: 'NOT_STARTED', score: 0, attemptCount: 0, correctCount: 0, hintsUsedCount: 0, lastPracticed: 0 },
    6: { status: 'NOT_STARTED', score: 0, attemptCount: 0, correctCount: 0, hintsUsedCount: 0, lastPracticed: 0 },
    7: { status: 'NOT_STARTED', score: 0, attemptCount: 0, correctCount: 0, hintsUsedCount: 0, lastPracticed: 0 },
    8: { status: 'NOT_STARTED', score: 0, attemptCount: 0, correctCount: 0, hintsUsedCount: 0, lastPracticed: 0 },
    9: { status: 'NOT_STARTED', score: 0, attemptCount: 0, correctCount: 0, hintsUsedCount: 0, lastPracticed: 0 },
    10: { status: 'NOT_STARTED', score: 0, attemptCount: 0, correctCount: 0, hintsUsedCount: 0, lastPracticed: 0 }
  },
  mistakeBank: [],
  examHistory: []
};

interface UserContextType {
  stats: UserStats;
  recordAttempt: (unitId: number, exerciseId: string, isCorrect: boolean, hintsCount: number, timeSec: number, userAns: string) => void;
  recordExamResult: (result: ExamResult) => void;
  getExamReadiness: () => { score: number; label: string; details: string; isReady: boolean };
  resetProgress: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<UserStats>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Validate today for streak
        const today = new Date().toISOString().split('T')[0];
        if (parsed.lastStudyDate !== today) {
          const diffDays = Math.round((new Date(today).getTime() - new Date(parsed.lastStudyDate).getTime()) / (1000 * 3600 * 24));
          if (diffDays === 1) {
            parsed.streakDays += 1;
          } else if (diffDays > 1) {
            parsed.streakDays = 1;
          }
          parsed.lastStudyDate = today;
        }
        return { ...defaultStats, ...parsed };
      }
    } catch (e) {
      console.error("Failed to load user stats from localStorage", e);
    }
    return defaultStats;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    } catch (e) {
      console.error("Failed to save stats to localStorage", e);
    }
  }, [stats]);

  const recordAttempt = (
    unitId: number,
    exerciseId: string,
    isCorrect: boolean,
    hintsCount: number,
    timeSec: number,
    userAns: string
  ) => {
    setStats(prev => {
      const currentTopic = prev.topicMastery[unitId] || {
        status: 'NOT_STARTED' as MasteryStatus,
        score: 0,
        attemptCount: 0,
        correctCount: 0,
        hintsUsedCount: 0,
        lastPracticed: 0
      };

      const newAttempts = currentTopic.attemptCount + 1;
      const newCorrect = currentTopic.correctCount + (isCorrect ? 1 : 0);
      const newHints = currentTopic.hintsUsedCount + hintsCount;
      const now = Date.now();

      // Calculate new score (0-100)
      const rawRatio = newAttempts > 0 ? (newCorrect / newAttempts) : 0;
      const penalty = Math.min(0.3, (newHints / (newAttempts * 5)) * 0.3);
      let calculatedScore = Math.round(Math.max(0, (rawRatio - penalty)) * 100);

      // Status determination
      let status: MasteryStatus = currentTopic.status;
      if (newAttempts === 1) {
        status = 'LEARNING';
      } else if (newAttempts >= 2 && calculatedScore < 50) {
        status = 'WEAK';
      } else if (newAttempts >= 2 && calculatedScore >= 50 && calculatedScore < 75) {
        status = 'IMPROVING';
      } else if (newAttempts >= 3 && calculatedScore >= 75 && calculatedScore < 90) {
        status = 'MASTERED';
      } else if (newAttempts >= 4 && calculatedScore >= 90) {
        status = 'EXAM_READY';
      } else {
        status = 'PRACTICING';
      }

      // Update mistake bank
      let newMistakes = [...prev.mistakeBank];
      if (!isCorrect) {
        const existing = newMistakes.find(m => m.exerciseId === exerciseId);
        if (existing) {
          existing.failedCount += 1;
          existing.lastAttemptAnswer = userAns;
          existing.timestamp = now;
        } else {
          newMistakes.push({
            exerciseId,
            unitId,
            failedCount: 1,
            lastAttemptAnswer: userAns,
            timestamp: now
          });
        }
      } else {
        // If resolved without heavy hints, remove from mistake bank
        if (hintsCount <= 1) {
          newMistakes = newMistakes.filter(m => m.exerciseId !== exerciseId);
        }
      }

      const totalAns = prev.totalAnswered + 1;
      const totalCorr = prev.totalCorrect + (isCorrect ? 1 : 0);
      const newAcc = Math.round((totalCorr / totalAns) * 100);

      return {
        ...prev,
        totalStudyTimeSeconds: prev.totalStudyTimeSeconds + Math.min(300, timeSec),
        totalAnswered: totalAns,
        totalCorrect: totalCorr,
        accuracyPercentage: newAcc,
        topicMastery: {
          ...prev.topicMastery,
          [unitId]: {
            status,
            score: calculatedScore,
            attemptCount: newAttempts,
            correctCount: newCorrect,
            hintsUsedCount: newHints,
            lastPracticed: now
          }
        },
        mistakeBank: newMistakes
      };
    });
  };

  const recordExamResult = (result: ExamResult) => {
    setStats(prev => ({
      ...prev,
      examHistory: [result, ...prev.examHistory]
    }));
  };

  const getExamReadiness = () => {
    // 1. Topic mastery average (40%)
    let topicSum = 0;
    ALL_UNITS.forEach(u => {
      topicSum += stats.topicMastery[u.id]?.score || 0;
    });
    const avgTopicMastery = topicSum / ALL_UNITS.length;

    // 2. Exam scores average (40%)
    let examScore = 0;
    if (stats.examHistory.length > 0) {
      const sum = stats.examHistory.reduce((acc, curr) => acc + curr.scorePercentage, 0);
      examScore = sum / stats.examHistory.length;
    } else {
      // If no exams taken yet, readiness is capped
      examScore = 0;
    }

    // 3. Accuracy & volume (20%)
    const volumeScore = Math.min(100, (stats.totalAnswered / 30) * 100);
    const activityScore = (stats.accuracyPercentage * 0.6) + (volumeScore * 0.4);

    let readiness = 0;
    if (stats.examHistory.length === 0) {
      readiness = Math.round(avgTopicMastery * 0.6 + activityScore * 0.4 * 0.5);
    } else {
      readiness = Math.round(avgTopicMastery * 0.4 + examScore * 0.4 + activityScore * 0.2);
    }

    let label = 'Preparación Inicial';
    let details = 'Comienza explorando las unidades temáticas y practicando los conceptos básicos.';
    let isReady = false;

    if (readiness >= 85) {
      label = '¡Listo para Aprobar el Examen!';
      details = 'Excelente dominio de las 10 unidades y modelos de examen UNLaM. Estás en condiciones de rendir con éxito.';
      isReady = true;
    } else if (readiness >= 70) {
      label = 'Nivel Promisorio (Zona de Aprobación)';
      details = 'Buen rendimiento general. Te recomendamos afianzar los temas débiles y completar al menos un simulacro más.';
      isReady = true;
    } else if (readiness >= 50) {
      label = 'En Proceso de Afianzamiento';
      details = 'Comprendes los conceptos principales, pero aún requieres práctica en inecuaciones racionales, factoreo o logaritmos.';
      isReady = false;
    } else if (readiness >= 25) {
      label = 'Fundamentos en Desarrollo';
      details = 'Repasa las fichas de clase, ejemplos resueltos y el modo "Explícame desde cero".';
      isReady = false;
    }

    return { score: readiness, label, details, isReady };
  };

  const resetProgress = () => {
    setStats(defaultStats);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <UserContext.Provider value={{ stats, recordAttempt, recordExamResult, getExamReadiness, resetProgress }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};
