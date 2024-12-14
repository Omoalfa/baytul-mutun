'use client';

import { useState, useEffect, useCallback } from 'react';
import { api, placeholderData } from '@/lib/api';

interface UseApiOptions<T> {
  placeholderKey?: keyof typeof placeholderData;
  initialData?: T;
  enabled?: boolean;
}

interface CourseFilters {
  level?: string;
  search?: string;
}

export function useApi<T>(
  apiFunction: () => Promise<T>,
  options: UseApiOptions<T> = {}
) {
  const [data, setData] = useState<T | undefined>(options.initialData);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(!options.initialData);

  const memoizedApiFunction = useCallback(apiFunction, [apiFunction]);

  useEffect(() => {
    const fetchData = async () => {
      if (options.enabled === false) return;

      try {
        setIsLoading(true);
        const result = await memoizedApiFunction();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
        // Use placeholder data in development
        if (process.env.NODE_ENV === 'development' && options.placeholderKey) {
          const placeholder = placeholderData[options.placeholderKey];
          setData(placeholder as T);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [memoizedApiFunction, options.enabled, options.placeholderKey]);

  return { data, error, isLoading };
}

// Specific hooks for different features
export function useCourses(page = 1, limit = 10, filters?: CourseFilters) {
  const getCourses = useCallback(() => {
    return api.getCourses(page, limit, filters);
  }, [page, limit, filters?.level, filters?.search]);

  return useApi(getCourses, {
    placeholderKey: 'courses',
    enabled: true,
  });
}

export function useCourse(id: string) {
  const getCourse = useCallback(() => {
    return api.getCourse(id);
  }, [id]);

  return useApi(getCourse, {
    enabled: !!id,
    placeholderKey: 'courses'
  });
}

export function useInstructors() {
  const getInstructors = useCallback(() => {
    return api.getInstructors();
  }, []);

  return useApi(getInstructors, {
    placeholderKey: 'instructors'
  });
}

export function useAboutContent() {
  const getAboutContent = useCallback(() => {
    return api.getAboutContent();
  }, []);

  return useApi(getAboutContent, {
    placeholderKey: 'about'
  });
}

export function useDonationOptions() {
  const getDonationOptions = useCallback(() => {
    return api.getDonationOptions();
  }, []);

  return useApi(getDonationOptions, {
    placeholderKey: 'donationOptions'
  });
}
