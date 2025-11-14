import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { mockSupporteeProfile, getLevelInfo } from "@/lib/mockSupporteeData";
import { BottomNav } from "@/components/BottomNav";
import { Progress } from "@/components/ui/progress";
import { Zap } from "lucide-react";

const SupporteeHub = () => {
  const navigate = useNavigate();
  const levelInfo = getLevelInfo(mockSupporteeProfile.xp);
  const progressToNextLevel = levelInfo.nextLevel > 0 ? (levelInfo.progress / levelInfo.nextLevel) * 100 : 100;

  const quickActions = [
    {
      id: 1,
      title: "Dien hulpvraag in",
      emoji: "🆘",
      path: "/help-request",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      id: 2,
      title: "Vind een buddy",
      emoji: "🤝",
      path: "/matches",
      gradient: "from-green-500 to-teal-500"
    },
    {
      id: 3,
      title: "Plan een sessie",
      emoji: "📅",
      path: "/sessions",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary to-primary-foreground text-white px-6 py-12 rounded-b-[2rem] shadow-xl">
        <div className="max-w-md mx-auto">
          <p className="text-sm opacity-80 mb-2">Welkom terug!</p>
          <h1 className="text-4xl font-extrabold mb-8">
            Hi {mockSupporteeProfile.personalInfo.name}! 👋
          </h1>
          
          {/* Level Circle */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm opacity-80">Jouw Level</p>
                <p className="text-3xl font-bold">{levelInfo.level}</p>
              </div>
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-4xl backdrop-blur">
                🏆
              </div>
            </div>
            <Progress value={progressToNextLevel} className="h-2 mb-2" />
            <p className="text-xs opacity-80">
              {Math.round(levelInfo.progress)} / {levelInfo.nextLevel} XP tot volgend level
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8 max-w-md mx-auto">
        {/* Daily Goal */}
        <Card className="p-6 mb-6 bg-gradient-to-r from-accent/10 to-accent/5 border-accent/20">
          <div className="flex items-center gap-3 mb-3">
            <Zap className="h-6 w-6 text-accent" />
            <h2 className="text-lg font-bold">Vandaag doel</h2>
          </div>
          <p className="text-muted-foreground mb-4">Plan je eerste sessie met een buddy</p>
          <Button className="w-full rounded-full" onClick={() => navigate("/sessions")}>
            Start nu
          </Button>
        </Card>

        {/* Quick Actions */}
        <h2 className="text-xl font-bold mb-4">Snelle acties</h2>
        <div className="space-y-4 mb-8">
          {quickActions.map((action) => (
            <Card
              key={action.id}
              className="overflow-hidden cursor-pointer transition-transform active:scale-95"
              onClick={() => navigate(action.path)}
            >
              <div className={`h-2 bg-gradient-to-r ${action.gradient}`} />
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{action.emoji}</div>
                  <h3 className="text-lg font-bold">{action.title}</h3>
                </div>
                <div className="text-muted-foreground">→</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Explore Section */}
        <h2 className="text-xl font-bold mb-4">Ontdekken</h2>
        <div className="grid grid-cols-2 gap-4">
          <Card 
            className="p-6 text-center cursor-pointer hover:shadow-lg transition-all"
            onClick={() => navigate("/library")}
          >
            <div className="text-4xl mb-3">📚</div>
            <h3 className="font-bold mb-1">Bibliotheek</h3>
            <p className="text-xs text-muted-foreground">50+ hulpmiddelen</p>
          </Card>
          
          <Card 
            className="p-6 text-center cursor-pointer hover:shadow-lg transition-all"
            onClick={() => navigate("/portfolio")}
          >
            <div className="text-4xl mb-3">🏅</div>
            <h3 className="font-bold mb-1">Portfolio</h3>
            <p className="text-xs text-muted-foreground">Je prestaties</p>
          </Card>
          
          <Card 
            className="p-6 text-center cursor-pointer hover:shadow-lg transition-all"
            onClick={() => navigate("/community")}
          >
            <div className="text-4xl mb-3">💬</div>
            <h3 className="font-bold mb-1">Community</h3>
            <p className="text-xs text-muted-foreground">15+ verhalen</p>
          </Card>
          
          <Card 
            className="p-6 text-center cursor-pointer hover:shadow-lg transition-all"
            onClick={() => navigate("/supportee/journey")}
          >
            <div className="text-4xl mb-3">🗺️</div>
            <h3 className="font-bold mb-1">Journey</h3>
            <p className="text-xs text-muted-foreground">Jouw pad</p>
          </Card>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default SupporteeHub;
