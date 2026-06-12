export interface MemoryItem {
  id: string;
  date: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  choices: string[];
  correctIndex: number;
  successMessage: string;
}

export interface PartnerConfig {
  partnerName: string;
  nickname: string;
  birthDate: string;
  anniversaryDate: string;
  traits: string;
  favMemories: string;
  specialWish: string;
  envelopeTheme: 'pink' | 'purple' | 'amber' | 'emerald' | 'crimson';
  bgPattern: 'hearts' | 'stars' | 'floral' | 'bubbles';
  letterContent: string;
  soundtrackType: 'hbd' | 'romance' | 'calm' | 'silent';
}
