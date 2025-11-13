import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Play, StopCircle } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { getStorageData, setStorageData, competencies } from "@/lib/mockData";
import type { Session, MoodEmoji } from "@/types";
import { toast } from "sonner";

const SessionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [showReflection, setShowReflection] = useState(false);
  const [reflection, setReflection] = useState({
    mood: "🙂" as MoodEmoji,
    text: "",
    competencyIds: [] as string[],
  });

  useEffect(() => {
    const sessions = getStorageData<Session[]>("sessions", []);
    const found = sessions.find((s) => s.id === id);
    if (found) {
      setSession({
        ...found,
        scheduledStart: new Date(found.scheduledStart),
        scheduledEnd: new Date(found.scheduledEnd),
      });
      if (found.status === "in_progress") setIsActive(true);
      if (found.status === "completed") setShowReflection(true);
    }
  }, [id]);

  const handleStart = () => {
    if (!session) return;
    const updatedSession = {
      ...session,
      status: "in_progress" as const,
      actualStart: new Date(),
    };
    setSession(updatedSession);
    setIsActive(true);
    updateStoredSession(updatedSession);
    toast.success("Sessie gestart! ▶️");
  };

  const handleStop = () => {
    if (!session) return;
    const updatedSession = {
      ...session,
      status: "completed" as const,
      actualEnd: new Date(),
    };
    setSession(updatedSession);
    setIsActive(false);
    setShowReflection(true);
    updateStoredSession(updatedSession);
    toast("Sessie gestopt. Voeg een reflectie toe! 📝");
  };

  const handleSaveReflection = () => {
    if (!session) return;
    if (reflection.text.length < 50) {
      toast.error("Reflectie moet minimaal 50 karakters bevatten");
      return;
    }

    const updatedSession = {
      ...session,
      reflection: {
        userId: "current_user",
        mood: reflection.mood,
        text: reflection.text,
        competencies: reflection.competencyIds.map((id) => ({
          competencyId: id,
          rating: 3,
        })),
      },
    };
    setSession(updatedSession);
    updateStoredSession(updatedSession);
    toast.success("Reflectie opgeslagen! 💛");
    setTimeout(() => navigate("/portfolio"), 1000);
  };

  const updateStoredSession = (updatedSession: Session) => {
    const sessions = getStorageData<Session[]>("sessions", []);
    const updated = sessions.map((s) => (s.id === id ? updatedSession : s));
    setStorageData("sessions", updated);
  };

  const toggleCompetency = (compId: string) => {
    setReflection({
      ...reflection,
      competencyIds: reflection.competencyIds.includes(compId)
        ? reflection.competencyIds.filter((id) => id !== compId)
        : [...reflection.competencyIds, compId],
    });
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Sessie niet gevonden</p>
      </div>
    );
  }

  const moods: MoodEmoji[] = ["😊", "🙂", "😐", "😕", "😔"];

  return (
    <div className="min-h-screen bg-background pb-24">
      <Navigation />
      <div className="bg-card border-b px-6 py-4">
        <h1 className="text-xl font-bold">Sessie Details</h1>
      </div>

      <div className="px-6 py-6 space-y-6 max-w-2xl mx-auto">
        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">
                {session.sessionType === "buddy" ? "Buddy Sessie" : "Groepssessie"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {session.participants.length} deelnemers
              </p>
            </div>
            <Badge>{session.status === "scheduled" && "Gepland"}</Badge>
          </div>

          <div className="space-y-2 text-sm">
            <div>
              <span className="text-muted-foreground">Datum: </span>
              <span className="font-semibold">
                {session.scheduledStart.toLocaleDateString("nl-NL", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Tijd: </span>
              <span className="font-semibold">
                {session.scheduledStart.toLocaleTimeString("nl-NL", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                {" - "}
                {session.scheduledEnd.toLocaleTimeString("nl-NL", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>

          {session.status === "scheduled" && !isActive && (
            <Button onClick={handleStart} className="w-full mt-6">
              <Play className="h-4 w-4 mr-2" />
              Start sessie
            </Button>
          )}

          {isActive && (
            <Button onClick={handleStop} variant="destructive" className="w-full mt-6">
              <StopCircle className="h-4 w-4 mr-2" />
              Stop sessie
            </Button>
          )}
        </Card>

        {showReflection && !session.reflection && (
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">Reflectie toevoegen 📝</h3>

            <div className="space-y-4">
              <div>
                <Label>Hoe ging het?</Label>
                <div className="flex gap-2 mt-2">
                  {moods.map((mood) => (
                    <button
                      key={mood}
                      onClick={() => setReflection({ ...reflection, mood })}
                      className={`text-3xl p-3 rounded-lg border-2 transition-all ${
                        reflection.mood === mood
                          ? "border-primary bg-primary/5 scale-110"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {mood}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label>Vertel kort hoe het ging</Label>
                <Textarea
                  rows={4}
                  maxLength={500}
                  value={reflection.text}
                  onChange={(e) =>
                    setReflection({ ...reflection, text: e.target.value })
                  }
                  placeholder="Wat ging goed? Wat heb je geleerd?"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {reflection.text.length}/500 (minimaal 50)
                </p>
              </div>

              <div>
                <Label>Welke vaardigheden heb je geoefend?</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {competencies.map((comp) => (
                    <button
                      key={comp.id}
                      onClick={() => toggleCompetency(comp.id)}
                      className={`p-3 text-left rounded-lg border-2 text-sm transition-all ${
                        reflection.competencyIds.includes(comp.id)
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="font-semibold">{comp.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {comp.category}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <Button onClick={handleSaveReflection} className="w-full">
                Opslaan 💛
              </Button>
            </div>
          </Card>
        )}

        {session.reflection && (
          <Card className="p-6 bg-muted/50">
            <h3 className="text-lg font-bold mb-4">Je reflectie</h3>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-muted-foreground">Stemming</div>
                <div className="text-3xl">{session.reflection.mood}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Reflectie</div>
                <div>{session.reflection.text}</div>
              </div>
              {session.reflection.competencies.length > 0 && (
                <div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Vaardigheden geoefend
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {session.reflection.competencies.map((c) => {
                      const comp = competencies.find((co) => co.id === c.competencyId);
                      return (
                        <Badge key={c.competencyId} variant="secondary">
                          {comp?.name}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SessionDetail;
