"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const questions = [
  {
    id: 1,
    question: 'What is meant by data structure?',
    options: [
      'A way to store and organize data for efficient use',
      'Collection of data stored in a database',
      'Computer program for processing data',
      'User interface display'
    ],
    correctAnswer: 'A way to store and organize data for efficient use',
    followUp: {
      question: 'Which of these is an example of a data structure?',
      options: [
        'Array',
        'Monitor',
        'Printer',
        'Graphics card'
      ],
      correctAnswer: 'Array',
      secondFollowUp: {
        question: 'Which property of an array allows direct access to its elements?',
        options: [
          'Indexing',
          'Sorting',
          'Filtering',
          'Encryption'
        ],
        correctAnswer: 'Indexing'
      }
    }
  },
  {
    id: 2,
    question: 'Which data structure uses the LIFO principle?',
    options: [
      'Stack',
      'Queue',
      'Array',
      'Linked List'
    ],
    correctAnswer: 'Stack',
    followUp: {
      question: 'What does LIFO stand for?',
      options: [
        'Last In First Out',
        'Last In Final Out',
        'Large In First Out',
        'Long Items First Out'
      ],
      correctAnswer: 'Last In First Out',
      secondFollowUp: {
        question: 'In a stack, which operation adds an element to the top?',
        options: [
          'Push',
          'Pop',
          'Peek',
          'Dequeue'
        ],
        correctAnswer: 'Push'
      }
    }
  },
  {
    id: 3,
    question: 'Which is NOT a linear data structure?',
    options: [
      'Tree',
      'Array',
      'Linked List',
      'Queue'
    ],
    correctAnswer: 'Tree',
    followUp: {
      question: 'Which of these is a linear data structure?',
      options: [
        'Array',
        'Tree',
        'Graph',
        'Binary Search Tree'
      ],
      correctAnswer: 'Array',
      secondFollowUp: {
        question: 'What is the characteristic of a linear data structure?',
        options: [
          'Elements are arranged in a sequential manner',
          'Elements have multiple paths between them',
          'Elements are always sorted',
          'Elements have parent-child relationships'
        ],
        correctAnswer: 'Elements are arranged in a sequential manner'
      }
    }
  },
];

