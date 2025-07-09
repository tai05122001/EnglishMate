import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface LessonNavigationProps {
  currentIndex: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
  disablePrevious?: boolean;
  disableNext?: boolean;
}

const LessonNavigation: React.FC<LessonNavigationProps> = ({
  currentIndex,
  total,
  onPrevious,
  onNext,
  disablePrevious = false,
  disableNext = false,
}) => {
  return (
    <div className="shadow-none border-none flex items-center justify-between py-4 mt-4">
      <Button
        size="sm"
        onClick={onPrevious}
        disabled={disablePrevious}
        className="flex items-center gap-2 bg-gray-500/40 border-none"
      >
        <ChevronLeft size={16} className="text-gray-700" />
        <span className="text-black">Previous</span>
      </Button>

      <span className="text-sm text-gray-600">
        Word {currentIndex + 1} of {total}
      </span>

      <Button
        variant="default"
        size="sm"
        onClick={onNext}
        disabled={disableNext}
        className="flex items-center gap-2"
      >
        <span>Next</span>
        <ChevronRight size={16} />
      </Button>
    </div>
  );
};

export default LessonNavigation;
