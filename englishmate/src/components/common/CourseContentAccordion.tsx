import React, { useState } from "react";
import { ChevronDown, ChevronUp, Play, Check } from "lucide-react";

interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  type: "video" | "quiz";
}

interface CourseWeek {
  id: string;
  title: string;
  lessons: CourseLesson[];
}

interface CourseContentAccordionProps {
  weeks: CourseWeek[];
  className?: string;
}

const CourseContentAccordion: React.FC<CourseContentAccordionProps> = ({
  weeks,
  className = "",
}) => {
  const [expandedWeeks, setExpandedWeeks] = useState<Record<string, boolean>>({
    "week-1": true,
  });

  const toggleWeek = (weekId: string) => {
    setExpandedWeeks((prev) => ({
      ...prev,
      [weekId]: !prev[weekId],
    }));
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {weeks.map((week) => (
        <div key={week.id} className="border border-gray-200 rounded-lg overflow-hidden">
          <div
            className="bg-gray-50 p-4 flex justify-between items-center cursor-pointer"
            onClick={() => toggleWeek(week.id)}
          >
            <div className="flex items-center space-x-2">
              <span className="text-gray-700">{week.title}</span>
            </div>
            {expandedWeeks[week.id] ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </div>

          {expandedWeeks[week.id] && week.lessons.length > 0 && (
            <div className="border-t border-gray-200 divide-y divide-gray-200">
              {week.lessons.map((lesson) => (
                <div key={lesson.id} className="p-4 flex items-center">
                  <div className="h-4 w-4 mr-3">
                    {lesson.type === "video" ? (
                      <Play size={16} className="text-gray-500" />
                    ) : (
                      <Check size={16} className="text-gray-500" />
                    )}
                  </div>
                  <span className="text-gray-600">{lesson.title}</span>
                  {lesson.duration && (
                    <span className="ml-auto text-sm text-gray-500">
                      ({lesson.duration})
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseContentAccordion; 