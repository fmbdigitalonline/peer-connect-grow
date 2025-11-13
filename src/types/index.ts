// Mock data types
export type Role = "supportee" | "buddy" | "leader" | "coach";

export type Urgency = "urgent" | "this_week" | "flexible";
export type Format = "1on1" | "small_group" | "online";
export type RequestStatus = "pending" | "matched" | "cancelled" | "completed";

export interface HelpRequest {
  id: string;
  supporteeId: string;
  subject: string;
  topic: string;
  description: string;
  urgency: Urgency;
  format: Format;
  preferredTimes: string[];
  locationPreference?: string;
  status: RequestStatus;
  createdAt: Date;
  matchedBuddyId?: string;
}

export type MatchStatus = "proposed" | "accepted" | "declined" | "confirmed";

export interface Match {
  id: string;
  requestId: string;
  supporteeId: string;
  supporteeName: string;
  buddyId: string;
  status: MatchStatus;
  subject: string;
  topic: string;
  description: string;
  proposedTime: Date;
  location: string;
  createdAt: Date;
  expiresAt: Date;
}

export type SessionStatus = "scheduled" | "in_progress" | "completed" | "cancelled";
export type MoodEmoji = "😊" | "🙂" | "😐" | "😕" | "😔";

export interface Competency {
  id: string;
  name: string;
  category: "verbinding" | "eigenaarschap" | "groei";
  description: string;
}

export interface Session {
  id: string;
  matchId?: string;
  participants: string[];
  createdBy: string;
  sessionType: "buddy" | "peer_circle" | "group";
  scheduledStart: Date;
  scheduledEnd: Date;
  actualStart?: Date;
  actualEnd?: Date;
  goals: string[];
  status: SessionStatus;
  reflection?: {
    userId: string;
    mood: MoodEmoji;
    text: string;
    competencies: { competencyId: string; rating: number }[];
    evidence?: { type: string; url: string }[];
    aiSummary?: string;
  };
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
}
