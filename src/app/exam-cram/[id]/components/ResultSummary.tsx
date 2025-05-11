'use client';

import React, { useState } from 'react';
import { Award, CheckCircle, XCircle, RotateCcw, Home, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Question } from '../store';

interface ResultSummaryProps {
  questions: Question[];
  userAnswers: Record<string, {
    answer: any;
    isCorrect: boolean;
    reviewed: boolean;
  }>;
  confidenceScore: number;
  masteryScore: number;
  onRetry: () => void;
  onExit: () => void;
}

export default function ResultSummary({
  questions,
  userAnswers,
  confidenceScore,
  masteryScore,
  onRetry,
  onExit
}: ResultSummaryProps) {
  const [reviewingQuestion, setReviewingQuestion] = useState<Question | null>(null);

  // Calculate results
  const totalQuestions = questions.length;
  const answeredQuestions = Object.keys(userAnswers).length;
  const correctAnswers = Object.values(userAnswers).filter(a => a.isCorrect).length;

  // Get grade based on masteryScore
  const getGrade = (score: number) => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  };

  // Get color based on masteryScore
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    if (score >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <div className="max-w-3xl mx-auto">
      {!reviewingQuestion ? (
        <>
          {/* Results summary */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
              <Award className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Exam Completed!</h1>
            <p className="text-muted-foreground">
              You answered {answeredQuestions} of {totalQuestions} questions and got {correctAnswers} correct.
            </p>
          </div>

          {/* Score details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Mastery Score */}
            <div className="border rounded-lg p-6 bg-card flex flex-col items-center">
              <div className="text-5xl font-bold mb-2 relative">
                <span className={getScoreColor(masteryScore)}>{masteryScore}%</span>
                <span className="absolute top-0 right-0 transform translate-x-full -translate-y-1/4 text-lg">
                  {getGrade(masteryScore)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">Overall Score</p>
            </div>

            {/* Correct vs. Incorrect */}
            <div className="border rounded-lg p-6 bg-card">
              <div className="flex gap-4 justify-center">
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 mx-auto mb-2">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="text-2xl font-bold">{correctAnswers}</div>
                  <p className="text-xs text-muted-foreground">Correct</p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 mx-auto mb-2">
                    <XCircle className="h-6 w-6 text-red-500" />
                  </div>
                  <div className="text-2xl font-bold">{answeredQuestions - correctAnswers}</div>
                  <p className="text-xs text-muted-foreground">Incorrect</p>
                </div>
              </div>
            </div>

            {/* Completion details */}
            <div className="border rounded-lg p-6 bg-card">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Attempted:</span>
                  <span className="font-medium">{answeredQuestions}/{totalQuestions}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Accuracy:</span>
                  <span className="font-medium">
                    {answeredQuestions > 0 ? Math.round((correctAnswers / answeredQuestions) * 100) : 0}%
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Completion:</span>
                  <span className="font-medium">{Math.round((answeredQuestions / totalQuestions) * 100)}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Question list */}
          <div className="border rounded-lg bg-card overflow-hidden mb-8">
            <div className="p-4 border-b">
              <h2 className="font-medium">Question Review</h2>
            </div>

            <div className="divide-y">
              {questions.map((question, index) => {
                const answer = userAnswers[question.id];
                const isAnswered = !!answer;
                const isCorrect = answer?.isCorrect;

                return (
                  <div
                    key={question.id}
                    className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "flex items-center justify-center w-8 h-8 rounded-full shrink-0",
                          !isAnswered ? "bg-secondary" : isCorrect ? "bg-green-100 dark:bg-green-900/20" : "bg-red-100 dark:bg-red-900/20"
                        )}
                      >
                        {!isAnswered ? (
                          <span className="text-muted-foreground">{index + 1}</span>
                        ) : isCorrect ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                      </div>

                      <div>
                        <p className="text-sm font-medium line-clamp-1">{question.text}</p>
                        <p className="text-xs text-muted-foreground">{
                          question.type === 'multiple-choice' ? 'Multiple Choice' :
                          question.type === 'short-answer' ? 'Short Answer' : 'Essay'
                        }</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setReviewingQuestion(question)}
                      className="flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
                    >
                      <Eye className="h-3 w-3" /> Review
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onRetry}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <RotateCcw className="h-4 w-4" /> Retry Exam
            </button>

            <button
              onClick={onExit}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <Home className="h-4 w-4" /> Return to Dashboard
            </button>
          </div>
        </>
      ) : (
        // Question review screen
        <div className="space-y-6">
          <button
            onClick={() => setReviewingQuestion(null)}
            className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to results
          </button>

          <div className="border rounded-lg bg-card p-6">
            <div className="mb-4">
              <div className="text-sm text-muted-foreground mb-2">
                Question {questions.findIndex(q => q.id === reviewingQuestion.id) + 1} • {
                  reviewingQuestion.type === 'multiple-choice' ? 'Multiple Choice' :
                  reviewingQuestion.type === 'short-answer' ? 'Short Answer' : 'Essay'
                }
              </div>

              <h3 className="text-lg font-medium">{reviewingQuestion.text}</h3>
            </div>

            {reviewingQuestion.type === 'multiple-choice' && (
              <div className="space-y-2 mt-4">
                {reviewingQuestion.options?.map((option, index) => {
                  const userAnswered = userAnswers[reviewingQuestion.id]?.answer === index;
                  const isCorrect = index === reviewingQuestion.correctAnswer;

                  return (
                    <div
                      key={index}
                      className={cn(
                        "p-3 rounded-md border",
                        userAnswered && !isCorrect && "border-red-500 bg-red-50 dark:bg-red-950/20",
                        isCorrect && "border-green-500 bg-green-50 dark:bg-green-950/20"
                      )}
                    >
                      <div className="flex items-center">
                        <div
                          className={cn(
                            "flex items-center justify-center w-6 h-6 rounded-full mr-3 border text-sm font-medium",
                            userAnswered && !isCorrect ? "border-red-500 bg-red-500 text-white" :
                            isCorrect ? "border-green-500 bg-green-500 text-white" : "border-muted-foreground"
                          )}
                        >
                          {String.fromCharCode(65 + index)}
                        </div>
                        <div className="flex-1">{option}</div>

                        {userAnswered && !isCorrect && (
                          <XCircle className="h-5 w-5 text-red-500 shrink-0 ml-2" />
                        )}

                        {isCorrect && (
                          <CheckCircle className="h-5 w-5 text-green-500 shrink-0 ml-2" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {reviewingQuestion.type === 'short-answer' && (
              <div className="mt-4">
                <div className="mb-2 text-sm font-medium">Your Answer:</div>
                <div className="p-3 border rounded-md mb-4">
                  {userAnswers[reviewingQuestion.id]?.answer || <em className="text-muted-foreground">No answer provided</em>}
                </div>

                <div className="mb-2 text-sm font-medium">Accepted Answers:</div>
                <div className="p-3 border border-green-500 bg-green-50 dark:bg-green-950/20 rounded-md">
                  {Array.isArray(reviewingQuestion.correctAnswer)
                    ? reviewingQuestion.correctAnswer.join(', ')
                    : reviewingQuestion.correctAnswer}
                </div>
              </div>
            )}

            {reviewingQuestion.type === 'essay' && (
              <div className="mt-4">
                <div className="mb-2 text-sm font-medium">Your Answer:</div>
                <div className="p-3 border rounded-md whitespace-pre-wrap">
                  {userAnswers[reviewingQuestion.id]?.answer || <em className="text-muted-foreground">No answer provided</em>}
                </div>

                <div className="mt-4 mb-2 text-sm font-medium">Evaluation Criteria:</div>
                <div className="p-3 border rounded-md bg-muted/50">
                  <p>Essay responses are evaluated based on:</p>
                  <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                    <li>Demonstration of understanding key concepts</li>
                    <li>Clear comparison and contrast of different elements</li>
                    <li>Inclusion of relevant examples</li>
                    <li>Logical organization and coherence</li>
                    <li>Proper use of terminology</li>
                  </ul>
                </div>
              </div>
            )}

            <div className="mt-6 bg-muted p-4 rounded-md">
              <h4 className="font-medium mb-2">Explanation</h4>
              <p className="text-sm">{reviewingQuestion.explanation}</p>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => setReviewingQuestion(null)}
              className="px-4 py-2 rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
            >
              Back to Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
