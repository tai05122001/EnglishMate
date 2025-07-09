import React from "react";

interface LessonProgressProps {
  current: number;
  total: number;
  label?: string;
}

const LessonProgress: React.FC<LessonProgressProps> = ({
  current,
  total,
  label = "words learned",
}) => {
  // Calculate percentage for progress bar
  const percentage = Math.round((current / total) * 100);

  return (
    <section className="w-full bg-white border-t border-gray-200 py-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">
                Lesson Progress
              </h3>
              <span className="text-sm text-gray-600">
                {current} of {total} {label}
              </span>
            </div>

            <div className="h-3 w-full bg-gray-200 rounded-full">
              <div
                className="h-3 bg-teal-500 rounded-full bg-gradient-to-r from-teal-500 to-teal-700"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LessonProgress;
