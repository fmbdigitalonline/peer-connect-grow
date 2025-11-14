import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  BookOpenCheck,
  Compass,
  HelpCircle,
  MessageSquare,
  MessageSquareHeart,
  NotebookPen,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
  Award,
  Library,
} from "lucide-react";
import { cn } from "@/lib/utils";

const capabilityBlocks = [
  {
    title: "Onboarding",
    description: "Mini-training over grenzen en veiligheid",
    icon: Compass,
    accent: "from-[#f4ecff] to-[#e4d5ff] text-[#7c5cff]",
  },
  {
    title: "Buddy Flow",
    description: "Matches accepteren en sessies plannen",
    icon: Users,
    accent: "from-[#e7f2ff] to-[#d1e8ff] text-[#2563eb]",
  },
  {
    title: "Portfolio",
    description: "Skills, feedback en AI-samenvatting",
    icon: BookOpenCheck,
    accent: "from-[#e8f9f0] to-[#d2f5e0] text-[#16a34a]",
  },
] as const;

const journeySteps = [
  {
    id: "onboarding",
    order: 1,
    title: "Onboarding",
    description:
      "Rolkeuze Buddy met mini-training over grenzen en veiligheid. Je leert wat het betekent om een buddy te zijn en vult je beschikbaarheid in.",
    icon: Compass,
    highlights: ["Microlearning: wat is een buddy", "Beschikbaarheid invullen"],
    touchpoints: ["Microlearning: wat is een buddy", "Beschikbaarheid invullen"],
    data: ["talen", "vakken", "beschikbaarheid"],
    outcomes: ["Buddy kan gematcht worden", "Coach weet expertise"],
    stats: [
      { label: "Training", value: "5 min" },
      { label: "Vakgebieden", value: "3-5" },
    ],
    ctas: [
      { label: "Start training", route: "/buddy/onboarding" },
      { label: "Rolkeuze", route: "/onboarding", variant: "outline" },
    ],
  },
  {
    id: "match",
    order: 2,
    title: "Matchvoorstellen",
    description:
      "AI doet max. 3 voorstellen op basis van hulpvragen. Buddy accepteert, plant of weigert. Je ziet duidelijke redenen per match.",
    icon: Users,
    highlights: ["Reden per match", "Reacties: accepteer/nieuwe tijd"],
    touchpoints: ["Reden per match", "Reacties: accepteer/nieuwe tijd"],
    data: ["match_id", "status", "reden"],
    outcomes: ["Transparante planning", "Coach ziet capaciteit"],
    stats: [
      { label: "Open matches", value: "2" },
      { label: "Geaccepteerd", value: "5" },
    ],
    ctas: [
      { label: "Bekijk matches", route: "/matches" },
      { label: "Mijn agenda", route: "/sessions", variant: "outline" },
    ],
  },
  {
    id: "sessions",
    order: 3,
    title: "Sessie plannen & uitvoeren",
    description:
      "Buddy plant sessies via agenda-koppeling en vult doelen/reflecties in gekoppeld aan Future Skills. Gebruik checklists en rubrics voor structuur.",
    icon: CalendarClock,
    highlights: ["Checklists voor sessie", "Rubric tagging"],
    touchpoints: ["Checklists voor sessie", "Rubric tagging"],
    data: ["sessie_id", "rubric_scores", "reflecties"],
    outcomes: ["Future Skill tracking", "Coach feedback"],
    stats: [
      { label: "Sessies", value: "8" },
      { label: "Deze week", value: "2 gepland" },
    ],
    ctas: [
      { label: "Plan sessie", route: "/sessions" },
      { label: "Bibliotheek", route: "/library", variant: "outline" },
    ],
  },
  {
    id: "portfolio",
    order: 4,
    title: "Portfolio-opbouw",
    description:
      "Overzicht met aantal sessies, skills, feedback en AI-samenvatting voor mentorgesprek of CV. Exporteer naar PDF voor beoordelingen.",
    icon: BookOpenCheck,
    highlights: ["Export naar PDF", "AI-samenvatting"],
    touchpoints: ["Export naar PDF", "AI-samenvatting"],
    data: ["feedback", "skills", "sessies"],
    outcomes: ["Bewijs voor beoordelingen", "Mentor-overzicht"],
    stats: [
      { label: "Reflecties", value: "12" },
      { label: "Skills", value: "7" },
    ],
    ctas: [
      { label: "Open portfolio", route: "/portfolio" },
      { label: "Feedback bekijken", route: "/sessions", variant: "outline" },
    ],
  },
  {
    id: "library",
    order: 5,
    title: "Bibliotheek & microlearning",
    description:
      "Werkvormen, scripts en AI-zoekfunctie (\"geef me een energizer van 10 minuten\"). Bouw je favorieten collectie voor betere sessies.",
    icon: Library,
    highlights: ["Zoekprompt", "Favorieten"],
    touchpoints: ["Zoekprompt", "Favorieten"],
    data: ["gebruik", "thema", "duur"],
    outcomes: ["Voorbereide sessies", "Trainer ziet impact"],
    stats: [
      { label: "Items", value: "45+" },
      { label: "Favorieten", value: "8" },
    ],
    ctas: [
      { label: "Verken bibliotheek", route: "/library" },
      { label: "Mijn favorieten", route: "/library", variant: "outline" },
    ],
  },
  {
    id: "community",
    order: 6,
    title: "Community Wall",
    description:
      "Buddy deelt succesmomenten. Peer Leaders en coaches modereren. Krijg feedback en inspiratie van anderen.",
    icon: MessageSquare,
    highlights: ["Post maken", "Feedback vragen"],
    touchpoints: ["Post maken", "Feedback vragen"],
    data: ["posts", "likes", "flags"],
    outcomes: ["Community gevoel", "Badge triggers"],
    stats: [
      { label: "Posts", value: "23" },
      { label: "Jouw posts", value: "4" },
    ],
    ctas: [
      { label: "Community", route: "/community" },
      { label: "Deel succes", route: "/community", variant: "outline" },
    ],
  },
  {
    id: "gamification",
    order: 7,
    title: "Levels & badges",
    description:
      "Levels: Starter → Practitioner → Leader → Expert/Alumni. Verdien badges als Verbinder, Coach in Spe, en Empathie door actief te zijn.",
    icon: Award,
    highlights: ["Level tracker", "Checklist voor Leader"],
    touchpoints: ["Level tracker", "Checklist voor Leader"],
    data: ["level", "badge_id", "peer_feedback"],
    outcomes: ["Motivatie", "Selectie voor Peer Leader"],
    stats: [
      { label: "Level", value: "Practitioner" },
      { label: "Badges", value: "5/12" },
    ],
    ctas: [
      { label: "Bekijk badges", route: "/portfolio" },
      { label: "Level progressie", route: "/portfolio", variant: "outline" },
    ],
  },
] as const;

