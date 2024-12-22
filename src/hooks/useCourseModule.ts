import { useState } from 'react';
import { api } from '@/lib/api';
import { CreateCourseModuleDto, CreateQuizQuestionDto, } from '@/types/course';

interface AddModuleParams {
  courseId: number;
  data: CreateCourseModuleDto;
  video?: File;
  audio?: File;
}

interface AddQuizParams {
  moduleId: number;
  data: CreateQuizQuestionDto;
}

interface AddBulkQuizParams {
  moduleId: number;
  data: CreateQuizQuestionDto[];
}

export const useCourseModule = (params: AddModuleParams) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addModule = async ({ data, video, audio }: Omit<AddModuleParams, 'courseId'>) => {
    setLoading(true);
    setError(null);
    try {
      const module = await api.addModuleToCourse(params.courseId, data, video, audio);
      return module;
    } catch (err: any) {
      setError(err.message || 'Failed to add module');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addQuiz = async ({ moduleId, data }: AddQuizParams) => {
    setLoading(true);
    setError(null);
    try {
      const question = await api.addQuizToModule(params.courseId, moduleId, data);
      return question;
    } catch (err: any) {
      setError(err.message || 'Failed to add quiz question');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addBulkQuiz = async ({ moduleId, data }: AddBulkQuizParams) => {
    setLoading(true);
    setError(null);
    try {
      const questions = await api.addBulkQuizToModule(params.courseId, moduleId, data);
      return questions;
    } catch (err: any) {
      setError(err.message || 'Failed to add quiz questions');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    addModule,
    addQuiz,
    addBulkQuiz,
  };
};
