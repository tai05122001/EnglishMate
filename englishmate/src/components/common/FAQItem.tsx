import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden shadow-sm">
      <button
        onClick={toggleOpen}
        className="bg-transparent w-full flex items-center justify-between px-6 py-4 text-left text-base font-medium text-black hover:bg-gray-50 transition duration-200"
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <div className="flex-shrink-0">
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-black" />
          ) : (
            <ChevronDown className="h-5 w-5 text-black" />
          )}
        </div>
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-4 text-[#525252] border-t border-gray-200">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default FAQItem; 