const featureHighlights = [
  {
    title: "Buddy Journey",
    description: "Training, matches en sessietools voor effectieve begeleiding.",
    icon: Workflow,
  },
  {
    title: "Peer Support",
    description: "Help anderen groeien en bouw zelf waardevolle vaardigheden op.",
    icon: MessageSquareHeart,
  },
  {
    title: "Veilige omgeving",
    description: "Duidelijke grenzen en coachsupport tijdens je buddy-traject.",
    icon: ShieldCheck,
  },
  {
    title: "Portfolio & badges",
    description: "Bewijs je ontwikkeling met reflecties, feedback en certificaten.",
    icon: BookOpenCheck,
  },
  {
    title: "Bibliotheek",
    description: "Werkvormen, scripts en tools voor betere sessies.",
    icon: Library,
  },
  {
    title: "Community",
    description: "Deel successen en leer van andere buddies.",
    icon: Users,
  },
] as const;

const gamificationDetails = {
  levels: ["Starter", "Practitioner", "Leader", "Expert", "Alumni"],
  badges: ["Verbinder", "Coach in Spe", "Empathie"],
  triggers: ["Aantal sessies", "Reflecties", "Peer feedback"],
  progression: [
    { level: "Starter", requirement: "training afronden + 3 sessies", icon: "🌱" },
    { level: "Practitioner", requirement: "5 sessies + 3 reflecties", icon: "🎯" },
    { level: "Leader", requirement: "10 sessies + 5 peer-feedbacks", icon: "🏆" },
  ],
};

