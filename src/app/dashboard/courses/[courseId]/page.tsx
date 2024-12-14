import Link from 'next/link';

interface CoursePageProps {
  params: {
    courseId: string;
  };
}

export default async function CoursePage({ params }: CoursePageProps) {

  // Mock data - replace with actual API call
  const course = {
    id: params.courseId,
    title: 'Arabic 101',
    description: 'Learn the fundamentals of Arabic language',
    modules: [
      {
        id: 1,
        title: 'Introduction to Arabic',
        lessons: [
          { id: 1, title: 'Arabic Alphabet', completed: true },
          { id: 2, title: 'Basic Pronunciation', completed: true },
          { id: 3, title: 'Writing System', completed: false },
        ],
      },
      {
        id: 2,
        title: 'Basic Grammar',
        lessons: [
          { id: 4, title: 'Nouns and Articles', completed: false },
          { id: 5, title: 'Simple Sentences', completed: false },
          { id: 6, title: 'Question Forms', completed: false },
        ],
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Course Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
          <p className="text-gray-600 mb-6">{course.description}</p>
          
          <div className="flex space-x-4">
            <Link
              href={`/dashboard/courses/${course.id}/test`}
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition"
            >
              Take Module Test
            </Link>
            <Link
              href={`/dashboard/courses/${course.id}/grades`}
              className="bg-white border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition"
            >
              View Grades
            </Link>
          </div>
        </div>

        {/* Course Content */}
        <div className="space-y-6">
          {course.modules.map((module) => (
            <div key={module.id} className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">{module.title}</h2>
              
              <div className="space-y-3">
                {module.lessons.map((lesson) => (
                  <div 
                    key={lesson.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        lesson.completed ? 'bg-green-500 text-white' : 'bg-gray-200'
                      }`}>
                        {lesson.completed && (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className={lesson.completed ? 'text-gray-600' : 'font-medium'}>
                        {lesson.title}
                      </span>
                    </div>
                    
                    <button 
                      className={`px-4 py-1 rounded-md ${
                        lesson.completed 
                          ? 'text-gray-600 hover:bg-gray-100'
                          : 'bg-primary text-white hover:bg-primary-dark'
                      } transition`}
                    >
                      {lesson.completed ? 'Review' : 'Start'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
