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

export interface InterviewReview {
  overallScore: number;
  technicalScore: number;
  communicationScore: number;
  confidenceScore: number;
  strengths: string[];
  improvements: string[];
  detailedFeedback: string;
  keyQuestions: {
    question: string;
    answer: string;
    evaluation: string;
  }[];
}

export type InterviewMode = 'ANALYSIS' | 'QUICK';
