"use client";
import React, { useState } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Home,
  Lock,
  Circle,
  Check,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const questions = [
  {
    title: "Computer Processing Capacity",
    description:
      "In the field of computational science, supercomputers play a crucial role in processing large amounts of data for research such as climate modeling, genomics, and artificial intelligence.",
    subQuestions: [
      {
        q: "A supercomputer can perform 1.5 × 10¹⁵ calculations per second. Calculate how many calculations this supercomputer can perform in one day. Express your answer in scientific notation (standard form).",
        hints: [
          "How many seconds are in one day? How do you multiply this by the number of calculations per second?", // nudge
          "One day has 24 hours × 60 minutes × 60 seconds = 86,400 seconds. Multiply this by 1.5 × 10¹⁵ calculations per second.", // outline
          "Number of calculations = 1.5 × 10¹⁵ × 86,400 = 1.296 × 10²⁰ or 1.296 × 10²⁰ calculations per day.", // full solve
        ],
      },
      {
        q: "Express the result of the above calculation in exaflop-days, where 1 exaflop = 1 × 10¹⁸ calculations.",
        hints: [
          "How do you convert calculations in scientific notation to exaflop units?", // nudge
          "Divide the number of calculations (1.296 × 10²⁰) by the definition of 1 exaflop (1 × 10¹⁸ calculations).", // outline
          "1.296 × 10²⁰ ÷ (1 × 10¹⁸) = 1.296 × 10² = 129.6 exaflop-days.", // full solve
        ],
      },
    ],
  },
  {
    title: "Energy Consumption",
    description:
      "Supercomputers require enormous electrical power to operate. Managing energy consumption is one of the challenges in operating supercomputers.",
    subQuestions: [
      {
        q: "If the supercomputer consumes 2 megawatts of electricity per hour, what is the total energy used in one day? Express your answer in kilowatt-hours (kWh).",
        hints: [
          "How do you convert from megawatts to kilowatts? How many hours are in a day?", // nudge
          "1 megawatt = 1,000 kilowatts, and one day has 24 hours. Total energy = power × time.", // outline
          "2 megawatts × 24 hours = 2,000 kilowatts × 24 hours = 48,000 kWh", // full solve
        ],
      },
      {
        q: "What is the electricity cost per day if the electricity rate is $1,500 per kWh?",
        hints: [
          "Use the result of the previous calculation for total energy in kWh then multiply by the rate.", // nudge
          "Total energy = 48,000 kWh. Multiply this by the rate of $1,500 per kWh.", // outline
          "Cost = 48,000 kWh × $1,500 = $72,000,000 per day.", // full solve
        ],
      },
    ],
  },
];

