import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { LearningMaterial } from '../mock-learning-data';
import { RotateCw, ChevronRight, Sparkles } from 'lucide-react';

interface FlashcardProps {
  title: string;
  content: LearningMaterial['content'];
  onComplete: () => void;
}

const Flashcard: React.FC<FlashcardProps> = ({
  title,
  content,
  onComplete,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFlip = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIsFlipped(!isFlipped);
      // Reset animation state after animation completes
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  // Add keyboard shortcut for flipping with spacebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !isAnimating) {
        e.preventDefault();
        handleFlip();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAnimating]);

  return (
    <div className="max-w-lg mx-auto perspective-1000 w-full">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
          {title}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Flip the card to reveal the answer
        </p>
      </div>

      <div
        className={cn(
          "w-full h-[350px] sm:h-[400px] relative transition-transform duration-500 transform-style-3d cursor-pointer shadow-lg rounded-2xl",
          isAnimating && "pointer-events-none"
        )}
        onClick={handleFlip}
      >
        {/* Front side of card */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br from-white to-indigo-50 rounded-2xl backface-hidden transition-all duration-500 p-8 flex flex-col",
            isFlipped ? "rotate-y-180 opacity-0" : "rotate-y-0 opacity-100"
          )}
        >
          <div className="absolute top-4 right-4">
            <Sparkles className="w-6 h-6 text-indigo-300 animate-pulse-slow" />
          </div>

          <div className="flex-grow flex items-center justify-center">
            <div className="text-center">
              <div className="card-number text-xs uppercase font-bold tracking-wide text-indigo-400 mb-4">Front</div>
              <h3 className="text-3xl font-bold text-gray-800 leading-tight">{content.frontContent}</h3>
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <div className="flex items-center justify-center gap-2 text-sm text-indigo-500 font-medium">
              <RotateCw className="w-4 h-4" />
              <span>Flip card</span>
              <kbd className="ml-1 px-2 py-1 bg-indigo-100 text-indigo-600 text-xs rounded">Space</kbd>
            </div>
          </div>
        </div>

        {/* Back side of card */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br from-white to-purple-50 rounded-2xl backface-hidden transition-all duration-500 p-8 flex flex-col",
            isFlipped ? "rotate-y-0 opacity-100" : "rotate-y-180 opacity-0"
          )}
        >
          <div className="absolute top-4 right-4">
            <Sparkles className="w-6 h-6 text-purple-300 animate-pulse-slow" />
          </div>

          <div className="flex-grow flex items-center justify-center">
            <div className="text-center">
              <div className="card-number text-xs uppercase font-bold tracking-wide text-purple-400 mb-4">Back</div>
              <div className="text-2xl font-medium text-gray-800 leading-relaxed">{content.backContent}</div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center justify-center gap-2 text-sm text-purple-500 font-medium">
              <RotateCw className="w-4 h-4" />
              <span>Flip back</span>
              <kbd className="ml-1 px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded">Space</kbd>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onComplete();
              }}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-4 py-2 rounded-full font-medium flex items-center transition-all hover:shadow-md"
            >
              Continue
              <ChevronRight className="ml-1 w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="text-center mt-6">
        <div className="text-xs text-gray-500">
          Press <kbd className="px-1.5 py-0.5 bg-gray-200 text-gray-700 rounded text-xs">Space</kbd> to flip · Click anywhere on the card
        </div>
      </div>
    </div>
  );
};

// Add custom CSS for 3D card flip effect
const FlashcardStyles = `
  .perspective-1000 {
    perspective: 1000px;
  }

  .transform-style-3d {
    transform-style: preserve-3d;
  }

  .backface-hidden {
    backface-visibility: hidden;
  }

  .rotate-y-180 {
    transform: rotateY(180deg);
  }

  .rotate-y-0 {
    transform: rotateY(0deg);
  }

  @keyframes floating {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }

  .animate-floating {
    animation: floating 3s ease-in-out infinite;
  }

  @keyframes pulse-slow {
    0% { opacity: 0.5; }
    50% { opacity: 1; }
    100% { opacity: 0.5; }
  }

  .animate-pulse-slow {
    animation: pulse-slow 2s ease-in-out infinite;
  }
`;

export { FlashcardStyles };
export default Flashcard;
