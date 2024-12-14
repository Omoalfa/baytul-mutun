

export default async function DashboardPage() {
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Stats */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Course Progress</h2>
          <div className="text-4xl font-bold text-primary">75%</div>
          <p className="text-gray-600">Overall completion</p>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <ul className="space-y-3">
            <li className="text-sm text-gray-600">Completed Module 3 in Arabic 101</li>
            <li className="text-sm text-gray-600">Scored 90% in Quiz 2</li>
            <li className="text-sm text-gray-600">Started new course: Tajweed Basics</li>
          </ul>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
          <ul className="space-y-3">
            <li className="text-sm text-gray-600">Complete Module 4 assessment</li>
            <li className="text-sm text-gray-600">Review week 3 materials</li>
            <li className="text-sm text-gray-600">Schedule next live session</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
