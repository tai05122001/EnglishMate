import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Check, EyeIcon } from "lucide-react";
import type { VocabularyWordDTO } from "@/types";

interface VocabWord {
  id: string;
  word: string;
  isLearned: boolean;
}

interface LessonOverviewProps {
  words: VocabularyWordDTO[];
  onSelect: (wordId: number) => void;
  currentWordId?: number;
}

const LessonOverview: React.FC<LessonOverviewProps> = ({
  words,
  onSelect,
  currentWordId,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md">
      <Button
        variant="ghost"
        className="bg-transparent border-none w-full flex items-center justify-between p-6 hover:bg-teal-50 border-b border-gray-100"
        onClick={() => setExpanded(!expanded)}
      >
        <span className="text-lg font-medium text-gray-900">
          Lesson Overview
        </span>
        {expanded ? (
          <ChevronUp size={20} className="text-gray-500" />
        ) : (
          <ChevronDown size={20} className="text-gray-500" />
        )}
      </Button>

      {expanded && (
        <div className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {words.map((word) => (
              <Button
                key={word.id}
                variant="outline"
                className={`h-auto py-2 flex justify-center items-center 
                  ${
                    word.isLearned
                      ? "bg-teal-50 text-teal-900 border-teal-100 hover:bg-teal-100 hover:border-teal-200"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300"
                  }
                  ${
                    currentWordId === word.id
                      ? "ring-2 ring-teal-500 ring-offset-1"
                      : ""
                  }
                `}
                onClick={() => onSelect(word.id)}
              >
                {word.isLearned && (
                  <Check size={14} className="mr-1 text-teal-600" />
                )}
                <span>{word.word}</span>
              </Button>
            ))}
          </div>

          <div className="mt-6 w-full flex justify-center">
            <Button
              variant="default"
              className="w-full sm:w-auto text-white bg-teal-500 hover:bg-teal-600"
              onClick={() => onSelect(0)}
            >
              <EyeIcon className="mr-2 h-4 w-4" />
              Review All Words
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonOverview;
