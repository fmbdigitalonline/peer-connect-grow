import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Calendar,
  BookOpen,
  MessageSquare,
  Award,
  Library,
  Sparkles,
  TrendingUp,
  Clock,
  CheckCircle2,
} from "lucide-react";

export default function BuddyHub() {
  const navigate = useNavigate();
  
  // Mock data - would come from localStorage or backend
  const buddyData = JSON.parse(localStorage.getItem("buddyProfile") || "{}");
  const userName = buddyData.name || "Buddy";
  const level = buddyData.level || "Starter";
  const xp = buddyData.xp || 0;
  const sessionsCompleted = buddyData.sessionsCompleted || 0;
  
  const xpToNextLevel = 100;
  const xpProgress = (xp / xpToNextLevel) * 100;

  // Mock pending matches
  const pendingMatches = 2;
  const upcomingSessions = 1;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="px-6 py-8 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Welkom terug, {userName}! 👋</h1>
              <p className="text-muted-foreground">Hier is je buddy dashboard</p>
            </div>
            <Badge variant="secondary" className="gap-2 text-base px-4 py-2">
              <Award className="h-4 w-4" />
              Level: {level}
            </Badge>
          </div>

          {/* XP Progress */}
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">XP Voortgang</span>
                  <span className="text-muted-foreground">{xp} / {xpToNextLevel} XP</span>
                </div>
                <Progress value={xpProgress} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Nog {xpToNextLevel - xp} XP tot {level === "Starter" ? "Practitioner" : "Leader"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{sessionsCompleted}</p>
                  <p className="text-sm text-muted-foreground">Voltooide sessies</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{pendingMatches}</p>
                  <p className="text-sm text-muted-foreground">Nieuwe matches</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{upcomingSessions}</p>
                  <p className="text-sm text-muted-foreground">Aankomende sessies</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Snelle Acties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card 
              className="cursor-pointer hover:shadow-lg transition-all hover:border-primary/50"
              onClick={() => navigate("/matches")}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  {pendingMatches > 0 && (
                    <Badge variant="default">{pendingMatches} nieuw</Badge>
                  )}
                </div>
                <CardTitle className="text-lg">Matches</CardTitle>
                <CardDescription>
                  Bekijk en accepteer nieuwe match voorstellen
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-all hover:border-primary/50"
              onClick={() => navigate("/sessions")}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-green-500" />
                  </div>
                  {upcomingSessions > 0 && (
                    <Badge variant="secondary">{upcomingSessions} gepland</Badge>
                  )}
                </div>
                <CardTitle className="text-lg">Sessies</CardTitle>
                <CardDescription>
                  Plan en beheer je buddy sessies
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-all hover:border-primary/50"
              onClick={() => navigate("/library")}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Library className="h-6 w-6 text-blue-500" />
                </div>
                <CardTitle className="text-lg">Bibliotheek</CardTitle>
                <CardDescription>
                  Werkvormen en scripts voor je sessies
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Features Grid */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Verken Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card 
              className="cursor-pointer hover:shadow-lg transition-all"
              onClick={() => navigate("/portfolio")}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-2">
                  <BookOpen className="h-6 w-6 text-purple-500" />
                </div>
                <CardTitle className="text-lg">Portfolio</CardTitle>
                <CardDescription>
                  Bekijk je reflecties, skills en badges
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-all"
              onClick={() => navigate("/community")}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-2">
                  <MessageSquare className="h-6 w-6 text-orange-500" />
                </div>
                <CardTitle className="text-lg">Community</CardTitle>
                <CardDescription>
                  Deel successen en leer van anderen
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-all"
              onClick={() => navigate("/buddy/journey")}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center mb-2">
                  <Sparkles className="h-6 w-6 text-pink-500" />
                </div>
                <CardTitle className="text-lg">Buddy Journey</CardTitle>
                <CardDescription>
                  Bekijk het volledige buddy traject
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Upcoming Sessions Preview */}
        {upcomingSessions > 0 && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <CardTitle>Aankomende Sessies</CardTitle>
                </div>
                <Button variant="ghost" size="sm" onClick={() => navigate("/sessions")}>
                  Bekijk alles
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Card className="p-4 bg-muted/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        👨‍🎓
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Wiskunde sessie met Lisa</p>
                        <p className="text-sm text-muted-foreground">Vandaag om 15:00</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Details</Button>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Progress Insights */}
        <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <CardTitle>Jouw Groei</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Voltooide sessies</p>
                <p className="text-2xl font-bold text-foreground">{sessionsCompleted}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Actieve matches</p>
                <p className="text-2xl font-bold text-foreground">3</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Badges verdiend</p>
                <p className="text-2xl font-bold text-foreground">2</p>
              </div>
            </div>
            <Button onClick={() => navigate("/portfolio")} className="w-full gap-2">
              <Award className="h-4 w-4" />
              Bekijk volledig portfolio
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
