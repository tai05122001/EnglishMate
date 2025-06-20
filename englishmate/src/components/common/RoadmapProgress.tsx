import React from 'react';
import { Progress } from "../ui/progress";
import { Card } from "../ui/card";
import { Award } from "lucide-react";

interface RoadmapProgressProps {
  completedLessons: number;
  totalLessons: number;
  nextBadge: string;
  avatarUrl?: string;
}

const RoadmapProgress: React.FC<RoadmapProgressProps> = ({
  completedLessons,
  totalLessons,
  nextBadge,
  avatarUrl
}) => {
  const progressPercentage = Math.round((completedLessons / totalLessons) * 100);
  
  return (
    <div className="space-y-6">
      <h2 className="text-center text-3xl font-medium text-black">Your Progress</h2>
      
      <div className="space-y-4">
        {/* Progress bar */}
        <div className="w-full h-4 bg-neutral-200 rounded-full">
          <div 
            className="h-4 rounded-full bg-gradient-to-r from-neutral-700 to-neutral-600"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        <p className="text-center text-lg text-neutral-600">
          {completedLessons} out of {totalLessons} lessons completed ({progressPercentage}%)
        </p>
      </div>
      
      <div className="flex items-center mt-6">
        {avatarUrl ? (
          <div className="w-16 h-16 rounded-full bg-white border border-neutral-200 overflow-hidden flex-shrink-0">
            <img src={avatarUrl} alt="User avatar" className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-16 h-16 rounded-full bg-white border border-neutral-200 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">👤</span>
          </div>
        )}
        
        <div className="ml-4">
          <h3 className="text-base font-medium">Great progress!</h3>
          <p className="text-sm text-neutral-600">Keep going to unlock your next badge</p>
        </div>
      </div>
      
      <Card className="p-3 flex items-center justify-center gap-2 bg-white">
        <Award size={18} className="text-black" />
        <span className="text-sm font-medium text-black">Next Badge: {nextBadge}</span>
      </Card>
    </div>
  );
};

export default RoadmapProgress; 