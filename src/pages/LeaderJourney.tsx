import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  BookOpenCheck,
  Compass,
  MessageSquare,
  NotebookPen,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
  Award,
  Library,
  Flag,
  Target,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const capabilityBlocks = [
  {
    title: "Onboarding",
    description: "Level check en moderatie instructies",
    icon: Compass,
    accent: "from-[#f4ecff] to-[#e4d5ff] text-[#7c5cff]",
  },
  {
    title: "Groepen & Challenges",
    description: "Buddy-cirkels maken en challenges hosten",
    icon: Target,
    accent: "from-[#e7f2ff] to-[#d1e8ff] text-[#2563eb]",
  },
  {
    title: "Community Moderatie",
    description: "Posts highlighten en signalen doorzetten",
    icon: Flag,
    accent: "from-[#e8f9f0] to-[#d2f5e0] text-[#16a34a]",
  },
] as const;

const journeySteps = [
  {
    id: "onboarding",
    order: 1,
    title: "Onboarding",
    description:
      "Beschikbaar na Leader-level. Extra uitleg over verantwoordelijkheid en moderatie. Je leert hoe je groepen faciliteert en community modereert.",
    icon: Compass,
    highlights: ["Level check", "Moderatie instructies"],
    touchpoints: ["Level check", "Moderatie instructies"],
    data: ["rol upgrade", "moderatie rechten"],
    outcomes: ["Peer Leader status actief", "Coach accordeert"],
    stats: [
      { label: "Vereiste level", value: "Leader" },
      { label: "Training", value: "20 min" },
    ],
    ctas: [
      { label: "Start training", route: "/leader/onboarding" },
      { label: "Terug naar rollen", route: "/onboarding", variant: "outline" },
    ],
  },
  {
    id: "groups",
    order: 2,
    title: "Groepen & challenges",
    description:
      "Peer Leader maakt buddy-cirkels en challenges zoals check-ins over welbevinden. Je faciliteert groepssessies en moedigt deelname aan.",
    icon: Target,
    highlights: ["Challenge builder", "Groepschat"],
    touchpoints: ["Challenge builder", "Groepschat"],
    data: ["challenge_id", "groep", "deadline"],
    outcomes: ["Groepsactivatie", "Coach zicht op progressie"],
    stats: [
      { label: "Actieve groepen", value: "3" },
      { label: "Challenges", value: "5 actief" },
    ],
    ctas: [
      { label: "Maak challenge", route: "/sessions" },
      { label: "Beheer groepen", route: "/sessions", variant: "outline" },
    ],
  },
  {
    id: "debrief",
    order: 3,
    title: "Sessie & debrief",
    description:
      "Host groepsreflecties en logt korte debrief. Data voedt dashboard en badges. Je gebruikt rubrics om groei te volgen.",
    icon: NotebookPen,
    highlights: ["Debrief formulier", "Highlights delen"],
    touchpoints: ["Debrief formulier", "Highlights delen"],
    data: ["debrief", "rubric_tags"],
    outcomes: ["Trenddata", "Triggers voor groei badges"],
    stats: [
      { label: "Groepssessies", value: "12" },
      { label: "Debriefs", value: "10" },
    ],
    ctas: [
      { label: "Log sessie", route: "/sessions" },
      { label: "Bekijk trends", route: "/portfolio", variant: "outline" },
    ],
  },
  {
    id: "toolkit",
    order: 4,
    title: "Toolkit",
    description:
      "Extra facilitation toolkit en energizers voor groepen. Filter op groepsgrootte, categorie en duur voor perfecte activiteiten.",
    icon: Library,
    highlights: ["Filters voor groepsgrootte", "Favorieten"],
    touchpoints: ["Filters voor groepsgrootte", "Favorieten"],
    data: ["gebruik", "categorie"],
    outcomes: ["Sterkere sessies", "Trainer ziet behoeften"],
    stats: [
      { label: "Werkvormen", value: "60+" },
      { label: "Favorieten", value: "12" },
    ],
    ctas: [
      { label: "Verken toolkit", route: "/library" },
      { label: "Mijn favorieten", route: "/library", variant: "outline" },
    ],
  },
  {
    id: "community",
    order: 5,
    title: "Community",
    description:
      "Kan posts uitlichten, themaweken starten en signalen doorzetten naar coaches. Je creeërt een veilige en inspirerende community.",
    icon: MessageSquare,
    highlights: ["Highlight-knop", "Flagging"],
    touchpoints: ["Highlight-knop", "Flagging"],
    data: ["featured_post", "flags"],
    outcomes: ["Gezonde cultuur", "Snelle signalering"],
    stats: [
      { label: "Gehighlight", value: "18 posts" },
      { label: "Themaweken", value: "2 actief" },
    ],
    ctas: [
      { label: "Community moderatie", route: "/community" },
      { label: "Themaweken", route: "/community", variant: "outline" },
    ],
  },
  {
    id: "gamification",
    order: 6,
    title: "Gamification",
    description:
      "Focus op badges Leiderschap & Community zoals 🌱 Groei-Coach. Levels: Leader → Expert → Alumni Mentor.",
    icon: Award,
    highlights: ["Badge mission board", "Feedback counter"],
    touchpoints: ["Badge mission board", "Feedback counter"],
    data: ["peer_feedback", "community bijdragen"],
    outcomes: ["Erkenning", "Instroom naar Trainer/Coach"],
    stats: [
      { label: "Badges", value: "8/15" },
      { label: "Level", value: "Expert" },
    ],
    ctas: [
      { label: "Badge missies", route: "/portfolio" },
      { label: "Trainer route", route: "/portfolio", variant: "outline" },
    ],
  },
] as const;

