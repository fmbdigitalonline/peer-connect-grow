import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Plus } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { getStorageData } from "@/lib/mockData";
import type { Session } from "@/types";

const Sessions = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    const storedSessions = getStorageData<Session[]>("sessions", []);
    // Convert date strings back to Date objects
    const parsedSessions = storedSessions.map((s) => ({
      ...s,
      scheduledStart: new Date(s.scheduledStart),
      scheduledEnd: new Date(s.scheduledEnd),
      actualStart: s.actualStart ? new Date(s.actualStart) : undefined,
      actualEnd: s.actualEnd ? new Date(s.actualEnd) : undefined,
    }));
    setSessions(parsedSessions);
  }, []);

  const getStatusBadge = (status: Session["status"]) => {
    const variants = {
      scheduled: { variant: "secondary" as const, label: "Gepland", icon: "📅" },
      in_progress: { variant: "default" as const, label: "Bezig", icon: "▶️" },
      completed: { variant: "outline" as const, label: "Afgerond", icon: "✅" },
      cancelled: { variant: "destructive" as const, label: "Geannuleerd", icon: "❌" },
    };
    const config = variants[status];
    return (
      <Badge variant={config.variant}>
        {config.icon} {config.label}
      </Badge>
    );
  };

  const upcomingSessions = sessions.filter(
    (s) => s.status === "scheduled" && new Date(s.scheduledStart) > new Date()
  );
  const completedSessions = sessions.filter((s) => s.status === "completed");

  return (
    <div className="min-h-screen bg-background pb-24">
      <Navigation />
      <div className="bg-card border-b px-6 py-4">
        <h1 className="text-xl font-bold">Mijn Sessies</h1>
      </div>

      <div className="px-6 py-6 space-y-6 max-w-3xl mx-auto">
        {/* Upcoming Sessions */}
        <div>
          <h2 className="text-lg font-bold mb-4">Aankomend</h2>
          {upcomingSessions.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="text-4xl mb-3">📅</div>
              <p className="text-muted-foreground mb-4">
                Nog geen geplande sessies
              </p>
              <Button onClick={() => navigate("/help-request")}>
                <Plus className="h-4 w-4 mr-2" />
                Vraag hulp
              </Button>
            </Card>
          ) : (
            <div className="space-y-3">
              {upcomingSessions.map((session) => (
                <Card
                  key={session.id}
                  className="p-4 cursor-pointer hover:border-primary transition-all"
                  onClick={() => navigate(`/session/${session.id}`)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">
                        {session.sessionType === "buddy"
                          ? "Buddy Sessie"
                          : "Groepssessie"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {session.participants.length} deelnemers
                      </p>
                    </div>
                    {getStatusBadge(session.status)}
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {session.scheduledStart.toLocaleDateString("nl-NL", {
                        day: "numeric",
                        month: "short",
                      })}
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {session.scheduledStart.toLocaleTimeString("nl-NL", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Completed Sessions */}
        {completedSessions.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-4">Afgerond</h2>
            <div className="space-y-3">
              {completedSessions.map((session) => (
                <Card
                  key={session.id}
                  className="p-4 cursor-pointer hover:border-primary/50 transition-all opacity-80"
                  onClick={() => navigate(`/session/${session.id}`)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">
                        {session.sessionType === "buddy"
                          ? "Buddy Sessie"
                          : "Groepssessie"}
                      </h3>
                      {session.reflection && (
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-lg">{session.reflection.mood}</span>
                          <span className="text-sm text-muted-foreground">
                            Reflectie toegevoegd
                          </span>
                        </div>
                      )}
                    </div>
                    {getStatusBadge(session.status)}
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {session.scheduledStart.toLocaleDateString("nl-NL", {
                        day: "numeric",
                        month: "short",
                      })}
                    </div>
                    {session.actualStart && session.actualEnd && (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {Math.round(
                          (session.actualEnd.getTime() -
                            session.actualStart.getTime()) /
                            60000
                        )}{" "}
                        min
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sessions;
