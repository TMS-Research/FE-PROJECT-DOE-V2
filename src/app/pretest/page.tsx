'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, XCircle, Award, Brain, Sparkles } from 'lucide-react';

// Add keyframe animations for playful elements
const animationStyles = `
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }

  @keyframes celebrate {
    0% { transform: scale(0) rotate(0deg); opacity: 0; }
    50% { transform: scale(1.2) rotate(10deg); opacity: 1; }
    100% { transform: scale(1) rotate(0deg); opacity: 1; }
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }

  .animate-pulse-slow {
    animation: pulse 2s ease-in-out infinite;
  }

  .animate-celebrate {
    animation: celebrate 0.5s ease-out forwards;
  }
`;

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'normal' | 'easy';
  emoji?: string;
}

export default function Pretest() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);

  // Questions with normal difficulty
  const normalQuestions: Question[] = [
    {
      id: 1,
      text: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: 2,
      difficulty: "normal",
      emoji: "🗼"
    },
    {
      id: 2,
      text: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: 1,
      difficulty: "normal",
      emoji: "🪐"
    },
    {
      id: 3,
      text: "What is the chemical symbol for gold?",
      options: ["Go", "Gd", "Au", "Ag"],
      correctAnswer: 2,
      difficulty: "normal",
      emoji: "⚗️"
    },
    {
      id: 4,
      text: "Which famous scientist developed the theory of relativity?",
      options: ["Isaac Newton", "Albert Einstein", "Nikola Tesla", "Galileo Galilei"],
      correctAnswer: 1,
      difficulty: "normal",
      emoji: "🧠"
    },
    {
      id: 5,
      text: "What is the largest organ in the human body?",
      options: ["Brain", "Liver", "Heart", "Skin"],
      correctAnswer: 3,
      difficulty: "normal",
      emoji: "🔬"
    },
  ];

  // Easier alternative questions
  const easyQuestions: Question[] = [
    {
      id: 6,
      text: "Which country is Paris located in?",
      options: ["Italy", "France", "Spain", "Germany"],
      correctAnswer: 1,
      difficulty: "easy",
      emoji: "🗼"
    },
    {
      id: 7,
      text: "What color is Mars often described as?",
      options: ["Blue", "Green", "Red", "Yellow"],
      correctAnswer: 2,
      difficulty: "easy",
      emoji: "🪐"
    },
    {
      id: 8,
      text: "Gold is what type of material?",
      options: ["Plastic", "Metal", "Wood", "Glass"],
      correctAnswer: 1,
      difficulty: "easy",
      emoji: "⚗️"
    },
    {
      id: 9,
      text: "Einstein is famous for which scientific field?",
      options: ["Biology", "Chemistry", "Physics", "Geology"],
      correctAnswer: 2,
      difficulty: "easy",
      emoji: "🧠"
    },
    {
      id: 10,
      text: "Which of these is on the outside of your body?",
      options: ["Lungs", "Stomach", "Skin", "Liver"],
      correctAnswer: 2,
      difficulty: "easy",
      emoji: "🔬"
    }
  ];

  const [questions, setQuestions] = useState<Question[]>([...normalQuestions]);

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;

    const currentQuestion = questions[currentQuestionIndex];
    const isAnswerCorrect = selectedOption === currentQuestion.correctAnswer;

    setIsCorrect(isAnswerCorrect);
    setShowFeedback(true);

    if (isAnswerCorrect) {
      setScore(score + 1);
      // Show celebration animation for correct answers
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 1500);
    }

    // Mark this question as answered
    setAnsweredQuestions([...answeredQuestions, currentQuestion.id]);
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedOption(null);

    // If answer was incorrect and normal difficulty, show easier question
    if (!isCorrect && questions[currentQuestionIndex].difficulty === 'normal') {
      // Find corresponding easy question
      const updatedQuestions = [...questions];
      updatedQuestions.splice(currentQuestionIndex + 1, 0, easyQuestions[currentQuestionIndex]);
      setQuestions(updatedQuestions);
    }

    if (currentQuestionIndex === questions.length - 1) {
      setCompleted(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleFinish = () => {
    // Navigate to the next page or dashboard
    router.push('/scaffold');
  };

  const currentQuestion = questions[currentQuestionIndex];

  // Calculate progress percentage
  const progressPercentage = (answeredQuestions.length / normalQuestions.length) * 100;

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #312e81 0%, #1e293b 100%)',
      backgroundImage: `
        linear-gradient(135deg, #312e81 0%, #1e293b 100%),
        linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
      `,
      backgroundSize: '100% 100%, 40px 40px, 40px 40px',
      backgroundPosition: 'center, 0 0, 0 0'
    }}>
      {/* Animation styles */}
      <style jsx>{animationStyles}</style>

      {/* Decorative background elements */}
      <div className="absolute left-20 top-20 w-40 h-40 bg-blue-200/20 rounded-full blur-xl"></div>
      <div className="absolute right-40 bottom-20 w-60 h-60 bg-blue-300/20 rounded-full blur-xl"></div>
      <div className="absolute right-20 top-40 w-20 h-20 bg-blue-200/30 rounded-full blur-md"></div>

      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="absolute animate-celebrate">
            <span className="text-7xl">🎉</span>
          </div>
        </div>
      )}

      <div className="bg-white/0 backdrop-blur-sm rounded-[2rem] shadow-2xl shadow-blue-200/30 p-8 w-full max-w-[95%] md:max-w-[90%] lg:max-w-[85%] xl:max-w-[80%] relative overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        {/* Decorative card elements */}
        <div className="absolute -right-16 -top-16 w-32 h-32 bg-blue-100/50 rounded-full"></div>
        <div className="absolute left-20 -bottom-10 w-20 h-20 bg-blue-100/50 rounded-full"></div>

        {!completed ? (
          <>
            <div className="mb-8 relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center animate-float">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <h1 className="text-2xl font-bold text-slate-800">Knowledge Checkpoint</h1>
              </div>

              <div className="w-full bg-blue-100 rounded-full h-3 mb-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-blue-600 font-medium">
                <span>Question {Math.min(answeredQuestions.length + 1, normalQuestions.length)} of {normalQuestions.length}</span>
                <span>{Math.round(progressPercentage)}% Complete</span>
              </div>
            </div>

            <div className="mb-8 relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-xl font-medium text-slate-800">{currentQuestion.text}</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
                {currentQuestion.options.map((option, index) => {
                  // Warna kontras tinggi untuk setiap grid
                  const colorClasses = [
                    "bg-blue-600 border-blue-800 text-white hover:bg-blue-700",
                    "bg-cyan-500 border-cyan-700 text-white hover:bg-cyan-600",
                    "bg-amber-400 border-amber-600 text-slate-900 hover:bg-amber-500",
                    "bg-pink-500 border-pink-700 text-white hover:bg-pink-600"
                  ];
                  return (
                    <div
                      key={index}
                      onClick={() => !showFeedback && handleOptionSelect(index)}
                      className={`flex flex-col items-center justify-center min-h-[120px] sm:min-h-[140px] lg:min-h-[180px] p-8 rounded-2xl border-4 font-bold text-lg sm:text-xl lg:text-2xl shadow-xl transition-all duration-200 cursor-pointer select-none text-center relative ${colorClasses[index]} ${
                        selectedOption === index
                          ? 'ring-4 ring-offset-2 ring-white scale-105'
                          : 'hover:scale-105'
                      } ${
                        showFeedback ? 'cursor-not-allowed opacity-80' : ''
                      }`}
                      style={{textShadow: '0 2px 8px rgba(0,0,0,0.18)'}}
                    >
                      <span className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/30 text-white font-bold text-base border border-white/40">
                        {index + 1}
                      </span>
                      <span className="w-full block break-words">{option}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {showFeedback && (
              <div className={`p-5 rounded-xl mb-6 ${
                isCorrect
                  ? 'bg-green-50 border-2 border-green-100'
                  : 'bg-red-50 border-2 border-red-100'
              }`}>
                <div className="flex items-center gap-3">
                  {isCorrect ? (
                    <>
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <p className="font-medium text-green-800">
                        Excellent! That&apos;s the correct answer!
                      </p>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-6 h-6 text-red-600" />
                      <p className="font-medium text-red-800">
                        Incorrect. The correct answer is {currentQuestion.options[currentQuestion.correctAnswer]}.
                      </p>
                    </>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-end relative z-10">
              {!showFeedback ? (
                <button
                  onClick={handleSubmit}
                  disabled={selectedOption === null}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    selectedOption === null
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:shadow-lg hover:shadow-blue-200 hover:scale-[1.02]'
                  }`}
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:shadow-lg hover:shadow-blue-200 hover:scale-[1.02] transition-all"
                >
                  Next Question
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-8 relative z-10">
            <div className="w-24 h-24 mx-auto rounded-full bg-blue-100 flex items-center justify-center mb-6 animate-pulse-slow">
              <div className="relative">
                <Award className="w-12 h-12 text-blue-600" />
                <div className="absolute -top-2 -right-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                </div>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              Checkpoint Complete!
            </h1>
            <p className="text-blue-600 font-medium text-lg mb-4">
              Great job on completing all questions!
            </p>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl mb-8 inline-block">
              <div className="text-5xl font-bold mb-2">
                <span className="bg-gradient-to-r from-blue-600 to-blue-700 text-transparent bg-clip-text">
                  {score}/{normalQuestions.length}
                </span>
              </div>
              <p className="text-slate-600">Your Score</p>
            </div>

            <button
              onClick={handleFinish}
              className="px-8 py-4 rounded-xl font-medium bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:shadow-lg hover:shadow-blue-200 hover:scale-[1.02] transition-all w-full max-w-xs mx-auto flex items-center justify-center gap-2"
            >
              <span>Continue to Dashboard</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
