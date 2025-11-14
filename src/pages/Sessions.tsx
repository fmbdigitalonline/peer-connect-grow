import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BottomNav } from "@/components/BottomNav";
import { Calendar, Clock, Users } from "lucide-react";
import { getStorageData } from "@/lib/mockData";
import type { Session } from "@/types";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

const Sessions = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    const storedSessions = getStorageData<Session[]>("sessions", []);
    const parsedSessions = storedSessions.map((s) => ({ ...s, scheduledStart: new Date(s.scheduledStart), scheduledEnd: new Date(s.scheduledEnd) }));
    setSessions(parsedSessions);
  }, []);

  if (sessions.length === 0) {
    return (
      <div className="min-h-screen bg-background pb-20 flex items-center justify-center">
        <div className="text-center px-6">
          <div className="text-8xl mb-6 animate-bounce-in">📅</div>
          <h2 className="text-2xl font-bold mb-3">Je eerste sessie wacht!</h2>
          <Button size="lg" onClick={() => navigate("/help-request")} className="rounded-full">Plan een sessie</Button>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 bg-background/80 backdrop-blur-xl border-b border-border/50 z-40 p-4"><h1 className="text-2xl font-bold">Mijn Sessies</h1></div>
      <div className="px-4 py-6 space-y-6">
        {sessions.map((session) => (
          <div key={session.id} className="flex gap-4">
            <Card className="w-20 h-20 flex flex-col items-center justify-center border-0 bg-gradient-to-br from-headspace-peach to-headspace-pink shrink-0">
              <div className="text-2xl font-bold">{format(new Date(session.scheduledStart), "d", { locale: nl })}</div>
              <div className="text-xs text-foreground/70 uppercase">{format(new Date(session.scheduledStart), "MMM", { locale: nl })}</div>
            </Card>
            <Card className="flex-1 border-0 cursor-pointer" onClick={() => navigate(`/session/${session.id}`)}>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-1">{session.sessionType === "buddy" ? "Buddy Sessie" : "Groepssessie"}</h3>
                <Badge>{session.status}</Badge>
                <div className="space-y-2 text-sm text-foreground/70 mt-3">
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4" /><span>{format(new Date(session.scheduledStart), "HH:mm", { locale: nl })}</span></div>
                  <div className="flex items-center gap-2"><Users className="w-4 h-4" /><span>{session.participants.length} deelnemers</span></div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      <BottomNav />
    </div>
  );
};

export default Sessions;
