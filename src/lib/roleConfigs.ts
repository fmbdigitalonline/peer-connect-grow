import type { LucideIcon } from "lucide-react";
import {
  UserCircle2,
  Sparkles,
  GraduationCap,
  Users,
  ShieldCheck,
  LayoutDashboard,
  School,
  ChartPie,
  SlidersHorizontal,
  BookOpenCheck,
  Workflow,
  Target,
  MessagesSquare,
} from "lucide-react";

export type RoleId =
  | "supportee"
  | "buddy"
  | "peerLeader"
  | "coach"
  | "coordinator"
  | "trainer"
  | "admin";

export interface RoleFeature {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface RoleHighlight {
  title: string;
  description: string;
}

export interface RoleConfig {
  id: RoleId;
  title: string;
  subtitle: string;
  description: string;
  focus: string[];
  badge: string;
  icon: LucideIcon;
  environmentDescription: string;
  highlights: RoleHighlight[];
  features: RoleFeature[];
  flows: string[];
}

export const roleConfigs: Record<RoleId, RoleConfig> = {
  supportee: {
    id: "supportee",
    title: "Supportee (Learner)",
    subtitle: "Supportee Journey",
    description: "Vraag hulp, oefen vaardigheden en volg je groei in een veilige omgeving.",
    focus: ["Buddy matches", "Veilige buddy chats", "Leren & reflecteren"],
    badge: "bg-gradient-to-br from-emerald-400 to-teal-500",
    icon: UserCircle2,
    environmentDescription:
      "Je persoonlijke omgeving richt zich volledig op begeleiding en groei. Alle flows zijn afgestemd op het ontvangen van support, reflecteren op doelen en het bouwen aan vertrouwen met buddies.",
    highlights: [
      { title: "Onboarding", description: "Persoonlijke check-in & doelen" },
      { title: "Buddy flow", description: "Matches, sessies en feedback" },
    ],
    features: [
      {
        title: "Supportee Journey",
        description: "Stap-voor-stap begeleiding met opdrachten en reflecties.",
        icon: Target,
      },
      {
        title: "Buddy Pair",
        description: "Automatische matching met tutors op basis van doelen.",
        icon: Users,
      },
      {
        title: "Veilige communicatie",
        description: "Gecontroleerde berichten en check-ins met begeleiders.",
        icon: MessagesSquare,
      },
    ],
    flows: [
      "Start met intake en stel jouw hulpvraag scherp",
      "Ontvang buddy-matches en plan begeleide sessies",
      "Reflecteer op iedere sessie en bouw aan je portfolio",
    ],
  },
  buddy: {
    id: "buddy",
    title: "Buddy / Tutor",
    subtitle: "Buddy Hub",
    description: "Ondersteun Supportees met gestructureerde tools, sessies en feedback.",
    focus: ["Nieuwe matches", "Sessies & logs", "Feedback seeds"],
    badge: "bg-gradient-to-br from-orange-400 to-rose-500",
    icon: Users,
    environmentDescription:
      "De Buddy Hub geeft je eigen tools om matches te beheren, sessies voor te bereiden en impact te tonen. Geen afleiding van supportee-specifieke schermen: alles draait om begeleiden.",
    highlights: [
      { title: "Match center", description: "Volledige regie op buddy's" },
      { title: "Impact", description: "Feedback & badges" },
    ],
    features: [
      {
        title: "Buddy Hub",
        description: "Overzicht van alle matches, afspraken en status.",
        icon: LayoutDashboard,
      },
      {
        title: "Sessies",
        description: "Voorbereide formats voor training, coaching en reflectie.",
        icon: BookOpenCheck,
      },
      {
        title: "Seeds & feedback",
        description: "Snelle feedbackmomenten om progressie vast te leggen.",
        icon: Sparkles,
      },
    ],
    flows: [
      "Activeer buddy-profiel en beschikbaarheid",
      "Accepteer matches en plan begeleiding",
      "Log sessies, deel feedback en rapporteer impact",
    ],
  },
  peerLeader: {
    id: "peerLeader",
    title: "Peer Leader",
    subtitle: "Peer Circle",
    description: "Faciliteer groepssessies, community-uitwisselingen en leertrajecten.",
    focus: ["Groepsoverzichten", "Community", "Reflectie"],
    badge: "bg-gradient-to-br from-fuchsia-500 to-purple-500",
    icon: Sparkles,
    environmentDescription:
      "De Peer Circle omgeving is ontworpen voor het leiden van peers. Je ontwerpt sessies, volgt groepsdynamiek en bouwt voort op inzichten uit de community.",
    highlights: [
      { title: "Circle board", description: "Sessies & resources" },
      { title: "Community", description: "Inzichten & showcases" },
    ],
    features: [
      {
        title: "Circle planning",
        description: "Toolkit voor groepsagenda's, formats en check-ins.",
        icon: Workflow,
      },
      {
        title: "Community hub",
        description: "Deel verhalen, materialen en vraag feedback.",
        icon: MessagesSquare,
      },
      {
        title: "Growth log",
        description: "Volg impact per groep met reflecties en badges.",
        icon: ChartPie,
      },
    ],
    flows: [
      "Definieer cohort en doelen",
      "Plan sessies met templates en resources",
      "Monitor engagement en deel successen in de community",
    ],
  },
  coach: {
    id: "coach",
    title: "Docent-Coach",
    subtitle: "Coach Dashboard",
    description: "Ondersteun buddy's en peer leaders met dashboards en interventies.",
    focus: ["Impact dashboards", "Sessies", "Feedback"],
    badge: "bg-gradient-to-br from-violet-500 to-indigo-600",
    icon: GraduationCap,
    environmentDescription:
      "De coachomgeving combineert monitoring en coaching tools. Je ziet waar begeleiding nodig is en activeert interventies zonder in de rol-interfaces van studenten te duiken.",
    highlights: [
      { title: "Live zicht", description: "Real-time cohortstatus" },
      { title: "Interventies", description: "Coach taken & opvolging" },
    ],
    features: [
      {
        title: "Coach dashboard",
        description: "Koppeling van alle rollen met inzicht in risico's en successen.",
        icon: LayoutDashboard,
      },
      {
        title: "Sessiebeheer",
        description: "Plan en beoordeel begeleide sessies en trainingsmomenten.",
        icon: BookOpenCheck,
      },
      {
        title: "Feedback seeds",
        description: "Snelle waarderingen voor buddy's en peer leaders.",
        icon: Sparkles,
      },
    ],
    flows: [
      "Configureer cohort en interventies",
      "Monitor dashboards en identificeer support",
      "Plan coachmomenten en borg kwaliteit",
    ],
  },
  coordinator: {
    id: "coordinator",
    title: "MT / Schoolcoördinator",
    subtitle: "School Control",
    description: "Stuur op beleid, roosters, integraties en impactdata voor de school.",
    focus: ["Beleid", "Impact rapportage", "Opschaling"],
    badge: "bg-gradient-to-br from-sky-400 to-blue-600",
    icon: School,
    environmentDescription:
      "School Control geeft direct overzicht van implementatie, compliance en groei. Je beheert programma-instellingen zonder individuele gebruikers te hinderen.",
    highlights: [
      { title: "Opschaling", description: "Programma's per leerjaar" },
      { title: "Data", description: "Impact dashboards & exports" },
    ],
    features: [
      {
        title: "Programma management",
        description: "Beheer trajecten, toegang en rapportages op schoolniveau.",
        icon: SlidersHorizontal,
      },
      {
        title: "Impact dashboards",
        description: "Visualiseer impact per opleiding en team.",
        icon: ChartPie,
      },
      {
        title: "Compliance",
        description: "Beveiligings- en privacysettings per cohort.",
        icon: ShieldCheck,
      },
    ],
    flows: [
      "Selecteer programma's en stel toegangen in",
      "Monitor impact dashboards en stuur bij",
      "Rapporteer naar directie en partners",
    ],
  },
  trainer: {
    id: "trainer",
    title: "Trainer / Academy",
    subtitle: "Trainer Tools",
    description: "Ontwerp opleidingen, verzorg trainingen en ondersteun partners.",
    focus: ["Learning design", "Materialen", "Partner support"],
    badge: "bg-gradient-to-br from-amber-400 to-yellow-500",
    icon: BookOpenCheck,
    environmentDescription:
      "Trainer Tools bundelt modules voor curriculum design, sessiemateriaal en coaching van teams. Elk trainingsprogramma leeft in zijn eigen workspace.",
    highlights: [
      { title: "Academy", description: "Modules & certificering" },
      { title: "Partner care", description: "Toolkit voor implementatie" },
    ],
    features: [
      {
        title: "Module builder",
        description: "Maak trainingen met lessen, assets en evaluaties.",
        icon: Workflow,
      },
      {
        title: "Materialenbibliotheek",
        description: "Versies van decks, scripts en oefeningen.",
        icon: BookOpenCheck,
      },
      {
        title: "Partner support",
        description: "Track welke teams begeleiding nodig hebben.",
        icon: Users,
      },
    ],
    flows: [
      "Ontwerp modules en stel resources samen",
      "Plan trainingsreeksen en wijs trainers toe",
      "Lever support en certificering per partner",
    ],
  },
  admin: {
    id: "admin",
    title: "Admin (P2P Education)",
    subtitle: "Admin Center",
    description: "Beheer de volledige organisatie, beveiliging en integraties.",
    focus: ["Beveiliging", "Integraties", "Platform beheer"],
    badge: "bg-gradient-to-br from-slate-600 to-slate-900",
    icon: ShieldCheck,
    environmentDescription:
      "De Admin Center omgeving is geïsoleerd van de leerervaring. Hier regel je tenants, rechten, integraties en audit logging – zonder content van andere rollen te veranderen.",
    highlights: [
      { title: "Multi-tenant", description: "Losse omgevingen per rol" },
      { title: "Governance", description: "Audit trails & beveiliging" },
    ],
    features: [
      {
        title: "Tenant beheer",
        description: "Maak en beheer gescheiden role-omgevingen.",
        icon: SlidersHorizontal,
      },
      {
        title: "Integraties",
        description: "Koppelingen met identity en rapportage systemen.",
        icon: Workflow,
      },
      {
        title: "Beveiliging",
        description: "IAM, policies en audit logging centraal.",
        icon: ShieldCheck,
      },
    ],
    flows: [
      "Provision role-omgevingen en toegang",
      "Configureer integraties en policies",
      "Monitor logs en voer audits uit",
    ],
  },
};

export const roleList = Object.values(roleConfigs);

