import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  HelpCircle,
  Calendar,
  BookOpen,
  Users,
  TrendingUp,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";

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
    }
    return [];
  };

  const quickActions = getQuickActions();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Header */}
      <div className="bg-gradient-peer text-white px-6 py-8 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm opacity-90">{getGreeting()},</p>
            <h1 className="text-3xl font-extrabold">{userName}</h1>
            <Badge className="mt-2 bg-white/20 text-white border-white/30">
              {getRoleName()}
            </Badge>
          </div>
          <div className="text-right">
            <div className="bg-white/20 rounded-full px-4 py-2 backdrop-blur-sm">
              <p className="text-2xl font-bold">🥈</p>
              <p className="text-xs">Practitioner</p>
            </div>
          </div>
        </div>

        {/* Streak indicator */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
          <div className="flex items-center justify-between text-white">
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
