import React from 'react';
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Lock, Check, Play, Star } from "lucide-react";

export type LessonStatus = 'completed' | 'in-progress' | 'locked';

interface RoadmapLessonProps {
  title: string;
  status: LessonStatus;
  index: number;
  progress?: number;
  stars?: number;
  lockMessage?: string;
  onClick?: () => void;
}

const RoadmapLesson: React.FC<RoadmapLessonProps> = ({
  title,
  status,
  index,
  progress = 0,
  stars = 0,
  lockMessage = "Locked",
  onClick
}) => {
  return (
    <Card className="shadow-sm mb-4">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="bg-transparent flex items-center justify-center w-7 h-7">
            <span className="text-neutral-700">{index}</span>
          </div>
          <h3 className="text-lg font-medium">{title}</h3>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {/* Progress bar */}
          <div className="w-full h-2 bg-neutral-200 rounded-full">
            <div 
              className={`h-2 rounded-full ${
                status === 'locked' 
                  ? 'bg-neutral-300' 
                  : status === 'completed' 
                    ? 'bg-neutral-700' 
                    : 'bg-neutral-700'
              }`}
              style={{ width: `${status === 'locked' ? 0 : progress}%` }}
            />
          </div>

          {/* Status indicator */}
          <div className="flex items-center">
            {status === 'completed' && (
              <>
                <div className="flex items-center gap-2">
                  <Check size={18} className="text-neutral-700" />
                  <Star size={18} className="text-neutral-700" fill="currentColor" />
                  <Star size={18} className="text-neutral-700" fill="currentColor" />
                  <Star size={18} className="text-neutral-700" fill="currentColor" />
                </div>
                <span className="ml-2 text-sm text-neutral-600">Completed · {stars} Stars</span>
              </>
            )}
            
            {status === 'in-progress' && (
              <>
                <div className="flex items-center gap-2">
                  <Play size={16} className="text-neutral-700" />
                </div>
                <span className="ml-2 text-sm text-neutral-600">In Progress · {progress}% Complete</span>
              </>
            )}
            
            {status === 'locked' && (
              <>
                <div className="flex items-center gap-2">
                  <Lock size={14} className="text-neutral-400" />
                </div>
                <span className="ml-2 text-sm text-neutral-600">{lockMessage}</span>
              </>
            )}
          </div>

          {/* Action Button */}
          <Button 
            variant={status === 'in-progress' ? 'default' : 'outline'} 
            className={`w-full ${status === 'locked' ? 'opacity-50' : ''}`}
            onClick={onClick}
            disabled={status === 'locked'}
          >
            {status === 'completed' ? (
              <>
                <Check size={14} className="mr-2" />
                Review
              </>
            ) : status === 'in-progress' ? (
              <>
                <Play size={10.5} className="mr-2" />
                Continue
              </>
            ) : (
              <>
                <Lock size={12.25} className="mr-2" />
                Locked
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoadmapLesson; 