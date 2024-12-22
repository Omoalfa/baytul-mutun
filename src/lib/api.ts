import { CourseFilters } from '@/hooks/useApi';
import { Course, ApiResponse, PaginatedResponse, User, EnrolledCourse, UserCourseModule, CourseModule, QuizQuestion } from '@/types';
import { CreateCourseDto, CreateCourseModuleDto, CreateQuizQuestionDto } from '@/types/course';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  user: any;
  token: string;
}

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

const getToken = () => {
  if (typeof window === 'undefined') {
    // Server-side
    return null;
  }
  // Client-side
  return localStorage.getItem("token");
};

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {},
  method: 'POST' | 'PATCH' | 'DELETE' | 'GET' | 'PUT' = 'GET'
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getToken();
  
  const isFormData = options.body instanceof FormData;
  
  const response = await fetch(url, {
    ...options,
    method,
    headers: {
      ...(!isFormData ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const contentType = response.headers.get('content-type');
  let responseData;
  
  if (contentType && contentType.includes('application/json')) {
    responseData = await response.json();
  } else {
    responseData = await response.text();
  }

  if (!response.ok) {
    throw new ApiError(response.status, responseData.message || responseData || 'Something went wrong');
  }

  // Wrap the response data in the ApiResponse format
  return {
    data: responseData
  };
}

async function fetchPaginatedApi<T>(
  endpoint: string,
  page: number = 1,
  limit: number = 10,
  queryParams: Record<string, string | number | boolean> = {}
): Promise<PaginatedResponse<T>> {
  const queryString = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...Object.fromEntries(
      Object.entries(queryParams)
        .filter(([_, value]) => value !== undefined && value !== null)
        .map(([key, value]) => [key, value.toString()])
    )
  }).toString();

  const url = `${API_BASE_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}${queryString}`;
  const token = getToken();

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    }
  });

  if (!response.ok) {
    const responseData = await response.json();
    throw new ApiError(response.status, responseData.message || 'Something went wrong');
  }

  const data = await response.json();
  return data;
}

export const api = {
  // Auth
  async login(data: LoginData) {
    return await fetchApi<{ user: any; token: string }>('/auth/login', {
      body: JSON.stringify(data),
    }, 'POST');
  },

  async register(data: RegisterData) {
    return await fetchApi<{ user: any; token: string }>('/auth/register', {
      body: JSON.stringify(data),
    }, 'POST');
  },

  async getProfile() {
    return await fetchApi<any>('/users/profile');
  },

  async verifyEmail(token: string) {
    return await fetchApi<{ message: string }>('/auth/verify-email?token=' + token, {
      body: JSON.stringify({ token }),
    }, 'POST');
  },

  async resendVerification(email: string) {
    return await fetchApi<{ message: string }>('/auth/resend-verification', {
      body: JSON.stringify({ email }),
    }, 'POST');
  },

  async forgotPassword(email: string) {
    return await fetchApi<{ message: string }>('/auth/forgot-password', {
      body: JSON.stringify({ email }),
    }, 'POST');
  },

  async facebookLogin(accessToken: string) {
    return await fetchApi<{ token: string }>('/auth/facebook', {
      body: JSON.stringify({ accessToken }),
    }, 'POST');
  },

  async googleLogin(accessToken: string) {
    return await fetchApi<{ token: string }>('/auth/google', {
      body: JSON.stringify({ accessToken }),
    }, 'POST');
  },

  logout() {
    localStorage.removeItem('token');
  },

  // Courses
  async getCourses(page = 1, limit = 10, filters?: { level?: string; search?: string }) {
    return await fetchPaginatedApi<Course>('/courses', page, limit, {
      level: filters?.level,
      search: filters?.search
    });
  },

  async getCourse(id: number) {
    return await fetchApi<Course>(`/courses/${id}`);
  },

  async fetchCourseModules(courseId: number) {
    return await fetchApi<CourseModule[]>(`/courses/${courseId}/modules`);
  },

  // For Instructors
  // *********************************************
  // Create Course
  async createCourse(data: CreateCourseDto & { avatar?: File }) {
    const formData = new FormData();
    
    // Append course data
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'avatar' && value instanceof File) {
        formData.append(key, value);
      } else if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key + '[]', item));
      } else if (value !== undefined) {
        formData.append(key, value.toString());
      }
    });
    
    return await fetchApi<Course>('/courses', {
      method: 'POST',
      body: formData,
    }, 'POST');
  },

  // Course Modules
  async addModuleToCourse(courseId: number, data: CreateCourseModuleDto, video?: File, audio?: File) {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    if (video) formData.append('video', video);
    if (audio) formData.append('audio', audio);

    return await fetchApi<CourseModule>(`/courses/${courseId}/module`, {
      method: 'POST',
      body: formData,
    });
  },

  async addQuizToModule(courseId: number, moduleId: number, data: CreateQuizQuestionDto) {
    return await fetchApi<QuizQuestion>(`/courses/${courseId}/module/${moduleId}/quiz`, {
      method: 'POST',
      body: JSON.stringify(data),
    }, 'POST');
  },

  async addBulkQuizToModule(courseId: number, moduleId: number, data: CreateQuizQuestionDto[]) {
    return await fetchApi<QuizQuestion[]>(`/courses/${courseId}/module/${moduleId}/quiz/bulk`, {
      method: 'POST',
      body: JSON.stringify(data),
    }, 'POST');
  },
  // **********************************************************************

  // For Students
  // *******************************************************************************************************
  // Course enrollment
  async enrollInCourse(courseId: number) {
    return await fetchApi<{ message: string }>(`/courses/${courseId}/enroll`, {}, 'POST');
  },

  // Enrolled Courses
  async getEnrolledCourses(page = 1, limit = 10) {
    return await fetchPaginatedApi<EnrolledCourse>('/courses/my', page, limit);
  },

  // Get My Enrolled Course Details
  async getEnrolledCourseDetails(courseId: string) {
    return await fetchApi<EnrolledCourse>(`/courses/my/${courseId}`);
  },

  // My Module Details
  async getModuleDetails(moduleId: number, courseId: number) {
    return await fetchApi<UserCourseModule>(`/courses/my/${courseId}/modules/${moduleId}`);
  },

  async getModuleQuestions(moduleId: number, courseId: number) {
    return await fetchApi<QuizQuestion[]>(`/courses/${courseId}/modules/${moduleId}/quiz`);
  },

  async submitQuiz(moduleId: number, courseId: number, answers: { questionId: number; answers: string[] }[]) {
    return await fetchApi<{ grade: number }>(`/courses/${courseId}/modules/${moduleId}/quiz`, {
      body: JSON.stringify({
        data: answers,
      }),
    }, 'POST');
  },
  /// *******************************************************************************************************

  // Instructors
  getInstructors: async () => await fetchApi<ApiResponse<User[]>>('/instructors'),
  
  getInstructor: async (id: string) =>
    await fetchApi<ApiResponse<User>>(`/instructors/${id}`),

  getInstructorCourses: async (page: number, limit: number, filters?: CourseFilters) =>
    await fetchPaginatedApi<Course>('/instructors/courses', page, limit, {
      search: filters?.search
    }),

  getInstructorCourseDetails: async (id: string) =>
    await fetchApi<ApiResponse<Course>>(`/instructors/courses/${id}`),
};

