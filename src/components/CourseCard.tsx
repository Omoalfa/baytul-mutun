'use client';

import Link from 'next/link';

interface CourseCardProps {
  id: number;
  title: string;
  description: string;
  instructor: string;
  level: string;
  duration: string;
  category: string;
  image: string;
}

export default function CourseCard({ 
  id, 
  title, 
  description, 
  instructor, 
  level, 
  duration, 
  category, 
  image 
}: CourseCardProps) {
  return (
    <Link href={`/courses/${id}`} className="group">
      <div className="card hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-48 mb-4">
          <img 
            src={image} 
            alt={title}
            className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
          />
        </div>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-2 group-hover:text-gold transition-colors">
            {title}
          </h2>
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-gold/10 text-gold rounded-full text-sm">
              {level}
            </span>
            <span className="px-3 py-1 bg-green/10 text-green rounded-full text-sm">
              {duration}
            </span>
          </div>
          <p className="text-sm text-gray-500">
            Instructor: {instructor}
          </p>
        </div>
      </div>
    </Link>
  );
}
