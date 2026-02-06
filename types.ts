export interface AssessmentItem {
  status: 'pass' | 'fail' | null;
  fileName: string | null;
}

export interface Asset {
  id: number;
  code: string;
  type: string;
  user: string;
  spec: string;
  status: string;
  fileName: string | null;
}

export interface SubCriteria {
  id: string;
  label: string;
  description?: string;
  evidence?: string;
}

// Updated Data structure
export interface CriteriaData {
  id: string;
  label: string;
  description: string; // Group description / instruction
  subItems: SubCriteria[];
}

// Generic State interface
export type AssessmentState = Record<string, AssessmentItem>;

// Specific interfaces kept for compatibility if needed, but AssessmentState covers them
export type WorkforceState = AssessmentState;
export type AppointmentState = AssessmentState;
export type ResourceState = AssessmentState;
export type SmartStandardState = AssessmentState;
export type CyberState = AssessmentState;