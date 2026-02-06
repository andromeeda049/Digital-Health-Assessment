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

export interface SmartPCUState {
  providerId: AssessmentItem;
  communication: AssessmentItem;
  edoc: AssessmentItem;
  pdpa: AssessmentItem;
  authen: AssessmentItem;
  appointment: AssessmentItem;
  telemed: AssessmentItem;
  homeWard: AssessmentItem;
  [key: string]: AssessmentItem; // Index signature for dynamic access
}

export interface CyberState {
  osPatch: AssessmentItem;
  antivirus: AssessmentItem;
  software: AssessmentItem;
  backup: AssessmentItem;
  privacy: AssessmentItem;
  internetBackup: AssessmentItem;
  [key: string]: AssessmentItem;
}

export interface PersonnelState {
  committee: AssessmentItem;
  executives: AssessmentItem;
  itStaff: AssessmentItem;
  generalStaff: AssessmentItem;
  innovation: AssessmentItem;
  [key: string]: AssessmentItem;
}