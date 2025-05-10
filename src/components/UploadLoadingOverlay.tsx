"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, BookOpen, Brain, Rocket, Star } from "lucide-react";

// Loading messages to cycle through
const loadingMessages = [
  "Initializing mission data...",
  "Scanning your homework for hidden challenges...",
  "Equipping knowledge tools...",
  "Syncing with the learning core...",
  "Decrypting subject secrets...",
  "Preparing your personalized quest...",
  "Generating challenge path...",
  "Mission ready! Click to begin your adventure." // Final message
];

// Icons for each loading message
const loadingIcons = [
  <Brain size={36} className="text-white" key="brain" />,
  <Sparkles size={36} className="text-white" key="sparkles" />,
  <BookOpen size={36} className="text-white" key="book" />,
  <Brain size={36} className="text-white" key="brain2" />,
  <Star size={36} className="text-white" key="star" />,
  <Rocket size={36} className="text-white" key="rocket" />,
  <BookOpen size={36} className="text-white" key="book2" />,
  <Rocket size={36} className="text-white" key="rocket2" /> // Final icon
];

// Animation keyframes
const animationStyles = `
  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(0.95);
      opacity: 0.8;
    }
    50% {
      transform: scale(1.05);
      opacity: 1;
    }
    100% {
      transform: scale(0.95);
      opacity: 0.8;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-10px);
    }
  }

  @keyframes iconSwitch {
    0% {
      opacity: 0;
      transform: scale(0.8) rotate(-30deg);
    }
    100% {
      opacity: 1;
      transform: scale(1) rotate(0deg);
    }
  }

  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @keyframes rocketPrepare {
    0% { transform: translateY(0) rotate(0deg); }
    20% { transform: translateY(3px) rotate(-5deg); }
    40% { transform: translateY(-2px) rotate(5deg); }
    60% { transform: translateY(2px) rotate(-3deg); }
    80% { transform: translateY(-1px) rotate(3deg); }
    100% { transform: translateY(0) rotate(0deg); }
  }

  @keyframes rocketLaunch {
    0% { transform: translateY(0) scale(1); }
    100% { transform: translateY(-500px) scale(0.5); }
  }

  @keyframes fireStart {
    0% { opacity: 0; height: 0; }
    100% { opacity: 1; height: 30px; }
  }

  @keyframes circleExpand {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(10); opacity: 0.9; }
    100% { transform: scale(50); opacity: 0; }
  }

  @keyframes radialExpand {
    0% {
      transform: scale(0);
      opacity: 0.9;
    }
    70% {
      opacity: 0.7;
    }
    100% {
      transform: scale(4);
      opacity: 0;
    }
  }

  @keyframes contentFadeOut {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(0.8);
    }
  }

  @keyframes shake {
    0%, 100% {
      transform: translateX(0);
    }
    10%, 30%, 50%, 70%, 90% {
      transform: translateX(-5px);
    }
    20%, 40%, 60%, 80% {
      transform: translateX(5px);
    }
  }

  .float {
    animation: float 3s ease-in-out infinite;
  }

  .spin {
    animation: spin 8s linear infinite;
  }

  .pulse {
    animation: pulse 2s ease-in-out infinite;
  }

  .fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }

  .fade-out {
    animation: fadeOut 0.5s ease-out forwards;
  }

  .icon-switch {
    animation: iconSwitch 0.5s ease-out forwards;
  }

  .rocket-prepare {
    animation: rocketPrepare 0.8s ease forwards;
  }

  .rocket-launch {
    animation: rocketLaunch 1s ease-in forwards;
  }

  .circle-expand {
    animation: circleExpand 1.2s ease-out forwards;
  }

  .radial-expand {
    animation: radialExpand 1.5s ease-out forwards;
  }

  .content-fade-out {
    animation: contentFadeOut 0.8s ease-out forwards;
  }

  .shake {
    animation: shake 0.5s ease-in-out;
  }

  .fire-start {
    animation: fireStart 0.5s forwards;
  }
`;

interface UploadLoadingOverlayProps {
  isVisible: boolean;
  onComplete?: () => void;  // Add callback for completion
}

