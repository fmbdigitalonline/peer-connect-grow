import type { MatchSuggestion, SupporteeMatchOption } from "@/types";
import { subjects } from "@/lib/mockData";

export interface SupporteeMatchState {
  options: SupporteeMatchOption[];
  matchNeeded: boolean;
  activeMatchId?: string;
  lastCoachSignalAt?: string;
}

const STORAGE_KEY = "supporteeMatchState";

const defaultState: SupporteeMatchState = {
  options: [],
  matchNeeded: false,
};

const isBrowser = () => typeof window !== "undefined" && typeof localStorage !== "undefined";

const toInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
    .padEnd(2, "•");

export const loadSupporteeMatchState = (): SupporteeMatchState => {
  if (!isBrowser()) return defaultState;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return defaultState;
  try {
    const parsed = JSON.parse(stored) as SupporteeMatchState;
    return {
      ...defaultState,
      ...parsed,
      options: parsed.options?.slice(0, 3) ?? [],
    };
  } catch (error) {
    console.error("Failed to parse supportee match state", error);
    return defaultState;
  }
};

export const saveSupporteeMatchState = (state: SupporteeMatchState) => {
  if (!isBrowser()) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const clearSupporteeMatchState = () => {
  if (!isBrowser()) return;
  localStorage.removeItem(STORAGE_KEY);
};

interface SeedContext {
  subjectId: string;
  subjectLabel?: string;
  sharedTraits?: string[];
  classLevels?: string[];
}

export const seedSupporteeMatches = (
  suggestions: MatchSuggestion[],
  context: SeedContext
): SupporteeMatchState => {
  if (suggestions.length === 0) {
    const emptyState = { ...defaultState, matchNeeded: true };
    saveSupporteeMatchState(emptyState);
    return emptyState;
  }

  const classOptions = context.classLevels?.length
    ? context.classLevels
    : ["4 VWO", "5 HAVO", "3 VMBO-T"];

  const subjectLabel =
    context.subjectLabel ||
    subjects.find((subject) => subject.id === context.subjectId)?.name ||
    "Gekozen vak";

  const options: SupporteeMatchOption[] = suggestions.slice(0, 3).map((suggestion, index) => ({
    matchId: `supportee_match_${Date.now()}_${index}`,
    buddyId: suggestion.buddyId,
    buddyName: suggestion.buddyName,
    classLevel: classOptions[index % classOptions.length]!,
    subjectId: context.subjectId,
    subjectLabel,
    reasons: [...(context.sharedTraits ?? []), suggestion.reason].filter(Boolean),
    sharedTraits: context.sharedTraits,
    confidence: suggestion.confidence,
    profileInitials: toInitials(suggestion.buddyName),
    preferenceScore: 0,
    status: "proposed",
    createdAt: new Date().toISOString(),
  }));

  const nextState: SupporteeMatchState = {
    options,
    matchNeeded: false,
  };
  saveSupporteeMatchState(nextState);
  return nextState;
};
