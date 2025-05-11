import { create } from 'zustand';

// Define types for the exam state
export interface Question {
  id: string;
  type: 'multiple-choice' | 'short-answer' | 'essay';
  text: string;
  options?: string[];
  correctAnswer: string | number | string[];
  explanation: string;
}

export interface UserAnswer {
  answer: string | number | null;
  isCorrect: boolean;
  reviewed: boolean;
  timestamp?: Date;
}

export interface ExamCramState {
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: Record<string, UserAnswer>;
  isExamCompleted: boolean;
  confidenceScore: number;
  masteryScore: number;
  showSupportMaterial: boolean;
  showChat: boolean;
  chatHistory: Array<{ role: 'user' | 'assistant', content: string }>;

  // Actions
  setQuestions: (questions: Question[]) => void;
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;
  submitAnswer: (questionId: string, answer: string | number | null, isCorrect: boolean) => void;
  completeExam: () => void;
  restartExam: () => void;
  toggleSupportMaterial: () => void;
  toggleChat: () => void;
  addChatMessage: (role: 'user' | 'assistant', content: string) => void;
  updateScores: () => void;
}

export const createExamCramStore = () =>
  create<ExamCramState>((set, get) => ({
    questions: [],
    currentQuestionIndex: 0,
    userAnswers: {},
    isExamCompleted: false,
    confidenceScore: 0,
    masteryScore: 0,
    showSupportMaterial: false,
    showChat: false,
    chatHistory: [],

    setQuestions: (questions) => set({ questions }),

    goToNextQuestion: () => {
      const { currentQuestionIndex, questions } = get();

      if (currentQuestionIndex < questions.length - 1) {
        set({ currentQuestionIndex: currentQuestionIndex + 1 });
      } else {
        set({ isExamCompleted: true });
      }
    },

    goToPreviousQuestion: () => {
      const { currentQuestionIndex } = get();

      if (currentQuestionIndex > 0) {
        set({ currentQuestionIndex: currentQuestionIndex - 1 });
      }
    },

    submitAnswer: (questionId, answer, isCorrect) => {
      const { userAnswers } = get();

      set({
        userAnswers: {
          ...userAnswers,
          [questionId]: {
            answer,
            isCorrect,
            reviewed: true,
            timestamp: new Date()
          }
        }
      });

      // Update the scores after submitting an answer
      get().updateScores();
    },

    completeExam: () => set({ isExamCompleted: true }),

    restartExam: () => set({
      currentQuestionIndex: 0,
      userAnswers: {},
      isExamCompleted: false,
      confidenceScore: 0,
      masteryScore: 0,
      showSupportMaterial: false,
      showChat: false
    }),

    toggleSupportMaterial: () => {
      const { showSupportMaterial, showChat } = get();
      set({
        showSupportMaterial: !showSupportMaterial,
        // Close chat if opening support material
        showChat: showSupportMaterial ? showChat : false
      });
    },

    toggleChat: () => {
      const { showChat, showSupportMaterial } = get();
      set({
        showChat: !showChat,
        // Close support material if opening chat
        showSupportMaterial: showChat ? showSupportMaterial : false
      });
    },

    addChatMessage: (role, content) => {
      const { chatHistory } = get();
      set({
        chatHistory: [...chatHistory, { role, content }]
      });
    },

    updateScores: () => {
      const { questions, userAnswers } = get();
      const answeredCount = Object.keys(userAnswers).length;
      const correctCount = Object.values(userAnswers).filter(ans => ans.isCorrect).length;

      // Calculate confidence score (percentage of questions answered)
      const confidenceScore = Math.round((answeredCount / questions.length) * 100);

      // Calculate mastery score (percentage of correct answers)
      const masteryScore = answeredCount > 0
        ? Math.round((correctCount / answeredCount) * 100)
        : 0;

      set({ confidenceScore, masteryScore });
    }
  }));

// Create a singleton store
export const useExamCramStore = createExamCramStore();
