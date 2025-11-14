import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { mockSupporteeProfile, getLevelInfo } from "@/lib/mockSupporteeData";
import { BottomNav } from "@/components/BottomNav";
import { ProgressRing } from "@/components/ui/progress-ring";
import { EmojiCard } from "@/components/ui/emoji-card";
import { Badge } from "@/components/ui/badge";

const SupporteeHub = () => {
  const navigate = useNavigate();
  const { xp, personalInfo } = mockSupporteeProfile;
  const levelInfo = getLevelInfo(xp);
  const progressToNextLevel = levelInfo.nextLevel > 0 ? (levelInfo.progress / levelInfo.nextLevel) * 100 : 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-headspace-mint via-headspace-sky to-headspace-lavender pb-20">
      {/* Hero Section - Portfolio Style */}
      <Card className="m-4 bg-gradient-to-br from-headspace-peach to-headspace-pink border-0">
        <CardContent className="p-8 flex flex-col items-center text-center">
          <div className="text-7xl mb-4 animate-bounce-in">👋</div>
          <h1 className="text-2xl font-bold mb-2">Hi {personalInfo.name}!</h1>
          <Badge className="bg-white/20 text-foreground border-0 backdrop-blur-sm">
            {levelInfo.title}
          </Badge>
          
          <div className="relative mt-6">
            <ProgressRing progress={progressToNextLevel} size={140} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-3xl font-bold">{levelInfo.currentLevel}</div>
              <div className="text-xs opacity-80">Level</div>
            </div>
          </div>
          
          <p className="text-sm mt-4 opacity-90">{xp} / {levelInfo.nextLevel} XP</p>
        </CardContent>
      </Card>

      {/* Quick Actions - EmojiCards */}
      <div className="px-4 space-y-3 mb-8">
        <EmojiCard 
          emoji="🆘" 
          title="Hulpvraag"
          gradient="from-headspace-sky to-headspace-lavender"
          onClick={() => navigate("/help-request")}
          className="w-full"
        />
        <EmojiCard 
          emoji="🤝" 
          title="Vind buddy"
          gradient="from-headspace-mint to-headspace-sky"
          onClick={() => navigate("/matches")}
          className="w-full"
        />
        <EmojiCard 
          emoji="📅" 
          title="Plan sessie"
          gradient="from-headspace-peach to-headspace-coral"
          onClick={() => navigate("/sessions")}
          className="w-full"
        />
      </div>

      {/* Explore Section */}
      <div className="px-4">
        <h2 className="text-xl font-bold mb-4">Ontdekken</h2>
        <div className="grid grid-cols-2 gap-3">
          <Card 
            className="p-6 cursor-pointer transition-transform active:scale-95 bg-gradient-to-br from-headspace-lavender/30 to-headspace-pink/30 border-0"
            onClick={() => navigate("/library")}
          >
            <div className="text-5xl mb-3 animate-float">📚</div>
            <h3 className="font-semibold">Library</h3>
          </Card>
          
          <Card 
            className="p-6 cursor-pointer transition-transform active:scale-95 bg-gradient-to-br from-headspace-mint/30 to-headspace-sky/30 border-0"
            onClick={() => navigate("/portfolio")}
          >
            <div className="text-5xl mb-3 animate-float">🎯</div>
            <h3 className="font-semibold">Portfolio</h3>
          </Card>
          
          <Card 
            className="p-6 cursor-pointer transition-transform active:scale-95 bg-gradient-to-br from-headspace-peach/30 to-headspace-coral/30 border-0"
            onClick={() => navigate("/community")}
          >
            <div className="text-5xl mb-3 animate-float">🌟</div>
            <h3 className="font-semibold">Community</h3>
          </Card>
          
          <Card 
            className="p-6 cursor-pointer transition-transform active:scale-95 bg-gradient-to-br from-headspace-sky/30 to-headspace-lavender/30 border-0"
            onClick={() => navigate("/supportee/journey")}
          >
            <div className="text-5xl mb-3 animate-float">🚀</div>
            <h3 className="font-semibold">Journey</h3>
          </Card>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default SupporteeHub;
