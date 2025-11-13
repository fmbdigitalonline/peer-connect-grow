import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Handshake,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  BellRing,
  Check,
  X,
  Clock,
} from "lucide-react";

import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { subjects, getStorageData, setStorageData } from "@/lib/mockData";
import { helpTypeOptions, moodScale } from "@/lib/helpRequestOptions";
import {
  loadSupporteeMatchState,
  saveSupporteeMatchState,
  type SupporteeMatchState,
} from "@/lib/supporteeMatchStorage";
import type {
  HelpRequest,
  Match,
  SupporteeMatchOption,
} from "@/types";

const statusCopy: Record<SupporteeMatchOption["status"], string> = {
  proposed: "Voorstel actief",
  selected: "Gekozen match",
  rejected: "Afgewezen",
  expired: "Verlopen",
};

const SupporteeMatchesView = () => {
  const navigate = useNavigate();
  const [matchState, setMatchState] = useState<SupporteeMatchState>(() =>
    loadSupporteeMatchState()
  );

  useEffect(() => {
    setMatchState(loadSupporteeMatchState());
  }, []);

  const persist = (next: SupporteeMatchState) => {
    saveSupporteeMatchState(next);
    return next;
  };

  const hasOptions = matchState.options.length > 0;
  const options = useMemo(
    () => matchState.options.slice(0, 3),
    [matchState.options]
  );
  const responded = options.filter((option) => option.preferenceScore !== 0)
    .length;
  const progressValue = hasOptions
    ? Math.round((responded / options.length) * 100)
    : 0;
  const pendingOptions = options.filter((option) => option.status === "proposed");
  const selectedOption = options.find((option) => option.status === "selected");

  const updateOptions = (
    updater: (options: SupporteeMatchOption[]) => SupporteeMatchOption[],
    after?: (next: SupporteeMatchState) => SupporteeMatchState
  ) => {
    setMatchState((prev) => {
      const updatedOptions = updater(prev.options);
      const allRejected =
        updatedOptions.length > 0 &&
        updatedOptions.every((option) => option.status === "rejected");
      let nextState: SupporteeMatchState = {
        ...prev,
        options: updatedOptions,
        matchNeeded: allRejected,
        activeMatchId: updatedOptions.find((option) => option.status === "selected")
          ?.matchId,
      };
      if (allRejected) {
        nextState.lastCoachSignalAt = new Date().toISOString();
      }
      if (after) {
        nextState = after(nextState);
      }
      return persist(nextState);
    });
  };

  const handlePreference = (matchId: string, preference: 1 | -1) => {
    const respondedAt = new Date().toISOString();
    updateOptions(
      (current) =>
        current.map((option) => {
          if (option.matchId === matchId) {
            return {
              ...option,
              preferenceScore: preference,
              status: preference === 1 ? "selected" : "rejected",
              respondedAt,
            };
          }
          if (preference === 1 && option.status === "proposed") {
            return {
              ...option,
              status: "expired",
              respondedAt: option.respondedAt || respondedAt,
            };
          }
          return option;
        }),
      (nextState) => {
        if (preference === -1) {
          return {
            ...nextState,
            lastCoachSignalAt: new Date().toISOString(),
          };
        }
        return { ...nextState, matchNeeded: false };
      }
    );

    if (preference === 1) {
      toast.success("Je hebt een buddy gekozen! We plannen je eerste sessie in.");
      setTimeout(() => navigate("/sessions"), 900);
    } else {
      toast("We laten je coach weten dat je liever een andere match wilt.");
    }
  };

  const handleRejectAll = () => {
    const respondedAt = new Date().toISOString();
    updateOptions((current) =>
      current.map((option) => ({
        ...option,
        status: option.status === "selected" ? option.status : "rejected",
        preferenceScore: option.status === "selected" ? option.preferenceScore : -1,
        respondedAt: option.respondedAt || respondedAt,
      }))
    );
    toast.warning("Coach krijgt een signaal dat er een nieuwe match nodig is.");
  };

  return (
    <div className="min-h-screen bg-gradient-soft pb-16">
      <Navigation />
      <header className="border-b border-border/60 bg-white/90">
        <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-8">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-peer-purple">
              Story 3 · Supportee flow
            </p>
            <h1 className="text-3xl font-extrabold text-peer-navy">
              Buddy-match ontvangen & voorkeur aangeven
            </h1>
            <p className="text-sm text-muted-foreground">
              Kies uit maximaal drie veilige voorstellen. Geef per optie aan of het
              klikt, zodat je coach meteen weet welke buddy bij je past.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <Card className="flex items-center gap-3 border-dashed border-peer-purple/30 bg-gradient-to-br from-peer-purple/5 to-transparent p-4">
              <div className="rounded-2xl bg-peer-purple/10 p-3 text-peer-purple">
                <Handshake className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-peer-purple">
                  Veilige match
                </p>
                <p className="text-sm text-foreground">AI & coach checken mee</p>
              </div>
            </Card>
            <Card className="flex items-center gap-3 border-dashed border-peer-teal/30 bg-gradient-to-br from-peer-teal/5 to-transparent p-4">
              <div className="rounded-2xl bg-peer-teal/10 p-3 text-peer-teal">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-peer-teal">
                  Max 3 opties
                </p>
                <p className="text-sm text-foreground">{options.length}/3 voorstellen actief</p>
              </div>
            </Card>
            <Card className="flex items-center gap-3 border-dashed border-peer-orange/30 bg-gradient-to-br from-peer-orange/5 to-transparent p-4">
              <div className="rounded-2xl bg-peer-orange/10 p-3 text-peer-orange">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-peer-orange">
                  Jij kiest
                </p>
                <p className="text-sm text-foreground">Coach volgt jouw voorkeur</p>
              </div>
            </Card>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-4 py-8">
        {matchState.matchNeeded && (
          <Alert variant="destructive" className="border-destructive/40 bg-destructive/10">
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle>Nieuwe match nodig</AlertTitle>
            <AlertDescription>
              Je coach heeft een signaal ontvangen dat de huidige voorstellen niet passen.
              We zoeken een nieuwe buddy voor je.
            </AlertDescription>
          </Alert>
        )}

        {selectedOption && (
          <Card className="border border-peer-teal/30 bg-white/90">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-peer-teal/10 p-3 text-peer-teal">
                <BellRing className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Actieve match</p>
                <p className="text-lg font-semibold text-peer-navy">
                  {selectedOption.buddyName}
                </p>
                <p className="text-sm text-muted-foreground">
                  Coach plant nu jullie eerste sessie. Je krijgt een melding zodra het rond is.
                </p>
              </div>
            </div>
          </Card>
        )}

        {hasOptions && (
          <Card className="border border-border/60 bg-white/70 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-peer-purple">
                  Jij reageert
                </p>
                <p className="text-sm text-muted-foreground">
                  Geef je voorkeur door zodat je coach het signaal krijgt
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-peer-purple">
                {responded}/{options.length} opties
              </div>
            </div>
            <Progress value={progressValue} className="mt-3" />
          </Card>
        )}

        {!hasOptions ? (
          <Card className="glass-card border border-dashed border-peer-purple/40 p-8 text-center">
            <div className="mb-4 text-4xl">✨</div>
            <h2 className="text-xl font-bold text-peer-navy">
              Nog geen voorstellen beschikbaar
            </h2>
            <p className="text-sm text-muted-foreground">
              Je coach zoekt nog een passende buddy. Check later opnieuw of dien een nieuwe hulpvraag in.
            </p>
            <Button className="mt-4" onClick={() => navigate("/help-request")}>
              Nieuwe hulpvraag
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {options.map((option) => (
              <Card key={option.matchId} className="border border-border/60 bg-white/90 p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex flex-1 items-start gap-3">
                    <Avatar className="h-12 w-12 rounded-2xl border border-peer-purple/20 bg-peer-purple/10 text-peer-purple">
                      <AvatarFallback className="text-base font-semibold">
                        {option.profileInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-peer-navy">
                          {option.buddyName}
                        </h3>
                        <Badge variant="secondary" className="text-xs">
                          {statusCopy[option.status]}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {option.classLevel} · {option.subjectLabel}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {option.reasons.map((reason) => (
                          <Badge key={reason} variant="outline" className="border-dashed border-peer-purple/40 text-xs">
                            {reason}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  {typeof option.confidence === "number" && (
                    <div className="text-right text-sm text-muted-foreground">
                      <p className="font-semibold text-peer-teal">
                        {option.confidence}% kans
                      </p>
                      <p>AI-match</p>
                    </div>
                  )}
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <Button
                    disabled={option.status !== "proposed"}
                    onClick={() => handlePreference(option.matchId, 1)}
                    className="w-full"
                  >
                    Lijkt me fijn
                  </Button>
                  <Button
                    variant="outline"
                    disabled={option.status !== "proposed"}
                    onClick={() => handlePreference(option.matchId, -1)}
                    className="w-full"
                  >
                    Liever andere match
                  </Button>
                </div>
                {option.preferenceScore === -1 && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    Coach krijgt een signaal om een ander voorstel te zoeken.
                  </p>
                )}
              </Card>
            ))}

            <Button
              variant="ghost"
              className="w-full text-destructive"
              onClick={handleRejectAll}
              disabled={pendingOptions.length === 0 || matchState.matchNeeded}
            >
              Geen van deze, vraag andere match
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

const BuddyMatchesView = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
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
  }, []);

  const handleAccept = (matchId: string) => {
    const match = matches.find((m) => m.id === matchId);
    if (!match) return;

    setMatches(matches.filter((m) => m.id !== matchId));

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

  return (
    <div className="min-h-screen bg-background pb-24">
      <Navigation />
      <div className="bg-card border-b px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Nieuwe Matches</h1>
        {matches.length > 0 && <Badge className="ml-auto">{matches.length}</Badge>}
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
                        .map(
                          (slot) => `${slot.day} ${slot.from?.slice(0, 5)}-${slot.to?.slice(0, 5)}`
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
                        {moodScale.find((option) => option.value === match.mood)?.emoji ?? "🙂"}
                      </span>
                      <span>
                        {moodScale.find((option) => option.value === match.mood)?.label ?? ""}
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
                    om {match.proposedTime.toLocaleTimeString("nl-NL", {
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

const RestrictedView = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="p-6 max-w-md text-center">
        <p className="text-muted-foreground">
          Je hebt geen toegang tot deze pagina. Kies je rol op home.
        </p>
        <Button onClick={() => navigate("/home")} className="mt-4">
          Terug naar home
        </Button>
      </Card>
    </div>
  );
};

const Matches = () => {
  const [role] = useState(localStorage.getItem("userRole") || "supportee");

  if (role === "buddy") {
    return <BuddyMatchesView />;
  }

  if (role === "supportee") {
    return <SupporteeMatchesView />;
  }

  return <RestrictedView />;
};

export default Matches;
