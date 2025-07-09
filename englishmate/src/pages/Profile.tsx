import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { BookOpen, BookOpenCheck, Clock, Flame, Layers, PencilIcon, StarIcon, Trophy } from 'lucide-react';
import { useState } from 'react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <>
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        {/* Profile Card Section */}
        <section className="md:col-span-1 bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
          <Avatar className="w-24 h-24 mb-4 border-4 border-white shadow-lg">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>SN</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-semibold text-gray-900">Sarah Johnson</h2>
          <p className="text-gray-600 mb-4">sarah.johnson@email.com</p>
          <div className="flex space-x-2 mb-6">
            <Badge variant="secondary" className="px-3 py-1 rounded-full text-sm font-medium">Free Plan</Badge>
            <Badge variant="secondary" className="px-3 py-1 rounded-full text-sm font-medium flex items-center">
              <StarIcon className="w-4 h-4 mr-1 text-yellow-500" />
              15 Day Streak
            </Badge>
          </div>
          <Button variant="outline" className="w-full flex items-center justify-center space-x-2 !border-none !outline-0 !shadow-none !ring-0 !ring-offset-0 focus:outline-none focus-visible:outline-none">
            <PencilIcon className="w-4 h-4" />
            <span>Edit Profile</span>
          </Button>
        </section>

        {/* Other Sections (Tabs, Stats, Activity, Progress) */}
        <section className="md:col-span-2 bg-white rounded-lg shadow-lg p-6">
          {/* Navigation Tabs */}
          <Card className="mb-6 border-0">
            <div className="flex flex-wrap justify-around md:justify-start space-x-0 md:space-x-4 border-b border-gray-200">
              <Button
                variant="ghost"
                onClick={() => handleTabClick('Overview')}
                className={cn(
                  "rounded-none px-4 py-2 bg-transparent hover:bg-transparent !border-none !outline-0 !shadow-none !ring-0 !ring-offset-0 focus:outline-none focus-visible:outline-none",
                  activeTab === 'Overview' ? 'border-b-2 border-gray-900 text-gray-900' : 'text-gray-600'
                )}
              >
                Overview
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleTabClick('Settings')}
                className={cn(
                  "rounded-none px-4 py-2 bg-transparent hover:bg-transparent !border-none !outline-0 !shadow-none !ring-0 !ring-offset-0 focus:outline-none focus-visible:outline-none",
                  activeTab === 'Settings' ? 'border-b-2 border-gray-900 text-gray-900' : 'text-gray-600'
                )}
              >
                Settings
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleTabClick('Subscriptions')}
                className={cn(
                  "rounded-none px-4 py-2 bg-transparent hover:bg-transparent !border-none !outline-0 !shadow-none !ring-0 !ring-offset-0 focus:outline-none focus-visible:outline-none",
                  activeTab === 'Subscriptions' ? 'border-b-2 border-gray-900 text-gray-900' : 'text-gray-600'
                )}
              >
                Subscriptions
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleTabClick('Achievements')}
                className={cn(
                  "rounded-none px-4 py-2 bg-transparent hover:bg-transparent !border-none !outline-0 !shadow-none !ring-0 !ring-offset-0 focus:outline-none focus-visible:outline-none",
                  activeTab === 'Achievements' ? 'border-b-2 border-gray-900 text-gray-900' : 'text-gray-600'
                )}
              >
                Achievements
              </Button>
            </div>
          </Card>
          
          {/* Statistics Cards */}
          <h2 className="text-lg font-semibold mt-8 mb-4 text-gray-900">Statistics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="p-4 flex flex-col items-center text-center border-0">
              <Flame className="w-8 h-8 text-blue-500 mb-2" />
              <div className="text-2xl font-bold text-gray-900">15</div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </Card>
            <Card className="p-4 flex flex-col items-center text-center border-0">
              <Layers className="w-8 h-8 text-green-500 mb-2" />
              <div className="text-2xl font-bold text-gray-900">Level 8</div>
              <div className="text-sm text-gray-600">Current Level</div>
            </Card>
            <Card className="p-4 flex flex-col items-center text-center border-0">
              <Clock className="w-8 h-8 text-yellow-500 mb-2" />
              <div className="text-2xl font-bold text-gray-900">42h</div>
              <div className="text-sm text-gray-600">Total Hours</div>
            </Card>
            <Card className="p-4 flex flex-col items-center text-center border-0">
              <BookOpenCheck className="w-8 h-8 text-red-500 mb-2" />
              <div className="text-2xl font-bold text-gray-900">3</div>
              <div className="text-sm text-gray-600">Completed Courses</div>
            </Card>
          </div>

          {/* Recent Activity */}
          <h2 className="text-lg font-semibold mt-8 mb-4 text-gray-900">Recent Activity</h2>
          <div className="space-y-4 mb-8">
            <Card className="p-4 flex items-center space-x-4 border-0">
              <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-gray-700" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Completed Grammar Basics</p>
                <p className="text-sm text-gray-600">2 hours ago</p>
              </div>
            </Card>
            <Card className="p-4 flex items-center space-x-4 border-0">
              <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Trophy className="w-5 h-5 text-gray-700" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Achieved 15-day streak</p>
                <p className="text-sm text-gray-600">1 day ago</p>
              </div>
            </Card>
          </div>

          {/* Progress Overview */}
          <h2 className="text-lg font-semibold mt-8 mb-4 text-gray-900">Progress Overview</h2>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <p className="w-24 text-sm font-medium text-gray-900">Vocabulary</p>
              <Progress value={75} className="w-full h-2 rounded-full bg-gray-200" indicatorClassName="bg-blue-500" />
              <span className="text-sm text-gray-600">75%</span>
            </div>
            <div className="flex items-center space-x-4">
              <p className="w-24 text-sm font-medium text-gray-900">Grammar</p>
              <Progress value={60} className="w-full h-2 rounded-full bg-gray-200" indicatorClassName="bg-green-500" />
              <span className="text-sm text-gray-600">60%</span>
            </div>
            <div className="flex items-center space-x-4">
              <p className="w-24 text-sm font-medium text-gray-900">Speaking</p>
              <Progress value={45} className="w-full h-2 rounded-full bg-gray-200" indicatorClassName="bg-yellow-500" />
              <span className="text-sm text-gray-600">45%</span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Profile;