export default function ScaffoldPage() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [hintLevels, setHintLevels] = useState<{ [key: string]: number }>({});
  const [xpLost, setXpLost] = useState<{ [key: string]: number }>({});
  const [feedback, setFeedback] = useState<{ [key: string]: boolean | null }>(
    {}
  );
  const [activeSubQuestion, setActiveSubQuestion] = useState<string>("0-0");
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  // Calculate progress percentage
  const progressPercentage = ((current + 1) / questions.length) * 100;

  // Function to handle navigation back to dashboard
  const handleNavigateHome = () => {
    router.push("/dashboard");
  };

  const handleAnswerChange = (
    questionIndex: number,
    subIndex: number,
    value: string
  ) => {
    const key = `${questionIndex}-${subIndex}`;
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleHintRequest = (questionIndex: number, subIndex: number) => {
    const key = `${questionIndex}-${subIndex}`;
    const currentLevel = hintLevels[key] || 0;

    if (currentLevel < 3) {
      setHintLevels((prev) => ({ ...prev, [key]: currentLevel + 1 }));

      // Deduct XP when full solution hint is shown
      if (currentLevel === 1) {
        setXpLost((prev) => ({ ...prev, [key]: 50 })); // Lose 50% XP
      }
    }
  };

  const handleSubmit = (questionIndex: number, subIndex: number) => {
    const key = `${questionIndex}-${subIndex}`;

    // Simulate answer checking - in a real app, you would check against actual correct answers
    // For demo purposes, we'll use a simple algorithm to determine if an answer is "correct"
    const userAnswer = answers[key]?.trim().toLowerCase() || "";
    let correct = false;

    // Simple evaluation logic for demonstration
    if (questionIndex === 0) {
      // Computer Processing Capacity
      if (subIndex === 0) {
        correct =
          userAnswer.includes("1.296") &&
          userAnswer.includes("10") &&
          (userAnswer.includes("20") || userAnswer.includes("²⁰"));
      } else if (subIndex === 1) {
        correct = userAnswer.includes("129.6") || userAnswer.includes("129,6");
      }
    } else if (questionIndex === 1) {
      // Energy Consumption
      if (subIndex === 0) {
        correct = userAnswer.includes("48000") || userAnswer.includes("48,000");
      } else if (subIndex === 1) {
        correct =
          userAnswer.includes("72000000") || userAnswer.includes("72,000,000");
      }
    }

    setFeedback((prev) => ({ ...prev, [key]: correct }));
    setIsCorrect(correct);
    setFeedbackMessage(
      correct
        ? "Correct! You can now move to the next question."
        : "Incorrect! Try using a hint."
    );
    setShowFeedback(true);

    // If answer is correct, allow moving to the next subquestion if available
    if (
      correct &&
      subIndex < questions[questionIndex].subQuestions.length - 1
    ) {
      setActiveSubQuestion(`${questionIndex}-${subIndex + 1}`);
    }

    setTimeout(() => {
      setShowFeedback(false);
    }, 3000);
  };

  const handleNextQuestion = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setActiveSubQuestion(`${current + 1}-0`);
    }
  };

  const handlePrevQuestion = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setActiveSubQuestion(`${current - 1}-0`);
    }
  };

  const currentQuestion = questions[current];

  // Get the active sub-question
  const [qIndex, subIndex] = activeSubQuestion.split("-").map(Number);
  const subQuestion = questions[qIndex]?.subQuestions[subIndex];
  const key = activeSubQuestion;

  // Function to check if a subquestion can be accessed
  const canAccessSubQuestion = (questionIndex: number, subIndex: number) => {
    // If it's the first subquestion of any section, it's always accessible
    if (subIndex === 0) return true;

    // Previous subquestion must be answered correctly
    const prevKey = `${questionIndex}-${subIndex - 1}`;
    return feedback[prevKey] === true;
  };

  return (
    <div className="min-h-screen flex w-full">
      {/* Left panel - Blue background with question */}
      <div className="w-5/12 bg-blue-800 text-white p-10 flex flex-col relative">
        {/* Progress bar at top */}
        <div className="absolute top-0 left-4 right-4 p-4 bg-blue-800">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-white/80">Question</span>
            <span className="text-xs font-medium text-white/80">
              {current + 1}/{questions.length}
            </span>
          </div>
          <div className="w-full bg-blue-900/50 rounded-full h-2">
            <div
              className="bg-white rounded-full h-2 transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Center content container */}
        <div className="flex flex-col justify-center h-full pt-16">
          {/* Question */}
          <div className="text-left mb-8">
            <h1 className="text-2xl font-bold mb-4">{currentQuestion.title}</h1>
            <p className="text-blue-100 mb-6">{currentQuestion.description}</p>

            <div className="space-y-4 mt-8">
              <h2 className="text-lg font-semibold mb-4">Scaffold:</h2>
              <div className="space-y-0">
                {currentQuestion.subQuestions.map((subQuestion, subIndex) => {
                  const canAccess = canAccessSubQuestion(current, subIndex);
                  const isActive =
                    activeSubQuestion === `${current}-${subIndex}`;
                  const isCompleted =
                    feedback[`${current}-${subIndex}`] === true;

                  return (
                    <div
                      key={subIndex}
                      className={`relative ${
                        subIndex < currentQuestion.subQuestions.length - 1
                          ? "pb-8"
                          : ""
                      }`}
                    >
                      {/* Timeline connector line */}
                      {subIndex < currentQuestion.subQuestions.length - 1 && (
                        <div className="absolute left-4 top-8 h-full w-0.5 bg-blue-400/30"></div>
                      )}

                      <div
                        onClick={() =>
                          canAccess &&
                          setActiveSubQuestion(`${current}-${subIndex}`)
                        }
                        className={`flex items-start space-x-4 ${
                          canAccess ? "cursor-pointer" : "cursor-not-allowed"
                        }`}
                      >
                        {/* Status icon */}
                        <div
                          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                            isCompleted
                              ? "bg-blue-500 text-white"
                              : isActive
                              ? "bg-blue-500 text-white"
                              : canAccess
                              ? "bg-blue-600 text-white"
                              : "bg-blue-900 text-blue-300/70"
                          }`}
                        >
                          {isCompleted ? (
                            <Check className="w-5 h-5" />
                          ) : !canAccess ? (
                            <Lock className="w-4 h-4" />
                          ) : (
                            <Circle className="w-5 h-5" fill="transparent" />
                          )}
                        </div>

                        {/* Question text */}
                        <div
                          className={`flex-grow p-3 rounded-lg ${
                            isActive
                              ? "bg-blue-600 text-white"
                              : canAccess
                              ? "bg-blue-700 text-white hover:bg-blue-600"
                              : "bg-blue-900 text-white/70"
                          }`}
                        >
                          <p className="text-sm">{subQuestion.q}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation buttons at bottom */}
        <div className="mt-auto flex items-center justify-center">
          <div className="flex items-center gap-3 justify-between w-full">
            <Button
              onClick={handleNavigateHome}
              variant="lightBlue"
              size="icon"
              title="Back to Dashboard"
            >
              <Home className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <Button
                onClick={handlePrevQuestion}
                disabled={current === 0}
                variant="lightBlue"
                size="icon"
                title="Previous Question"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                onClick={handleNextQuestion}
                disabled={current === questions.length - 1}
                variant="lightBlue"
                size="icon"
                title="Next Question"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel - Light background with options */}
      <div
        className="w-7/12 flex items-center justify-center py-8 px-10 bg-opacity-50 relative overflow-y-auto min-h-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.05' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        {subQuestion && (
          <div className="w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">
              {subQuestion.q}
            </h2>

            {/* Hint section */}
            <Accordion type="single" collapsible className="mb-8">
              <AccordionItem value="hint" className="border-yellow-200">
                <AccordionTrigger className="text-yellow-800 hover:text-yellow-600 hover:no-underline py-3 px-4 bg-yellow-50 rounded-t-lg">
                  Need a hint?
                  {xpLost[key] ? (
                    <span className="text-amber-600 text-sm ml-2">
                      {xpLost[key]}% XP loss
                    </span>
                  ) : null}
                </AccordionTrigger>
                <AccordionContent className="bg-yellow-50 rounded-b-lg p-4">
                  {hintLevels[key] === undefined || hintLevels[key] === 0 ? (
                    <div className="space-y-4">
                      <p className="text-gray-700">
                        What type of hint would you like?
                      </p>
                      <Button
                        onClick={() => handleHintRequest(qIndex, subIndex)}
                        variant="yellow"
                        className="px-4 py-2"
                      >
                        Nudge
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-yellow-800 font-medium">
                        Hint {hintLevels[key]}/3:
                      </p>
                      <p className="text-gray-700">
                        {subQuestion.hints[hintLevels[key] - 1]}
                      </p>
                      {hintLevels[key] < 3 && (
                        <Button
                          onClick={() => handleHintRequest(qIndex, subIndex)}
                          variant="yellow"
                          className="px-4 py-2"
                        >
                          {hintLevels[key] === 1
                            ? "Show Outline"
                            : "Show Solution"}
                        </Button>
                      )}
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Answer input section */}
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="answer"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Your Answer:
                </label>
                <textarea
                  id="answer"
                  rows={4}
                  value={answers[key] || ""}
                  onChange={(e) =>
                    handleAnswerChange(qIndex, subIndex, e.target.value)
                  }
                  disabled={feedback[key] === true}
                  className={`w-full rounded-lg bg-white border p-4 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    feedback[key] === true
                      ? "border-green-300 bg-green-50 opacity-75"
                      : "border-gray-300"
                  }`}
                  placeholder="Type your answer here..."
                />
              </div>

              <Button
                onClick={() => handleSubmit(qIndex, subIndex)}
                disabled={!answers[key]?.trim() || feedback[key] === true}
                variant={feedback[key] === true ? "green" : "primary"}
                className="w-full"
              >
                {feedback[key] === true
                  ? "Answered Correctly"
                  : "Submit Answer"}
              </Button>
            </div>
          </div>
        )}

        {/* Feedback message in the style of pretest-3 */}
        <div
          className={`absolute left-0 right-0 p-4 text-center font-bold transition-transform duration-300 ease-out ${
            showFeedback ? "h-15 opacity-100" : "h-0 opacity-0"
          } ${isCorrect ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
          style={{ bottom: 0, position: "absolute" }}
        >
          {feedbackMessage}
        </div>
      </div>
    </div>
  );
}
