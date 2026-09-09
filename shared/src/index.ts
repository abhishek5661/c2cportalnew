export enum StudentYear {
  YEAR_1 = 'YEAR_1',
  YEAR_2 = 'YEAR_2',
  YEAR_3 = 'YEAR_3',
  YEAR_4 = 'YEAR_4',
}

export enum RoleArchetype {
  SOFTWARE_ENGINEER = 'SOFTWARE_ENGINEER',
  DATA_ENGINEER = 'DATA_ENGINEER',
  PRODUCT_ENGINEER = 'PRODUCT_ENGINEER',
  QA_ENGINEER = 'QA_ENGINEER',
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  collegeId: string;
  year: StudentYear;
  interests: string[];
  goals: string[];
  targetRoles: RoleArchetype[];
}

export interface SkillEvidence {
  skillId: string;
  factId: string;
  confidence: number;
  source: 'assignment' | 'project' | 'practice' | 'assessment' | 'externals';
  recordedAt: string;
}

export interface ReadinessProjection {
  studentId: string;
  role: RoleArchetype;
  companyArchetype: string;
  score: number;
  evidenceIds: string[];
}
