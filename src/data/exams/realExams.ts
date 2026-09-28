// src/data/exams/realExams.ts
import type { Exercise } from '../../types/index';
import { unit2Inecuaciones } from '../units/unit2_inecuaciones';
import { unit4Factoreo } from '../units/unit4_factoreo';
import { unit5Lineal } from '../units/unit5_lineal';
import { unit6Sistemas } from '../units/unit6_sistemas';
import { unit7Cuadratica } from '../units/unit7_cuadratica';
import { unit8Logaritmos } from '../units/unit8_logaritmos';
import { unit9Exponenciales } from '../units/unit9_exponenciales';

export interface ExamDefinition {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  institution: string;
  department: string;
  subject: string;
  year: string;
  durationMinutes: number;
  totalPoints: number;
  passingScore: number; // typically 60% or 70%
  instructions: string[];
  exercises: Exercise[];
}

export const REAL_EXAMS: ExamDefinition[] = [
  {
    id: 'exam_unlam_tema1_10pts',
    code: 'UNLaM-2027-T1-10P',
    title: 'Examen Final Oficial — Tema 1 (Escala 10 Puntos)',
    subtitle: 'Curso de Ingreso UNLaM — Dpto. de Ciencias Económicas',
    institution: 'Universidad Nacional de La Matanza',
    department: 'Departamento de Ciencias Económicas',
    subject: 'Matemática',
    year: '2027 / 1ra Instancia',
    durationMinutes: 90,
    totalPoints: 10,
    passingScore: 7,
    instructions: [
      'Resolver los siguientes ejercicios escribiendo todos los razonamientos que justifiquen la respuesta, en forma clara y precisa.',
      'Todos los cálculos auxiliares deben figurar en la hoja, de manera prolija y clara.',
      'Se puede usar calculadora científica. NO se puede utilizar el celular.',
      'Puntaje total: 10 puntos (Aprobación con 7 o más puntos).'
    ],
    exercises: [
      {
        ...unit2Inecuaciones.exercises[0],
        id: 'exam1_ej1',
        points: 2
      },
      {
        ...unit6Sistemas.exercises[0],
        id: 'exam1_ej2',
        points: 2
      },
      {
        ...unit5Lineal.exercises[0],
        id: 'exam1_ej3',
        points: 2
      },
      {
        ...unit4Factoreo.exercises[0],
        id: 'exam1_ej4',
        points: 2
      },
      {
        ...unit9Exponenciales.exercises[0],
        id: 'exam1_ej5',
        points: 2
      }
    ]
  },
  {
    id: 'exam_unlam_tema1_100pts',
    code: 'UNLaM-2027-T1-100P',
    title: 'Examen Final Oficial — Tema 1 (Escala 100 Puntos)',
    subtitle: 'Curso de Ingreso UNLaM — Dpto. de Ciencias Económicas',
    institution: 'Universidad Nacional de La Matanza',
    department: 'Departamento de Ciencias Económicas',
    subject: 'Matemática',
    year: '2027 / 1ra Instancia',
    durationMinutes: 120,
    totalPoints: 100,
    passingScore: 70,
    instructions: [
      'Resolver los siguientes ejercicios escribiendo todos los razonamientos que justifiquen la respuesta, en forma clara y precisa.',
      'Todos los cálculos auxiliares deben figurar en la hoja, de manera prolija y clara.',
      'Se puede usar calculadora. NO se puede utilizar el celular.',
      'Puntaje total: 100 puntos (5 ejercicios de 20 puntos cada uno).'
    ],
    exercises: [
      {
        ...unit2Inecuaciones.exercises[1],
        id: 'exam2_ej1',
        points: 20
      },
      {
        ...unit5Lineal.exercises[1],
        id: 'exam2_ej2',
        points: 20
      },
      {
        ...unit6Sistemas.exercises[1],
        id: 'exam2_ej3',
        points: 20
      },
      {
        ...unit4Factoreo.exercises[1],
        id: 'exam2_ej4',
        points: 20
      },
      {
        ...unit8Logaritmos.exercises[1],
        id: 'exam2_ej5',
        points: 20
      }
    ]
  },
  {
    id: 'exam_unlam_tema2_10pts',
    code: 'UNLaM-2027-T2-10P',
    title: 'Examen Final Oficial — Tema 2 (Escala 10 Puntos)',
    subtitle: 'Curso de Ingreso UNLaM — Dpto. de Ciencias Económicas',
    institution: 'Universidad Nacional de La Matanza',
    department: 'Departamento de Ciencias Económicas',
    subject: 'Matemática',
    year: '2027 / 1ra Instancia',
    durationMinutes: 90,
    totalPoints: 10,
    passingScore: 7,
    instructions: [
      'Resolver los siguientes ejercicios escribiendo todos los razonamientos que justifiquen la respuesta, en forma clara y precisa.',
      'Todos los cálculos auxiliares deben figurar en la hoja, de manera prolija y clara.',
      'Se puede usar calculadora. NO se puede utilizar el celular.',
      'Puntaje total: 10 puntos (ejercicios de 2 puntos c/u).'
    ],
    exercises: [
      {
        ...unit2Inecuaciones.exercises[2],
        id: 'exam3_ej1',
        points: 2
      },
      {
        ...unit5Lineal.exercises[2],
        id: 'exam3_ej2',
        points: 2
      },
      {
        ...unit7Cuadratica.exercises[0],
        id: 'exam3_ej3',
        points: 2
      },
      {
        ...unit4Factoreo.exercises[2],
        id: 'exam3_ej4',
        points: 2
      },
      {
        ...unit8Logaritmos.exercises[0],
        id: 'exam3_ej5',
        points: 2
      }
    ]
  }
];
