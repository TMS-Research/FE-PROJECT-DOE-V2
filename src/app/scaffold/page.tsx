"use client"
import React from 'react';
import { Brain, HelpCircle, ChevronRight, CheckCircle2, XCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const questions = [
  {
    title: 'Computer Processing Capacity',
    description: 'In the field of computational science, supercomputers play a crucial role in processing large amounts of data for research such as climate modeling, genomics, and artificial intelligence.',
    subQuestions: [
      {
        q: '1.1. A supercomputer can perform 1.5 × 10¹⁵ calculations per second. Calculate how many calculations this supercomputer can perform in one day. Express your answer in scientific notation (standard form).',
        hints: [
          'How many seconds are in one day? How do you multiply this by the number of calculations per second?', // nudge
          'One day has 24 hours × 60 minutes × 60 seconds = 86,400 seconds. Multiply this by 1.5 × 10¹⁵ calculations per second.', // outline
          'Number of calculations = 1.5 × 10¹⁵ × 86,400 = 1.296 × 10²⁰ or 1.296 × 10²⁰ calculations per day.' // full solve
        ]
      },
      {
        q: '1.2. Express the result of the above calculation in exaflop-days, where 1 exaflop = 1 × 10¹⁸ calculations.',
        hints: [
          'How do you convert calculations in scientific notation to exaflop units?', // nudge
          'Divide the number of calculations (1.296 × 10²⁰) by the definition of 1 exaflop (1 × 10¹⁸ calculations).', // outline
          '1.296 × 10²⁰ ÷ (1 × 10¹⁸) = 1.296 × 10² = 129.6 exaflop-days.' // full solve
        ]
      },
    ],
  },
  {
    title: 'Energy Consumption',
    description: 'Supercomputers require enormous electrical power to operate. Managing energy consumption is one of the challenges in operating supercomputers.',
    subQuestions: [
      {
        q: '2.1. If the supercomputer consumes 2 megawatts of electricity per hour, what is the total energy used in one day? Express your answer in kilowatt-hours (kWh).',
        hints: [
          'How do you convert from megawatts to kilowatts? How many hours are in a day?', // nudge
          '1 megawatt = 1,000 kilowatts, and one day has 24 hours. Total energy = power × time.', // outline
          '2 megawatts × 24 hours = 2,000 kilowatts × 24 hours = 48,000 kWh' // full solve
        ]
      },
      {
        q: '2.2. What is the electricity cost per day if the electricity rate is $1,500 per kWh?',
        hints: [
          'Use the result of the previous calculation for total energy in kWh then multiply by the rate.', // nudge
          'Total energy = 48,000 kWh. Multiply this by the rate of $1,500 per kWh.', // outline
          'Cost = 48,000 kWh × $1,500 = $72,000,000 per day.' // full solve
        ]
      },
    ],
  },
  {
    title: 'Comparative Performance',
    description: 'Comparing the performance of supercomputers with regular computers helps us understand the scale of difference in processing capacity between technologies.',
    subQuestions: [
      {
        q: '3.1. A regular computer can only perform 3 × 10⁹ calculations per second. How many times faster is the supercomputer compared to a regular computer?',
        hints: [
          'Compare the calculation capabilities per second of the supercomputer with the regular computer.', // nudge
          'Divide the supercomputer\'s calculation capability (1.5 × 10¹⁵) by the regular computer\'s capability (3 × 10⁹).', // outline
          '1.5 × 10¹⁵ ÷ (3 × 10⁹) = 0.5 × 10⁶ = 5 × 10⁵ times faster.' // full solve
        ]
      },
      {
        q: '3.2. If a regular computer is used for one day, how many calculations can it perform?',
        hints: [
          'Similar to question 1.1, but use the speed value of a regular computer.', // nudge
          'One day has 86,400 seconds. Multiply this by 3 × 10⁹ calculations per second.', // outline
          'Number of calculations = 3 × 10⁹ × 86,400 = 2.592 × 10¹⁴ calculations per day.' // full solve
        ]
      },
    ],
  },
  {
    title: 'Application in Research',
    description: 'Supercomputers enable researchers to solve complex problems that require high calculation capacity.',
    subQuestions: [
      {
        q: '4.1. Name two research fields that greatly benefit from the existence of supercomputers.',
        hints: [
          'Think about fields of science that work with large-scale data or complex calculations.', // nudge
          'Some examples include climatology, physics, computational biology, or artificial intelligence.', // outline
          'Two main examples: (1) Climate modeling - to predict climate change with high detail, (2) Genomics - to analyze and map complex DNA sequences.' // full solve
        ]
      },
      {
        q: '4.2. Explain how supercomputers help in one of these fields.',
        hints: [
          'Think about the volume of data or complexity of calculations needed in that field.', // nudge
          'For example, in climate modeling, supercomputers allow high-resolution simulations of Earth\'s atmosphere.', // outline
          'In climate modeling, supercomputers allow scientists to simulate complex interactions between the atmosphere, oceans, land, and ice at high resolution over extended periods. Without this computing power, climate predictions would be highly inaccurate and unreliable for making important decisions related to climate change.' // full solve
        ]
      },
      {
        q: '4.3. Give an example of research results that would be impossible without supercomputers.',
        hints: [
          'Think about research that requires extreme calculations or massive data analysis.', // nudge
          'Some examples: galaxy formation simulations, molecular modeling for drug development, or nuclear explosion simulations.', // outline
          'The Human Genome Project - complete mapping of the human genome requires analysis of billions of DNA base pairs. Without supercomputers, this project would take decades instead of just a few years. Another example: universe formation simulations that track interactions of billions of particles from the Big Bang to galaxy formation.' // full solve
        ]
      },
    ],
  },
  {
    title: 'Data Storage and Transfer',
    description: 'Supercomputers not only generate calculations but also data in very large volumes, which require efficient storage and transfer strategies.',
    subQuestions: [
      {
        q: '5.1. If each calculation generates 2 bytes of data, how much total data does the supercomputer generate in one day? Express your answer in terabytes (TB).',
        hints: [
          'Use the calculation result per day from question 1.1, then multiply by 2 bytes.', // nudge
          'Total calculations per day = 1.296 × 10²⁰. Data per calculation = 2 bytes. Convert to TB: 1 TB = 10¹² bytes.', // outline
          '1.296 × 10²⁰ × 2 bytes = 2.592 × 10²⁰ bytes = 2.592 × 10²⁰ ÷ 10¹² = 2.592 × 10⁸ TB = 259.2 petabytes (PB).' // full solve
        ]
      },
      {
        q: '5.2. How long would it take to transfer this data through a network with a speed of 10 Gbps?',
        hints: [
          'Convert the data size to bits (1 byte = 8 bits) and the transfer speed to bits per second.', // nudge
          'Total data = 2.592 × 10²⁰ bytes × 8 = 2.0736 × 10²¹ bits. Speed = 10 × 10⁹ bits per second. Time = Data ÷ Speed.', // outline
          'Time = 2.0736 × 10²¹ bits ÷ (10 × 10⁹ bits/s) = 2.0736 × 10¹² seconds = 66,200 years! This shows that transferring data from supercomputers requires special strategies and super-fast networks.' // full solve
        ]
      },
    ],
  },
];

// Multiple choice questions for transitions
const transitionQuestions = [
  {
    question: "What is the main purpose of a supercomputer?",
    options: [
      { key: "A", text: "To play video games" },
      { key: "B", text: "To process large amounts of data for complex calculations" },
      { key: "C", text: "To browse the internet" },
      { key: "D", text: "To store personal files" }
    ],
    correctAnswer: 1
  },
  {
    question: "Which unit is used to measure supercomputer performance?",
    options: [
      { key: "A", text: "Megahertz (MHz)" },
      { key: "B", text: "Exaflops" },
      { key: "C", text: "Gigabytes (GB)" },
      { key: "D", text: "Kilowatts (kW)" }
    ],
    correctAnswer: 1
  },
  {
    question: "What is a common challenge in operating supercomputers?",
    options: [
      { key: "A", text: "Finding enough desk space" },
      { key: "B", text: "Managing energy consumption" },
      { key: "C", text: "Installing software updates" },
      { key: "D", text: "Connecting to WiFi" }
    ],
    correctAnswer: 1
  },
  {
    question: "Which field benefits most from supercomputers?",
    options: [
      { key: "A", text: "Social media" },
      { key: "B", text: "Climate modeling and scientific research" },
      { key: "C", text: "Online shopping" },
      { key: "D", text: "Video streaming" }
    ],
    correctAnswer: 1
  }
];

// Animation keyframes
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

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }

  .animate-pulse-slow {
    animation: pulse 2s ease-in-out infinite;
  }
