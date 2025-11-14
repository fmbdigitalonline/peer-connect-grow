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
  Flag,
  Target,
  CheckCircle2,
  Zap,
} from "lucide-react";

export default function LeaderHub() {
  const navigate = useNavigate();
  
  // Mock data
  const leaderData = JSON.parse(localStorage.getItem("leaderProfile") || "{}");
  const userName = "Peer Leader";
  const level = "Expert";
  
  // Mock stats
  const stats = {
    activeGroups: 3,
    activeChallenges: 2,
    highlightedPosts: 8,
    groupSessions: 12,
    pendingFlags: 1,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="px-6 py-8 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Welkom terug, {userName}! 🌟</h1>
              <p className="text-muted-foreground">Je Peer Leader dashboard</p>
            </div>
            <Badge variant="secondary" className="gap-2 text-base px-4 py-2">
              <Award className="h-4 w-4" />
              Level: {level}
            </Badge>
          </div>

          {/* Status Banner */}
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Peer Leader Status: Actief</p>
                    <p className="text-sm text-muted-foreground">Coach goedgekeurd • Volledige toegang</p>
                  </div>
                </div>
                <Button variant="outline" onClick={() => navigate("/leader/journey")}>
                  Bekijk Journey
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.activeGroups}</p>
                  <p className="text-sm text-muted-foreground">Actieve groepen</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Target className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.activeChallenges}</p>
                  <p className="text-sm text-muted-foreground">Actieve challenges</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.highlightedPosts}</p>
                  <p className="text-sm text-muted-foreground">Highlighted posts</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <Flag className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.pendingFlags}</p>
                  <p className="text-sm text-muted-foreground">Pending flags</p>
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
              onClick={() => navigate("/sessions")}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  {stats.activeChallenges > 0 && (
                    <Badge variant="default">{stats.activeChallenges} actief</Badge>
                  )}
                </div>
                <CardTitle className="text-lg">Challenges</CardTitle>
                <CardDescription>
                  Maak en beheer groepschallenges
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-all hover:border-primary/50"
              onClick={() => navigate("/sessions")}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-500" />
                  </div>
                  <Badge variant="secondary">{stats.activeGroups} groepen</Badge>
                </div>
                <CardTitle className="text-lg">Buddy Cirkels</CardTitle>
                <CardDescription>
                  Beheer je buddy groepen
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-all hover:border-primary/50"
              onClick={() => navigate("/community")}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-green-500" />
                  </div>
                  {stats.pendingFlags > 0 && (
                    <Badge variant="destructive">{stats.pendingFlags} pending</Badge>
                  )}
                </div>
                <CardTitle className="text-lg">Moderatie</CardTitle>
                <CardDescription>
                  Highlight posts en review flags
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Features Grid */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Meer Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card 
              className="cursor-pointer hover:shadow-lg transition-all"
              onClick={() => navigate("/library")}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-2">
                  <Library className="h-6 w-6 text-purple-500" />
                </div>
                <CardTitle className="text-lg">Toolkit</CardTitle>
                <CardDescription>
                  Facilitation tools en energizers
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-all"
              onClick={() => navigate("/portfolio")}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-2">
                  <BookOpen className="h-6 w-6 text-orange-500" />
                </div>
                <CardTitle className="text-lg">Portfolio</CardTitle>
                <CardDescription>
                  Groepsreflecties en debriefs
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-all"
              onClick={() => navigate("/leader/journey")}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center mb-2">
                  <Sparkles className="h-6 w-6 text-pink-500" />
                </div>
                <CardTitle className="text-lg">Leader Journey</CardTitle>
                <CardDescription>
                  Bekijk het volledige traject
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Active Challenges */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                <CardTitle>Actieve Challenges</CardTitle>
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
                  <div>
                    <p className="font-medium text-foreground">Welzijn Week Check-in</p>
                    <p className="text-sm text-muted-foreground">12/15 deelnemers ingecheckt</p>
                    <Progress value={80} className="h-2 mt-2 w-48" />
                  </div>
                  <Button size="sm">Bekijk</Button>
                </div>
              </Card>
              <Card className="p-4 bg-muted/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Deel een Leersucces</p>
                    <p className="text-sm text-muted-foreground">8/15 deelnemers</p>
                    <Progress value={53} className="h-2 mt-2 w-48" />
                  </div>
                  <Button size="sm">Bekijk</Button>
                </div>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Impact Overview */}
        <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <CardTitle>Jouw Impact</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Groepssessies</p>
                <p className="text-2xl font-bold text-foreground">{stats.groupSessions}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Actieve deelnemers</p>
                <p className="text-2xl font-bold text-foreground">24</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Community highlights</p>
                <p className="text-2xl font-bold text-foreground">{stats.highlightedPosts}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Badges verdiend</p>
                <p className="text-2xl font-bold text-foreground">4</p>
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