export default function Pretest3() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showingFollowUp, setShowingFollowUp] = useState(false);
  const [showingSecondFollowUp, setShowingSecondFollowUp] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [incorrectQuestions, setIncorrectQuestions] = useState<string[]>([]);
  const [testCompleted, setTestCompleted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  // Function to move to the next main question
  const moveToNextMainQuestion = useCallback(() => {
    setShowingFollowUp(false);
    setShowingSecondFollowUp(false);
    setIncorrectQuestions([]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log('Test completed');
      setTestCompleted(true);
    }
  }, [currentQuestionIndex]);

  const handleOptionSelect = useCallback((option: string): void => {
    setSelectedOption(option);

    // Determine which question level we're currently on
    let currentQ;
    if (showingSecondFollowUp) {
      currentQ = currentQuestion.followUp.secondFollowUp;
    } else if (showingFollowUp) {
      currentQ = currentQuestion.followUp;
    } else {
      currentQ = currentQuestion;
    }

    // Check if answer is correct
    const correct = option === currentQ.correctAnswer;

    setIsCorrect(correct);
    setFeedbackMessage(correct ? 'Correct!' : 'Incorrect!');
    setShowFeedback(true);

    // Wait for feedback to be shown
    setTimeout(() => {
      setShowFeedback(false);

      setTimeout(() => {
        if (correct) {
          // If answer is correct, move to next question
          if (showingSecondFollowUp) {
            // If we were on second follow-up, go to next main question
            moveToNextMainQuestion();
          } else if (showingFollowUp) {
            // If we were on first follow-up, go to next main question
            moveToNextMainQuestion();
          } else {
            // If we were on main question, also go to next main question
            moveToNextMainQuestion();
          }
        } else {
          // If answer is incorrect
          if (showingSecondFollowUp) {
            // If we're already on the second follow-up and still incorrect,
            // move to the next main question
            moveToNextMainQuestion();
          } else if (showingFollowUp) {
            // If we're on the first follow-up and incorrect,
            // show the second follow-up
            setShowingSecondFollowUp(true);
            // Record the first follow-up question
            setIncorrectQuestions(prev => [...prev, currentQ.question]);
          } else {
            // If we're on the main question and incorrect,
            // show the first follow-up
            setShowingFollowUp(true);
            // Record the main question
            setIncorrectQuestions([currentQ.question]);
          }
        }

        setSelectedOption(null);
        setFeedbackMessage('');
      }, 300);
    }, 1500);
  }, [currentQuestion, showingFollowUp, showingSecondFollowUp, moveToNextMainQuestion]);

  // Check if test is completed and redirect
  useEffect(() => {
    if (testCompleted) {
      // Short delay before redirecting to show the last feedback
      const redirectTimer = setTimeout(() => {
        router.push('/scaffold');
      }, 1500);

      return () => clearTimeout(redirectTimer);
    }
  }, [testCompleted, router]);

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Only process if no option is currently selected
      if (selectedOption !== null) return;

      const key = event.key.toLowerCase();
      // Map keyboard keys to option indices
      const keyMap: { [key: string]: number } = {
        'a': 0,
        'b': 1,
        'c': 2,
        'd': 3
      };

      if (key in keyMap) {
        const optionIndex = keyMap[key];
        // Get current question options
        let currentOptions;
        if (showingSecondFollowUp) {
          currentOptions = currentQuestion.followUp.secondFollowUp.options;
        } else if (showingFollowUp) {
          currentOptions = currentQuestion.followUp.options;
        } else {
          currentOptions = currentQuestion.options;
        }

        // Check if option exists at this index
        if (optionIndex < currentOptions.length) {
          const selectedOption = currentOptions[optionIndex];
          handleOptionSelect(selectedOption);
        }
      }
    };

    // Add event listener
    window.addEventListener('keydown', handleKeyPress);

    // Clean up
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [selectedOption, currentQuestion, showingFollowUp, showingSecondFollowUp, handleOptionSelect]);

  // Get the current question or follow-up
  let displayQuestion;
  if (showingSecondFollowUp) {
    displayQuestion = currentQuestion.followUp.secondFollowUp;
  } else if (showingFollowUp) {
    displayQuestion = currentQuestion.followUp;
  } else {
    displayQuestion = currentQuestion;
  }

  // Letters for the options
  const optionLetters = ['A', 'B', 'C', 'D'];

  // Calculate progress percentage
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen flex w-full">
      {/* Left panel - Blue background with question */}
      <div className="w-5/12 bg-blue-800 text-white p-10 flex flex-col relative">
        {/* Progress bar at top */}
        <div className="absolute top-0 left-4 right-4 p-4 bg-blue-800">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-white/80">Question</span>
            <span className="text-xs font-medium text-white/80">{currentQuestionIndex + 1}/{questions.length}</span>
          </div>
          <div className="w-full bg-blue-900/50 rounded-full h-2">
            <div
              className="bg-white rounded-full h-2 transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Center content container */}
        <div className="flex flex-col justify-center h-full">
          {/* Question */}
          <div className="text-left">
            <h2 className="text-2xl font-bold mb-4">
              {displayQuestion.question}
            </h2>
          </div>
        </div>

        {/* Follow-up indications at bottom */}
        {incorrectQuestions.length > 0 && (
          <div className="absolute bottom-0 mb-8 left-10 right-10 bg-blue-800 space-y-2">
            <p className="text-xs text-white/70 mb-1">Incorrect answer on:</p>
            {incorrectQuestions.map((q, index) => (
              <div key={index} className="p-3 bg-blue-400/30 rounded-lg flex justify-between items-center">
                <p className="text-white text-sm font-medium truncate pr-2">{q}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right panel - Light background with options */}
      <div className="w-7/12 bg-gray-50 px-12 flex items-center relative overflow-hidden">
        <div className="w-full space-y-4">
          {displayQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`w-full text-left p-4 rounded-xl border-2 bg-white transition-all flex items-start ${
                selectedOption === option
                  ? selectedOption === displayQuestion.correctAnswer
                    ? 'border-green-600 bg-green-50'
                    : 'border-red-600 bg-red-50'
                  : 'border-blue-200 hover:border-blue-400'
              }`}
              onClick={() => handleOptionSelect(option)}
              disabled={selectedOption !== null}
            >
              <span className="text-blue-600 font-bold mr-4 mt-0.5">{optionLetters[index]}</span>
              <span className="text-gray-800">{option}</span>
            </button>
          ))}

          {/* Keyboard shortcut hint */}
          <div className="text-xs text-gray-500 mt-4 text-center">
            Press <span className="font-mono bg-gray-200 px-1 rounded">A</span>,
            <span className="font-mono bg-gray-200 px-1 rounded">B</span>,
            <span className="font-mono bg-gray-200 px-1 rounded">C</span>, or
            <span className="font-mono bg-gray-200 px-1 rounded">D</span> to select an answer
          </div>
        </div>

        {/* Feedback message */}
        <div
          className={`absolute left-0 right-0 p-4 text-center font-bold transition-transform duration-300 ease-out ${
            showFeedback ? 'translate-y-0' : 'translate-y-full'
          } ${
            isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}
          style={{ bottom: 0, position: 'absolute' }}
        >
          {feedbackMessage}
        </div>
      </div>
    </div>
  );
}