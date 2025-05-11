'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MessageSquare, X, Sparkles, Send, Bot, MinusIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import LearningFlow from './components/LearningFlow';
import { mockLearningMaterials } from './mock-learning-data';

// Enhanced keyframe animations
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

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }

  .animate-pulse-slow {
    animation: pulse 2s ease-in-out infinite;
  }

  .animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }

  .animate-shimmer {
    background: linear-gradient(90deg,
      rgba(255,255,255,0) 0%,
      rgba(255,255,255,0.8) 50%,
      rgba(255,255,255,0) 100%);
    background-size: 200% 100%;
    animation: shimmer 2s infinite;
  }

  .animate-bounce-soft {
    animation: bounce 2.5s ease-in-out infinite;
  }
`;

export default function ExamCram() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showChatModal, setShowChatModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  
  // State for chat functionality
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'How can I help with your studies today?',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Mendapatkan topik dari parameter URL (contoh: ?topic=standard-form)
  // Jika tidak ada, gunakan 'standard-form' sebagai default
  const topicFromUrl = searchParams.get('topic') || 'standard-form';

  // Dapatkan materials berdasarkan topik
  const materials = mockLearningMaterials[topicFromUrl as keyof typeof mockLearningMaterials] ||
                   mockLearningMaterials['standard-form'];

  useEffect(() => {
    // Simulasi loading dengan pesan motivasi
    const motivationalMessages = [
      "Preparing your learning path...",
      "Getting your study materials ready...",
      "Loading interactive exercises...",
      "Setting up your personalized practice..."
    ];

    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      setMessage(motivationalMessages[messageIndex % motivationalMessages.length]);
      messageIndex++;
    }, 1500);

    // Simulasi loading
    const timer = setTimeout(() => {
      clearInterval(messageInterval);
      setIsLoading(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(messageInterval);
    };
  }, []);

  const handleComplete = () => {
    // Kembali ke dashboard setelah selesai belajar
    router.push('/dashboard');
  };

  const handleExit = () => {
    // Kembali ke dashboard saat exit
    router.push('/dashboard');
  };

  const toggleChatModal = () => {
    setShowChatModal(!showChatModal);
  };

  // Handle sending a chat message
  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!chatInput.trim()) return;
    
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: chatInput,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      // Generate a contextual response
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateResponse(chatInput, topicFromUrl),
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  // Handle quick suggestion buttons
  const handleSuggestion = (type: 'explain' | 'practice') => {
    const suggestedText = type === 'explain' 
      ? `Can you explain the concept of ${topicFromUrl.replace(/-/g, ' ')}?`
      : `Give me practice questions about ${topicFromUrl.replace(/-/g, ' ')}.`;
    
    setChatInput(suggestedText);
    
    // Automatically submit after a brief delay
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };
  
  // Generate AI response based on user input
  const generateResponse = (input: string, topic: string) => {
    topic = topic.replace(/-/g, ' ');
    
    if (input.toLowerCase().includes('explain') || input.toLowerCase().includes('concept')) {
      return `The concept of ${topic} involves understanding key principles like spatial relationships, numeric patterns, and logical sequences. This forms the foundation for more advanced mathematical reasoning. Would you like me to go into more specific aspects of this topic?`;
    }
    
    if (input.toLowerCase().includes('practice') || input.toLowerCase().includes('questions')) {
      return `Here are some practice questions about ${topic}:\n\n1. How would you represent a quadratic function in standard form?\n2. What are the key differences between linear and quadratic equations?\n3. Can you explain how to find the vertex of a parabola?\n\nWould you like more questions or specific help with any of these?`;
    }
    
    // Generic response
    return `I understand you're asking about "${input}". This relates to ${topic}. Would you like more specific information about any particular aspect of this topic?`;
  };

  // Loading state with improved animation
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <style jsx>{animationStyles}</style>
        <div className="text-center relative">
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 animate-float">
            <Sparkles className="w-10 h-10 text-purple-400" />
          </div>
          <div className="relative">
            <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse-slow"></div>
            </div>
          </div>
          <p className="mt-6 text-lg font-medium bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse-slow">
            {message || "Loading learning materials..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Animation styles */}
      <style jsx>{animationStyles}</style>

      {/* Floating AI Chat Button */}
      <button
        onClick={toggleChatModal}
        className={cn(
          "fixed bottom-6 right-6 z-30 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110",
          showChatModal
            ? "bg-blue-600 text-white"
            : "bg-blue-600 text-white animate-bounce-soft"
        )}
      >
        {showChatModal ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>

      {/* AI Chat Modal */}
      {showChatModal && (
        <div className="fixed bottom-24 right-6 z-30 w-80 md:w-96 bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in">
          <div className="bg-white p-3 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-semibold">AI ChatBot</h3>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-1 hover:bg-gray-100 rounded-full">
                <MinusIcon className="h-5 w-5 text-gray-500" />
              </button>
              <button onClick={toggleChatModal} className="p-1 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          <div className="p-4 h-80 overflow-y-auto bg-gray-50">
            {chatMessages.map(chatMsg => (
              <div
                key={chatMsg.id}
                className={cn(
                  "flex gap-2 mb-3",
                  chatMsg.role === 'assistant' ? "justify-start" : "justify-end"
                )}
              >
                {chatMsg.role === 'assistant' && (
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center self-end mb-1">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                )}

                <div className="flex flex-col max-w-[75%]">
                  <div
                    className={cn(
                      "rounded-2xl p-3 text-sm",
                      chatMsg.role === 'assistant'
                        ? "bg-blue-600 text-white rounded-bl-none"
                        : "bg-white border border-gray-200 text-gray-800 rounded-br-none"
                    )}
                  >
                    {chatMsg.content}
                  </div>
                  
                  {chatMsg.role === 'assistant' && (
                    <div className="flex items-center gap-1 mt-1 ml-1 text-xs text-gray-500">
                      <Sparkles className="h-3 w-3" />
                      <span>Answered by AI</span>
                    </div>
                  )}
                  
                  {chatMsg.role === 'assistant' && chatMsg.id === 'welcome' && (
                    <div className="flex gap-2 mt-2">
                      <button 
                        onClick={() => handleSuggestion('explain')}
                        className="px-3 py-1.5 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors">
                        Explain this concept
                      </button>
                      <button 
                        onClick={() => handleSuggestion('practice')}
                        className="px-3 py-1.5 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors">
                        Give me practice questions
                      </button>
                    </div>
                  )}
                </div>

                {chatMsg.role === 'user' && (
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center self-end mb-1">
                    <div className="w-full h-full overflow-hidden rounded-full">
                      <div className="w-full h-full bg-amber-200 flex items-center justify-center text-amber-800 font-bold">
                        U
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-2 items-start justify-start">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center self-end mb-1">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div className="bg-blue-600 text-white max-w-[75%] rounded-2xl rounded-bl-none p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-white opacity-60 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-white opacity-60 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-white opacity-60 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSendMessage} className="bg-white p-3 flex gap-2 items-center">
            <input
              type="text"
              placeholder="Send a message..."
              className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              disabled={isTyping}
            />
            <button 
              type="submit"
              disabled={!chatInput.trim() || isTyping}
              className={cn(
                "p-2 rounded-full", 
                chatInput.trim() && !isTyping
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              )}>
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      )}

      {/* Learning Flow Component - langsung tampilkan materi */}
      <LearningFlow
        materials={materials}
        onComplete={handleComplete}
        onExit={handleExit}
      />
    </>
  );
}
