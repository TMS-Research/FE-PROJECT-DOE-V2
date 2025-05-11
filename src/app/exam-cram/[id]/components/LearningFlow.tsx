import React, { useState, useEffect } from 'react';
import LearningCard from './LearningCard';
import Flashcard, { FlashcardStyles } from './Flashcard';
import QuizQuestion, { QuizStyles } from './QuizQuestion';
import { LearningMaterial } from '../mock-learning-data';
import ProgressBar from './ProgressBar';

interface LearningFlowProps {
  materials: LearningMaterial[];
  onComplete: () => void;
  onExit: () => void;
  xpPoints?: number;
}

const LearningFlow: React.FC<LearningFlowProps> = ({
  materials,
  onComplete,
  onExit,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<string, boolean>>({});
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [exitConfirm, setExitConfirm] = useState(false);
  const totalMaterials = materials.length;
  const currentMaterial = materials[currentIndex];

  // Calculate progress percentage
  const progressPercentage = ((currentIndex) / totalMaterials) * 100;

  // Show contextual message when reaching a new section
  useEffect(() => {
    if (currentMaterial) {
      let contextMessage = '';
      let icon = '';

      switch (currentMaterial.type) {
        case 'flashcard':
          contextMessage = 'Try to memorize this!';
          icon = '✨';
          break;
        case 'quiz':
          contextMessage = 'Let\'s practice what you\'ve learned!';
          icon = '🎯';
          break;
        case 'note':
          contextMessage = 'Read carefully!';
          icon = '📝';
          break;
        case 'definition':
          contextMessage = 'Key concept to learn!';
          icon = '📚';
          break;
        case 'example':
          contextMessage = 'See how it works!';
          icon = '🔍';
          break;
        case 'analogy':
          contextMessage = 'Think of it this way!';
          icon = '💡';
          break;
        default:
          contextMessage = 'Focus on this content!';
          icon = '👀';
      }

      setMessage(`${icon} ${contextMessage}`);
      setShowMessage(true);

      // Hide message after 3 seconds
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, currentMaterial]);

  const handleNext = () => {
    if (currentIndex < totalMaterials - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Handle quiz answer submission
  const handleQuizAnswer = (isCorrect: boolean) => {
    if (currentMaterial.type === 'quiz') {
      // Update answered questions tracking
      setAnsweredQuestions(prev => ({
        ...prev,
        [currentMaterial.id]: isCorrect
      }));

      // Update user score
      if (isCorrect) {
        setUserScore(prev => prev + 10); // Award 10 points for correct answers
      }
    }
  };

  // Count total quiz questions
  const totalQuizzes = materials.filter(m => m.type === 'quiz').length;
  const correctAnswers = Object.values(answeredQuestions).filter(v => v).length;

  // Get mastery score
  const calculateMastery = () => {
    if (totalQuizzes === 0) return 100;
    return Math.round((correctAnswers / totalQuizzes) * 100);
  };

  const handleExitClick = () => {
    if (progressPercentage > 30) {
      setExitConfirm(true);
    } else {
      onExit();
    }
  };

  // Render the current content based on its type
  const renderContent = () => {
    switch (currentMaterial.type) {
      case 'flashcard':
        return (
          <Flashcard
            title={currentMaterial.title}
            content={currentMaterial.content}
            onComplete={handleNext}
          />
        );
      case 'quiz':
        return (
          <QuizQuestion
            title={currentMaterial.title}
            content={currentMaterial.content}
            onComplete={handleNext}
            onAnswer={handleQuizAnswer}
          />
        );
      default:
        return (
          <LearningCard
            type={currentMaterial.type}
            title={currentMaterial.title}
            content={currentMaterial.content}
            onComplete={handleNext}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      {/* Custom styles for components */}
      <style jsx global>{`
        ${FlashcardStyles}
        ${QuizStyles}

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .message-animation {
          animation: fadeInUp 0.5s ease-out forwards;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }

        .pulse-animation {
          animation: pulse 0.7s ease-in-out;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .gradient-progress {
          background: linear-gradient(90deg, #4f46e5, #8b5cf6, #ec4899);
          background-size: 200% 200%;
          animation: gradientShift 5s ease infinite;
          transition: width 0.5s ease-out;
        }

        @keyframes scaleIn {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .scale-in-animation {
          animation: scaleIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        .progress-dot {
          transition: all 0.3s ease;
        }

        .progress-dot:hover {
          transform: scale(1.5);
        }
      `}</style>

      {/* Exit confirmation dialog */}
      {exitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4 scale-in-animation">
            <h3 className="text-xl font-semibold mb-3">Exit learning session?</h3>
            <p className="text-gray-600 mb-4">Your progress will be saved, but are you sure you want to exit before completing?</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setExitConfirm(false)}
                className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Continue Learning
              </button>
              <button
                onClick={onExit}
                className="px-4 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Progress Bar Component */}
      <ProgressBar
        progressPercentage={progressPercentage}
        currentIndex={currentIndex}
        totalMaterials={totalMaterials}
        materials={materials}
        userScore={userScore}
        calculateMastery={calculateMastery}
        totalQuizzes={totalQuizzes}
        handleExitClick={handleExitClick}
        handlePrevious={handlePrevious}
        setCurrentIndex={setCurrentIndex}
        showMessage={showMessage}
        message={message}
      />

      {/* Main content with background pattern */}
      <div className="flex-grow flex items-center justify-center py-8 px-4 bg-opacity-50"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.05' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
           }}
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default LearningFlow;
