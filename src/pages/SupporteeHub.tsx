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
      {/* Hero Section */}
      <Card className="mx-4 mt-4 mb-5 bg-gradient-to-br from-headspace-peach to-headspace-pink border-0">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className="text-5xl mb-3">👋</div>
          <h1 className="text-xl font-bold mb-2">Hi {personalInfo.name}!</h1>
          <Badge className="bg-white/20 text-foreground border-0 backdrop-blur-sm text-xs">
            {levelInfo.title}
          </Badge>
          
          <div className="relative mt-5">
            <ProgressRing progress={progressToNextLevel} size={120} strokeWidth={6} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-2xl font-bold">{levelInfo.currentLevel}</div>
              <div className="text-xs opacity-80">Level</div>
            </div>
          </div>
          
          <p className="text-sm mt-3 opacity-90">{xp} / {levelInfo.nextLevel} XP</p>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="px-4 space-y-3 mb-6">
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
        <h2 className="text-lg font-bold mb-3 px-1">Ontdekken</h2>
        <div className="grid grid-cols-2 gap-3">
          <Card 
            className="p-5 cursor-pointer transition-transform active:scale-95 bg-gradient-to-br from-headspace-lavender/30 to-headspace-pink/30 border-0"
            onClick={() => navigate("/library")}
          >
            <div className="text-4xl mb-2">📚</div>
            <h3 className="font-semibold text-sm">Library</h3>
          </Card>
          
          <Card 
            className="p-5 cursor-pointer transition-transform active:scale-95 bg-gradient-to-br from-headspace-mint/30 to-headspace-sky/30 border-0"
            onClick={() => navigate("/portfolio")}
          >
            <div className="text-4xl mb-2">🎯</div>
            <h3 className="font-semibold text-sm">Portfolio</h3>
          </Card>
          
          <Card 
            className="p-5 cursor-pointer transition-transform active:scale-95 bg-gradient-to-br from-headspace-peach/30 to-headspace-coral/30 border-0"
            onClick={() => navigate("/community")}
          >
            <div className="text-4xl mb-2">🌟</div>
            <h3 className="font-semibold text-sm">Community</h3>
          </Card>
          
          <Card 
            className="p-5 cursor-pointer transition-transform active:scale-95 bg-gradient-to-br from-headspace-sky/30 to-headspace-lavender/30 border-0"
            onClick={() => navigate("/supportee/journey")}
          >
            <div className="text-4xl mb-2">🚀</div>
            <h3 className="font-semibold text-sm">Journey</h3>
          </Card>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default SupporteeHub;
