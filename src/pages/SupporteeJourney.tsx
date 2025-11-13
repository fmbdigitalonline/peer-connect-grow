import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Brain,
  GraduationCap,
  Languages,
  PlayCircle,
  ShieldCheck,
  Smile,
  Sparkles,
  Trophy,
  Users,
  Video,
} from "lucide-react";
import { toast } from "sonner";

const journeySteps = [
  {
    id: "onboarding",
    title: "Onboarding",
    emoji: "🧭",
    description: "Taal, interesses en hulpvragen",
  },
  {
    id: "match",
    title: "AI Match",
    emoji: "🤖",
    description: "Krijg een buddy voorstel",
  },
  {
    id: "collaboration",
    title: "Samenwerken",
    emoji: "🤝",
    description: "Check-ins en reflecties",
  },
  {
    id: "portfolio",
    title: "Portfolio",
    emoji: "📈",
    description: "Zie je groei",
  },
  {
    id: "library",
    title: "Bibliotheek",
    emoji: "📚",
    description: "Microlearning",
  },
  {
    id: "community",
    title: "Community",
    emoji: "🌟",
    description: "Deel successen",
  },
] as const;

type JourneyStepId = (typeof journeySteps)[number]["id"];

const languages = ["Nederlands", "Engels", "Arabisch", "Tigrinya", "Turks"];
const interests = [
  "Technologie",
  "Sport",
  "Muziek",
  "Koken",
  "Gezondheid",
  "Taal",
];
const classLevels = ["Taalklas", "Brugklas", "MBO 1", "MBO 2", "HAVO"];
const comfortLevels = [
  { value: 1, label: "Ik voel me gespannen", emoji: "😅" },
  { value: 2, label: "Best spannend", emoji: "😬" },
  { value: 3, label: "Gaat wel", emoji: "🙂" },
  { value: 4, label: "Ik voel me oké", emoji: "😊" },
  { value: 5, label: "Ik ben klaar!", emoji: "😎" },
];
const helpThemes = [
  {
    id: "language",
    label: "Taal",
    description: "Praat, lees en oefen je woordenschat",
    icon: Languages,
  },
  {
    id: "rules",
    label: "Schoolregels",
    description: "Hoe werkt de school en wat wordt verwacht",
    icon: ShieldCheck,
  },
  {
    id: "homework",
    label: "Huiswerk",
    description: "Maak opdrachten samen, plan en leer",
    icon: GraduationCap,
  },
  {
    id: "social",
    label: "Sociaal",
    description: "Vrienden maken en samenwerken",
    icon: Users,
  },
];

const futureSkills = [
  { id: "collaboration", label: "Samenwerken", emoji: "🧩" },
  { id: "perseverance", label: "Doorzettingsvermogen", emoji: "💪" },
  { id: "communication", label: "Communicatie", emoji: "💬" },
  { id: "selfregulation", label: "Zelfregulatie", emoji: "🧠" },
];

const microLearnings = [
  {
    id: "pronunciation",
    title: "Uitspraak oefenen",
    duration: "2 min",
    level: "Beginner",
    description: "Korte video met 3 nieuwe klanken",
  },
  {
    id: "schoolrules",
    title: "Schoolregels uitgelegd",
    duration: "3 min",
    level: "Eenvoudig",
    description: "Wat doe je bij afmelden en pauzes",
  },
  {
    id: "homework",
    title: "Slim huiswerk plannen",
    duration: "4 min",
    level: "Midden",
    description: "Gebruik de 1-2-3 planning",
  },
];

const initialPosts = [
  {
    id: 1,
    name: "Noor",
    cohort: "Taalklas B",
    text: "Vandaag voor het eerst zelf mijn presentatie gedaan!",
    likes: 12,
    moderated: true,
  },
  {
    id: 2,
    name: "Luis",
    cohort: "Brugklas C",
    text: "Mijn buddy hielp me met mijn eerste Nederlandse sollicitatiebrief.",
    likes: 8,
    moderated: true,
  },
];

