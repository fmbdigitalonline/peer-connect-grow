import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressRing } from "@/components/ui/progress-ring";
import { EmojiCard } from "@/components/ui/emoji-card";
import { StatCarousel } from "@/components/ui/stat-carousel";
import { OrganicShape } from "@/components/ui/organic-shape";
import { BottomNav } from "@/components/BottomNav";
import { Download, Sparkles, Lock } from "lucide-react";
import { mockBadges, getLevelInfo } from "@/lib/mockSupporteeData";

const Portfolio = () => {
  const sessionReflections = useMemo(() => {
    const stored = localStorage.getItem("sessionReflections");
    return stored ? JSON.parse(stored) : [];
  }, []);

  const totalXP = sessionReflections.reduce((sum: number, r: any) => sum + (r.xpGained || 0), 0);
  const levelInfo = getLevelInfo(totalXP);
  
  const earnedBadges = mockBadges.filter(b => b.earned);
  const lockedBadges = mockBadges.filter(b => !b.earned);
  const latestBadge = earnedBadges[earnedBadges.length - 1];

  const userData = useMemo(() => {
    const stored = localStorage.getItem("userProfile");
    return stored ? JSON.parse(stored) : { name: "Gebruiker" };
  }, []);

  const topSkills = [
    { name: "Zelfreflectie", progress: 75, color: "from-green-400 to-emerald-500" },
    { name: "Communicatie", progress: 60, color: "from-blue-400 to-cyan-500" },
    { name: "Doorzettingsvermogen", progress: 45, color: "from-orange-400 to-amber-500" },
  ];

  const recentActivities = sessionReflections.slice(-5).reverse().map((r: any, i: number) => ({
    id: i,
    emoji: r.mood === 'happy' ? '😊' : r.mood === 'neutral' ? '😐' : '😔',
    title: `Sessie voltooid`,
    xp: r.xpGained || 15,
  }));

  const currentStreak = 7;

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="relative overflow-hidden">
        <OrganicShape variant="blob1" className="top-0 right-0 w-64 h-64" color="hsl(var(--headspace-lavender))" />
        <OrganicShape variant="blob2" className="bottom-0 left-0 w-48 h-48" color="hsl(var(--headspace-mint))" />
        
        <Card className="m-4 bg-gradient-to-br from-headspace-peach to-headspace-pink border-0 relative overflow-hidden">
          <CardContent className="p-8 flex flex-col items-center text-center">
            <div className="text-7xl mb-4 animate-bounce-in">👋</div>
            <h1 className="text-2xl font-bold mb-2">Hi {userData.name}!</h1>
            <Badge className="mb-4 text-base px-4 py-1 bg-white/80 text-foreground">
              {levelInfo.title}
            </Badge>
            
            <div className="relative mt-4">
              <ProgressRing progress={levelInfo.progress} size={140} strokeWidth={10} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-3xl font-bold">{levelInfo.currentLevel}</div>
                <div className="text-xs text-muted-foreground">Level</div>
              </div>
            </div>
            
            <p className="text-sm text-foreground/70 mt-4">
              {totalXP} / {levelInfo.nextLevel} XP
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="px-4 mb-6">
        <StatCarousel>
          <EmojiCard emoji="📅" title="Sessies" value={sessionReflections.length} gradient="from-headspace-sky to-headspace-lavender" className="snap-start" />
          <EmojiCard emoji="🏆" title="Badges" value={earnedBadges.length} gradient="from-headspace-mint to-headspace-sky" className="snap-start" />
          <EmojiCard emoji="⚡" title="XP" value={totalXP} gradient="from-headspace-peach to-headspace-coral" className="snap-start" />
          <EmojiCard emoji="🔥" title="Streak" value={currentStreak} subtitle="dagen" gradient="from-headspace-coral to-headspace-pink" className="snap-start" />
        </StatCarousel>
      </div>

      {latestBadge && (
        <Card className="mx-4 mb-6 bg-gradient-to-br from-headspace-lavender to-headspace-pink border-0 relative overflow-hidden">
          <OrganicShape variant="blob3" className="top-0 right-0 w-32 h-32" color="hsl(var(--headspace-sky))" />
          <CardContent className="p-8 text-center relative">
            <Sparkles className="w-6 h-6 text-yellow-500 mx-auto mb-2 animate-bounce-in" />
            <p className="text-sm font-semibold text-foreground/70 mb-3">Je nieuwste badge!</p>
            <div className="text-8xl mb-3 animate-bounce-in">{latestBadge.icon}</div>
            <h3 className="text-xl font-bold mb-2">{latestBadge.name}</h3>
            <p className="text-sm text-foreground/70 mb-4">{latestBadge.description}</p>
            <Button variant="outline" className="rounded-full">Bekijk alle badges →</Button>
          </CardContent>
        </Card>
      )}

      <div className="px-4 mb-6">
        <h2 className="text-xl font-bold mb-4">Mijn Badges</h2>
        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2">
          {earnedBadges.map((badge) => (
            <div key={badge.id} className="snap-start shrink-0">
              <Card className="w-24 h-24 flex items-center justify-center bg-gradient-to-br from-headspace-mint to-headspace-sky border-0">
                <div className="text-5xl">{badge.icon}</div>
              </Card>
            </div>
          ))}
          {lockedBadges.slice(0, 3).map((badge) => (
            <div key={badge.id} className="snap-start shrink-0 relative">
              <Card className="w-24 h-24 flex items-center justify-center bg-muted/30 border-0 grayscale">
                <div className="text-5xl opacity-40">{badge.icon}</div>
                <Lock className="absolute w-6 h-6 text-muted-foreground" />
              </Card>
            </div>
          ))}
        </div>
      </div>

      <Card className="mx-4 mb-6 border-0">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="text-5xl">🎯</div>
            <CardTitle className="text-xl">Je top skills</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {topSkills.map((skill) => (
            <div key={skill.name}>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-sm">{skill.name}</span>
                <span className="text-sm font-bold text-primary">{skill.progress}%</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out rounded-full`} style={{ width: `${skill.progress}%` }} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="mx-4 mb-6 bg-gradient-to-br from-headspace-pink to-headspace-lavender border-0 relative overflow-hidden">
        <OrganicShape variant="blob1" className="top-0 right-0 w-40 h-40" color="hsl(var(--headspace-coral))" />
        <CardContent className="p-8 text-center relative">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-xl font-bold mb-2">Deel je portfolio</h3>
          <p className="text-sm text-foreground/70 mb-4">Laat anderen zien hoe ver je bent gekomen!</p>
          <Button size="lg" className="rounded-full gap-2"><Download className="w-5 h-5" />Download portfolio</Button>
        </CardContent>
      </Card>

      <BottomNav />
    </div>
  );
};

export default Portfolio;
