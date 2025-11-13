import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  MessageSquare,
  Calendar,
  TrendingUp,
  Home,
  Award,
  Target,
  Users,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Portfolio = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "Sessies", value: "24", icon: Calendar, color: "peer-teal" },
    { label: "Uren", value: "18", icon: Clock, color: "peer-orange" },
    { label: "Badges", value: "5", icon: Award, color: "peer-purple" },
    { label: "Peers", value: "8", icon: Users, color: "peer-magenta" },
  ];

  const competencies = [
    { name: "Communicatie", value: 75, level: "Proficient", color: "peer-teal" },
    { name: "Samenwerken", value: 85, level: "Proficient", color: "peer-orange" },
    { name: "Eigenaarschap", value: 60, level: "Developing", color: "peer-purple" },
    { name: "Reflecteren", value: 70, level: "Developing", color: "peer-magenta" },
  ];

  const badges = [
    {
      name: "Actief Luisteraar",
      icon: "🗣️",
      earned: true,
      date: "2 dagen geleden",
    },
    {
      name: "Groeimindset",
      icon: "🌱",
      earned: true,
      date: "1 week geleden",
    },
    {
      name: "Verbinder",
      icon: "💬",
      earned: true,
      date: "2 weken geleden",
    },
    {
      name: "Zelfstandig",
      icon: "💪",
      earned: false,
      progress: "2/5 sessies",
    },
    {
      name: "Doelgericht",
      icon: "🎯",
      earned: false,
      progress: "3/5 doelen",
    },
  ];

  const recentSessions = [
    {
      date: "Vandaag",
      title: "Wiskunde - Breuken",
      with: "Tom S.",
      mood: "😊",
      competencies: ["Communicatie", "Eigenaarschap"],
    },
    {
      date: "Gisteren",
      title: "Engels - Grammatica",
      with: "Lisa K.",
      mood: "💪",
      competencies: ["Samenwerken"],
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header with Level */}
      <div className="bg-gradient-peer text-white px-6 py-8 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm opacity-90">Mijn Portfolio</p>
            <h1 className="text-3xl font-extrabold">Emma V.</h1>
          </div>
          <div className="text-center">
            <div className="bg-white/20 rounded-2xl px-6 py-4 backdrop-blur-sm">
              <p className="text-3xl font-bold">🥈</p>
              <p className="text-sm font-semibold">Practitioner</p>
              <p className="text-xs opacity-80 mt-1">Level 2</p>
            </div>
          </div>
        </div>

        {/* Level Progress */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium">Naar Leader 🥇</p>
            <p className="text-sm font-bold">65%</p>
          </div>
          <Progress value={65} className="h-2 bg-white/20" />
          <p className="text-xs opacity-80 mt-2">
            Nog 4 sessies tot de volgende level!
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-6 -mt-4">
        <div className="grid grid-cols-4 gap-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="p-3 text-center">
                <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Competencies Section */}
      <div className="px-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Vaardigheden</h2>
          <Button variant="ghost" size="sm">
            <Target className="w-4 h-4 mr-1" />
            Details
          </Button>
        </div>

        <Card className="p-4 space-y-4">
          {competencies.map((comp) => (
            <div key={comp.name}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-semibold text-sm">{comp.name}</p>
                  <p className="text-xs text-muted-foreground">{comp.level}</p>
                </div>
                <span className="text-sm font-bold text-primary">
                  {comp.value}%
                </span>
              </div>
              <Progress value={comp.value} className="h-2" />
            </div>
          ))}
        </Card>
      </div>

      {/* Badges Section */}
      <div className="px-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Badges</h2>
          <Button variant="ghost" size="sm">
            Alles
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {badges.map((badge) => (
            <Card
              key={badge.name}
              className={`p-3 text-center ${
                !badge.earned ? "opacity-50" : ""
              } hover:shadow-md transition-all`}
            >
              <div
                className={`text-4xl mb-2 ${
                  !badge.earned ? "grayscale" : ""
                }`}
              >
                {badge.icon}
              </div>
              <p className="text-xs font-semibold mb-1">{badge.name}</p>
              {badge.earned ? (
                <p className="text-[10px] text-muted-foreground">
                  {badge.date}
                </p>
              ) : (
                <p className="text-[10px] text-muted-foreground">
                  {badge.progress}
                </p>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Sessions */}
      <div className="px-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Recente Sessies</h2>
          <Button variant="ghost" size="sm">
            Alles
          </Button>
        </div>

        <div className="space-y-3">
          {recentSessions.map((session, idx) => (
            <Card key={idx} className="p-4 hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <div className="text-3xl">{session.mood}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-sm">{session.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {session.date}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Met {session.with}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {session.competencies.map((comp) => (
                      <Badge key={comp} variant="secondary" className="text-xs">
                        {comp}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Export Button */}
      <div className="px-6 mt-6 mb-6">
        <Button variant="outline" className="w-full" size="lg">
          <Award className="w-4 h-4 mr-2" />
          Download als PDF
        </Button>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t px-6 py-3 flex justify-around items-center">
        <button
          className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => navigate("/home")}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs">Home</span>
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
        <button className="flex flex-col items-center gap-1 text-primary">
          <TrendingUp className="w-6 h-6" />
          <span className="text-xs font-medium">Portfolio</span>
        </button>
      </div>
    </div>
  );
};

export default Portfolio;
