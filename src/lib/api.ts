import { Course, Instructor, DonationOption, AboutContent, ApiResponse, PaginatedResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(response.status, data.error || 'Something went wrong');
  }

  return data;
}

export const api = {
  // Courses
  async getCourses(page = 1, limit = 10, filters?: { level?: string; search?: string }) {
    const url = new URL(`${API_BASE_URL}/courses`);
    url.searchParams.set('page', page.toString());
    url.searchParams.set('limit', limit.toString());
    
    if (filters?.level && filters.level !== 'All Levels') {
      url.searchParams.set('level', filters.level);
    }
    if (filters?.search) {
      url.searchParams.set('search', filters.search);
    }

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    return response.json();
  },
  
  getCourse: (id: string) =>
    fetchApi<ApiResponse<Course>>(`/courses/${id}`),

  // Instructors
  getInstructors: () =>
    fetchApi<ApiResponse<Instructor[]>>('/instructors'),
  
  getInstructor: (id: string) =>
    fetchApi<ApiResponse<Instructor>>(`/instructors/${id}`),

  // Donations
  getDonationOptions: () =>
    fetchApi<ApiResponse<DonationOption[]>>('/donations/options'),

  // About
  getAboutContent: () =>
    fetchApi<ApiResponse<AboutContent>>('/about'),
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
