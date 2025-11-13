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
} from "lucide-react";
import { cn } from "@/lib/utils";

const capabilityBlocks = [
  {
    title: "Onboarding",
    description: "Persoonlijke check-in & doelen",
    icon: Compass,
    accent: "from-[#f4ecff] to-[#e4d5ff] text-[#7c5cff]",
  },
  {
    title: "Buddy Flow",
    description: "Matches, sessies en feedback",
    icon: Users,
    accent: "from-[#e7f2ff] to-[#d1e8ff] text-[#2563eb]",
  },
  {
    title: "Portfolio",
    description: "Reflecties, bewijslast en groei",
    icon: BookOpenCheck,
    accent: "from-[#e8f9f0] to-[#d2f5e0] text-[#16a34a]",
  },
] as const;

const journeySteps = [
  {
    id: "intake",
    order: 1,
    title: "Intake & taalcheck",
    description:
      "We starten met een korte intake om taalniveau, comfort en doelen scherp te krijgen. De omgeving wordt direct in jouw taal klaargezet.",
    icon: Compass,
    highlights: ["Niveau-check", "Persoonlijke doelen"],
    stats: [
      { label: "Instap", value: "3 min" },
      { label: "Voorkeurstaal", value: "NL/ENG" },
    ],
    ctas: [
      { label: "Herstart intake", route: "/onboarding?role=supportee" },
      { label: "Rolkeuze", route: "/onboarding", variant: "outline" },
    ],
  },
  {
    id: "help-request",
    order: 2,
    title: "Hulpvraag indienen",
    description:
      "Beschrijf je situatie, gevoelens en gewenste uitkomst. Je kunt audio, tekst of emoji gebruiken om het laagdrempelig te houden.",
    icon: HelpCircle,
    highlights: ["AI-hulp", "Coach feedback"],
    stats: [
      { label: "Concepten", value: "2" },
      { label: "Laatste update", value: "12:14" },
    ],
    ctas: [
      { label: "Open hulpvraag", route: "/help-request" },
      { label: "Community check", route: "/community", variant: "outline" },
    ],
  },
  {
    id: "match",
    order: 3,
    title: "Buddy match & sessies",
    description:
      "De AI doet een voorstel, een coach checkt mee en jij plant direct de eerste sessies. Alles wordt automatisch in je agenda gezet.",
    icon: Users,
    highlights: ["AI-match", "Coach review"],
    stats: [
      { label: "Matches", value: "+2" },
      { label: "Sessies", value: "3 gepland" },
    ],
    ctas: [
      { label: "Bekijk matches", route: "/matches" },
      { label: "Plan sessies", route: "/sessions", variant: "outline" },
    ],
  },
  {
    id: "portfolio",
    order: 4,
    title: "Reflecties & portfolio",
    description:
      "Na iedere sessie voeg je bewijslast en reflecties toe. Je ziet groei en acties terug in één overzicht dat je kunt delen met coach of school.",
    icon: BookOpenCheck,
    highlights: ["Bewijslast", "Reflecties"],
    stats: [
      { label: "Items", value: "12" },
      { label: "Laatste reflectie", value: "gisteren" },
    ],
    ctas: [
      { label: "Open portfolio", route: "/portfolio" },
      { label: "Naar sessies", route: "/sessions", variant: "outline" },
    ],
  },
] as const;

const featureHighlights = [
  {
    title: "Supportee Journey",
    description: "Stap-voor-stap onboarding en reflecties afgestemd op taalniveau.",
    icon: Workflow,
  },
  {
    title: "Buddy Pair",
    description: "AI-voorstellen, coachcontrole en duidelijke gezamenlijke doelen.",
    icon: MessageSquareHeart,
  },
  {
    title: "Veilige communicatie",
    description: "Gemonitorde check-ins en chats binnen een gesloten omgeving.",
    icon: ShieldCheck,
  },
] as const;

const featureDemos = [
  {
    title: "Hulpvraagformulier",
    description: "Toont live hoe emoji, audio en tekst elkaar versterken voor duidelijke hulpvragen.",
    icon: HelpCircle,
    route: "/help-request",
    status: "Laatste concept 12:14",
  },
  {
    title: "Buddy matching",
    description: "Gebruik de AI-matrix en coach review om geschikte buddies te selecteren.",
    icon: Users,
    route: "/matches",
    status: "2 nieuwe voorstellen",
  },
  {
    title: "Sessies plannen",
    description: "Plan check-ins, volg acties en bekijk notities rechtstreeks vanuit de flow.",
    icon: CalendarClock,
    route: "/sessions",
    status: "3 sessies deze week",
  },
  {
    title: "Portfolio & reflecties",
    description: "Bewaar audio, tekst en bewijsstukken zodat coaches groei zien.",
    icon: NotebookPen,
    route: "/portfolio",
    status: "12 items gepubliceerd",
  },
] as const;

const buddyTouchpoints = [
  {
    label: "Laatste check-in",
    value: "Vandaag 09:20",
    icon: MessageSquare,
  },
  {
    label: "Coach review",
    value: "Goedgekeurd",
    icon: CheckCircle2,
  },
  {
    label: "Community inspiratie",
    value: "3 nieuwe reacties",
    icon: MessageSquareHeart,
  },
] as const;

const focusPoints = [
  "Eenvoudige onboarding in de eigen taal",
  "Begeleide buddy-momenten met duidelijke doelen",
  "Reflecties en portfolio-opbouw in één overzicht",
];

const userFlows = [
  "Onboarding: check-ins en stel jouw hulpvraag scherp",
  "Ontvang buddy-matches en plan begeleide sessies",
  "Reflecteer en voeg sessies toe aan je portfolio",
];

