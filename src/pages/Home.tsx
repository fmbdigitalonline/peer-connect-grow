import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  HelpCircle,
  Calendar,
  BookOpen,
  Users,
  TrendingUp,
  MessageSquare,
  Sparkles,
  Compass,
  Handshake,
  ClipboardList,
  Layers,
  ShieldCheck,
  Trophy,
  PlugZap,
} from "lucide-react";
import { useEffect, useState } from "react";
import peerLogo from "@/assets/peer-logo.png";

const Home = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<string>("");
  const [userName] = useState("Emma"); // Mock user name

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    const onboardingComplete = localStorage.getItem("onboardingComplete");

    if (!onboardingComplete) {
      navigate("/onboarding");
    } else {
      setRole(savedRole || "supportee");
    }
  }, [navigate]);

  const getRoleName = () => {
    const roleNames: Record<string, string> = {
      supportee: "Supportee",
      buddy: "Buddy",
      leader: "Peer Leader",
      coach: "Docent-Coach",
    };
    return roleNames[role] || "Peer";
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Goedemorgen";
    if (hour < 18) return "Goedemiddag";
    return "Goedenavond";
  };

  // Quick actions based on role
  const getQuickActions = () => {
    if (role === "supportee") {
      return [
        {
          title: "Hulp vragen",
          description: "Vraag een buddy voor ondersteuning",
          icon: HelpCircle,
          color: "peer-teal",
          action: "/help-request",
        },
        {
          title: "Mijn Sessies",
          description: "Bekijk je geplande sessies",
          icon: Calendar,
          color: "peer-orange",
          action: "/sessions",
        },
        {
          title: "Portfolio",
          description: "Zie je groei en ontwikkeling",
          icon: TrendingUp,
          color: "peer-purple",
          action: "/portfolio",
        },
        {
          title: "Community",
          description: "Deel en inspireer elkaar",
          icon: MessageSquare,
          color: "peer-magenta",
          action: "/community",
        },
      ];
    } else if (role === "buddy") {
      return [
        {
          title: "Nieuwe Match",
          description: "2 hulpvragen wachten op je",
          icon: Users,
          color: "peer-teal",
          badge: "2",
          action: "/matches",
        },
        {
          title: "Bibliotheek",
          description: "Oefeningen en tips",
          icon: BookOpen,
          color: "peer-orange",
          action: "/library",
        },
        {
          title: "Mijn Sessies",
          description: "3 sessies deze week",
          icon: Calendar,
          color: "peer-purple",
          action: "/sessions",
        },
        {
          title: "Community",
          description: "Deel je ervaringen",
          icon: MessageSquare,
          color: "peer-magenta",
          action: "/community",
        },
      ];
    } else if (role === "leader") {
      return [
        {
          title: "Peer Circle",
          description: "Start een groepssessie",
          icon: Users,
          color: "peer-teal",
          action: "/peer-circle",
        },
        {
          title: "Bibliotheek",
          description: "Energizers en activiteiten",
          icon: BookOpen,
          color: "peer-orange",
          action: "/library",
        },
        {
          title: "Mijn Groepen",
          description: "Beheer je peer groepen",
          icon: Sparkles,
          color: "peer-purple",
          action: "/groups",
        },
        {
          title: "Community",
          description: "Inspireer je peers",
          icon: MessageSquare,
          color: "peer-magenta",
          action: "/community",
        },
      ];
    } else if (role === "coach") {
      return [
        {
          title: "Dashboard",
          description: "Bekijk je peers en activiteiten",
          icon: TrendingUp,
          color: "peer-teal",
          action: "/coach",
        },
        {
          title: "Bibliotheek",
          description: "Materialen en oefeningen",
          icon: BookOpen,
          color: "peer-orange",
          action: "/library",
        },
        {
          title: "Community",
          description: "Volg de community",
          icon: MessageSquare,
          color: "peer-magenta",
          action: "/community",
        },
      ];
    }
    return [];
  };

  const quickActions = getQuickActions();

  type FeatureStatus = "live" | "pilot" | "in-progress";

  const statusStyles: Record<FeatureStatus, string> = {
    live: "bg-peer-teal/10 text-peer-teal border-peer-teal/20",
    pilot: "bg-peer-orange/10 text-peer-orange border-peer-orange/20",
    "in-progress": "bg-peer-purple/10 text-peer-purple border-peer-purple/20",
  };

  const statusLabels: Record<FeatureStatus, string> = {
    live: "Live",
    pilot: "Pilot",
    "in-progress": "In ontwikkeling",
  };

  const coreFeatures = [
    {
      id: "onboarding",
      title: "Onboarding per rol",
      description: "Persoonlijke startflow met rolkeuze en uitleg",
      status: "live" as FeatureStatus,
      icon: Compass,
      action: "/onboarding",
      metric: "4 rollen",
    },
    {
      id: "match",
      title: "Hulpvraag & Match",
      description: "AI-match tussen buddies en learners",
      status: "live" as FeatureStatus,
      icon: Handshake,
      action: "/help-request",
      metric: "<2 min",
    },
    {
      id: "sessions",
      title: "Sessielogs & Reflecties",
      description: "Future Skills rubrics gekoppeld",
      status: "live" as FeatureStatus,
      icon: ClipboardList,
      action: "/sessions",
      metric: "12 rubrics",
    },
    {
      id: "portfolio",
      title: "Portfolio",
      description: "Bewijs, badges en groei automatisch",
      status: "live" as FeatureStatus,
      icon: TrendingUp,
      action: "/portfolio",
      metric: "+5 badges",
    },
    {
      id: "library",
      title: "Bibliotheek & Microlearning",
      description: "Toolkit met energizers en tips",
      status: "live" as FeatureStatus,
      icon: BookOpen,
      action: "/library",
      metric: "48 items",
    },
    {
      id: "community",
      title: "Community Wall",
      description: "AVG-proof verhalen en successen",
      status: "live" as FeatureStatus,
      icon: MessageSquare,
      action: "/community",
      metric: "+120 reacties",
    },
    {
      id: "coach",
      title: "Coach Dashboard",
      description: "Inzicht in groei en veiligheid",
      status: "pilot" as FeatureStatus,
      icon: ShieldCheck,
      action: "/coach",
      metric: "5 alerts",
    },
    {
      id: "gamification",
      title: "Gamification & Levels",
      description: "Beloningen en erkenning per mijlpaal",
      status: "pilot" as FeatureStatus,
      icon: Trophy,
      action: "/portfolio",
      metric: "Level 2",
    },
    {
      id: "integrations",
      title: "Integraties",
      description: "Magister, Zermelo, Google & Power BI",
      status: "in-progress" as FeatureStatus,
      icon: PlugZap,
      action: "/coach",
      metric: "3/4 live",
    },
  ];

  const integrationStatuses = [
    { name: "Magister", detail: "Leerlingdata & absenties", state: "live" as FeatureStatus },
    { name: "Zermelo", detail: "Roosters & sessies", state: "live" as FeatureStatus },
    { name: "Google Workspace", detail: "Drive & Meet links", state: "pilot" as FeatureStatus },
    { name: "Power BI", detail: "Export dashboards", state: "in-progress" as FeatureStatus },
  ];

  const gamification = {
    level: "Practitioner",
    nextLevel: "Leader",
    xp: 3200,
    xpTarget: 5000,
    streak: 7,
    achievements: [
      { label: "Actief Luisteraar", value: "Live" },
      { label: "Verbinder", value: "Nieuw" },
      { label: "Doelgericht", value: "3/5" },
    ],
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Header */}
      <div className="bg-white px-6 py-8 rounded-b-3xl shadow-lg border-b border-border">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={peerLogo} alt="Peer2Peer Logo" className="h-16 w-auto" />
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-muted-foreground">{getGreeting()},</p>
            <h1 className="text-3xl font-extrabold text-foreground">{userName}</h1>
            <Badge className="mt-2 bg-peer-teal/10 text-peer-teal border-peer-teal/20">
              {getRoleName()}
            </Badge>
          </div>
          <div className="text-right">
            <div className="bg-gradient-peer rounded-full px-4 py-2">
              <p className="text-2xl font-bold">🥈</p>
              <p className="text-xs text-white">Practitioner</p>
            </div>
          </div>
        </div>

        {/* Streak indicator */}
        <Card className="bg-gradient-soft border-border p-4">
          <div className="flex items-center justify-between text-foreground">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔥</span>
              <div>
                <p className="text-xs opacity-80">Huidige streak</p>
                <p className="text-lg font-bold">7 dagen</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs opacity-80">Deze maand</p>
              <p className="text-lg font-bold">12 sessies</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions Grid */}
      <div className="px-6 -mt-4">
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Card
                key={action.title}
                className="cursor-pointer hover:scale-105 transition-all hover:shadow-lg relative overflow-hidden"
                onClick={() => navigate(action.action)}
              >
                <div className="p-4">
                  {action.badge && (
                    <Badge className="absolute top-2 right-2 bg-destructive text-white">
                      {action.badge}
                    </Badge>
                  )}
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-sm mb-1">{action.title}</h3>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Core Feature Checklist */}
      <div className="px-6 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Kernfunctionaliteiten</h2>
          <Badge variant="outline" className="text-xs">
            Status update
          </Badge>
        </div>
        <div className="grid gap-3">
          {coreFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.id}
                className="p-4 bg-card border-border hover:shadow-md transition-all"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-center">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{feature.title}</p>
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="secondary"
                      className={`text-xs border ${statusStyles[feature.status]}`}
                    >
                      {statusLabels[feature.status]}
                    </Badge>
                    <div className="text-xs text-muted-foreground font-medium">
                      {feature.metric}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary"
                      onClick={() => navigate(feature.action)}
                    >
                      Open
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Gamification Overview */}
      <div className="px-6 mt-8">
        <Card className="p-6 bg-gradient-soft border-border">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Gamification & Levels</p>
              <h2 className="text-2xl font-bold text-foreground">{gamification.level}</h2>
              <p className="text-xs text-muted-foreground">
                Op weg naar {gamification.nextLevel}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground">
                {gamification.xp}/{gamification.xpTarget} XP
              </p>
              <p className="text-xs text-muted-foreground">
                🔥 {gamification.streak}-daagse streak
              </p>
            </div>
          </div>
          <Progress
            value={(gamification.xp / gamification.xpTarget) * 100}
            className="h-2 mt-4"
          />
          <div className="grid grid-cols-3 gap-3 mt-4">
            {gamification.achievements.map((achievement) => (
              <Card key={achievement.label} className="p-3 text-center border-border">
                <p className="text-xs text-muted-foreground mb-1">
                  {achievement.label}
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {achievement.value}
                </p>
              </Card>
            ))}
          </div>
        </Card>
      </div>

      {/* Integrations */}
      <div className="px-6 mt-8">
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" />
              <div>
                <h2 className="text-lg font-bold text-foreground">Integraties</h2>
                <p className="text-xs text-muted-foreground">
                  Magister • Zermelo • Google Workspace • Power BI
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate("/coach")}>
              Status
            </Button>
          </div>
          <div className="space-y-3">
            {integrationStatuses.map((integration) => (
              <div
                key={integration.name}
                className="flex items-center justify-between py-2 border-b last:border-b-0 border-border"
              >
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {integration.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {integration.detail}
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className={`text-xs border ${statusStyles[integration.state]}`}
                >
                  {statusLabels[integration.state]}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="px-6 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Recente Activiteit</h2>
          <Button variant="ghost" size="sm">
            Alles
          </Button>
        </div>
        <Card className="p-4 mb-3 hover:shadow-md transition-all">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gradient-fresh rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-lg">💬</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">Sessie met Tom afgerond</p>
              <p className="text-xs text-muted-foreground mt-1">
                Wiskunde - Breuken oefenen • Vandaag om 14:30
              </p>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary" className="text-xs">
                  Communicatie
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Eigenaarschap
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-md transition-all">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gradient-warm rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-lg">🏆</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">Nieuwe badge verdiend!</p>
              <p className="text-xs text-muted-foreground mt-1">
                Actief Luisteraar badge ontvangen
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t px-6 py-3 flex justify-around items-center">
        <button className="flex flex-col items-center gap-1 text-primary">
          <div className="w-6 h-6 flex items-center justify-center">
            <span className="text-xl">🏠</span>
          </div>
          <span className="text-xs font-medium">Home</span>
        </button>
        <button
          className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => navigate("/sessions")}
        >
          <Calendar className="w-6 h-6" />
          <span className="text-xs">Sessies</span>
        </button>
        <button
          className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => navigate("/community")}
        >
          <MessageSquare className="w-6 h-6" />
          <span className="text-xs">Community</span>
        </button>
        <button
          className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => navigate("/portfolio")}
        >
          <TrendingUp className="w-6 h-6" />
          <span className="text-xs">Portfolio</span>
        </button>
      </div>
    </div>
  );
};

export default Home;
