import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  CalendarPlus,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  X,
} from "lucide-react";

import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { subjects, getStorageData, setStorageData } from "@/lib/mockData";
import { helpTypeOptions, moodScale, dayOptions } from "@/lib/helpRequestOptions";
import type { AvailabilityBlock, HelpRequest, MatchSuggestion } from "@/types";
import { callAiMatchService } from "@/lib/matchService";
import { seedSupporteeMatches } from "@/lib/supporteeMatchStorage";

interface AvailabilityRow extends AvailabilityBlock {
  id: string;
}

const createAvailabilityRow = (): AvailabilityRow => ({
  id: typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2),
  day: "",
  from: "",
  to: "",
});

const HelpRequestPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: "",
    topic: "",
    helpType: helpTypeOptions[0].id,
    desiredBuddy: "",
  });
  const [availability, setAvailability] = useState<AvailabilityRow[]>([
    createAvailabilityRow(),
  ]);
  const [moodValue, setMoodValue] = useState<number | null>(null);
  const [moodSkipped, setMoodSkipped] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<
    | null
    | {
        state: "searching" | "matches";
        matches: MatchSuggestion[];
      }
  >(null);

  const filledAvailability = availability.filter(
    (slot) => slot.day && slot.from && slot.to
  );

  const availabilityReady = filledAvailability.length > 0;
  const selectedSubject = subjects.find((subject) => subject.id === formData.subject);
  const selectedHelpType = helpTypeOptions.find(
    (option) => option.id === formData.helpType
  );
  const selectedMood =
    moodValue !== null ? moodScale.find((option) => option.value === moodValue) : undefined;
  const availabilitySummary = filledAvailability.map(
    (slot) => `${slot.day} ${slot.from?.slice(0, 5)}-${slot.to?.slice(0, 5)}`
  );

  const readinessSteps = [
    {
      id: "mood",
      label: "Mood-check",
      detail: moodSkipped
        ? "Bewust overgeslagen"
        : selectedMood?.label || "Nog kiezen",
      complete: moodSkipped || Boolean(selectedMood),
    },
    {
      id: "subject",
      label: "Vak & onderwerp",
      detail:
        formData.subject && formData.topic
          ? `${selectedSubject?.name || "Vak"} · ${formData.topic}`
          : "Nog invullen",
      complete: Boolean(formData.subject && formData.topic.trim()),
    },
    {
      id: "helpType",
      label: "Type hulp",
      detail: selectedHelpType?.label || "Nog kiezen",
      complete: Boolean(formData.helpType),
    },
    {
      id: "availability",
      label: "Beschikbaarheid",
      detail: availabilityReady
        ? `${filledAvailability.length} blok(ken)`
        : "Minimaal 1 blok",
      complete: availabilityReady,
    },
  ];

  const canSubmit = Boolean(
    formData.subject &&
      formData.topic.trim() &&
      availabilityReady &&
      (moodSkipped || moodValue !== null)
  );

  const heroHighlights = [
    { icon: ShieldCheck, label: "Veilige match" },
    { icon: Sparkles, label: "AI-match ready" },
    { icon: Users, label: "Coach signaal" },
  ];

  const resetForm = () => {
    setFormData({
      subject: "",
      topic: "",
      helpType: helpTypeOptions[0].id,
      desiredBuddy: "",
    });
    setAvailability([createAvailabilityRow()]);
    setMoodValue(null);
    setMoodSkipped(false);
  };

  const handleAvailabilityChange = (
    id: string,
    field: keyof AvailabilityBlock,
    value: string
  ) => {
    setAvailability((prev) =>
      prev.map((slot) => (slot.id === id ? { ...slot, [field]: value } : slot))
    );
  };

  const addAvailabilityRow = () => {
    setAvailability((prev) => [...prev, createAvailabilityRow()]);
  };

  const removeAvailabilityRow = (id: string) => {
    setAvailability((prev) =>
      prev.length === 1 ? prev : prev.filter((slot) => slot.id !== id)
    );
  };

  const validateForm = () => {
    if (!formData.subject) {
      toast.error("Kies eerst een vak");
      return false;
    }
    if (!formData.topic.trim()) {
      toast.error("Beschrijf kort het onderwerp");
      return false;
    }
    if (filledAvailability.length === 0) {
      toast.error("Voeg minimaal één tijdsblok toe");
      return false;
    }
    if (moodValue === null && !moodSkipped) {
      toast.error("Kies je mood of sla bewust over");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const request: HelpRequest = {
        id: `req_${Date.now()}`,
        supporteeId: "current_user",
        subject: formData.subject,
        topic: formData.topic.trim(),
        helpType: formData.helpType,
        availability: filledAvailability,
        mood: moodSkipped ? null : moodValue,
        moodSkipped,
        desiredBuddy: formData.desiredBuddy || undefined,
        description: formData.topic.trim(),
        preferredTimes: filledAvailability.map(
          (slot) => `${slot.day}-${slot.from}-${slot.to}`
        ),
        status: "pending",
        createdAt: new Date(),
        coachAlert: !moodSkipped && moodValue !== null && moodValue <= 1,
      };

      const matches = await callAiMatchService(request);
      if (matches.length > 0) {
        request.status = "matched";
        request.matchedBuddyId = matches[0].buddyId;
      }

      const sharedTraits: string[] = [];
      if (selectedSubject?.name) {
        sharedTraits.push(`Vak: ${selectedSubject.name}`);
      }
      if (!moodSkipped && moodValue !== null) {
        sharedTraits.push("Coach let extra op jouw mood");
      }

      seedSupporteeMatches(matches, {
        subjectId: request.subject,
        subjectLabel: selectedSubject?.name,
        sharedTraits,
      });

      const requests = getStorageData<HelpRequest[]>("helpRequests", []);
      requests.push(request);
      setStorageData("helpRequests", requests);

      toast.success("Hulpvraag verstuurd");
      setSubmissionResult({
        state: matches.length > 0 ? "matches" : "searching",
        matches,
      });
      resetForm();
    } catch (error) {
      toast.error("Er ging iets mis bij het versturen");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submissionResult) {
    const hasMatches = submissionResult.state === "matches";

    return (
      <div className="min-h-screen bg-gradient-soft flex flex-col">
        <Navigation />
        <div className="flex-1 px-4 py-12">
          <Card className="glass-card mx-auto w-full max-w-xl space-y-6 rounded-3xl border border-peer-purple/20 p-8 text-center shadow-xl">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-peer text-white shadow-lg">
              {hasMatches ? (
                <CheckCircle2 className="h-10 w-10" />
              ) : (
                <Loader2 className="h-10 w-10 animate-spin" />
              )}
            </div>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-peer-purple">
                Hulpvraag verstuurd
              </p>
              <h1 className="text-3xl font-extrabold text-peer-navy">
                {hasMatches ? "Er staan matchvoorstellen klaar" : "We zoeken een buddy voor je"}
              </h1>
              <p className="text-muted-foreground">
                {hasMatches
                  ? "AI en coaches hebben al voorstellen klaarstaan. Check je matches om direct een sessie te plannen."
                  : "Je coach krijgt meteen een signaal. Zodra we een buddy hebben, laten we het weten via je matches."}
              </p>
            </div>

            {hasMatches && submissionResult.matches.length > 0 && (
              <div className="space-y-3 rounded-2xl border border-peer-purple/20 bg-white/70 p-4 text-left">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  AI-matchsuggesties
                </p>
                {submissionResult.matches.map((match) => (
                  <div key={match.buddyId} className="flex items-center justify-between rounded-2xl border border-dashed border-border/70 px-3 py-2">
                    <div>
                      <p className="font-semibold text-foreground">{match.buddyName}</p>
                      <p className="text-xs text-muted-foreground">{match.reason}</p>
                    </div>
                    <Badge className="rounded-full bg-peer-teal/10 text-xs text-peer-teal">
                      {match.confidence}%
                    </Badge>
                  </div>
                ))}
              </div>
            )}

            <div className="grid gap-3 sm:grid-cols-2">
              <Button
                onClick={() => navigate(hasMatches ? "/matches" : "/home")}
                className="w-full"
              >
                {hasMatches ? "Bekijk matches" : "Terug naar home"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setSubmissionResult(null)}
                className="w-full"
              >
                Nieuwe hulpvraag
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-soft pb-10">
      <Navigation />
      <header className="bg-white/90 border-b border-border/60 shadow-sm">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-peer-purple">
                Story 2 · Supportee flow
              </p>
              <h1 className="text-3xl font-extrabold text-peer-navy">
                Supportee – hulpvraagformulier
              </h1>
              <p className="text-sm text-muted-foreground">
                Vul je mood, vak en beschikbaarheid zodat AI-match alvast voorstellen kan klaarzetten.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-peer-teal/10 text-peer-teal border border-peer-teal/20">
                Match-ready
              </Badge>
              <Badge className="bg-peer-orange/10 text-peer-orange border border-peer-orange/20">
                Coach signaal
              </Badge>
              <Badge className="bg-peer-purple/10 text-peer-purple border border-peer-purple/20">
                Mood-check
              </Badge>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            {heroHighlights.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-2xl border border-border/60 bg-white/70 px-3 py-2 text-foreground"
              >
                <Icon className="h-4 w-4 text-peer-purple" />
                <span className="font-semibold">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1 w-full px-4 py-8">
        <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[minmax(0,3fr),minmax(280px,1fr)]">
          <section className="space-y-6">
            <Card className="glass-card space-y-5 rounded-3xl border border-peer-purple/15 p-6 shadow-sm">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-peer-purple">
                  <Sparkles className="h-4 w-4" /> Mood-check
                </div>
                <h2 className="mt-1 text-2xl font-bold text-foreground">Hoe voel je je vandaag?</h2>
                <p className="text-sm text-muted-foreground">
                  Kies een emoji of sla bewust over. Alleen jij, AI-match en je coach zien dit signaal.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                {moodScale.map((option) => {
                  const isActive = moodValue === option.value && !moodSkipped;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => {
                        setMoodValue(option.value);
                        setMoodSkipped(false);
                      }}
                      className={`rounded-2xl border px-4 py-4 text-left transition-all ${
                        isActive
                          ? "border-peer-purple bg-peer-purple/5 shadow-sm"
                          : "border-border/70 bg-white/80 hover:border-peer-purple/40"
                      }`}
                    >
                      <div className="text-3xl">{option.emoji}</div>
                      <p className="font-semibold text-foreground">{option.label}</p>
                      <p className="text-xs text-muted-foreground">{option.description}</p>
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-dashed border-border/70 bg-white/70 px-3 py-2">
                <Switch
                  id="mood-skip"
                  checked={moodSkipped}
                  onCheckedChange={(checked) => {
                    setMoodSkipped(checked);
                    if (checked) {
                      setMoodValue(null);
                    }
                  }}
                />
                <Label htmlFor="mood-skip" className="text-sm text-muted-foreground">
                  Ik sla de mood-check bewust over
                </Label>
              </div>
            </Card>

            <Card className="glass-card space-y-6 rounded-3xl border border-peer-purple/15 p-6 shadow-sm">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wide text-peer-orange">Hulpvraag</p>
                <h2 className="text-2xl font-bold text-foreground">Waar heb je hulp bij nodig?</h2>
                <p className="text-sm text-muted-foreground">
                  Kies het vak, onderwerp en type hulp zodat buddies precies weten wat je zoekt.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Vak *</Label>
                  <Select
                    value={formData.subject}
                    onValueChange={(value) => setFormData({ ...formData, subject: value })}
                  >
                    <SelectTrigger className="rounded-2xl border-border/70 bg-white/80">
                      <SelectValue placeholder="Kies een vak" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject.id} value={subject.id}>
                          {subject.icon} {subject.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Onderwerp *</Label>
                  <Input
                    placeholder="Bijv. breuken, werkwoorden, project X"
                    value={formData.topic}
                    onChange={(event) =>
                      setFormData({ ...formData, topic: event.target.value })
                    }
                    className="rounded-2xl border-border/70 bg-white/80"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Type hulp *</Label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {helpTypeOptions.map((option) => {
                    const isActive = formData.helpType === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, helpType: option.id })}
                        className={`rounded-3xl border px-4 py-4 text-left transition-all ${
                          isActive
                            ? "border-peer-purple bg-gradient-to-br from-peer-purple/10 to-peer-magenta/10 shadow-md"
                            : "border-dashed border-border/70 bg-white/80 hover:border-peer-purple/30"
                        }`}
                      >
                        <div className="text-3xl">{option.icon}</div>
                        <p className="font-semibold text-foreground">{option.label}</p>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Gewenste buddy (optioneel)</Label>
                <Input
                  placeholder="Heb je iemand in gedachten?"
                  value={formData.desiredBuddy}
                  onChange={(event) =>
                    setFormData({ ...formData, desiredBuddy: event.target.value })
                  }
                  className="rounded-2xl border-border/70 bg-white/80"
                />
              </div>
            </Card>

            <Card className="glass-card space-y-5 rounded-3xl border border-peer-purple/15 p-6 shadow-sm">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-peer-teal">
                  <CalendarPlus className="h-4 w-4" /> Beschikbaarheid
                </div>
                <h2 className="mt-1 text-2xl font-bold text-foreground">Wanneer kun je?</h2>
                <p className="text-sm text-muted-foreground">
                  Voeg minimaal één dag en tijdsblok toe zodat we snel kunnen plannen.
                </p>
              </div>

              <div className="space-y-3">
                {availability.map((slot, index) => (
                  <div
                    key={slot.id}
                    className="grid items-end gap-3 rounded-3xl border border-dashed border-border/70 bg-white/70 p-3 sm:grid-cols-[1fr,1fr,1fr,auto]"
                  >
                    <div className="space-y-2">
                      <Label>Dag</Label>
                      <Select
                        value={slot.day}
                        onValueChange={(value) =>
                          handleAvailabilityChange(slot.id, "day", value)
                        }
                      >
                        <SelectTrigger className="rounded-2xl border-border/70 bg-white">
                          <SelectValue placeholder="Kies" />
                        </SelectTrigger>
                        <SelectContent>
                          {dayOptions.map((day) => (
                            <SelectItem key={day.value} value={day.value}>
                              {day.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Van</Label>
                      <Input
                        type="time"
                        value={slot.from}
                        onChange={(event) =>
                          handleAvailabilityChange(slot.id, "from", event.target.value)
                        }
                        className="rounded-2xl border-border/70 bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Tot</Label>
                      <Input
                        type="time"
                        value={slot.to}
                        onChange={(event) =>
                          handleAvailabilityChange(slot.id, "to", event.target.value)
                        }
                        className="rounded-2xl border-border/70 bg-white"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeAvailabilityRow(slot.id)}
                      disabled={availability.length === 1}
                      className="h-10 w-10 rounded-full"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Verwijder blok {index + 1}</span>
                    </Button>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                onClick={addAvailabilityRow}
                className="w-full rounded-full border-dashed border-peer-purple/30"
              >
                + Tijdslot toevoegen
              </Button>
            </Card>
          </section>

          <aside className="space-y-4">
            <Card className="rounded-3xl border-none bg-gradient-peer p-6 text-white shadow-lg">
              <p className="text-xs uppercase tracking-[0.3em] text-white/80">AI-matchservice</p>
              <h3 className="text-2xl font-semibold">We bereiden je match voor</h3>
              <div className="space-y-3 text-sm text-white/90">
                <div className="flex items-start gap-2">
                  <Target className="h-4 w-4" />
                  <span>Focus: {selectedHelpType?.label || "Nog kiezen"}</span>
                </div>
                <div className="flex items-start gap-2">
                  <CalendarPlus className="h-4 w-4" />
                  <span>
                    Tijd: {availabilitySummary.length > 0 ? availabilitySummary[0] : "Voeg beschikbaarheid toe"}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Coach krijgt een signaal bij een lage mood-check.</span>
                </div>
              </div>
            </Card>

            <Card className="glass-card space-y-4 rounded-3xl border border-peer-purple/15 p-5 shadow-sm">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Status</p>
                <h3 className="text-lg font-semibold text-foreground">Match readiness</h3>
              </div>
              <div className="space-y-3">
                {readinessSteps.map((step) => (
                  <div
                    key={step.id}
                    className="flex items-center justify-between rounded-2xl border border-dashed border-border/70 px-3 py-2"
                  >
                    <div>
                      <p className="text-xs uppercase text-muted-foreground">{step.label}</p>
                      <p className="text-sm font-semibold text-foreground">{step.detail}</p>
                    </div>
                    <Badge
                      className={`rounded-full px-3 text-xs ${
                        step.complete
                          ? "bg-peer-teal/10 text-peer-teal border border-peer-teal/20"
                          : "bg-muted text-muted-foreground border border-dashed"
                      }`}
                    >
                      {step.complete ? "✔" : "..."}
                    </Badge>
                  </div>
                ))}
              </div>
              <div className="space-y-1 rounded-2xl border border-border/70 bg-white/70 p-3 text-sm">
                <p className="text-muted-foreground">Beschikbaarheid</p>
                <p className="font-semibold text-foreground">
                  {availabilitySummary.length > 0
                    ? availabilitySummary.join(" · ")
                    : "Nog geen blokken toegevoegd"}
                </p>
                {formData.desiredBuddy && (
                  <p className="text-xs text-muted-foreground">
                    Gewenste buddy: {formData.desiredBuddy}
                  </p>
                )}
              </div>
            </Card>

            <Card className="glass-card space-y-4 rounded-3xl border border-peer-purple/20 p-5 shadow-md">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-peer-purple" />
                <div>
                  <p className="font-semibold text-foreground">Hulpvraag versturen</p>
                  <p className="text-sm text-muted-foreground">
                    Mood-check en minimaal één tijdslot zijn verplicht om een match te starten.
                  </p>
                </div>
              </div>
              <Button
                size="lg"
                className="w-full"
                onClick={handleSubmit}
                disabled={isSubmitting || !canSubmit}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Hulpvraag versturen
                  </>
                ) : (
                  "Hulpvraag versturen"
                )}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Coaches zien alleen je mood-signaal om je sneller te helpen.
              </p>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default HelpRequestPage;
