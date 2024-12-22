'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { CreateCourseDto, CreateCourseModuleDto, CreateQuizQuestionDto } from '@/types/course';

export interface CourseFilters {
  level?: string;
  search?: string;
}

// Specific hooks for different features
export function useCourses(page = 1, limit = 10, filters?: CourseFilters) {
  return useQuery({
    queryKey: ['courses', page, limit, filters],
    queryFn: () => api.getCourses(page, limit, filters),
  });
}

export function useInstructorCourses(page = 1, limit = 10, filters?: CourseFilters) {
  return useQuery({
    queryKey: ['instructorCourses', page, limit, filters],
    queryFn: () => api.getInstructorCourses(page, limit, filters),
  });
}

export function useInstructorCourse(id: string) {
  return useQuery({
    queryKey: ['instructorCourse', id],
    queryFn: () => api.getInstructorCourseDetails(id),
    enabled: !!id,
  });
}

export function useCourse(id: string) {
  return useQuery({
    queryKey: ['course', id],
    queryFn: () => api.getCourse(id),
    enabled: !!id,
  });
}

export function useInstructors() {
  return useQuery({
    queryKey: ['instructors'],
    queryFn: () => api.getInstructors(),
  });
}

export function useAboutContent() {
  return useQuery({
    queryKey: ['about'],
    queryFn: () => api.getAboutContent(),
  });
}

export function useDonationOptions() {
  return useQuery({
    queryKey: ['donationOptions'],
    queryFn: () => api.getDonationOptions(),
  });
}

export function useCreateCourse() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationKey: ['createCourse'],
    mutationFn: (data: CreateCourseDto & { avatar?: File }) => api.createCourse(data),
    onSuccess: () => {
      // Invalidate both instructor courses and general courses queries
      queryClient.invalidateQueries({ queryKey: ['instructorCourses'] });
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    }
  });
}

export function useAddCourseModule(courseId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createModule'],
    mutationFn: (params: {
      data: CreateCourseModuleDto;
      video?: File;
      audio?: File;
    }) => api.addModuleToCourse(courseId, params.data, params.video, params.audio),
    onSuccess: () => {
      // Invalidate specific course queries
      queryClient.invalidateQueries({ queryKey: ['instructorCourse', courseId.toString()] });
      queryClient.invalidateQueries({ queryKey: ['course', courseId.toString()] });
    }
  });
}

export function useAddQuizQuestion(courseId: number, moduleId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createQuestion'],
    mutationFn: (data: CreateQuizQuestionDto) => api.addQuizToModule(courseId, moduleId, data),
    onSuccess: () => {
      // Invalidate specific course queries since quiz is part of course data
      queryClient.invalidateQueries({ queryKey: ['instructorCourse', courseId.toString()] });
      queryClient.invalidateQueries({ queryKey: ['course', courseId.toString()] });
    }
  });
}

export function useAddQuizQuestionBulk(courseId: number, moduleId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateQuizQuestionDto[]) => api.addBulkQuizToModule(courseId, moduleId, data),
    mutationKey: ['createQuestions'],
    onSuccess: () => {
      // Invalidate specific course queries since quiz is part of course data
      queryClient.invalidateQueries({ queryKey: ['instructorCourse', courseId.toString()] });
      queryClient.invalidateQueries({ queryKey: ['course', courseId.toString()] });
    }
  });
}
