import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  MessageSquare,
  Calendar,
  TrendingUp,
  Home,
  Heart,
  MessageCircle,
  Share2,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Community = () => {
  const navigate = useNavigate();
  const [showNewPost, setShowNewPost] = useState(false);
  const [postText, setPostText] = useState("");

  const posts = [
    {
      id: 1,
      author: "Lisa K.",
      role: "Buddy",
      time: "2u geleden",
      content:
        "Vandaag mijn eerste buddy sessie gedaan! 💛 Super nerveus was ik, maar het ging eigenlijk heel goed. We hebben samen breuken geoefend en ik zag echt dat het klikte!",
      emoji: "😊",
      tags: ["Communicatie", "Groei"],
      reactions: { heart: 12, celebrate: 5 },
      comments: 3,
    },
    {
      id: 2,
      author: "Mohamed A.",
      role: "Leader",
      time: "5u geleden",
      content:
        "Peer Circle van vandaag was echt top! We hebben het energizer spel 'Popcorn' gedaan en iedereen deed mee. Zag dat zelfs de stille leerlingen meededen 🌱",
      emoji: "🎯",
      tags: ["Samenwerken", "Eigenaarschap"],
      reactions: { heart: 18, celebrate: 8, growth: 6 },
      comments: 5,
    },
    {
      id: 3,
      author: "Emma V.",
      role: "Supportee",
      time: "1d geleden",
      content:
        "Dankjewel Tom voor de hulp met Engels! Ik snap het nu eindelijk 📚 Volgende week mijn toets, ik ga ervoor!",
      emoji: "💪",
      tags: ["Verbinding"],
      reactions: { heart: 15, celebrate: 10 },
      comments: 2,
    },
  ];

  const handlePost = () => {
    if (postText.trim()) {
      // Here you would normally send to backend
      console.log("New post:", postText);
      setPostText("");
      setShowNewPost(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-card border-b px-6 py-4 sticky top-0 z-10">
        <h1 className="text-2xl font-bold">Community</h1>
        <p className="text-sm text-muted-foreground">
          Deel successen en inspireer elkaar
        </p>
      </div>

      {/* Tabs */}
      <div className="px-6 py-4 flex gap-2 border-b overflow-x-auto">
        <Button size="sm" variant="default">
          Voor jou
        </Button>
        <Button size="sm" variant="outline">
          Recent
        </Button>
        <Button size="sm" variant="outline">
          Trending
        </Button>
      </div>

      {/* New Post Card */}
      {showNewPost ? (
        <Card className="mx-6 my-4 p-4 animate-slide-up">
          <Textarea
            placeholder="Deel je verhaal... 💛"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            className="mb-3 min-h-[100px]"
          />
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                📷
              </Button>
              <Button size="sm" variant="outline">
                😊
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowNewPost(false)}
              >
                Annuleer
              </Button>
              <Button size="sm" onClick={handlePost}>
                Delen
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <Card
          className="mx-6 my-4 p-4 cursor-pointer hover:shadow-md transition-all"
          onClick={() => setShowNewPost(true)}
        >
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback className="bg-gradient-peer text-white">
                E
              </AvatarFallback>
            </Avatar>
            <p className="text-muted-foreground">Deel je verhaal... 💛</p>
          </div>
        </Card>
      )}

      {/* Posts Feed */}
      <div className="px-6 space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="p-4 hover:shadow-md transition-all">
            {/* Post Header */}
            <div className="flex items-start gap-3 mb-3">
              <Avatar>
                <AvatarFallback className="bg-gradient-fresh">
                  {post.author[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">{post.author}</span>
                  <Badge variant="secondary" className="text-xs">
                    {post.role}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{post.time}</p>
              </div>
              <span className="text-2xl">{post.emoji}</span>
            </div>

            {/* Post Content */}
            <p className="text-sm mb-3 leading-relaxed">{post.content}</p>

            {/* Tags */}
            <div className="flex gap-2 mb-3 flex-wrap">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Reactions & Actions */}
            <div className="flex items-center justify-between pt-3 border-t">
              <div className="flex gap-4 text-sm text-muted-foreground">
                {post.reactions.heart && (
                  <span className="flex items-center gap-1">
                    💛 {post.reactions.heart}
                  </span>
                )}
                {post.reactions.celebrate && (
                  <span className="flex items-center gap-1">
                    👏 {post.reactions.celebrate}
                  </span>
                )}
                {post.reactions.growth && (
                  <span className="flex items-center gap-1">
                    🌱 {post.reactions.growth}
                  </span>
                )}
              </div>
              <div className="flex gap-3">
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-xs">{post.comments}</span>
                </button>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Floating Action Button */}
      <button
        className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-peer rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
        onClick={() => setShowNewPost(true)}
      >
        <Plus className="w-6 h-6 text-white" />
      </button>

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
        <button className="flex flex-col items-center gap-1 text-primary">
          <MessageSquare className="w-6 h-6" />
          <span className="text-xs font-medium">Community</span>
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

export default Community;