// Placeholder data for development
export const placeholderData = {
  courses: {
    data: [
      {
        id: '1',
        title: 'Introduction to Islamic Studies',
        description: 'Comprehensive introduction to the fundamentals of Islamic studies.',
        instructor: 'Dr. Ahmad Al-Hassan',
        duration: '12 weeks',
        level: 'Beginner',
        image: '/images/courses/islamic-studies.jpg',
        enrolledStudents: 150,
        price: 99,
      },
      {
        id: '2',
        title: 'Arabic Grammar Fundamentals',
        description: 'Master the basics of Arabic grammar with our comprehensive course.',
        instructor: 'Ustadha Sarah Ahmad',
        duration: '10 weeks',
        level: 'Beginner',
        image: '/images/courses/arabic-grammar.jpg',
        enrolledStudents: 120,
        price: 89,
      }
    ],
    total: 2,
    page: 1,
    limit: 10,
    hasMore: false
  },
  instructors: {
    data: [
      {
        id: '1',
        name: 'Dr. Ahmad Al-Hassan',
        role: 'Academic Director',
        image: '/images/instructors/abdullah.jpg',
        bio: 'With over 20 years of experience in Islamic education.',
        expertise: ['Islamic Studies', 'Hadith', 'Fiqh']
      },
      {
        id: '2',
        name: 'Ustadha Sarah Ahmad',
        role: 'Lead Instructor',
        image: '/images/instructors/aisha.jpg',
        bio: 'Specialist in Arabic language and Islamic studies.',
        expertise: ['Arabic Grammar', 'Quranic Studies']
      }
    ]
  },
  donationOptions: {
    data: [
      {
        id: '1',
        title: 'Student Sponsor',
        amount: 50,
        description: 'Sponsor a student\'s monthly education',
        benefits: ['Access to basic courses', 'Monthly progress reports']
      },
      {
        id: '2',
        title: 'Knowledge Builder',
        amount: 100,
        description: 'Help us create new courses',
        benefits: ['Recognition in course credits', 'Quarterly impact reports']
      }
    ]
  },
  about: {
    data: {
      mission: "Our mission is to make authentic Islamic knowledge accessible to everyone...",
      vision: "To become the leading global platform for traditional Islamic education...",
      story: "Baytul Mutun was founded with a vision to bridge the gap...",
      founder: {
        name: "Sheikh Abdullah Al-Rahman",
        message: "In the name of Allah, the Most Gracious, the Most Merciful...",
        image: "/images/founder.jpg"
      },
      team: [
        {
          id: "1",
          name: "Dr. Ahmad Al-Hassan",
          role: "Academic Director",
          image: "/images/instructors/abdullah.jpg",
          bio: "With over 20 years of experience in Islamic education."
        },
        {
          id: "2",
          name: "Ustadha Sarah Ahmad",
          role: "Lead Instructor",
          image: "/images/instructors/aisha.jpg",
          bio: "Specialist in Arabic language and Islamic studies."
        }
      ],
      values: [
        {
          title: "Authenticity",
          description: "Commitment to authentic Islamic knowledge."
        },
        {
          title: "Excellence",
          description: "Striving for excellence in everything we do."
        }
      ]
    }
  }
};

export function getPlaceholderData<T>(key: keyof typeof placeholderData): T {
  return placeholderData[key] as T;
}
