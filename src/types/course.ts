export enum CourseLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED'
}

export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  SINGLE_CHOICE = 'SINGLE_CHOICE',
  TRUE_FALSE = 'TRUE_FALSE'
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

export interface CourseModule {
  id: number;
  title: string;
  description: string;
  videoUrl?: string;
  audioUrl?: string;
  attachments: string[];
  order: number;
  questions: QuizQuestion[];
  createdAt: string;
  updatedAt: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  type: QuestionType;
  options: string[];
  correctAnswers: string[];
  points: number;
  createdAt: string;
  updatedAt: string;
}
