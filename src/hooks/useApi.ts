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

export function useCourse(id: number) {
  return useQuery({
    queryKey: ['course', id],
    queryFn: () => api.getCourse(id),
    enabled: !!id,
  });
}

export function useCourseModules(id: number) {
  return useQuery({
    queryKey: ['course', id],
    queryFn: () => api.getCourseModules(id),
    enabled: !!id,
  });
}

export function useInstructors() {
  return useQuery({
    queryKey: ['instructors'],
    queryFn: () => api.getInstructors(),
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

export function useEnrollInCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['enrollInCourse'],
    mutationFn: (courseId: number) => api.enrollInCourse(courseId),
    onSuccess: () => {
      // Invalidate enrolled courses query
      queryClient.invalidateQueries({ queryKey: ['enrolledCourses'] });
    }
  });
}

export function useEnrolledCourses(page = 1, limit = 10) {
  return useQuery({
    queryKey: ['enrolledCourses', page, limit],
    queryFn: () => api.getEnrolledCourses(page, limit),
  });
}

export function useEnrolledCourseDetails(courseId: string) {
  return useQuery({
    queryKey: ['enrolledCourseDetails', courseId],
    queryFn: () => api.getEnrolledCourseDetails(courseId),
    enabled: !!courseId,
  });
}

export function useModuleDetails(moduleId: number, courseId: number) {
  return useQuery({
    queryKey: ['moduleDetails', moduleId],
    queryFn: () => api.getModuleDetails(moduleId, courseId),
    enabled: !!moduleId,
  });
}

export function useModuleQuestions(moduleId: number, courseId: number) {
  return useQuery({
    queryKey: ['moduleQuestions', moduleId],
    queryFn: () => api.getModuleQuestions(moduleId, courseId),
    enabled: !!moduleId,
  });
}

export function useSubmitModuleTest() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ moduleId, answers, courseId }: { moduleId: number; courseId: number; answers: { questionId: number; answers: string[] }[] }) =>
      api.submitQuiz(moduleId, courseId, answers),
    onSuccess: (_, { moduleId, courseId }) => {
      queryClient.invalidateQueries({ queryKey: ['moduleDetails', moduleId] });
      queryClient.invalidateQueries({ queryKey: ['attemptedQuestions', moduleId] });
      queryClient.invalidateQueries({ queryKey: ['enrolledCourseDetails', courseId] });
    },
  });
}

