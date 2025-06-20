import React from 'react';
import { Badge } from '../ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface RoadmapBadgeProps {
  text: string;
}

const RoadmapBadge: React.FC<RoadmapBadgeProps> = ({ text }) => {
  return (
    <Badge variant="outline" className="bg-neutral-100 text-neutral-800 border-none rounded-full px-4 py-1.5">
      {text}
    </Badge>
  );
};

interface RoadmapHeaderProps {
  title: string;
  description: string;
  level: string;
  lessons: number;
  duration: string;
  prevRoadmap?: string;
  nextRoadmap?: string;
  onPrevClick?: () => void;
  onNextClick?: () => void;
}

const RoadmapHeader: React.FC<RoadmapHeaderProps> = ({
  title,
  description,
  level,
  lessons,
  duration,
  prevRoadmap,
  nextRoadmap,
  onPrevClick,
  onNextClick
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        {prevRoadmap && (
          <button 
            className="flex items-center justify-center bg-transparent w-8 h-8 rounded-full"
            onClick={onPrevClick}
          >
            <ChevronLeft size={24} />
          </button>
        )}
        
        <h1 className="text-4xl font-normal text-center flex-1">{title}</h1>
        
        {nextRoadmap && (
          <button 
            className="flex items-center justify-center bg-transparent w-8 h-8 rounded-full"
            onClick={onNextClick}
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>
      
      <p className="text-xl text-neutral-600 text-center mb-8">
        {description}
      </p>
      
      <div className="flex justify-center gap-4 mt-4">
        <RoadmapBadge text={level} />
        <RoadmapBadge text={`${lessons} Lessons`} />
        <RoadmapBadge text={duration} />
      </div>
    </div>
  );
};

export default RoadmapHeader; 