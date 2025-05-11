'use client';

import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Question } from '../store';

interface QuestionCardProps {
  question: Question;
  userAnswer?: string | number | null;
  isReviewed?: boolean;
  isCorrect?: boolean;
  onAnswer: (questionId: string, answer: string | number | null, isCorrect: boolean) => void;
}

export default function QuestionCard({
  question,
  userAnswer,
  isReviewed = false,
  isCorrect,
  onAnswer
}: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(
    typeof userAnswer === 'number' ? userAnswer : null
  );
  const [shortAnswer, setShortAnswer] = useState<string>(
    typeof userAnswer === 'string' ? userAnswer : ''
  );
  const [essayAnswer, setEssayAnswer] = useState<string>(
    typeof userAnswer === 'string' ? userAnswer : ''
  );

  const handleOptionSelect = (optionIndex: number) => {
    if (isReviewed) return; // Prevent changes after submission
    setSelectedOption(optionIndex);
  };

  const handleSubmitAnswer = () => {
    if (isReviewed) return; // Prevent multiple submissions

    let answer;
    let correct = false;

    switch (question.type) {
      case 'multiple-choice':
        answer = selectedOption;
        correct = selectedOption === question.correctAnswer;
        break;

      case 'short-answer':
        answer = shortAnswer;
        // Check if the answer contains any of the correct keywords
        const keywords = Array.isArray(question.correctAnswer)
          ? question.correctAnswer
          : [question.correctAnswer];

        correct = keywords.some(keyword =>
          shortAnswer.toLowerCase().includes(String(keyword).toLowerCase())
        );
        break;

      case 'essay':
        answer = essayAnswer;
        // Essay answers always need manual review, but we'll count it as correct for now
        correct = true;
        break;

      default:
        return;
    }

    onAnswer(question.id, answer, correct);
  };

  // Add emoji based on question type
  const getQuestionEmoji = () => {
    switch (question.type) {
      case 'multiple-choice':
        return '🔍';
      case 'short-answer':
        return '✏️';
      case 'essay':
        return '📝';
      default:
        return '❓';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-violet-100 transition-all duration-300 hover:shadow-lg relative overflow-hidden">
      {/* Decorative corner blob */}
      <div className="absolute -top-8 -right-8 w-16 h-16 bg-violet-50 rounded-full"></div>

      <div className="mb-4 relative z-10">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center justify-center w-8 h-8 bg-violet-100 rounded-full text-lg">
              {getQuestionEmoji()}
            </div>
            <div className="text-sm text-violet-600 font-medium">
              Question {question.id.replace('q', '')} • {question.type === 'multiple-choice' ? 'Multiple Choice' : question.type === 'short-answer' ? 'Short Answer' : 'Essay'}
            </div>
          </div>

          {isReviewed && (
            <div className="flex items-center">
              {isCorrect ? (
                <div className="flex items-center gap-1 text-green-600 text-sm bg-green-50 px-2 py-1 rounded-full">
                  <CheckCircle className="h-4 w-4" /> Correct
                </div>
              ) : (
                <div className="flex items-center gap-1 text-red-600 text-sm bg-red-50 px-2 py-1 rounded-full">
                  <XCircle className="h-4 w-4" /> Incorrect
                </div>
              )}
            </div>
          )}
        </div>

        <h3 className="text-xl font-medium text-slate-800 mt-2">{question.text}</h3>
      </div>

      <div className="mt-6">
        {question.type === 'multiple-choice' && (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <div
                key={index}
                onClick={() => handleOptionSelect(index)}
                className={cn(
                  "p-4 rounded-xl border cursor-pointer transition-all duration-200 transform hover:scale-[1.01]",
                  selectedOption === index
                    ? "border-violet-500 bg-violet-50 shadow-sm"
                    : "border-slate-200 hover:border-violet-200 hover:bg-violet-50/30",
                  isReviewed && selectedOption === index && !isCorrect && "border-red-500 bg-red-50",
                  isReviewed && index === question.correctAnswer && "border-green-500 bg-green-50"
                )}
              >
                <div className="flex items-center">
                  <div
                    className={cn(
                      "flex items-center justify-center w-7 h-7 rounded-full mr-3 border text-sm font-medium transition-colors",
                      selectedOption === index
                        ? "border-violet-500 bg-violet-500 text-white"
                        : "border-slate-300 text-slate-600",
                      isReviewed && selectedOption === index && !isCorrect && "border-red-500 bg-red-500 text-white",
                      isReviewed && index === question.correctAnswer && "border-green-500 bg-green-500 text-white"
                    )}
                  >
                    {String.fromCharCode(65 + index)}
                  </div>
                  <div className="flex-1 text-slate-700">{option}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {question.type === 'short-answer' && (
          <div>
            <input
              type="text"
              value={shortAnswer}
              onChange={(e) => setShortAnswer(e.target.value)}
              disabled={isReviewed}
              placeholder="Type your answer here..."
              className={cn(
                "w-full p-4 border rounded-xl text-slate-700",
                isReviewed && isCorrect ? "border-green-500 bg-green-50/30" : isReviewed ? "border-red-500 bg-red-50/30" : "border-slate-200",
                "focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
              )}
            />
          </div>
        )}

        {question.type === 'essay' && (
          <div>
            <textarea
              value={essayAnswer}
              onChange={(e) => setEssayAnswer(e.target.value)}
              disabled={isReviewed}
              placeholder="Write your essay answer here..."
              className={cn(
                "w-full min-h-[200px] p-4 border rounded-xl text-slate-700",
                isReviewed ? "border-violet-500 bg-violet-50/30" : "border-slate-200",
                "focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
              )}
              rows={8}
            />
          </div>
        )}
      </div>

      {isReviewed && (
        <div className="mt-6 bg-gradient-to-r from-violet-50 to-purple-50 p-5 rounded-xl border border-violet-100 animate-fade-in">
          <h4 className="font-semibold mb-2 flex items-center gap-2 text-slate-700">
            <div className="w-5 h-5 bg-violet-100 rounded-full flex items-center justify-center text-violet-600 text-xs">i</div>
            Explanation
          </h4>
          <p className="text-slate-600">{question.explanation}</p>
        </div>
      )}

      {!isReviewed && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSubmitAnswer}
            disabled={
              (question.type === 'multiple-choice' && selectedOption === null) ||
              (question.type === 'short-answer' && !shortAnswer.trim()) ||
              (question.type === 'essay' && !essayAnswer.trim())
            }
            className={cn(
              "px-5 py-2.5 rounded-xl transition-all duration-200 font-medium",
              ((question.type === 'multiple-choice' && selectedOption === null) ||
               (question.type === 'short-answer' && !shortAnswer.trim()) ||
               (question.type === 'essay' && !essayAnswer.trim()))
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : "bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-md hover:shadow-lg transform hover:scale-105"
            )}
          >
            Submit Answer
          </button>
        </div>
      )}
    </div>
  );
}
