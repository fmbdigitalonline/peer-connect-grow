import { mockBuddies } from "@/lib/mockData";
import type { HelpRequest, MatchSuggestion } from "@/types";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const callAiMatchService = async (
  request: HelpRequest
): Promise<MatchSuggestion[]> => {
  await wait(900);

  const candidates = mockBuddies.filter((buddy) =>
    buddy.expertise.includes(request.subject)
  );

  if (candidates.length === 0) {
    return [];
  }

  return candidates.slice(0, 3).map((buddy) => ({
    buddyId: buddy.id,
    buddyName: buddy.name,
    confidence: Math.round(Math.random() * 15 + 70),
    reason:
      request.mood !== null && request.mood !== undefined && request.mood < 2
        ? "Beschikbaar met zachte landing (extra letten op mood)"
        : "Past qua vak en beschikbaarheid",
  }));
};
