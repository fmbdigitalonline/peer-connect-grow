import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import peerLogo from "@/assets/peer-logo.png";
import { Languages, ShieldCheck, Sparkles, Star, Target } from "lucide-react";

const LANGUAGES = [
  { value: "nl", label: "Nederlands", description: "Voor Nederlandstalige supportees", flag: "🇳🇱" },
  { value: "en", label: "English", description: "For international supportees", flag: "🌍" },
];

const INTEREST_OPTIONS = [
  "STEM",
  "Creative Tech",
  "Leadership",
  "Sustainability",
  "Health",
  "Entrepreneurship",
  "Languages",
  "Art & Design",
];

const JOURNEY_HIGHLIGHTS = [
  { emoji: "🎯", title: "Hulpvraag", description: "Formuleer waar je aan wilt werken." },
  { emoji: "🤝", title: "Veilige match", description: "AI & coaches vinden de juiste buddy." },
  { emoji: "🌱", title: "Future Skills", description: "Zie je groei terug in badges." },
];

const STEP_LABELS: Record<Step, string> = {
  intro: "Welkom",
  language: "Taal",
  interests: "Interesses",
  consents: "Toestemmingen",
};

const CONSENT_TITLES: Record<ConsentKey, string> = {
  privacy: "AVG / privacy",
  notifications: "Notificaties",
  research: "Onderzoek",
};

const copy = {
  nl: {
    welcomeTitle: "Welkom bij Peer Connect!",
    welcomeBody:
      "We begeleiden je stap voor stap om je hulpvraag scherp te krijgen, een veilige match te maken en je groei zichtbaar te maken.",
    safetyTitle: "Veiligheid eerst",
    safetyBody:
      "Onze AI en coaches bewaken jouw grenzen. Deel alleen wat goed voelt – jij houdt altijd controle over jouw verhaal.",
    languageStepTitle: "Welke taal past het beste bij jou?",
    languageStepBody:
      "Je kunt dit later altijd aanpassen. De interface past zich direct aan op basis van je keuze.",
    interestsStepTitle: "Waar wil jij mee aan de slag?",
    interestsStepBody: "Selecteer thema's of vakken zodat we een passende buddy kunnen vinden.",
    consentsStepTitle: "Laatste stap: toestemmingen",
    consentsStepBody: "We gebruiken deze info alleen om je ervaring te verbeteren.",
    interestPlaceholder: "Kies minimaal één interesse of sla over",
    next: "Volgende",
    back: "Terug",
    finish: "Ga naar mijn hulpvraag",
    selected: "Geselecteerd",
    summaryTitle: "Samenvatting",
    summaryRole: "Rol",
    summaryLanguage: "Taal",
    summaryInterests: "Interesses",
    summaryFallback: "Geen interesses geselecteerd",
    consentPrivacy: "Ik ga akkoord met het verwerken van mijn gegevens volgens de AVG",
    consentNotifications: "Ik ontvang graag updates over matches en sessies",
    consentResearch: "Mijn data mag anoniem gebruikt worden voor onderzoek",
    consentRequired: "Privacy-toestemming is verplicht om door te gaan.",
    saving: "Profiel opslaan...",
    saved: "Voorkeuren opgeslagen",
  },
  en: {
    welcomeTitle: "Welcome to Peer Connect!",
    welcomeBody:
      "We'll guide you through a focused funnel so you can express your help request, find a safe buddy and track your growth.",
    safetyTitle: "Safety first",
    safetyBody:
      "Our AI and coaches guard your boundaries. Share only what feels right – you stay in control of your story.",
    languageStepTitle: "Which language fits you best?",
    languageStepBody:
      "You can update this later. The interface updates instantly based on your choice.",
    interestsStepTitle: "What do you want to explore?",
    interestsStepBody: "Pick topics so we can match you with the right buddy.",
    consentsStepTitle: "Final step: permissions",
    consentsStepBody: "We only use this info to improve your experience.",
    interestPlaceholder: "Choose at least one interest or skip",
    next: "Next",
    back: "Back",
    finish: "Continue to my help request",
    selected: "Selected",
    summaryTitle: "Summary",
    summaryRole: "Role",
    summaryLanguage: "Language",
    summaryInterests: "Interests",
    summaryFallback: "No interests selected",
    consentPrivacy: "I agree that my data is processed according to GDPR",
    consentNotifications: "I want to receive updates about matches and sessions",
    consentResearch: "My data may be used anonymously for research",
    consentRequired: "Privacy consent is required to continue.",
    saving: "Saving profile...",
    saved: "Preferences saved",
  },
};