const SupporteeJourney = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState<JourneyStepId>("onboarding");
  const [language, setLanguage] = useState("Nederlands");
  const [selectedInterests, setSelectedInterests] = useState<string[]>(["Taal"]);
  const [classLevel, setClassLevel] = useState("Taalklas");
  const [comfort, setComfort] = useState([3]);
  const [selectedThemes, setSelectedThemes] = useState<string[]>(["language"]);
  const [helpText, setHelpText] = useState("Ik wil iemand die me helpt met meer Nederlandse woorden in de klas gebruiken.");
  const [tourActive, setTourActive] = useState(false);
  const [tourProgress, setTourProgress] = useState(0);
  const [matchStatus, setMatchStatus] = useState<"pending" | "confirmed" | "declined">("pending");
  const [coachApproved, setCoachApproved] = useState(false);
  const [checkInMood, setCheckInMood] = useState("😊");
  const [sessionReflection, setSessionReflection] = useState({
    wentWell: "",
    challenge: "",
    nextStep: "",
  });
  const [skillHighlights, setSkillHighlights] = useState<string[]>([
    "collaboration",
    "communication",
  ]);
  const [sharedMoment, setSharedMoment] = useState("");
  const [posts, setPosts] = useState(initialPosts);
  const [pendingMoment, setPendingMoment] = useState<string | null>(null);

  useEffect(() => {
    if (!tourActive) return;
    setTourProgress(0);
    let elapsed = 0;
    const interval = setInterval(() => {
      elapsed += 1;
      setTourProgress((elapsed / 30) * 100);
      if (elapsed >= 30) {
        clearInterval(interval);
        setTourActive(false);
        toast.success("Tour afgerond! Je kent nu alle schermen.");
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [tourActive]);

  useEffect(() => {
    if (matchStatus !== "confirmed") {
      setCoachApproved(false);
      return;
    }
    const timeout = setTimeout(() => setCoachApproved(true), 2000);
    return () => clearTimeout(timeout);
  }, [matchStatus]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest]
    );
  };

  const toggleTheme = (id: string) => {
    setSelectedThemes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const currentComfort = useMemo(() => comfort[0], [comfort]);

  const handleSaveOnboarding = () => {
    toast.success("Onboarding opgeslagen ✅");
    setActiveStep("match");
  };

  const handleMatchAction = (type: "confirm" | "decline") => {
    setMatchStatus(type === "confirm" ? "confirmed" : "declined");
    toast(type === "confirm" ? "Buddy bevestigd!" : "We zoeken een nieuwe match");
  };

  const handleReflectionSave = () => {
    if (!sessionReflection.wentWell || !sessionReflection.challenge) {
      toast.error("Beantwoord minimaal wat goed ging en wat lastig was");
      return;
    }
    setSkillHighlights(["collaboration", "perseverance", "communication"]);
    toast.success("Check-in en reflectie opgeslagen");
    setActiveStep("portfolio");
  };

  const handleDownloadProof = () => {
    toast("Bewijs gedownload (mock)");
  };

  const handleStartLearning = (title: string) => {
    toast(`Microlearning \"${title}\" geopend`);
  };

  const handleShareMoment = () => {
    if (!sharedMoment.trim()) {
      toast.error("Schrijf eerst je succesmoment");
      return;
    }
    setPendingMoment(sharedMoment);
    setSharedMoment("");
    toast("Moment ingestuurd voor moderatie");
  };

  const handleLike = (postId: number) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, likes: post.likes + 1 }
          : post
      )
    );
  };

  const goToNextStep = () => {
    const currentIndex = journeySteps.findIndex((step) => step.id === activeStep);
    const nextStep = journeySteps[currentIndex + 1];
    if (nextStep) {
      setActiveStep(nextStep.id);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navigation />
      <div className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-6 lg:flex-row lg:items-center">
          <div className="flex-1 space-y-4">
            <p className="text-sm uppercase tracking-wide text-muted-foreground">Supportee Journey</p>
            <h1 className="text-4xl font-bold text-foreground">Jouw end-to-end begeleiding</h1>
            <p className="text-muted-foreground max-w-2xl">
              Kies jouw tempo: start met je taal en hulpvraag, ontmoet je buddy, groei door met microlearnings en sluit af met een trots moment voor de community.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">1:1 Buddy</Badge>
              <Badge variant="outline">Veiligheid eerst</Badge>
              <Badge variant="outline">Groei tracken</Badge>
            </div>
          </div>
          <div className="flex flex-col gap-3 min-w-[220px]">
            <Button onClick={() => navigate("/onboarding?role=supportee")}>Terug naar rolkeuze</Button>
            <Button variant="outline" onClick={() => navigate("/home")}>Ga naar Home</Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 lg:px-6 py-10 flex flex-col gap-6 lg:flex-row">
        <aside className="lg:w-72 space-y-3">
          <p className="text-sm font-semibold text-muted-foreground">Journey stappen</p>
          <div className="space-y-2">
            {journeySteps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={cn(
                  "w-full flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all",
                  activeStep === step.id
                    ? "border-primary bg-primary/5 shadow"
                    : "border-border hover:border-primary/50"
                )}
              >
                <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                  {index + 1}
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {step.emoji} {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
              </button>
            ))}
          </div>
        </aside>

        <section className="flex-1 space-y-6">
          {activeStep === "onboarding" && (
            <Card className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Stap 1</p>
                  <h2 className="text-2xl font-bold">Onboarding</h2>
                </div>
                <Badge variant="secondary">3 min</Badge>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <Label>Taalkeuze</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {languages.map((lang) => (
                        <Button
                          key={lang}
                          type="button"
                          variant={language === lang ? "default" : "outline"}
                          onClick={() => setLanguage(lang)}
                        >
                          {lang}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Jouw klas</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {classLevels.map((level) => (
                        <button
                          key={level}
                          onClick={() => setClassLevel(level)}
                          className={cn(
                            "rounded-xl border p-3 text-left",
                            classLevel === level
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          )}
                        >
                          <p className="font-semibold">{level}</p>
                          <p className="text-xs text-muted-foreground">{level === "Taalklas" ? "Nieuwkomer" : ""}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Comfortniveau</Label>
                    <div className="mt-3 space-y-2">
                      <Slider
                        value={comfort}
                        min={1}
                        max={5}
                        step={1}
                        onValueChange={setComfort}
                      />
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-2xl">{comfortLevels[currentComfort - 1]?.emoji}</span>
                        <p className="text-muted-foreground">
                          {comfortLevels[currentComfort - 1]?.label}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Interesses</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {interests.map((interest) => (
                        <button
                          key={interest}
                          onClick={() => toggleInterest(interest)}
                          className={cn(
                            "px-4 py-2 rounded-full border text-sm",
                            selectedInterests.includes(interest)
                              ? "border-primary bg-primary/10"
                              : "border-border"
                          )}
                        >
                          {interest}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Hulpvraag</Label>
                    <Textarea
                      value={helpText}
                      onChange={(e) => setHelpText(e.target.value)}
                      rows={4}
                      maxLength={160}
                      placeholder="Ik wil iemand die me helpt met ..."
                    />
                    <p className="text-xs text-muted-foreground text-right">
                      {helpText.length}/160
                    </p>
                  </div>

                  <div>
                    <Label>3 simpele thema's</Label>
                    <div className="grid gap-3 mt-3">
                      {helpThemes.map((theme) => (
                        <label
                          key={theme.id}
                          className={cn(
                            "flex items-start gap-3 rounded-xl border p-3 cursor-pointer",
                            selectedThemes.includes(theme.id)
                              ? "border-primary bg-primary/5"
                              : "border-border"
                          )}
                        >
                          <Checkbox
                            checked={selectedThemes.includes(theme.id)}
                            onCheckedChange={() => toggleTheme(theme.id)}
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <theme.icon className="h-4 w-4 text-primary" />
                              <p className="font-semibold">{theme.label}</p>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {theme.description}
                            </p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {[{ title: "Je buddy", icon: Users, text: "Leer hoe jullie chat en sessies werken" }, { title: "Jouw groei", icon: Sparkles, text: "Bekijk badges en future skills" }, { title: "Veiligheid", icon: ShieldCheck, text: "Coach kijkt mee en bewaakt privacy" }].map((item) => (
                  <Card key={item.title} className="p-4 bg-muted/50">
                    <div className="flex items-center gap-2 mb-2">
                      <item.icon className="h-4 w-4 text-primary" />
                      <p className="text-sm font-semibold">{item.title}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.text}</p>
                  </Card>
                ))}
              </div>

              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3">
                  <Button variant={tourActive ? "destructive" : "outline"} onClick={() => setTourActive((prev) => !prev)}>
                    <PlayCircle className="h-4 w-4 mr-2" />
                    {tourActive ? "Stop tour" : "Start 30 sec tour"}
                  </Button>
                  {tourActive && (
                    <div className="min-w-[180px]">
                      <Progress value={tourProgress} />
                      <p className="text-xs text-muted-foreground mt-1">{Math.round((tourProgress / 100) * 30)}s</p>
                    </div>
                  )}
                </div>
                <Button onClick={handleSaveOnboarding}>Bewaar onboarding</Button>
              </div>
            </Card>
          )}

          {activeStep === "match" && (
            <Card className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Stap 2</p>
                  <h2 className="text-2xl font-bold">AI Match</h2>
                </div>
                <Badge variant={coachApproved ? "default" : "outline"} className="flex items-center gap-1">
                  <ShieldCheck className="h-4 w-4" />
                  {coachApproved ? "Coach goedgekeurd" : "Coach controle"}
                </Badge>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
                  <div className="flex items-center gap-3">
                    <div className="h-14 w-14 rounded-2xl bg-white flex items-center justify-center text-3xl">😊</div>
                    <div>
                      <p className="text-sm text-muted-foreground">Voorgestelde buddy</p>
                      <h3 className="text-xl font-semibold">Sara Janssen</h3>
                      <p className="text-sm">4 VWO · Nederlands & Engels</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-emerald-600" />
                      <span>Interesse: Muziek, taal</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-emerald-600" />
                      <span>Zelfde klasniveau</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Languages className="h-4 w-4 text-emerald-600" />
                      <span>Spreekt {language}</span>
                    </div>
                  </div>
                </Card>

                <div className="space-y-3 text-sm">
                  <p className="font-semibold">Waarom deze match?</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Hulpvraag: {helpText.slice(0, 60)}...</li>
                    <li>• Beschikbaar op dezelfde tijden</li>
                    <li>• Buddy heeft ervaring met {selectedThemes.map((themeId) => helpThemes.find((theme) => theme.id === themeId)?.label).filter(Boolean).join(", ")}</li>
                  </ul>
                  <p className="text-xs">Coach checkt op achtergrond of deze match veilig en passend is.</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 md:flex-row">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleMatchAction("decline")}
                >
                  Ik wil liever iemand anders
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => handleMatchAction("confirm")}
                >
                  Bevestig buddy
                </Button>
              </div>

              {matchStatus !== "pending" && (
                <Card className="p-4 bg-muted/50">
                  <p className="text-sm font-semibold">Status</p>
                  <p className="text-muted-foreground">
                    {matchStatus === "confirmed"
                      ? "Je buddy is bevestigd! Coach laat jullie snel starten"
                      : "We zoeken een nieuwe buddy voor jou"}
                  </p>
                </Card>
              )}
            </Card>
          )}

          {activeStep === "collaboration" && (
            <Card className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Stap 3</p>
                  <h2 className="text-2xl font-bold">Samenwerken met je buddy</h2>
                </div>
                <Badge variant="secondary">Per sessie</Badge>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Smile className="h-5 w-5 text-primary" />
                    Vooraf check-in
                  </h3>
                  <p className="text-sm text-muted-foreground">Hoe voel je je vandaag?</p>
                  <div className="flex gap-2">
                    {["😊", "🙂", "😐", "😕", "😔"].map((mood) => (
                      <button
                        key={mood}
                        onClick={() => setCheckInMood(mood)}
                        className={cn(
                          "text-3xl rounded-2xl border p-3",
                          checkInMood === mood
                            ? "border-primary bg-primary/10"
                            : "border-border"
                        )}
                      >
                        {mood}
                      </button>
                    ))}
                  </div>
                  <Button variant="outline">Bewaar check-in</Button>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    Reflectie na sessie
                  </h3>
                  <Input
                    placeholder="Wat ging goed?"
                    value={sessionReflection.wentWell}
                    onChange={(e) =>
                      setSessionReflection({ ...sessionReflection, wentWell: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Wat was lastig?"
                    value={sessionReflection.challenge}
                    onChange={(e) =>
                      setSessionReflection({ ...sessionReflection, challenge: e.target.value })
                    }
                  />
                  <Textarea
                    placeholder="Volgende keer ga ik ..."
                    value={sessionReflection.nextStep}
                    onChange={(e) =>
                      setSessionReflection({ ...sessionReflection, nextStep: e.target.value })
                    }
                  />
                  <Button onClick={handleReflectionSave}>Bewaar reflectie</Button>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Automatische Future Skills</p>
                <div className="flex flex-wrap gap-2">
                  {futureSkills.map((skill) => (
                    <Badge
                      key={skill.id}
                      variant={skillHighlights.includes(skill.id) ? "default" : "outline"}
                      className="flex items-center gap-1"
                    >
                      {skill.emoji} {skill.label}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Skills worden automatisch getagd op basis van jouw antwoorden en gedrag.
                </p>
              </div>
            </Card>
          )}

          {activeStep === "portfolio" && (
            <Card className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Stap 4</p>
                  <h2 className="text-2xl font-bold">Portfolio</h2>
                </div>
                <Button variant="outline" onClick={handleDownloadProof}>
                  Download bewijs
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {[{ title: "Taal", value: 72 }, { title: "Welbevinden", value: 64 }, { title: "Vaardigheden", value: 80 }].map((metric) => (
                  <Card key={metric.title} className="p-4">
                    <p className="text-sm text-muted-foreground">{metric.title}</p>
                    <p className="text-3xl font-bold">{metric.value}%</p>
                    <Progress value={metric.value} className="mt-3" />
                  </Card>
                ))}
              </div>

              <div>
                <p className="text-sm font-semibold mb-3">Badges</p>
                <div className="flex flex-wrap gap-3">
                  {[{ title: "Doorzetter", icon: Trophy }, { title: "Goede vraagsteller", icon: Sparkles }, { title: "Veiligheidspartner", icon: ShieldCheck }].map((badge) => (
                    <div key={badge.title} className="flex items-center gap-2 rounded-full border px-4 py-2">
                      <badge.icon className="h-4 w-4 text-primary" />
                      <span className="text-sm font-semibold">{badge.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Card className="p-4 bg-muted/50">
                <p className="text-sm font-semibold">Bewijs voor mentor/ouders</p>
                <p className="text-sm text-muted-foreground">
                  Alle reflecties, badges en sessies worden gebundeld zodat je eenvoudig kunt delen hoe je groeit.
                </p>
              </Card>
            </Card>
          )}

          {activeStep === "library" && (
            <Card className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Stap 5</p>
                  <h2 className="text-2xl font-bold">Bibliotheek</h2>
                </div>
                <Badge variant="secondary">Jouw niveau</Badge>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {microLearnings.map((item) => (
                  <Card key={item.id} className="p-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{item.level}</span>
                      <span>{item.duration}</span>
                    </div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm text-muted-foreground flex-1">{item.description}</p>
                    <Button variant="outline" onClick={() => handleStartLearning(item.title)}>
                      <Video className="h-4 w-4 mr-2" />
                      Start microlearning
                    </Button>
                  </Card>
                ))}
              </div>

              <Card className="p-4 bg-muted/50">
                <p className="text-sm font-semibold">Korte uitlegvideo's</p>
                <p className="text-sm text-muted-foreground">
                  Alle content is in eenvoudige taal, met ondertiteling en vertaalknoppen.
                </p>
              </Card>
            </Card>
          )}

          {activeStep === "community" && (
            <Card className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Stap 6</p>
                  <h2 className="text-2xl font-bold">Community Wall</h2>
                </div>
                <Badge variant="outline">Moderatie aan</Badge>
              </div>

              <div className="space-y-3">
                <Label>Deel een succesmoment</Label>
                <Textarea
                  placeholder="Wat wil je delen?"
                  value={sharedMoment}
                  onChange={(e) => setSharedMoment(e.target.value)}
                />
                <Button onClick={handleShareMoment}>Inzenden</Button>
                {pendingMoment && (
                  <Card className="p-4 bg-muted/50">
                    <p className="text-sm font-semibold">In moderatie</p>
                    <p className="text-sm text-muted-foreground">
                      "{pendingMoment}" wordt eerst gecheckt door een moderator. Daarna verschijnt het op de wall.
                    </p>
                  </Card>
                )}
              </div>

              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Likes kan je geven, reacties staan uit (AVG).</p>
                {posts.map((post) => (
                  <Card key={post.id} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-semibold">{post.name}</p>
                        <p className="text-xs text-muted-foreground">{post.cohort}</p>
                      </div>
                      <Badge variant="secondary">Gepubliceerd</Badge>
                    </div>
                    <p className="text-sm mb-4">{post.text}</p>
                    <Button variant="ghost" size="sm" onClick={() => handleLike(post.id)}>
                      ❤️ {post.likes}
                    </Button>
                  </Card>
                ))}
              </div>
            </Card>
          )}

          <div className="flex justify-end">
            <Button onClick={goToNextStep} disabled={activeStep === journeySteps[journeySteps.length - 1].id}>
              Volgende stap
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SupporteeJourney;
