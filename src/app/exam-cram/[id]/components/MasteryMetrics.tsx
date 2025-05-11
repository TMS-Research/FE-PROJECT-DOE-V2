'use client';

import React from 'react';
import { Sparkles, Brain } from 'lucide-react';

interface MasteryMetricsProps {
  confidenceScore: number;
  masteryScore: number;
}

export default function MasteryMetrics({
  confidenceScore,
  masteryScore
}: MasteryMetricsProps) {
  // Helper function to determine color based on score
  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-emerald-500 to-green-500';
    if (score >= 60) return 'from-yellow-400 to-amber-500';
    if (score >= 40) return 'from-orange-400 to-amber-600';
    return 'from-red-400 to-red-600';
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-500';
    if (score >= 60) return 'text-amber-500';
    if (score >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  // Get letter grade
  const getGrade = (score: number) => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  };

  // Calculate arc path for circular progress indicators
  const createArc = (percentage: number) => {
    const size = 76; // Circle size
    const strokeWidth = 6;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference * (1 - percentage / 100);

    return {
      size,
      strokeWidth,
      radius,
      circumference,
      dashOffset
    };
  };

  const confidenceArc = createArc(confidenceScore);
  const masteryArc = createArc(masteryScore);

  return (
    <div className="flex gap-4 justify-between items-center">
      {/* Confidence Ring */}
      <div className="flex flex-col items-center">
        <div className="relative">
          <svg width={confidenceArc.size} height={confidenceArc.size}>
            {/* Background circle */}
            <circle
              cx={confidenceArc.size / 2}
              cy={confidenceArc.size / 2}
              r={confidenceArc.radius}
              fill="none"
              strokeWidth={confidenceArc.strokeWidth}
              className="stroke-slate-200"
            />
            {/* Colored gradient defs */}
            <defs>
              <linearGradient id="confidenceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" className={`${confidenceScore >= 60 ? 'stop-color-violet-400' : 'stop-color-red-400'}`} />
                <stop offset="100%" className={`${confidenceScore >= 60 ? 'stop-color-purple-500' : 'stop-color-red-500'}`} />
              </linearGradient>
            </defs>
            {/* Progress circle */}
            <circle
              cx={confidenceArc.size / 2}
              cy={confidenceArc.size / 2}
              r={confidenceArc.radius}
              fill="none"
              strokeWidth={confidenceArc.strokeWidth}
              stroke="url(#confidenceGradient)"
              strokeLinecap="round"
              strokeDasharray={confidenceArc.circumference}
              strokeDashoffset={confidenceArc.dashOffset}
              transform={`rotate(-90 ${confidenceArc.size / 2} ${confidenceArc.size / 2})`}
              className="transition-all duration-1000 ease-out"
            />

            {/* Center text */}
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dy=".3em"
              className="fill-violet-600 font-bold text-xl"
            >
              {confidenceScore}%
            </text>
          </svg>
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-violet-400 opacity-30 animate-pulse-slow" />
          </div>
        </div>
        <span className="text-sm font-medium text-slate-600 mt-1">Completion</span>
      </div>

      {/* Mastery Dial */}
      <div className="flex flex-col items-center">
        <div className="relative">
          <svg width={masteryArc.size} height={masteryArc.size}>
            {/* Background circle */}
            <circle
              cx={masteryArc.size / 2}
              cy={masteryArc.size / 2}
              r={masteryArc.radius}
              fill="none"
              strokeWidth={masteryArc.strokeWidth}
              className="stroke-slate-200"
            />
            {/* Colored gradient defs */}
            <defs>
              <linearGradient id="masteryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" className={`stop-color-${getScoreGradient(masteryScore).split(' ')[0].replace('from-', '')}`} />
                <stop offset="100%" className={`stop-color-${getScoreGradient(masteryScore).split(' ')[1].replace('to-', '')}`} />
              </linearGradient>
            </defs>
            {/* Progress circle */}
            <circle
              cx={masteryArc.size / 2}
              cy={masteryArc.size / 2}
              r={masteryArc.radius}
              fill="none"
              strokeWidth={masteryArc.strokeWidth}
              stroke="url(#masteryGradient)"
              strokeLinecap="round"
              strokeDasharray={masteryArc.circumference}
              strokeDashoffset={masteryArc.dashOffset}
              transform={`rotate(-90 ${masteryArc.size / 2} ${masteryArc.size / 2})`}
              className="transition-all duration-1000 ease-out"
            />

            {/* Center text with grade overlay */}
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dy=".3em"
              className={`${getScoreColor(masteryScore)} font-bold text-xl`}
            >
              {masteryScore}%
            </text>

            {/* Small grade letter */}
            <text
              x="85%"
              y="25%"
              textAnchor="middle"
              className={`${getScoreColor(masteryScore)} font-bold text-sm`}
            >
              {getGrade(masteryScore)}
            </text>
          </svg>
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <Brain className="h-5 w-5 text-violet-400 opacity-30 animate-pulse-slow" />
          </div>
        </div>
        <span className="text-sm font-medium text-slate-600 mt-1">Mastery</span>
      </div>
    </div>
  );
}
