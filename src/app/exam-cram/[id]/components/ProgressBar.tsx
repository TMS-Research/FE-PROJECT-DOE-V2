'use client';

import React from 'react';
import { X, ChevronLeft, Award, BookOpen, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LearningMaterial } from '../mock-learning-data';

interface ProgressBarProps {
  progressPercentage: number;
  currentIndex: number;
  totalMaterials: number;
  materials: LearningMaterial[];
  userScore: number;
  calculateMastery: () => number;
  totalQuizzes: number;
  handleExitClick: () => void;
  handlePrevious: () => void;
  setCurrentIndex: (index: number) => void;
  showMessage: boolean;
  message: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progressPercentage,
  currentIndex,
  totalMaterials,
  materials,
  userScore,
  calculateMastery,
  totalQuizzes,
  handleExitClick,
  handlePrevious,
  setCurrentIndex,
  showMessage,
  message,
}) => {
  // Get material type icon
  const getMaterialTypeIcon = (type: string, index: number) => {
    const isActive = index <= currentIndex;
    const baseClass = 'w-4 h-4';

    switch (type) {
      case 'quiz':
        return <Zap className={cn(baseClass, isActive ? 'text-amber-500' : 'text-gray-400')} />;
      case 'flashcard':
        return <Award className={cn(baseClass, isActive ? 'text-purple-500' : 'text-gray-400')} />;
      default:
        return <BookOpen className={cn(baseClass, isActive ? 'text-blue-500' : 'text-gray-400')} />;
    }
  };

  return (
    <div className="sticky top-0 bg-white shadow-md z-10">
      <div className="container mx-auto px-4 pt-9 pb-0 flex items-center justify-between">
        <button
          onClick={handleExitClick}
          className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Exit learning session"
        >
          <X size={20} />
        </button>

        <div className="flex-grow mx-4 max-w-2xl">
          <div className="relative">
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div
                className="h-full gradient-progress rounded-full"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            {/* Interactive progress dots with tooltips */}
            <div className="absolute top-0 left-0 w-full flex justify-between">
              {materials.map((material, index) => {
                const isActive = index <= currentIndex;
                const isCurrent = index === currentIndex;
                return (
                  <div
                    key={index}
                    className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center transform -translate-y-1/2 progress-dot cursor-pointer group",
                      isActive
                        ? "bg-white border-2 border-indigo-500 shadow-sm"
                        : "bg-white border-2 border-gray-200",
                      isCurrent ? "pulse-animation" : ""
                    )}
                    style={{
                      position: 'absolute',
                      left: `${(index / (totalMaterials - 1)) * 100}%`,
                      transform: 'translateX(-50%) translateY(-50%)'
                    }}
                    onClick={() => setCurrentIndex(index)}
                  >
                    {getMaterialTypeIcon(material.type, index)}

                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 hidden group-hover:block whitespace-nowrap">
                      <div className="bg-gray-800 text-xs text-white px-2 py-1 rounded shadow-lg">
                        {material.title}
                      </div>
                      <div className="w-2 h-2 bg-gray-800 transform rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={cn(
              "mr-1 p-2 rounded-full transition-colors",
              currentIndex === 0
                ? "text-gray-300"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            )}
            aria-label="Previous content"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-sm font-medium text-gray-700">{currentIndex + 1}/{totalMaterials}</span>
        </div>
      </div>

      {/* Contextual message animation */}
      <div className="relative h-8">
        {showMessage && (
          <div className="absolute inset-x-0 text-center message-animation">
            <span className="inline-block bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 text-sm font-medium px-4 py-1 rounded-full">
              {message}
            </span>
          </div>
        )}
      </div>

      {/* Mastery indicator for quiz progress */}
      {totalQuizzes > 0 && (
        <div className="bg-white px-4 py-1 text-xs font-medium text-gray-600 flex justify-center items-center space-x-4 border-t border-gray-100">
          <div className="flex items-center">
            <span className="mr-2">Mastery:</span>
            <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${calculateMastery()}%`,
                  background: `linear-gradient(90deg, #10b981, #059669)`
                }}
              ></div>
            </div>
            <span className="ml-2">{calculateMastery()}%</span>
          </div>

          <div className="flex items-center">
            <span className="mr-2">Progress:</span>
            <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${Math.round(progressPercentage)}%`,
                  background: `linear-gradient(90deg, #8b5cf6, #6366f1)`
                }}
              ></div>
            </div>
            <span className="ml-2">{Math.round(progressPercentage)}%</span>
          </div>

          <div className="flex items-center">
            <span className="mr-2">Score:</span>
            <span className="font-semibold text-indigo-600">{userScore} pts</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
