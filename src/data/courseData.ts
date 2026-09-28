// src/data/courseData.ts
import type { TopicUnit, Exercise } from '../types';
import { unit1Reales } from './units/unit1_reales';
import { unit2Inecuaciones } from './units/unit2_inecuaciones';
import { unit3Polinomios } from './units/unit3_polinomios';
import { unit4Factoreo } from './units/unit4_factoreo';
import { unit5Lineal } from './units/unit5_lineal';
import { unit6Sistemas } from './units/unit6_sistemas';
import { unit7Cuadratica } from './units/unit7_cuadratica';
import { unit8Logaritmos } from './units/unit8_logaritmos';
import { unit9Exponenciales } from './units/unit9_exponenciales';
import { unit10Trigonometria } from './units/unit10_trigonometria';
import { REAL_EXAMS, ExamDefinition } from './exams/realExams';

export const ALL_UNITS: TopicUnit[] = [
  unit1Reales,
  unit2Inecuaciones,
  unit3Polinomios,
  unit4Factoreo,
  unit5Lineal,
  unit6Sistemas,
  unit7Cuadratica,
  unit8Logaritmos,
  unit9Exponenciales,
  unit10Trigonometria
];

export function getUnitById(id: number): TopicUnit | undefined {
  return ALL_UNITS.find(u => u.id === id);
}

export function getUnitBySlug(slug: string): TopicUnit | undefined {
  return ALL_UNITS.find(u => u.slug === slug);
}

export function getAllExercises(): Exercise[] {
  return ALL_UNITS.flatMap(u => u.exercises);
}

export function getExerciseById(id: string): Exercise | undefined {
  const all = getAllExercises();
  const direct = all.find(e => e.id === id);
  if (direct) return direct;

  // Search inside real exams
  for (const exam of REAL_EXAMS) {
    const fromExam = exam.exercises.find(e => e.id === id);
    if (fromExam) return fromExam;
  }
  return undefined;
}

export function getExamById(id: string): ExamDefinition | undefined {
  return REAL_EXAMS.find(e => e.id === id);
}
