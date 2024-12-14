
interface TestPageProps {
  params: {
    courseId: string;
  };
}

export default async function TestPage({ params }: TestPageProps) {

  // Mock data - replace with actual API call
  const test = {
    id: 1,
    title: 'Module 1 Assessment',
    timeLimit: 30, // in minutes
    questions: [
      {
        id: 1,
        question: 'What is the first letter of the Arabic alphabet?',
        options: ['ا', 'ب', 'ت', 'ث'],
        correctAnswer: 0,
      },
      {
        id: 2,
        question: 'Which of these is a sun letter?',
        options: ['ر', 'ع', 'ك', 'و'],
        correctAnswer: 0,
      },
      // Add more questions as needed
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Test Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold mb-4">{test.title}</h1>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600">Time Limit: {test.timeLimit} minutes</p>
              <p className="text-gray-600">Questions: {test.questions.length}</p>
            </div>
            <div className="text-2xl font-mono" id="timer">30:00</div>
          </div>
        </div>

        {/* Test Questions */}
        <form className="space-y-6">
          {test.questions.map((question, index) => (
            <div key={question.id} className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium mb-4">
                Question {index + 1}: {question.question}
              </h3>
              
              <div className="space-y-3">
                {question.options.map((option, optionIndex) => (
                  <label 
                    key={optionIndex}
                    className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-50 cursor-pointer"
                  >
                    <input 
                      type="radio"
                      name={`question-${question.id}`}
                      value={optionIndex}
                      className="w-4 h-4 text-primary"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition"
            >
              Save Progress
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
            >
              Submit Test
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
