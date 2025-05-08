// User
export interface UserData {
  name: string;
  avatarUrl: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  streak: number;
}

// Homework
export interface HomeworkItem {
  id: number;
  subject: string;
  title: string;
  deadline: string;
  progress: number;
  urgent: boolean;
}

// Exam
export interface ExamData {
  subject: string;
  topic: string;
  timeRemaining: string;
  totalConcepts: number;
  masteredConcepts: number;
  weakAreas: string[];
  confidence: number;
}

// Tab types
export type TabType = "homework" | "examcram";
