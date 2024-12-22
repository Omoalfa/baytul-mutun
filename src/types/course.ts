import { QuestionType } from './index';

export enum CourseLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED'
}

export interface CreateCourseDto {
  title: string;
  description: string;
  level: CourseLevel;
  duration: number;
  price: number;
  image?: string;
}

export interface CreateCourseModuleDto {
  title: string;
  description: string;
  videoUrl?: string;
  audioUrl?: string;
  attachments?: string[];
  courseId: string;
  order?: number;
  questions?: CreateQuizQuestionDto[];
}

export interface CreateQuizQuestionDto {
  question: string;
  type: QuestionType;
  options: string[];
  correctAnswers: string[];
  points: number;
}
