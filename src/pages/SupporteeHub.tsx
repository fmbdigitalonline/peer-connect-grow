import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Users, Calendar, BookOpen, Award, TrendingUp } from "lucide-react";
import { mockSupporteeProfile, getLevelInfo } from "@/lib/mockSupporteeData";

const SupporteeHub = () => {
  const navigate = useNavigate();
  const levelInfo = getLevelInfo(mockSupporteeProfile.xp);

  const quickActions = [
    {
      id: 1,
      title: "Dien je eerste hulpvraag in",
      description: "Vertel waar je hulp bij nodig hebt",
      icon: MessageSquare,
      path: "/help-request",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      id: 2,
      title: "Bekijk buddy matches",
      description: "Ontdek wie jou kan helpen",
      icon: Users,
      path: "/matches",
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      id: 3,
      title: "Plan je eerste sessie",
      description: "Maak een afspraak met je buddy",
      icon: Calendar,
      path: "/sessions",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    }
  ];

  const exploreCards = [
    {
      title: "Bibliotheek",
      description: "Leer nieuwe vaardigheden",
      icon: BookOpen,
      path: "/library",
      stats: "50+ hulpmiddelen"
    },
    {
      title: "Portfolio",
      description: "Bekijk je groei",
      icon: Award,
      path: "/portfolio",
      stats: `Level ${levelInfo.level}`
    },
    {
      title: "Community",
      description: "Deel je successen",
      icon: TrendingUp,
      path: "/community",
      stats: "15+ verhalen"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="px-6 py-8 max-w-4xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welkom, {mockSupporteeProfile.personalInfo.name}! 🎉
          </h1>
          <p className="text-muted-foreground">
            Klaar om te starten met Peer2Peer? Begin met één van deze stappen.
          </p>
        </div>

        {/* Quick Stats */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Jouw Level</p>
              <p className="text-2xl font-bold">{levelInfo.level}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">XP</p>
              <p className="text-2xl font-bold">{mockSupporteeProfile.xp}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Sessies</p>
              <p className="text-2xl font-bold">{mockSupporteeProfile.sessionsCompleted}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Status</p>
              <Badge variant="secondary">{mockSupporteeProfile.status}</Badge>
            </div>
          </div>
        </Card>

        {/* Next Steps */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Volgende stappen:</h2>
          <div className="space-y-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Card 
                  key={action.id} 
                  className="p-6 hover:border-primary/50 transition-colors cursor-pointer"
                  onClick={() => navigate(action.path)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full ${action.bgColor}`}>
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 ${action.color} font-bold text-lg`}>
                        {action.id}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                    <Icon className={`h-6 w-6 ${action.color}`} />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Explore More */}
        <div>
          <h2 className="text-xl font-bold mb-4">Verken meer:</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {exploreCards.map((card) => {
              const Icon = card.icon;
              return (
                <Card 
                  key={card.title}
                  className="p-6 hover:border-primary/50 transition-colors cursor-pointer"
                  onClick={() => navigate(card.path)}
                >
                  <Icon className="h-8 w-8 mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">{card.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{card.description}</p>
                  <p className="text-xs font-medium text-primary">{card.stats}</p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Primary CTA */}
        <div className="mt-8 text-center">
          <Button 
            size="lg" 
            onClick={() => navigate("/help-request")}
            className="font-semibold"
          >
            Start met Peer2Peer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SupporteeHub;
