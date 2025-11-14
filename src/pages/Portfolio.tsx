import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Navigation } from "@/components/Navigation";
import {
  Award,
  Download,
  Calendar,
  Target,
  Sparkles,
  Lock,
  CheckCircle,
} from "lucide-react";
import { mockBadges, getLevelInfo } from "@/lib/mockSupporteeData";
import { toast } from "sonner";

const Portfolio = () => {
  const navigate = useNavigate();
  
  const reflections = useMemo(() => {
    return JSON.parse(localStorage.getItem("sessionReflections") || "[]");
  }, []);

  const totalXP = 65 + (reflections.length * 15);
  const levelInfo = getLevelInfo(totalXP);
  
  const earnedBadges = mockBadges.filter((b) => b.earned);
  const lockedBadges = mockBadges.filter((b) => !b.earned);

  return (
    <div className="min-h-screen bg-background pb-24">
      <Navigation />

      <div className="bg-gradient-to-br from-primary to-primary/80 text-white px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-sm opacity-90 mb-1">Mijn Portfolio</p>
              <h1 className="text-3xl font-bold">Lisa van der Berg</h1>
            </div>
            <div className="text-center bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4">
              <p className="text-4xl mb-1">🥈</p>
              <p className="font-bold text-lg">{levelInfo.level}</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold">Voortgang</p>
              <p className="font-bold">{Math.round((levelInfo.progress / levelInfo.nextLevel) * 100)}%</p>
            </div>
            <Progress 
              value={(levelInfo.progress / levelInfo.nextLevel) * 100} 
              className="h-3 bg-white/20"
            />
            <p className="text-xs opacity-90 mt-2">
              {totalXP} XP • Nog {levelInfo.nextLevel - levelInfo.progress} XP
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-6 mb-6">
        <div className="max-w-4xl mx-auto grid grid-cols-4 gap-3">
          {[
            { label: "Sessies", value: reflections.length, icon: Calendar },
            { label: "Badges", value: earnedBadges.length, icon: Award },
            { label: "XP", value: totalXP, icon: Sparkles },
            { label: "Streak", value: "14d", icon: CheckCircle },
          ].map((stat) => (
            <Card key={stat.label} className="p-4 text-center">
              <stat.icon className="h-5 w-5 mx-auto mb-1 text-primary" />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>
      </div>

      <div className="px-6 max-w-4xl mx-auto space-y-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Mijn Badges
            </h2>
            <Badge>{earnedBadges.length}/{mockBadges.length}</Badge>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-6">
            {earnedBadges.map((badge) => (
              <div key={badge.id} className="text-center">
                <div className="text-5xl mb-2">{badge.icon}</div>
                <p className="text-xs font-semibold">{badge.name}</p>
                <p className="text-xs text-green-600 mt-1">
                  <CheckCircle className="h-3 w-3 inline mr-1" />
                  Verdiend
                </p>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3 text-sm text-muted-foreground">Op slot</h3>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
              {lockedBadges.map((badge) => (
                <div key={badge.id} className="text-center opacity-50">
                  <div className="relative">
                    <div className="text-5xl mb-2 grayscale">{badge.icon}</div>
                    <Lock className="h-4 w-4 absolute top-0 right-0" />
                  </div>
                  <p className="text-xs font-semibold">{badge.name}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Future Skills
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {[
              { name: "Communicatie", value: 75 },
              { name: "Samenwerken", value: 85 },
              { name: "Eigenaarschap", value: 60 },
              { name: "Doorzetten", value: 70 },
              { name: "Creativiteit", value: 55 },
              { name: "Reflecteren", value: 80 },
            ].map((skill) => (
              <div key={skill.name}>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold">{skill.name}</p>
                  <Badge variant="outline" className="text-xs">{skill.value}%</Badge>
                </div>
                <Progress value={skill.value} className="h-2" />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Sessie Timeline
          </h2>

          {reflections.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">Nog geen sessies voltooid</p>
              <Button onClick={() => navigate("/sessions")}>
                Plan je eerste sessie
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {reflections.slice(0, 5).map((ref: any, idx: number) => (
                <div key={idx} className="flex gap-4 border-l-4 border-l-primary pl-4">
                  <div className="text-3xl">{ref.postMood}</div>
                  <div className="flex-1">
                    <p className="font-semibold">Sessie {idx + 1}</p>
                    <p className="text-sm text-muted-foreground">{ref.preGoal}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-primary">+15 XP</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Portfolio delen</h2>
          <Button variant="outline" onClick={() => toast.success("Download gestart!")} className="gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Portfolio;
