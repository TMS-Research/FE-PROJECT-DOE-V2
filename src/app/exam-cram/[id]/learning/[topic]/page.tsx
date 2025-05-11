'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockLearningMaterials } from '../../mock-learning-data';
import LearningFlow from '../../components/LearningFlow';

interface LearningPageProps {
  params: {
    topic: string;
  };
}

export default function LearningPage({ params }: LearningPageProps) {
  const router = useRouter();
  const { topic } = params;
  const [isLoading, setIsLoading] = useState(true);

  // Get materials for the current topic
  const materials = mockLearningMaterials[topic as keyof typeof mockLearningMaterials];

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleComplete = () => {
    // Navigate to a quiz or practice section after completing the learning
    router.push(`/exam-cram/practice/${topic}`);
  };

  const handleExit = () => {
    // Go back to topics selection
    router.push('/exam-cram');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-2 text-gray-600">Loading learning materials...</p>
        </div>
      </div>
    );
  }

  if (!materials) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-red-500 mb-2">Topic Not Found</h2>
          <p className="text-gray-600 mb-4">
            Sorry, we couldn&apos;t find learning materials for this topic.
          </p>
          <button
            onClick={handleExit}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Back to Topics
          </button>
        </div>
      </div>
    );
  }

  return (
    <LearningFlow
      materials={materials}
      onComplete={handleComplete}
      onExit={handleExit}
      xpPoints={20}
    />
  );
}
