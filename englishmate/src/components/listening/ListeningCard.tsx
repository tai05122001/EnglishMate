import React from "react";
import { Star, User, Clock } from "lucide-react";
import { Button } from "@/components";
import type { ListeningLessonDTO } from "@/types";
import { formatDuration } from "@/lib/utils";

interface ListeningCardProps {
  lesson: ListeningLessonDTO;
  onStart: () => void;
  className?: string;
}

const levelColor: Record<string, string> = {
  EASY: "bg-[#02b2a4]",
  MEDIUM: "bg-[#02b2a4]",
  HARD: "bg-[#02b2a4]",
};

const ListeningCard: React.FC<ListeningCardProps> = ({
  lesson,
  onStart,
  className = "",
}) => (
  <div className={`bg-white rounded-xl shadow-md overflow-hidden relative flex flex-col transition-transform duration-200 hover:scale-105 hover:shadow-xl animate-fade-in ${className}`}>
    {/* Image & Level Badge */}
    <div className="relative">
      <img src={lesson.imageUrl} alt={lesson.title} className="w-full h-48 object-cover" />
      <span className={`absolute top-2 left-2 px-2 py-0.5 text-[11px] font-semibold text-white rounded-full ${levelColor[lesson.level] || "bg-[#02b2a4]"}`}>
        {lesson.level}
      </span>
      <span className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-[11px] px-2 py-0.5 rounded flex items-center gap-1">
        <Clock size={12} className="text-white" />
        {formatDuration(lesson.duration)}
      </span>
    </div>
    {/* Content */}
    <div className="p-3 flex-1 flex flex-col">
      <h3 className="font-bold text-base mb-1 truncate">{lesson.title}</h3>
      <p className="text-gray-600 text-xs mb-2 truncate">{lesson.description}</p>
      <div className="flex items-center text-xs mb-1 gap-2">
        <span className="flex items-center text-[#02b2a4] font-semibold">
          <Star size={13} className="mr-1 text-yellow-400" /> {lesson.rating}
        </span>
        <span className="flex-1" />
        <span className="text-gray-400 ml-auto flex items-center gap-1">
          <User size={12} className="text-gray-400" />
          {lesson.completedCount} completed
        </span>
      </div>
      <div className="flex">
        <span className="bg-[#ede9fe] text-[#7c3aed] text-xs font-medium px-3 py-1 rounded-full mb-2 mr-auto">
          {lesson.category}
        </span>
      </div>
      <Button
        className="mt-auto w-full bg-gradient-to-r from-[#02b2a4] to-[#02b2a4] text-white font-semibold py-1.5 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition text-xs"
        onClick={onStart}
      >
        Start Listening
      </Button>
    </div>
  </div>
);

export default ListeningCard; 