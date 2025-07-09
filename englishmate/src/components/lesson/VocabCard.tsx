import React from "react";
import { Button } from "@/components/ui/button";
import { Play, Check } from "lucide-react";
import type { ExampleDTO } from "@/types";

interface VocabCardProps {
  word: string;
  pronunciation: string;
  definition: string;
  examples: ExampleDTO[];
  isLearned?: boolean;
  onMarkLearned: () => void;
  onPlayPronunciation: () => void;
}

const VocabCard: React.FC<VocabCardProps> = ({
  word,
  pronunciation,
  definition,
  examples,
  isLearned = false,
  onMarkLearned,
  onPlayPronunciation,
}) => {
  console.log(examples);
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="mb-8">
        <div className="flex flex-col gap-2 mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900">
            {word}
          </h2>
          <p className="text-gray-500 text-center">{pronunciation}</p>
          <div className="flex justify-center mt-2">
            <Button
              variant="ghost"
              size="sm"
              className="bg-teal-50 text-teal-800 hover:bg-teal-100 flex items-center gap-2 rounded-full px-4 py-2"
              onClick={onPlayPronunciation}
            >
              <Play size={16} className="text-teal-800" />
              <span>Play Pronunciation</span>
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-900 text-lg mb-2">
              Definition
            </h3>
            <p className="text-gray-700">{definition}</p>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 text-lg mb-2">Examples</h3>
            <ul className="list-disc pl-5 space-y-2">
              {examples.map((example, index) => (
                <li key={index} className="text-gray-700">
                  {example.text
                    .split(example.highlightedWord)
                    .map((part, i, arr) => (
                      <React.Fragment key={i}>
                        {part}
                        {i < arr.length - 1 && (
                          <span className="font-medium text-gray-800">
                            {example.highlightedWord}
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Button
        className="w-full"
        variant={isLearned ? "outline" : "default"}
        onClick={onMarkLearned}
      >
        <Check className="mr-2 h-4 w-4" />
        {isLearned ? "Marked as Learned" : "Mark as Learned"}
      </Button>
    </div>
  );
};

export default VocabCard;