const featureHighlights = [
  {
    title: "Leader Journey",
    description: "Van buddy naar groepsleider met extra verantwoordelijkheden.",
    icon: Workflow,
  },
  {
    title: "Community Moderatie",
    description: "Help een veilige en inspirerende community te bouwen.",
    icon: ShieldCheck,
  },
  {
    title: "Groepsfacilitatie",
    description: "Host buddy-circles en challenges voor meerdere deelnemers.",
    icon: Users,
  },
  {
    title: "Toolkit & Energizers",
    description: "Extra werkvormen en tools voor groepssessies.",
    icon: Library,
  },
  {
    title: "Leiderschap Badges",
    description: "Verdien speciale badges voor community impact.",
    icon: Award,
  },
  {
    title: "Groei Tracking",
    description: "Volg groepsdynamiek en individuele ontwikkeling.",
    icon: BookOpenCheck,
  },
] as const;

const gamificationDetails = {
  levels: ["Leader", "Expert", "Alumni Mentor"],
  badges: ["🌱 Groei-Coach", "💬 Community Host"],
  triggers: ["Peer feedback", "Challenge afrondingen"],
  progression: [
    { level: "Leader", requirement: "10 sessies + 5 peer-feedbacks", icon: "🏆" },
    { level: "Expert", requirement: "20+ sessies + community moderatie", icon: "⭐" },
    { level: "Alumni Mentor", requirement: "Expert + trainer/coach traject", icon: "🌟" },
  ],
};

export default function LeaderJourney() {
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
            <Target className="h-3 w-3" />
            Peer Leader
          </Badge>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Target className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-primary">Peer Leader</span>
            <Badge variant="secondary" className="text-xs">Learner+</Badge>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Buddies begeleiden, groepen uitdagen en community aanjagen
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ervaren buddies hosten challenges, debriefs en community-acties met zicht op rubrics en badges.
          </p>

          <div className="flex flex-wrap gap-3 justify-center pt-4">
            <Button onClick={() => navigate("/leader/onboarding")} size="lg" className="gap-2">
              <Sparkles className="h-4 w-4" />
              Start als Peer Leader
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate("/library")}>
              Verken Toolkit
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
            <h2 className="text-3xl font-bold text-foreground">Peer Leader Journey Stappen</h2>
            <p className="text-muted-foreground">Van onboarding tot community moderatie</p>
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
                    <Badge key={badge} variant="secondary" className="mr-2 text-base">{badge}</Badge>
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
          <h2 className="text-2xl font-bold text-foreground">Klaar voor leiderschap?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Neem de volgende stap in je peer support journey en word een Peer Leader.
          </p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => navigate("/leader/onboarding")} size="lg" className="gap-2">
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
