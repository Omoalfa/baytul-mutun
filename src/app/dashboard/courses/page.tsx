
import Link from 'next/link';

export default async function MyCourses() {
  
  // Mock data - replace with actual API call
  const courses = [
    {
      id: 1,
      title: 'Arabic 101',
      progress: 75,
      nextLesson: 'Understanding Basic Grammar',
      lastAccessed: '2023-12-14',
    },
    {
      id: 2,
      title: 'Tajweed Basics',
      progress: 30,
      nextLesson: 'Rules of Noon Sakinah',
      lastAccessed: '2023-12-13',
    },
    // Add more courses as needed
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Courses</h1>
        <Link 
          href="/courses/catalog"
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition"
        >
          Browse More Courses
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Next Lesson:</span> {course.nextLesson}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Last Accessed:</span> {course.lastAccessed}
                </p>
              </div>

              <div className="flex space-x-3">
                <Link 
                  href={`/dashboard/courses/${course.id}`}
                  className="flex-1 bg-primary text-white text-center px-4 py-2 rounded-md hover:bg-primary-dark transition"
                >
                  Continue Learning
                </Link>
                <Link 
                  href={`/dashboard/courses/${course.id}/grades`}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition"
                >
                  Grades
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
