// Course Types
export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  image: string;
  enrolledStudents?: number;
  price?: number;
  curriculum?: CurriculumItem[];
}

export interface CurriculumItem {
  id: string;
  title: string;
  duration: string;
  content: string;
}

// Instructor Types
export interface Instructor {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  expertise?: string[];
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

// Donation Types
export interface DonationOption {
  id: string;
  title: string;
  amount: number;
  description: string;
  benefits: string[];
}

// About Page Types
export interface AboutContent {
  mission: string;
  vision: string;
  story: string;
  founder: {
    name: string;
    message: string;
    image: string;
  };
  team: Instructor[];
  values: {
    title: string;
    description: string;
    icon?: string;
  }[];
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
