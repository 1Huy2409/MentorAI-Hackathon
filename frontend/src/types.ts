export interface CvAnalysisResult {
  matchingScore: number;
  strengths: string[];
  weaknesses: string[];
  rewrittenPoints: {
    original: string;
    improved: string;
    reason: string;
  }[];
}

export interface InputData {
  type: 'text' | 'file';
  value: string;
  fileName?: string;
  mimeType?: string;
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
