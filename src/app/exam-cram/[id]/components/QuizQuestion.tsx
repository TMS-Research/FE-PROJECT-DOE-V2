import React, { useState } from 'react';
import { HelpCircle, CheckCircle, XCircle, ChevronRight, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LearningMaterial } from '../mock-learning-data';

interface QuizQuestionProps {
  title: string;
  content: LearningMaterial['content'];
  onComplete: () => void;
  onAnswer: (isCorrect: boolean) => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  title,
  content,
  onComplete,
  onAnswer,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleOptionSelect = (option: string) => {
    if (!isSubmitted) {
      setSelectedOption(option);
      // Add selection animation
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const handleSubmit = () => {
    if (selectedOption) {
      const correct = selectedOption === content.correctAnswer;
      setIsCorrect(correct);
      setIsSubmitted(true);
      setShowExplanation(true);
      onAnswer(correct);
    }
  };

  const getOptionClass = (option: string) => {
    if (!isSubmitted) {
      return selectedOption === option
        ? "border-indigo-400 bg-indigo-50 ring-2 ring-indigo-300 shadow-md"
        : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 hover:shadow-sm";
    }

    if (option === content.correctAnswer) {
      return "border-green-400 bg-green-50 ring-2 ring-green-300 shadow-md";
    }

    if (option === selectedOption && option !== content.correctAnswer) {
      return "border-red-400 bg-red-50 ring-2 ring-red-300 shadow-md";
    }

    return "border-gray-200 opacity-50";
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 max-w-3xl mx-auto">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
          <HelpCircle className="w-6 h-6 text-white" />
        </div>
        <div className="ml-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
            QUIZ QUESTION
          </span>
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-6">
        <p className="text-xl font-medium text-gray-800 mb-6">{content.question}</p>

        <div className="space-y-3 mb-4">
          {content.options?.map((option, index) => (
            <div
              key={index}
              className={cn(
                "border p-4 rounded-lg transition-all duration-200 cursor-pointer transform",
                getOptionClass(option),
                selectedOption === option && isAnimating ? "scale-animation" : "",
                isSubmitted && option === content.correctAnswer ? "correct-animation" : "",
                isSubmitted && option === selectedOption && option !== content.correctAnswer ? "incorrect-animation" : ""
              )}
              onClick={() => handleOptionSelect(option)}
            >
              <div className="flex items-center">
                <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
                  {isSubmitted && option === content.correctAnswer && (
                    <CheckCircle className="text-green-500 w-5 h-5 animate-pop" />
                  )}
                  {isSubmitted && option === selectedOption && option !== content.correctAnswer && (
                    <XCircle className="text-red-500 w-5 h-5 animate-pop" />
                  )}
                  {!isSubmitted && (
                    <div className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                      selectedOption === option
                        ? "border-indigo-500 bg-indigo-100"
                        : "border-gray-300"
                    )}>
                      {selectedOption === option && (
                        <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pop"></div>
                      )}
                    </div>
                  )}
                </div>
                <span className={cn(
                  "ml-3 text-lg",
                  selectedOption === option && !isSubmitted ? "font-medium text-indigo-700" : "text-gray-700"
                )}>
                  {option}
                </span>
              </div>
            </div>
          ))}
        </div>

        {showExplanation && (
          <div className={cn(
            "mt-6 p-5 rounded-lg border animate-fadeIn shadow-sm",
            isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
          )}>
            <div className="flex items-start">
              {isCorrect ? (
                <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
              )}
              <div>
                <h4 className={cn(
                  "text-lg font-medium mb-2",
                  isCorrect ? "text-green-700" : "text-red-700"
                )}>
                  {isCorrect ? "Correct! Well done!" : "Not quite right"}
                </h4>
                <p className="text-gray-700 leading-relaxed">{content.explanation}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedOption}
            className={cn(
              "px-6 py-3 rounded-full font-medium transition-all duration-200",
              selectedOption
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white transform hover:scale-105 hover:shadow-md"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            )}
          >
            Check Answer
          </button>
        ) : (
          <div className={cn(
            "px-4 py-2 rounded-full text-sm font-medium animate-fadeIn",
            isCorrect ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          )}>
            {isCorrect
              ? "Great job! You got it right."
              : `The correct answer is: ${content.correctAnswer}`}
          </div>
        )}

        {isSubmitted && (
          <button
            onClick={onComplete}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-3 rounded-full font-medium flex items-center transition-all duration-200 transform hover:scale-105 hover:shadow-md"
          >
            Continue
            <ChevronRight className="ml-2 w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

// Enhanced animations for quiz interactions
const QuizStyles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out forwards;
  }

  @keyframes scaleIn {
    0% { transform: scale(0.8); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }

  .scale-animation {
    animation: scaleIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  }

  @keyframes pop {
    0% { transform: scale(0); }
    70% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }

  .animate-pop {
    animation: pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  }

  @keyframes correctHighlight {
    0% { background-color: rgba(16, 185, 129, 0.1); }
    50% { background-color: rgba(16, 185, 129, 0.3); }
    100% { background-color: rgba(16, 185, 129, 0.1); }
  }

  .correct-animation {
    animation: correctHighlight 2s ease infinite;
  }

  @keyframes incorrectHighlight {
    0% { background-color: rgba(239, 68, 68, 0.1); }
    50% { background-color: rgba(239, 68, 68, 0.2); }
    100% { background-color: rgba(239, 68, 68, 0.1); }
  }

  .incorrect-animation {
    animation: incorrectHighlight 2s ease infinite;
  }
`;

export { QuizStyles };
export default QuizQuestion;
