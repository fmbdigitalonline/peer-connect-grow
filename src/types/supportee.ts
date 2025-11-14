export interface SupporteeProfile {
  id: string;
  language: 'nl' | 'en';
  languageLevel: 'beginner' | 'intermediate' | 'advanced';
  personalInfo: {
    name: string;
    class: string;
    school: string;
  };
  interests: string[];
  goals: string;
  expectations: string;
  privacyConsent: boolean;
  completedAt?: Date;
  currentStep: number;
}

export interface BuddyProfile {
  id: string;
  name: string;
  class: string;
  level: string;
  avatar: string;
  expertise: string[];
  availability: string[];
  matchScore: number;
  bio: string;
  sessionsCompleted: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'starter' | 'collaborator' | 'achiever' | 'expert' | 'special';
  xp: number;
  criteria: string;
  earned: boolean;
  earnedAt?: Date;
}

export interface LibraryItem {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  thumbnail: string;
  rating: number;
  usageCount: number;
  tags: string[];
  instructions: string[];
  videoUrl?: string;
}

export interface CommunityPost {
  id: string;
  authorId: string;
  authorName: string;
  authorLevel: string;
  type: 'achievement' | 'story' | 'question';
  content: string;
  badge?: string;
  reactions: { type: string; count: number }[];
  comments: { authorName: string; content: string; timestamp: Date }[];
  timestamp: Date;
  isSpotlighted: boolean;
  privacy: 'school' | 'platform';
}
