
interface GradesPageProps {
  params: {
    courseId: string;
  };
}

export default async function GradesPage({ params }: GradesPageProps) {
  
  // Mock data - replace with actual API call
  const courseGrades = {
    courseName: 'Arabic 101',
    overallGrade: 85,
    modules: [
      {
        id: 1,
        name: 'Introduction to Arabic',
        assessments: [
          { name: 'Quiz 1', score: 90, maxScore: 100, date: '2023-12-01' },
          { name: 'Module Test', score: 85, maxScore: 100, date: '2023-12-07' },
        ],
      },
      {
        id: 2,
        name: 'Basic Grammar',
        assessments: [
          { name: 'Quiz 1', score: 88, maxScore: 100, date: '2023-12-10' },
          { name: 'Quiz 2', score: 92, maxScore: 100, date: '2023-12-14' },
        ],
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Course Grade Overview */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-2xl font-bold mb-6">{courseGrades.courseName} - Grades</h1>
          
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-gray-600 mb-1">Overall Grade</p>
              <p className="text-4xl font-bold text-primary">{courseGrades.overallGrade}%</p>
            </div>
            
            <div className="w-32 h-32 relative">
              {/* Circular progress indicator */}
              <div className="w-full h-full rounded-full bg-primary/20">
                <div 
                  className="w-full h-full rounded-full bg-primary"
                  style={{
                    clipPath: `polygon(0 0, 100% 0, 100% ${courseGrades.overallGrade}%, 0 ${courseGrades.overallGrade}%)`
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Module Grades */}
        <div className="space-y-6">
          {courseGrades.modules.map((module) => (
            <div key={module.id} className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">{module.name}</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Assessment</th>
                      <th className="text-left py-3 px-4">Score</th>
                      <th className="text-left py-3 px-4">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {module.assessments.map((assessment, index) => (
                      <tr 
                        key={index}
                        className="border-b last:border-b-0 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4">{assessment.name}</td>
                        <td className="py-3 px-4">
                          <span className={`font-medium ${
                            (assessment.score / assessment.maxScore) * 100 >= 70
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}>
                            {assessment.score}/{assessment.maxScore}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{assessment.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Module Average */}
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Module Average:</span>
                  <span className="text-lg font-semibold">
                    {Math.round(
                      module.assessments.reduce((acc, curr) => 
                        acc + (curr.score / curr.maxScore) * 100, 0
                      ) / module.assessments.length
                    )}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