export default function BuddyJourney() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const toggleStep = (order: number) => {
    setActiveStep(activeStep === order ? null : order);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <div className="bg-card border-b border-border shadow-sm sticky top-0 z-10 backdrop-blur-sm bg-card/95">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/onboarding")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Terug naar rollen
          </Button>
          <Badge variant="secondary" className="gap-2">
            <Users className="h-3 w-3" />
            Buddy / Tutor
          </Badge>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Users className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-primary">Buddy / Tutor</span>
            <Badge variant="secondary" className="text-xs">Leerling</Badge>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Leerlingen begeleiden én hun eigen Future Skills en portfolio bouwen
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Buddy's krijgen AI-matchsuggesties, plannen sessies en bouwen een portfolio vol feedback en reflecties.
          </p>

          <div className="flex flex-wrap gap-3 justify-center pt-4">
            <Button onClick={() => navigate("/buddy/onboarding")} size="lg" className="gap-2">
              <Sparkles className="h-4 w-4" />
              Start als Buddy
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate("/library")}>
              Verken Bibliotheek
            </Button>
          </div>
        </div>

        {/* Capability Blocks */}
        <div className="grid md:grid-cols-3 gap-6">
          {capabilityBlocks.map((block) => (
            <Card key={block.title} className="p-6 space-y-3 hover:shadow-lg transition-shadow">
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br", block.accent)}>
                <block.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{block.title}</h3>
              <p className="text-sm text-muted-foreground">{block.description}</p>
            </Card>
          ))}
        </div>

        {/* Journey Steps */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-foreground">Buddy Journey Stappen</h2>
            <p className="text-muted-foreground">Van onboarding tot portfolio-opbouw</p>
          </div>

          <div className="space-y-4">
            {journeySteps.map((step) => (
              <Card
                key={step.id}
                className={cn(
                  "overflow-hidden transition-all cursor-pointer hover:shadow-md",
                  activeStep === step.order && "ring-2 ring-primary"
                )}
                onClick={() => toggleStep(step.order)}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold border-2 border-primary/20">
                        {step.order}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <step.icon className="h-5 w-5 text-primary flex-shrink-0" />
                        <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                      </div>
                      <p className="text-muted-foreground mb-4">{step.description}</p>

                      {activeStep === step.order && (
                        <div className="space-y-6 mt-6 pt-6 border-t border-border animate-in fade-in-50 duration-300">
                          {/* Touchpoints, Data, Outcomes */}
                          <div className="grid md:grid-cols-3 gap-6">
                            <div>
                              <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">Touchpoints</h4>
                              <ul className="space-y-2">
                                {step.touchpoints.map((tp, i) => (
                                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>{tp}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">Data</h4>
                              <ul className="space-y-2">
                                {step.data.map((d, i) => (
                                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                    <NotebookPen className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                                    <span>{d}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">Outcomes</h4>
                              <ul className="space-y-2">
                                {step.outcomes.map((o, i) => (
                                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                    <Sparkles className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>{o}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Stats */}
                          <div className="flex gap-6 pt-4">
                            {step.stats.map((stat) => (
                              <div key={stat.label} className="flex items-center gap-2">
                                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                                <div className="text-xs text-muted-foreground uppercase">{stat.label}</div>
                              </div>
                            ))}
                          </div>

                          {/* CTAs */}
                          <div className="flex gap-3 pt-2">
                            {step.ctas.map((cta) => (
                              <Button
                                key={cta.label}
                                variant={cta.variant as any || "default"}
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(cta.route);
                                }}
                                className="gap-2"
                              >
                                {cta.label}
                                <ArrowRight className="h-3 w-3" />
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Gamification Section */}
        <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Gamification Triggers</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="text-2xl">🎖️</span>
                  Levels
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {gamificationDetails.levels.join(" → ")}
                </p>
                <div className="space-y-2">
                  {gamificationDetails.progression.map((prog) => (
                    <div key={prog.level} className="flex items-start gap-2 text-sm">
                      <span className="text-xl">{prog.icon}</span>
                      <div>
                        <span className="font-medium text-foreground">{prog.level}</span>
                        <span className="text-muted-foreground"> – {prog.requirement}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="text-2xl">🏅</span>
                  Badges
                </h3>
                <div className="space-y-2 mb-4">
                  {gamificationDetails.badges.map((badge) => (
                    <Badge key={badge} variant="secondary" className="mr-2">{badge}</Badge>
                  ))}
                </div>
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="text-2xl">⚡</span>
                  Triggers
                </h3>
                <p className="text-sm text-muted-foreground">
                  {gamificationDetails.triggers.join(", ")}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Feature Highlights */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center text-foreground">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureHighlights.map((feature) => (
              <Card key={feature.title} className="p-6 space-y-3 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="p-8 text-center space-y-6 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20">
          <h2 className="text-2xl font-bold text-foreground">Klaar om te beginnen?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Start je buddy journey en help anderen terwijl je zelf groeit in vaardigheden die tellen.
          </p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => navigate("/buddy/onboarding")} size="lg" className="gap-2">
              <Sparkles className="h-4 w-4" />
              Start Onboarding
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate("/onboarding")}>
              Kies andere rol
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
