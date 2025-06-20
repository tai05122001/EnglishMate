import React from 'react';
import { Play } from 'lucide-react';

interface RoadmapPreviewProps {
  title: string;
  description: string;
  onClick?: () => void;
}

const RoadmapPreview: React.FC<RoadmapPreviewProps> = ({
  title,
  description,
  onClick
}) => {
  return (
    <div className="bg-neutral-800 rounded-xl p-8 flex flex-col items-center justify-center h-full">
      <div className="flex flex-col items-center space-y-6">
        <div className="bg-transparent flex items-center justify-center w-16 h-16 rounded-full cursor-pointer" onClick={onClick}>
          <Play size={27} className="text-white ml-1" />
        </div>
        
        <div className="text-center">
          <h3 className="text-lg text-white mb-2">{title}</h3>
          <p className="text-sm text-white">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default RoadmapPreview; 