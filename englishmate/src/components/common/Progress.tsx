import React from "react";

interface ProgressProps {
  value?: number; // Giá trị tiến trình từ 0 đến 100
}

const Progress: React.FC<ProgressProps> = ({ value = 0 }) => {
  return (
    <div className="w-full h-4 bg-gray-300 rounded-full overflow-hidden">
      <div
        className="h-4 bg-gray-900 transition-all duration-500 ease-in-out"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

export default Progress;