type Language = (typeof LANGUAGES)[number]["value"];

type ConsentKey = "privacy" | "notifications" | "research";

type ConsentState = Record<ConsentKey, boolean>;

type Step = "intro" | "language" | "interests" | "consents";

const STEPS: Step[] = ["intro", "language", "interests", "consents"];

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [language, setLanguage] = useState<Language>("nl");
  const [interests, setInterests] = useState<string[]>([]);
  const [consents, setConsents] = useState<ConsentState>({
    privacy: false,
    notifications: true,
    research: false,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const role = "supportee";

  const activeCopy = copy[language];
  const currentStep = STEPS[currentStepIndex];
  const progress = ((currentStepIndex + 1) / STEPS.length) * 100;

  const summaryInterests = interests.length ? interests.join(", ") : activeCopy.summaryFallback;

  const canContinue = useMemo(() => {
    if (currentStep === "language") {
      return Boolean(language);
    }
    if (currentStep === "consents") {
      return consents.privacy;
    }
    return true;
  }, [consents.privacy, currentStep, language]);

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((item) => item !== interest) : [...prev, interest],
    );
  };

  const handleConsentChange = (key: ConsentKey, value: boolean) => {
    setConsents((prev) => ({ ...prev, [key]: value }));
  };

  const goNext = () => {
    if (!canContinue) return;
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      return;
    }
    handleComplete();
  };

  const goBack = () => {
    if (currentStepIndex === 0) return;
    setCurrentStepIndex((prev) => prev - 1);
  };

  const handleComplete = async () => {
    setIsSaving(true);
    setError(null);

    const payload = {
      user_id: crypto.randomUUID(),
      role,
      language,
      interests,
      consents,
    };

    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      localStorage.setItem("onboardingComplete", "true");
      localStorage.setItem("supporteeProfile", JSON.stringify(payload));
      navigate("/help-request", { replace: true });
    } catch (err) {
      console.error(err);
      setError("Er is iets misgegaan. Probeer het opnieuw.");
    } finally {
      setIsSaving(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case "intro":
        return (
          <div className="rounded-3xl border border-peer-purple/20 bg-white/90 p-8 shadow-lg backdrop-blur">
            <div className="space-y-4 text-center">
              <Badge className="mx-auto w-fit bg-peer-purple/10 text-peer-purple border-none uppercase tracking-[0.3em] text-xs">
                {activeCopy.summaryRole}
              </Badge>
              <h2 className="text-3xl font-extrabold text-peer-navy">{activeCopy.welcomeTitle}</h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                {activeCopy.welcomeBody}
              </p>
            </div>
            <Separator className="my-8" />
            <div className="grid gap-4 md:grid-cols-3">
              {JOURNEY_HIGHLIGHTS.map((highlight) => (
                <div
                  key={highlight.title}
                  className="rounded-2xl border border-dashed border-peer-purple/30 bg-muted/30 p-4 text-left"
                >
                  <div className="text-3xl mb-3">{highlight.emoji}</div>
                  <p className="text-sm font-semibold text-foreground">{highlight.title}</p>
                  <p className="text-xs text-muted-foreground">{highlight.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case "language":
        return (
          <div className="rounded-3xl border border-peer-purple/20 bg-white/95 p-6 shadow-lg">
            <div className="flex flex-col gap-2 mb-6">
              <div className="flex items-center gap-3 text-peer-purple">
                <div className="rounded-2xl bg-peer-purple/10 p-3">
                  <Languages className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{activeCopy.languageStepTitle}</h2>
                  <p className="text-sm text-muted-foreground">{activeCopy.languageStepBody}</p>
                </div>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {LANGUAGES.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  className={cn(
                    "rounded-2xl border-2 p-5 text-left transition-all",
                    language === item.value
                      ? "border-peer-purple bg-peer-purple/5 shadow-md"
                      : "border-border hover:border-peer-purple/40",
                  )}
                  onClick={() => setLanguage(item.value as Language)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{item.flag}</p>
                      <p className="text-xl font-semibold text-foreground">{item.label}</p>
                    </div>
                    {language === item.value && (
                      <Badge className="bg-peer-teal/10 text-peer-teal border-peer-teal/20">
                        {activeCopy.selected}
                      </Badge>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{item.description}</p>
                </button>
              ))}
            </div>
          </div>
        );
      case "interests":
        return (
          <div className="rounded-3xl border border-peer-orange/20 bg-white/95 p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-2xl bg-peer-orange/10 p-3">
                <Target className="h-5 w-5 text-peer-orange" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{activeCopy.interestsStepTitle}</h2>
                <p className="text-sm text-muted-foreground">{activeCopy.interestsStepBody}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {INTEREST_OPTIONS.map((interest) => (
                <button
                  type="button"
                  key={interest}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-semibold transition",
                    interests.includes(interest)
                      ? "border-peer-orange bg-peer-orange/10 text-peer-orange"
                      : "border-border text-muted-foreground hover:border-peer-orange/40",
                  )}
                  onClick={() => toggleInterest(interest)}
                >
                  {interest}
                </button>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">{activeCopy.interestPlaceholder}</p>
          </div>
        );
      case "consents":
        return (
          <div className="rounded-3xl border border-peer-teal/20 bg-white/95 p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-2xl bg-peer-teal/10 p-3">
                <Sparkles className="h-5 w-5 text-peer-teal" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{activeCopy.consentsStepTitle}</h2>
                <p className="text-sm text-muted-foreground">{activeCopy.consentsStepBody}</p>
              </div>
            </div>
            <div className="space-y-4">
              <ConsentRow
                required
                label={activeCopy.consentPrivacy}
                checked={consents.privacy}
                onChange={(value) => handleConsentChange("privacy", value)}
              />
              <ConsentRow
                label={activeCopy.consentNotifications}
                checked={consents.notifications}
                onChange={(value) => handleConsentChange("notifications", value)}
              />
              <ConsentRow
                label={activeCopy.consentResearch}
                checked={consents.research}
                onChange={(value) => handleConsentChange("research", value)}
              />
              {!consents.privacy && (
                <p className="text-sm text-destructive">{activeCopy.consentRequired}</p>
              )}
            </div>
            <Separator className="my-6" />
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-foreground">
                <Star className="h-4 w-4 text-peer-orange" /> {activeCopy.summaryTitle}
              </h3>
              <dl className="space-y-3">
                <SummaryRow label={activeCopy.summaryRole} value="Supportee" />
                <SummaryRow
                  label={activeCopy.summaryLanguage}
                  value={LANGUAGES.find((lang) => lang.value === language)?.label || language}
                />
                <SummaryRow label={activeCopy.summaryInterests} value={summaryInterests} />
              </dl>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft flex flex-col">
      <header className="bg-white border-b border-border shadow-sm rounded-b-3xl">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-10 text-center">
          <img src={peerLogo} alt="Peer connect" className="h-16 w-auto" />
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-peer-purple">Supportee onboarding</p>
            <h1 className="text-3xl font-extrabold text-peer-navy">Eigenaarschap over jouw hulpvraag</h1>
            <p className="text-sm text-muted-foreground">
              Future skills · veilige match · zichtbare groei
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs uppercase">
            <Badge className="bg-peer-teal/10 text-peer-teal border-peer-teal/20">Veilige match</Badge>
            <Badge className="bg-peer-orange/10 text-peer-orange border-peer-orange/20">Future skills</Badge>
            <Badge className="bg-peer-purple/10 text-peer-purple border-peer-purple/20">Portfolio & badges</Badge>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full px-4 py-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 lg:flex-row">
          <section className="flex-1 space-y-6">
            <Card className="border border-peer-purple/20 bg-white/80 backdrop-blur">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-muted-foreground">
                  Stap {currentStepIndex + 1} / {STEPS.length}
                </CardTitle>
                <p className="text-lg font-bold text-peer-purple">{STEP_LABELS[currentStep]}</p>
              </CardHeader>
              <CardContent>
                <Progress value={progress} className="h-2" />
              </CardContent>
            </Card>

            <div key={currentStep} className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              {renderStep()}
            </div>
          </section>

          <aside className="w-full space-y-4 lg:w-[320px]">
            <Card className="border-none bg-gradient-peer text-white shadow-xl">
              <CardHeader className="space-y-2">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/80">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Safety</span>
                </div>
                <CardTitle className="text-2xl">{activeCopy.safetyTitle}</CardTitle>
                <p className="text-sm text-white/90">{activeCopy.safetyBody}</p>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-white/90">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  <span>AI screening & coaching duo</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Rol = Supportee · alleen jij logt in</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  <span>Portfolio badges voor iedere stap</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-peer-purple/20 bg-white/90 shadow-lg">
              <CardHeader>
                <CardTitle className="text-base font-semibold text-foreground">
                  {activeCopy.summaryTitle}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {activeCopy.saved}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <dl className="space-y-3">
                  <SummaryRow label={activeCopy.summaryRole} value="Supportee" />
                  <SummaryRow
                    label={activeCopy.summaryLanguage}
                    value={LANGUAGES.find((lang) => lang.value === language)?.label || language}
                  />
                  <SummaryRow label={activeCopy.summaryInterests} value={summaryInterests} />
                </dl>
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wide mb-2">
                    Consents
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(consents).map(([key, value]) => (
                      <Badge
                        key={key}
                        className={cn(
                          "rounded-full px-3 py-1 text-xs",
                          value
                            ? "bg-peer-teal/10 text-peer-teal border-peer-teal/20"
                            : "bg-muted text-muted-foreground border-dashed",
                        )}
                      >
                        {CONSENT_TITLES[key as ConsentKey]}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/60 bg-white/80">
              <CardHeader>
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-peer-purple" /> Flow
                </CardTitle>
                <p className="text-sm text-muted-foreground">Zie direct wat al klaar is.</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {STEPS.map((step, index) => (
                  <div
                    key={step}
                    className="flex items-center justify-between rounded-2xl border border-dashed border-border px-3 py-2"
                  >
                    <div>
                      <p className="text-xs uppercase text-muted-foreground">{STEP_LABELS[step]}</p>
                      <p className="text-sm font-semibold text-foreground">
                        {index < currentStepIndex
                          ? "Compleet"
                          : index === currentStepIndex
                            ? "Nu bezig"
                            : "Komt zo"}
                      </p>
                    </div>
                    <Badge
                      className={cn(
                        "rounded-full px-2",
                        index < currentStepIndex
                          ? "bg-peer-teal/10 text-peer-teal border-peer-teal/20"
                          : index === currentStepIndex
                            ? "bg-peer-orange/10 text-peer-orange border-peer-orange/20"
                            : "bg-muted text-muted-foreground border-dashed",
                      )}
                    >
                      {index < currentStepIndex ? "✔" : index === currentStepIndex ? "•" : "..."}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </aside>
        </div>

        {error && (
          <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        )}
      </main>

      <footer className="bg-white/90 border-t border-border px-6 py-5">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-3 sm:flex-row">
          <Button variant="outline" disabled={currentStepIndex === 0 || isSaving} onClick={goBack}>
            {activeCopy.back}
          </Button>
          <Button className="flex-1" onClick={goNext} disabled={!canContinue || isSaving}>
            {isSaving ? activeCopy.saving : currentStepIndex === STEPS.length - 1 ? activeCopy.finish : activeCopy.next}
          </Button>
        </div>
      </footer>
    </div>
  );
};

const ConsentRow = ({
  label,
  checked,
  required,
  onChange,
}: {
  label: string;
  checked: boolean;
  required?: boolean;
  onChange: (checked: boolean) => void;
}) => (
  <div className="flex items-start gap-4 rounded-2xl border border-border/70 bg-muted/30 p-4">
    <Switch id={label} checked={checked} onCheckedChange={onChange} />
    <div>
      <Label htmlFor={label} className="text-sm font-semibold leading-snug text-foreground">
        {label}
        {required && <span className="text-destructive"> *</span>}
      </Label>
      <p className="text-xs text-muted-foreground">{required ? "Verplicht" : "Optioneel"}</p>
    </div>
  </div>
);

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-2xl border border-dashed border-border px-3 py-2">
    <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
    <dd className="text-sm font-semibold text-foreground">{value}</dd>
  </div>
);

export default Onboarding;
