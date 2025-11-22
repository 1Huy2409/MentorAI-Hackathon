
export enum AppState {
  LANDING = 'LANDING',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  MAIN_MENU = 'MAIN_MENU', // New: Main Dashboard Hub
  INPUT = 'INPUT',
  ANALYZING = 'ANALYZING',
  RESULTS = 'RESULTS',
  QUICK_INTERVIEW_SETUP = 'QUICK_INTERVIEW_SETUP', // New: Quick Interview Input
  INTERVIEW = 'INTERVIEW',
}

export interface CvAnalysisResult {
  matchingScore: number;
  strengths: string[];
  weaknesses: string[];
  rewrittenPoints: Array<{
    original: string;
    improved: string;
    reason: string;
  }>;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

export interface InputData {
  type: 'text' | 'file';
  value: string; // Text content or Base64 string
  mimeType?: string; // e.g., 'application/pdf', 'text/plain'
  fileName?: string;
}

export interface UserInput {
  cv: InputData;
  jd: InputData;
}

export interface QuickInterviewData {
  role: string;
  experience: string;
}

export type InterviewMode = 'ANALYSIS' | 'QUICK';
