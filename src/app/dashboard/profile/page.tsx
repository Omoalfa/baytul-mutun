'use client';

import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';

export default function ProfilePage() {
  const { user } = useAuth()
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-start space-x-6">
            <div className="relative w-32 h-32">
              <Image
                src={user?.avatar || '/default-avatar.png'}
                alt="Profile picture"
                fill
                className="rounded-full object-cover"
              />
            </div>
            
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-2">{user?.firstName} {user?.lastName}</h2>
              <p className="text-gray-600 mb-4">{user?.email}</p>
              
              <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition">
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Learning Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4">Learning Statistics</h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-600">Courses Completed</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <div>
                <p className="text-gray-600">Average Score</p>
                <p className="text-2xl font-bold">85%</p>
              </div>
              <div>
                <p className="text-gray-600">Study Hours</p>
                <p className="text-2xl font-bold">45h</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4">Achievements</h3>
            <div className="grid grid-cols-3 gap-4">
              {/* Achievement badges would go here */}
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full mx-auto mb-2"></div>
                <p className="text-sm">Quick Learner</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full mx-auto mb-2"></div>
                <p className="text-sm">Consistent</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full mx-auto mb-2"></div>
                <p className="text-sm">Top Score</p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Account Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Language Preference</label>
              <select className="w-full p-2 border rounded-md">
                <option>English</option>
                <option>Arabic</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Email Notifications</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  Course updates
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  New lessons available
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