const SupporteeJourney = () => {
  const navigate = useNavigate();
  const [activeStepId, setActiveStepId] = useState(journeySteps[0].id);

  const activeStep = useMemo(
    () => journeySteps.find((step) => step.id === activeStepId) ?? journeySteps[0],
    [activeStepId],
  );
  const renderedFocus = useMemo(
    () =>
      focusPoints.map((point) => (
        <li key={point} className="flex items-start gap-2 text-sm text-muted-foreground">
          <Sparkles className="h-4 w-4 text-primary mt-0.5" />
          <span>{point}</span>
        </li>
      )),
    [],
  );

  return (
    <div className="min-h-screen bg-[#f4f1fb] px-4 py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Button variant="ghost" className="gap-2 text-muted-foreground" onClick={() => navigate("/onboarding")}>
            <ArrowLeft className="h-4 w-4" /> Terug naar rolkeuze
          </Button>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={() => navigate("/home")}>Bekijk in home</Button>
            <Button className="gap-2" onClick={() => navigate("/onboarding?role=supportee")}>
              Activeer omgeving
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <Card className="border-0 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Supportee Journey</p>
            <h1 className="mt-2 text-4xl font-bold text-foreground">Supportee (Learner) omgeving</h1>
            <p className="mt-3 text-base text-muted-foreground">
              Je persoonlijke omgeving richt zich volledig op begeleiding en groei. Alle flows zijn afgestemd op het ontvangen
              van support, reflecteren op doelen en het bouwen aan vertrouwen met buddies.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="outline">Leerling-first</Badge>
              <Badge variant="outline">1:1 Buddy</Badge>
              <Badge variant="outline">Veiligheid</Badge>
            </div>

            <div className="mt-8 space-y-4">
              {capabilityBlocks.map((capability) => (
                <div key={capability.title} className="flex items-center gap-4 rounded-2xl border border-border/60 p-4">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${capability.accent}`}
                  >
                    <capability.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-foreground">{capability.title}</p>
                    <p className="text-sm text-muted-foreground">{capability.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold text-muted-foreground">Klik door de journey</p>
                <Badge variant="secondary">Live demo</Badge>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {journeySteps.map((step) => (
                  <button
                    key={step.id}
                    type="button"
                    className={cn(
                      "rounded-2xl border p-5 text-left transition-all",
                      step.id === activeStepId
                        ? "border-primary bg-primary/5 shadow-lg"
                        : "border-border/60 hover:border-primary/60",
                    )}
                    onClick={() => setActiveStepId(step.id)}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                          <step.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            Stap {step.order}
                          </p>
                          <p className="text-base font-semibold text-foreground">{step.title}</p>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">{step.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {step.highlights.map((highlight) => (
                        <Badge key={highlight} variant="outline">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </button>
                ))}
              </div>

              <Card className="border border-primary/40 bg-white/90 p-5 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                    <activeStep.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">Actieve stap</p>
                    <p className="text-xl font-bold text-foreground">{activeStep.title}</p>
                    <p className="text-sm text-muted-foreground">{activeStep.description}</p>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {activeStep.stats.map((stat) => (
                    <div key={stat.label} className="rounded-2xl border border-dashed border-primary/40 p-3">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">{stat.label}</p>
                      <p className="text-lg font-semibold text-foreground">{stat.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  {activeStep.ctas.map((cta) => (
                    <Button
                      key={cta.label}
                      variant={cta.variant ?? "default"}
                      onClick={() => navigate(cta.route)}
                    >
                      {cta.label}
                    </Button>
                  ))}
                </div>
              </Card>
            </div>

            <div className="mt-8">
              <p className="text-sm font-semibold text-muted-foreground">Waar focust dit op?</p>
              <ul className="mt-3 space-y-2">{renderedFocus}</ul>
            </div>
          </Card>

          <div className="space-y-6">
            <Card className="border-0 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-foreground">Belangrijkste features</h2>
              <div className="mt-4 space-y-4">
                {featureHighlights.map((feature) => (
                  <div key={feature.title} className="flex gap-4 rounded-2xl border border-border/70 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{feature.title}</p>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="border-0 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-foreground">User flows</h2>
              <ol className="mt-4 space-y-3 text-sm text-foreground">
                {userFlows.map((flow, index) => (
                  <li key={flow} className="flex gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                      {index + 1}
                    </div>
                    <span className="leading-relaxed">{flow}</span>
                  </li>
                ))}
              </ol>
            </Card>

            <Card className="border-0 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Demo de features</h2>
                  <p className="text-sm text-muted-foreground">
                    Klik door om de echte schermen te openen. Ideaal voor demo's of live walkthroughs.
                  </p>
                </div>
                <Badge variant="secondary">Interactief</Badge>
              </div>

              <div className="mt-4 space-y-4">
                {featureDemos.map((feature) => (
                  <button
                    key={feature.title}
                    type="button"
                    onClick={() => navigate(feature.route)}
                    className="w-full rounded-2xl border border-border/60 p-4 text-left transition hover:border-primary/60"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <feature.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{feature.title}</p>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-medium text-muted-foreground">{feature.status}</p>
                        <span className="inline-flex items-center text-sm text-primary">Openen</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            <Card className="border-0 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-foreground">Live touchpoints</h2>
              <div className="mt-4 space-y-3">
                {buddyTouchpoints.map((touchpoint) => (
                  <div key={touchpoint.label} className="flex items-center gap-4 rounded-2xl border border-border/70 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-muted">
                      <touchpoint.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">{touchpoint.label}</p>
                      <p className="text-sm text-muted-foreground">{touchpoint.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupporteeJourney;