export default function UploadLoadingOverlay({ isVisible, onComplete }: UploadLoadingOverlayProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);

  // Cycle through messages with transition effect
  useEffect(() => {
    if (!isVisible) {
      // Reset states when component becomes invisible
      setCurrentMessageIndex(0);
      setIsComplete(false);
      setIsExpanding(false);
      return;
    }

    // Don't run the animation if complete
    if (isComplete) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);

      // Wait for fade out animation to complete
      setTimeout(() => {
        setCurrentMessageIndex((prev) => {
          const nextIndex = (prev + 1) % (loadingMessages.length - 1); // Don't cycle to the last message automatically

          // Only set isComplete after going through all messages
          if (prev >= loadingMessages.length - 3 && nextIndex === 0) {
            setCurrentMessageIndex(loadingMessages.length - 1); // Show final message
            setIsComplete(true);
            clearInterval(interval);
            return loadingMessages.length - 1;
          }

          return nextIndex;
        });
        setIsTransitioning(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [isVisible, isComplete]);

  // Handle immediate close when button is clicked
  const handleBeginAdventure = () => {
    // Start the expansion animation
    // setIsExpanding(true);

    // Wait for animation to complete before calling onComplete
    if (onComplete) onComplete();
    // setTimeout(() => {
    // }, 1500); // Match the animation duration
  };

  // Don't render anything if not visible
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <style jsx>{animationStyles}</style>

      <div className={`bg-white rounded-3xl p-10 w-full max-w-md shadow-2xl relative overflow-hidden fade-in ${isExpanding ? 'content-fade-out' : ''}`}>
        {/* Background decorative elements */}
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-indigo-50 rounded-full opacity-70"></div>
        <div className="absolute left-10 -top-6 w-16 h-16 bg-teal-50 rounded-full opacity-50"></div>
        <div className="absolute right-10 top-24 w-12 h-12 bg-purple-50 rounded-full opacity-60"></div>

        {/* Icon container */}
        <div className="mb-8 relative flex justify-center">
          {/* Orbiting particles */}
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <div className="relative w-28 h-28">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 spin">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center float">
                  <Sparkles size={16} className="text-blue-600" />
                </div>
              </div>
              <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 spin" style={{ animationDelay: "0.2s" }}>
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center float" style={{ animationDelay: "0.5s" }}>
                  <Star size={18} className="text-purple-600" />
                </div>
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 spin" style={{ animationDelay: "0.4s" }}>
                <div className="w-7 h-7 rounded-full bg-teal-100 flex items-center justify-center float" style={{ animationDelay: "0.3s" }}>
                  <BookOpen size={16} className="text-teal-600" />
                </div>
              </div>
              <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 spin" style={{ animationDelay: "0.6s" }}>
                <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center float" style={{ animationDelay: "0.7s" }}>
                  <Rocket size={16} className="text-amber-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Central icon circle */}
          <div
            className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-200/50 relative z-10 pulse"
          >
            {/* Rocket icon */}
            <div className="icon-switch">
              {loadingIcons[currentMessageIndex]}
            </div>
          </div>
        </div>

        {/* Loading text with smooth transition */}
        <div className="text-center min-h-[60px] flex flex-col items-center">
          <h3 className="text-xl font-bold text-slate-800 mb-2">
            {isComplete ? "Mission Ready" : "Uploading Homework"}
          </h3>
          <div className="h-8 relative w-full">
            <p
              className={`text-slate-600 absolute inset-0 flex items-center justify-center ${isTransitioning ? 'fade-out' : 'fade-in'}`}
            >
              {loadingMessages[currentMessageIndex]}
            </p>
          </div>
        </div>

        {/* Loading bar or launch button */}
        {!isComplete ? (
          <div className="mt-8">
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 rounded-full animate-pulse"
                style={{
                  width: `${Math.min(90 + (currentMessageIndex * 1.5), 100)}%`,
                  backgroundSize: '200% 100%',
                  animation: 'pulse 2s ease-in-out infinite, gradientShift 3s linear infinite'
                }}>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-8">
            <button
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
              onClick={handleBeginAdventure}
              disabled={isExpanding}
            >
              Begin Adventure
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
