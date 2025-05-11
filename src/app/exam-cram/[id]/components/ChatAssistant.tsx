'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, MoreHorizontal, MinusIcon, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Question } from '../store';

interface ChatAssistantProps {
  questionContext: Question;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatAssistant({ questionContext }: ChatAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hello! I\'m your AI learning assistant. How can I help you with your studies today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom when new messages are added
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking and responding
    setTimeout(() => {
      // Generate a contextual response based on the question type
      let response = '';

      if (input.toLowerCase().includes('hint') || input.toLowerCase().includes('help')) {
        // If user asks for a hint
        if (questionContext.type === 'multiple-choice') {
          response = `Think about the key characteristics of effective learning strategies. Which option would not contribute to measurable learning outcomes?`;
        } else if (questionContext.type === 'short-answer') {
          response = `Consider techniques that involve reviewing material at strategic intervals rather than all at once.`;
        } else {
          response = `When comparing different types of cognitive load, consider how each affects the learner differently and what instructional design decisions would address each type.`;
        }
      } else if (input.toLowerCase().includes('explain') || input.toLowerCase().includes('what is')) {
        // If user asks for an explanation
        response = `This question relates to ${questionContext.text.toLowerCase().includes('learning objective') ? 'learning design principles' :
          questionContext.text.toLowerCase().includes('cognitive load') ? 'cognitive psychology and memory systems' :
          questionContext.text.toLowerCase().includes('spaced repetition') ? 'effective study techniques' :
          'educational psychology concepts'}. Remember that ${
          questionContext.type === 'multiple-choice' ? 'you need to select the most accurate option from the choices given.' :
          questionContext.type === 'short-answer' ? 'your answer should be concise but include key terminology.' :
          'your essay should compare and contrast the concepts while providing examples of instructional applications.'
        }`;
      } else {
        // Generic response
        response = `I understand you're asking about "${input}". This relates to the current question about ${
          questionContext.text.substring(0, 50)}... Remember to focus on the key concepts we've discussed in the study materials. Would you like more specific guidance?`;
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="rounded-xl shadow-md bg-white flex flex-col h-[400px] overflow-hidden">
      {/* Chat header */}
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
          <button className="p-1 hover:bg-gray-100 rounded-full">
            <MoreHorizontal className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map(message => (
          <div
            key={message.id}
            className={cn(
              "flex gap-2 mb-3",
              message.role === 'assistant' ? "justify-start" : "justify-end"
            )}
          >
            {message.role === 'assistant' && (
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center self-end mb-1">
                <Bot className="h-5 w-5 text-white" />
              </div>
            )}

            <div className="flex flex-col max-w-[75%]">
              <div
                className={cn(
                  "rounded-2xl p-3 text-sm",
                  message.role === 'assistant'
                    ? "bg-blue-600 text-white rounded-bl-none"
                    : "bg-white border border-gray-200 text-gray-800 rounded-br-none"
                )}
              >
                {message.content}
              </div>
              
              {message.role === 'assistant' && (
                <div className="flex items-center gap-1 mt-1 ml-1 text-xs text-gray-500">
                  <Sparkles className="h-3 w-3" />
                  <span>Answered by AI</span>
                </div>
              )}
            </div>

            {message.role === 'user' && (
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

        <div ref={messageEndRef} />
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="bg-white p-3 flex gap-2 items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Send a message..."
          className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className={cn(
            "p-2 rounded-full",
            input.trim() && !isTyping
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          )}
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}
