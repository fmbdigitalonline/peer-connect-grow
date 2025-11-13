import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, Clock } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { subjects, mockBuddies, getStorageData, setStorageData } from "@/lib/mockData";
import { helpTypeOptions, moodScale } from "@/lib/helpRequestOptions";
import type { HelpRequest, Match } from "@/types";
import { toast } from "sonner";

const Matches = () => {
  const navigate = useNavigate();
  const [role] = useState(localStorage.getItem("userRole") || "buddy");
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    // Generate mock matches from help requests for buddies
    if (role === "buddy") {
      const requests = getStorageData<HelpRequest[]>("helpRequests", []);
      const pendingMatches = requests
        .filter((r) => r.status === "matched")
        .map((r) => ({
          id: `match_${r.id}`,
          requestId: r.id,
          supporteeId: r.supporteeId,
          supporteeName: "Emma van den Berg",
          buddyId: "current_user",
          status: "proposed" as const,
          subject: r.subject,
          topic: r.topic,
          description: r.description || r.topic,
          helpType: r.helpType,
          availability: r.availability,
          mood: r.mood,
          moodSkipped: r.moodSkipped,
          proposedTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
          location: r.format === "online" ? "Online" : "Lokaal A2.3",
          createdAt: new Date(r.createdAt),
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        }));
      setMatches(pendingMatches);
    }
  }, [role]);

  const handleAccept = (matchId: string) => {
    const match = matches.find((m) => m.id === matchId);
    if (!match) return;

    // Update match status
    setMatches(matches.filter((m) => m.id !== matchId));
    
    // Save as session
    const sessions = getStorageData("sessions", []);
    sessions.push({
      id: `session_${Date.now()}`,
      matchId: match.requestId,
      participants: [match.supporteeId, match.buddyId],
      createdBy: match.buddyId,
      sessionType: "buddy",
      scheduledStart: match.proposedTime,
      scheduledEnd: new Date(match.proposedTime.getTime() + 60 * 60 * 1000),
      goals: [],
      status: "scheduled",
    });
    setStorageData("sessions", sessions);

    toast.success("Match geaccepteerd! Sessie ingepland 🎯");
    navigate("/sessions");
  };

  const handleDecline = (matchId: string) => {
    setMatches(matches.filter((m) => m.id !== matchId));
    toast("Match afgewezen");
  };

  if (role !== "buddy") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-6 max-w-md text-center">
          <p className="text-muted-foreground">
            Deze pagina is alleen beschikbaar voor buddies
          </p>
          <Button onClick={() => navigate("/home")} className="mt-4">
            Terug naar home
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <Navigation />
      <div className="bg-card border-b px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Nieuwe Matches</h1>
        {matches.length > 0 && (
          <Badge className="ml-auto">{matches.length}</Badge>
        )}
      </div>

      <div className="px-6 py-6 space-y-4 max-w-3xl mx-auto">
        {matches.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="text-4xl mb-4">✨</div>
            <h2 className="text-xl font-bold mb-2">Geen nieuwe matches</h2>
            <p className="text-muted-foreground">
              Er zijn momenteel geen hulpvragen voor jou
            </p>
          </Card>
        ) : (
          matches.map((match) => (
            <Card key={match.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold">{match.supporteeName}</h3>
                  <p className="text-sm text-muted-foreground">Klas 4VWO</p>
                </div>
                <Badge variant="secondary">Nieuwe match 🎯</Badge>
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <div className="text-sm text-muted-foreground">Vak</div>
                  <div className="font-semibold">
                    {subjects.find((s) => s.id === match.subject)?.icon}{" "}
                    {subjects.find((s) => s.id === match.subject)?.name}
                  </div>
                </div>
                {match.topic && (
                  <div>
                    <div className="text-sm text-muted-foreground">Onderwerp</div>
                    <div className="font-semibold">{match.topic}</div>
                  </div>
                )}
                {match.helpType && (
                  <div>
                    <div className="text-sm text-muted-foreground">Type hulp</div>
                    <div className="font-semibold">
                      {helpTypeOptions.find((option) => option.id === match.helpType)?.label}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {
                        helpTypeOptions.find((option) => option.id === match.helpType)
                          ?.description
                      }
                    </p>
                  </div>
                )}
                <div>
                  <div className="text-sm text-muted-foreground">Beschrijving</div>
                  <div>{match.description}</div>
                </div>
                {match.availability && match.availability.length > 0 && (
                  <div>
                    <div className="text-sm text-muted-foreground">Beschikbaarheid</div>
                    <div className="font-semibold">
                      {match.availability
                        .map((slot) =>
                          `${slot.day} ${slot.from?.slice(0, 5)}-${slot.to?.slice(0, 5)}`
                        )
                        .join(", ")}
                    </div>
                  </div>
                )}
                {match.mood !== undefined && match.mood !== null && !match.moodSkipped && (
                  <div>
                    <div className="text-sm text-muted-foreground">Mood-signaal</div>
                    <div className="font-semibold flex items-center gap-2">
                      <span>
                        {
                          moodScale.find((option) => option.value === match.mood)?.emoji ??
                          "🙂"
                        }
                      </span>
                      <span>
                        {
                          moodScale.find((option) => option.value === match.mood)?.label ??
                          ""
                        }
                      </span>
                    </div>
                  </div>
                )}
                {match.moodSkipped && (
                  <div>
                    <div className="text-sm text-muted-foreground">Mood-check</div>
                    <div className="font-semibold">Supportee sloeg bewust over</div>
                  </div>
                )}
                <div>
                  <div className="text-sm text-muted-foreground">Voorstel</div>
                  <div className="font-semibold">
                    {match.proposedTime.toLocaleDateString("nl-NL", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}{" "}
                    om{" "}
                    {match.proposedTime.toLocaleTimeString("nl-NL", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  <div className="text-sm">{match.location}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Clock className="h-4 w-4" />
                <span>Beantwoord binnen 24 uur</span>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleDecline(match.id)}
                  className="flex-1"
                >
                  <X className="h-4 w-4 mr-2" />
                  Afwijzen
                </Button>
                <Button onClick={() => handleAccept(match.id)} className="flex-1">
                  <Check className="h-4 w-4 mr-2" />
                  Accepteren
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Matches;
