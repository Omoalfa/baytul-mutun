// User Types
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  avatar: string;
  image: string;
  role: 'student' | 'instructor' | 'admin';
  isVerified?: boolean;
}

export enum CourseLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
}

export enum CourseStatus {
  DRAFT = 'draft',
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
}

// Course Types
export interface Course {
  id: number;
  title: string;
  description: string;
  level: CourseLevel;
  duration: number;
  enrolledStudents: number;
  moduleCount: number;
  price: number;
  image?: string;
  imagePublicId?: string;
  isPublished: boolean;
  instructorId: number;
  instructor: User;
  prerequisites: string[];
  objectives: string[];
  rating: number;
  reviewCount: number;
  status: CourseStatus;
  modules?: CourseModule[];
}

export interface EnrolledCourse {
  id: number;
  grade: number;
  progress: number;
  courseId: number;
  currentModuleId?: number;
  currentModule?: CourseModule;
  studentId: number;
  student: User;
  course: Course;
  modules: UserCourseModule[];
}

export interface CourseModule {
  id: number;
  title: string;
  description: string;
  order: number;
  content: string;
  duration: number;
  videoUrl?: string;
  audioUrl?: string;
  attachments: string[];
  courseId: number;
  course?: Course;
  quizQuestions?: QuizQuestion[];
}

export interface UserCourseModule {
  id: number;
  moduleId: number;
  module: CourseModule;
  enrolledCourseId: number;
  enrolledCourse: EnrolledCourse;
  progress: number;
  grade?: number;
  status: 'not_started' | 'in_progress' | 'completed';
  lastAccessedAt?: Date;
  attemptedQuestions?: {
    questionId: number;
    userAnswer?: string[];
    isCorrect?: boolean;
    attemptedAt: Date;
  }[];
  totalScore?: number;
  maxPossibleScore?: number;
}

export enum QuestionType {
  SINGLE_CHOICE = 'SINGLE_CHOICE',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TRUE_FALSE = 'TRUE_FALSE',
  SHORT_ANSWER = 'SHORT_ANSWER',
}

export interface QuizQuestion {
  id: number;
  question: string;
  type: QuestionType;
  options: string[];
  correctAnswers: string[];
  point: number;
  explanation?: string;
  isActive: boolean;
  moduleId: number;
  module?: CourseModule;
}

// Instructor Types
export interface InstructorExperience {
  organization: string;
  title: string;
  start_year: number;
  end_year: number;
  current: boolean;
}

export interface InstructorEducation {
  institution: string;
  degree: string;
  field_of_study: string;
  start_year: number;
  end_year: number;
  current: boolean;
}

export interface InstructorBio {
  summary: string;
  isVerified: boolean;
  qualifications: string[];
  education: InstructorEducation[];
  experience: InstructorExperience[];
  specializations: string[];
  userId: number;
  user?: User;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