`;

export default function ScaffoldPage() {
  const [current, setCurrent] = React.useState(0);
  const [answers, setAnswers] = React.useState<{[key: string]: string}>({});
  const [hintLevels, setHintLevels] = React.useState<{[key: string]: number}>({});
  const [submitted, setSubmitted] = React.useState<{[key: string]: boolean}>({});
  const [xpLost, setXpLost] = React.useState<{[key: string]: number}>({});
  const [feedback, setFeedback] = React.useState<{[key: string]: boolean | null}>({});
  const [activeSubQuestion, setActiveSubQuestion] = React.useState<string>("0-0");
  const [showTransitionPopup, setShowTransitionPopup] = React.useState(false);
  const [selectedTransitionAnswer, setSelectedTransitionAnswer] = React.useState<number | null>(null);
  const [transitionFeedback, setTransitionFeedback] = React.useState<boolean | null>(null);

  // Calculate progress percentage
  const progressPercentage = ((current + 1) / questions.length) * 100;

  const handleAnswerChange = (questionIndex: number, subIndex: number, value: string) => {
    const key = `${questionIndex}-${subIndex}`;
    setAnswers(prev => ({...prev, [key]: value}));
  };

  const handleHintRequest = (questionIndex: number, subIndex: number) => {
    const key = `${questionIndex}-${subIndex}`;
    const currentLevel = hintLevels[key] || 0;

    if (currentLevel < 3) {
      setHintLevels(prev => ({...prev, [key]: currentLevel + 1}));

      // Deduct XP when full solution hint is shown
      if (currentLevel === 1) {
        setXpLost(prev => ({...prev, [key]: 50})); // Lose 50% XP
      }
    }
  };

  const handleSubmit = (questionIndex: number, subIndex: number) => {
    const key = `${questionIndex}-${subIndex}`;
    setSubmitted(prev => ({...prev, [key]: true}));

    // Simulate answer checking - in a real app, you would check against actual correct answers
    // For demo purposes, we'll use a simple algorithm to determine if an answer is "correct"
    const userAnswer = answers[key]?.trim().toLowerCase() || '';
    let isCorrect = false;

  // Simple evaluation logic for demonstration
    if (questionIndex === 0) { // Computer Processing Capacity
      if (subIndex === 0) {
        isCorrect = userAnswer.includes('1.296') && userAnswer.includes('10') && (userAnswer.includes('20') || userAnswer.includes('²⁰'));
      } else if (subIndex === 1) {
        isCorrect = userAnswer.includes('129.6') || userAnswer.includes('129,6');
      }
    } else if (questionIndex === 1) { // Energy Consumption
      if (subIndex === 0) {
        isCorrect = userAnswer.includes('48000') || userAnswer.includes('48.000');
      } else if (subIndex === 1) {
        isCorrect = userAnswer.includes('72000000') || userAnswer.includes('72.000.000');
      }
    } else if (questionIndex === 2) { // Comparative Performance
      if (subIndex === 0) {
        isCorrect = userAnswer.includes('500000') || userAnswer.includes('5') && (userAnswer.includes('10⁵') || userAnswer.includes('10^5'));
      } else if (subIndex === 1) {
        isCorrect = userAnswer.includes('2.592') && (userAnswer.includes('10¹⁴') || userAnswer.includes('10^14'));
      }
    } else if (questionIndex === 3 || questionIndex === 4) {
      // For essay-type questions, always mark as "correct" to encourage completion
      isCorrect = userAnswer.length > 10;
    }

    setFeedback(prev => ({...prev, [key]: isCorrect}));

    // If this answer is correct and there are more subquestions, move to the next one
    if (isCorrect && subIndex < questions[questionIndex].subQuestions.length - 1) {
      const nextKey = `${questionIndex}-${subIndex + 1}`;
      setActiveSubQuestion(nextKey);
    }
  };

  const handleNextQuestion = () => {
    if (current < questions.length - 1) {
      setShowTransitionPopup(true);
      setSelectedTransitionAnswer(null);
      setTransitionFeedback(null);
    }
  };

  const handleTransitionAnswer = (answerIndex: number) => {
    setSelectedTransitionAnswer(answerIndex);
    const isCorrect = answerIndex === transitionQuestions[current].correctAnswer;
    setTransitionFeedback(isCorrect);

    // Wait 1.5 seconds before moving to next question
    setTimeout(() => {
      setShowTransitionPopup(false);
      setCurrent(current + 1);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animation styles */}
      <style jsx>{animationStyles}</style>

      {/* Decorative background elements */}
      <div className="absolute left-20 top-20 w-40 h-40 bg-purple-200/20 rounded-full blur-xl"></div>
      <div className="absolute right-40 bottom-20 w-60 h-60 bg-blue-300/20 rounded-full blur-xl"></div>
      <div className="absolute right-20 top-40 w-20 h-20 bg-fuchsia-200/30 rounded-full blur-md"></div>

      {/* Transition Popup */}
      {showTransitionPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-xl">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">
              Quick Check!
            </h3>
            <p className="text-slate-600 mb-4">
              {transitionQuestions[current].question}
            </p>
            <div className="space-y-2">
              {transitionQuestions[current].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleTransitionAnswer(index)}
                  disabled={selectedTransitionAnswer !== null}
                  className={`w-full p-3 rounded-lg text-left transition-all ${
                    selectedTransitionAnswer === index
                      ? transitionFeedback
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                      : 'bg-violet-50 hover:bg-violet-100 text-slate-700'
                  }`}
                >
                  <span className="font-semibold mr-2">{option.key}.</span>
                  {option.text}
                </button>
              ))}
            </div>
            {transitionFeedback !== null && (
              <div className={`mt-4 p-3 rounded-lg ${
                transitionFeedback ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {transitionFeedback ? 'Correct! Moving to next question...' : 'Not quite right. Moving to next question...'}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="bg-white backdrop-blur-sm bg-opacity-90 rounded-[2rem] shadow-2xl shadow-purple-200/50 p-8 w-full max-w-[95%] md:max-w-[90%] lg:max-w-[85%] xl:max-w-[80%] relative overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        {/* Decorative card elements */}
        <div className="absolute -right-16 -top-16 w-32 h-32 bg-purple-100/50 rounded-full"></div>
        <div className="absolute left-20 -bottom-10 w-20 h-20 bg-blue-100/50 rounded-full"></div>

        <div className="mb-8 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-violet-100 rounded-2xl flex items-center justify-center animate-float">
              <Brain className="w-6 h-6 text-violet-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Supercomputer Quiz</h1>
          </div>

          <div className="w-full bg-violet-100 rounded-full h-3 mb-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          {/* Progress dots */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-violet-600 font-medium">Question {current + 1} of {questions.length}</span>
            <div className="flex gap-1.5">
              {Array.from({ length: questions.length }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full ${
                    i < current ? 'bg-violet-600' :
                    i === current ? 'bg-violet-500 animate-pulse-slow' :
                    'bg-violet-200'
                  }`}
                ></div>
              ))}
            </div>
            <span className="text-sm text-violet-600 font-medium">{Math.round(progressPercentage)}% Complete</span>
          </div>
        </div>

        {/* Question Card */}
        <div className="mb-8 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full text-xl">
              {current === 0 ? '🖥️' : current === 1 ? '⚡' : current === 2 ? '⏱️' : current === 3 ? '🔬' : '💾'}
            </div>
            <h2 className="text-xl font-medium text-slate-800">{questions[current].title}</h2>
          </div>

          {questions[current].description && (
            <p className="text-slate-600 mb-6 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
              {questions[current].description}
            </p>
          )}

          <div className="mt-5">
            <Accordion
              type="single"
              collapsible
              value={activeSubQuestion}
              onValueChange={setActiveSubQuestion}
              className="space-y-4"
            >
              {questions[current].subQuestions.map((sub, subIndex) => {
                const qKey = `${current}-${subIndex}`;
                const hintLevel = hintLevels[qKey] || 0;
                const isSubmitted = submitted[qKey] || false;
                const xpDeduction = xpLost[qKey] || 0;
                const answerFeedback = feedback[qKey] === true;

                // Determine if this item should be enabled based on previous submissions
                const isPreviousCorrect = subIndex === 0 || feedback[`${current}-${subIndex-1}`] === true;
                const isEnabled = isPreviousCorrect;

                return (
                  <AccordionItem
                    key={subIndex}
                    value={qKey}
                    className={`bg-violet-50/60 rounded-xl border border-violet-100 overflow-hidden ${!isEnabled ? 'opacity-60' : ''}`}
                    disabled={!isEnabled}
                  >
                    <AccordionTrigger className="px-5 py-3 hover:no-underline">
                      <div className="font-medium text-slate-700 text-left">{sub.q}</div>
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-4">
                      <textarea
                        rows={3}
                        className={`w-full rounded-xl border-2 p-4 text-white text-base font-medium focus:ring transition-all resize-vertical ${
                          isSubmitted
                            ? answerFeedback
                              ? 'border-green-300 focus:border-green-400 focus:ring-green-300/40'
                              : 'border-red-300 focus:border-red-400 focus:ring-red-300/40'
                            : 'border-violet-200 focus:border-violet-400 focus:ring-violet-300/40'
                        }`}
                        placeholder="Write your answer here..."
                        value={answers[qKey] || ''}
                        onChange={(e) => handleAnswerChange(current, subIndex, e.target.value)}
                        disabled={isSubmitted && answerFeedback}
                      />

                      {/* Feedback after submission */}
                      {isSubmitted && (
                        <div className={`mt-2 px-4 py-2 rounded-lg flex items-center gap-2 ${
                          answerFeedback ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {answerFeedback
                            ? <><CheckCircle2 size={16} /> <span>Correct answer!</span></>
                            : <><XCircle size={16} /> <span>Not quite right. Try again or use a hint.</span></>
                          }
                        </div>
                      )}

                      {/* Hints system */}
                      {hintLevel > 0 && 'hints' in sub && (
                        <div className="mt-3 bg-amber-50 rounded-xl p-4 border border-amber-200">
                          <div className="flex items-center gap-2 text-amber-700 font-medium mb-2">
                            <HelpCircle size={16} />
                            <span>Hint {hintLevel}/3</span>
                            {xpDeduction > 0 && (
                              <span className="ml-auto bg-amber-200 text-amber-800 text-xs px-2 py-1 rounded-full">
                                -{xpDeduction}% XP
                              </span>
                            )}
                          </div>
                          <p className="text-amber-700">{sub.hints?.[hintLevel-1]}</p>
                        </div>
                      )}

                      <div className="flex justify-between mt-3">
                        <button
                          onClick={() => handleHintRequest(current, subIndex)}
                          className={`px-4 py-2 rounded-lg flex items-center gap-1.5 font-medium transition-all ${
                            hintLevel >= 3 || (isSubmitted && answerFeedback)
                              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                              : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                          }`}
                          disabled={hintLevel >= 3 || (isSubmitted && answerFeedback)}
                        >
                          <HelpCircle size={16} />
                          {hintLevel === 0 ? 'Get Hint' :
                          hintLevel === 1 ? 'Outline' :
                          hintLevel === 2 ? 'Full Solution' : 'No More Hints'}
                        </button>

                        <button
                          onClick={() => handleSubmit(current, subIndex)}
                          className={`px-4 py-2 rounded-lg flex items-center gap-1.5 font-medium ${
                            isSubmitted
                              ? answerFeedback
                                ? 'bg-green-100 text-green-700 cursor-not-allowed'
                                : 'bg-violet-100 text-violet-700 hover:bg-violet-200'
                              : 'bg-violet-100 text-violet-700 hover:bg-violet-200'
                          }`}
                          disabled={isSubmitted && answerFeedback}
                        >
                          {isSubmitted
                            ? answerFeedback
                              ? <CheckCircle2 size={16} />
                              : <ChevronRight size={16} />
                            : <ChevronRight size={16} />
                          }
                          {isSubmitted
                            ? answerFeedback
                              ? 'Correct!'
                              : 'Try Again'
                            : 'Submit Answer'
                          }
                        </button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>

        <div className="flex justify-between relative z-10">
          <button
            onClick={() => current > 0 && setCurrent(current - 1)}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              current === 0
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            Previous
          </button>

          <button
            onClick={handleNextQuestion}
            className="px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-violet-500 to-purple-500 text-white hover:shadow-lg hover:shadow-violet-200 hover:scale-[1.02] transition-all"
          >
            {current < questions.length - 1 ? 'Next Question' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
}
