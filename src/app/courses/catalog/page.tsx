'use client';

import { useState, useEffect } from 'react';
import { useCourses } from '@/hooks/useApi';
import { Course } from '@/types';
import Link from 'next/link';
import Image from 'next/image';

const ITEMS_PER_PAGE = 9;

const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'] as const;

export default function CourseCatalog() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLevel, setSelectedLevel] = useState<typeof levels[number]>('All Levels');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedLevel, debouncedSearch]);

  const { data: coursesResponse, isLoading } = useCourses(
    currentPage,
    ITEMS_PER_PAGE,
    {
      level: selectedLevel,
      search: debouncedSearch,
    }
  );

  const courses = coursesResponse?.data || [];
  const totalPages = Math.ceil((coursesResponse?.total || 0) / ITEMS_PER_PAGE);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Course Catalog</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our comprehensive collection of Islamic courses, from beginner to advanced levels.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex gap-4 items-center">
          <label className="text-gray-700">Level:</label>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value as typeof levels[number])}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
          >
            {levels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full md:w-64">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-48 rounded-t-lg"></div>
              <div className="p-4 border border-gray-200 rounded-b-lg">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-3 py-1 text-sm text-gold border border-gold rounded-full">
                      {course.level}
                    </span>
                    <span className="text-gray-600 text-sm">{course.duration}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gold transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      By {course.instructor}
                    </span>
                    {course.price ? (
                      <span className="text-lg font-semibold text-gold">
                        ${course.price}
                      </span>
                    ) : (
                      <span className="text-lg font-semibold text-green-600">
                        Free
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* No Results */}
          {courses.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No courses found
              </h3>
              <p className="text-gray-600">
                Try adjusting your filters or search query
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12 gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 border rounded-md ${
                    currentPage === i + 1
                      ? 'bg-gold text-white'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
