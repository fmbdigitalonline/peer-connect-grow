import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { BottomNav } from "@/components/BottomNav";
import { Plus, Shield, X } from "lucide-react";
import { mockCommunityPosts } from "@/lib/mockSupporteeData";
import { toast } from "sonner";

const Community = () => {
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");

  const handlePost = () => {
    if (newPostContent.trim()) {
      toast.success("Post geplaatst! 🎉");
      setNewPostContent("");
      setShowNewPost(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 bg-background/80 backdrop-blur-xl border-b border-border/50 z-40 p-4">
        <h1 className="text-2xl font-bold">Community</h1>
      </div>
      <Card className="m-4 bg-gradient-to-br from-headspace-mint to-headspace-sky border-0">
        <CardContent className="p-6 flex items-start gap-4">
          <Shield className="w-8 h-8 text-primary shrink-0 mt-1" />
          <div><h3 className="font-bold mb-1">Veilige omgeving</h3><p className="text-sm text-foreground/70">Alle berichten worden beoordeeld door een coach.</p></div>
        </CardContent>
      </Card>
      <div className="px-4 space-y-4 mb-24">
        {mockCommunityPosts.map((post) => (
          <Card key={post.id} className="border-0">
            <CardContent className="p-0">
              <div className="p-6 pb-4 flex items-center gap-3">
                <div className="text-5xl">{post.authorAvatar}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2"><span className="font-bold">{post.authorName}</span><Badge variant="outline" className="text-xs">Level {post.authorLevel}</Badge></div>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                </div>
              </div>
              <div className="px-6 pb-4"><p className="text-foreground line-clamp-3">{post.content}</p></div>
            </CardContent>
          </Card>
        ))}
      </div>
      {!showNewPost && <button onClick={() => setShowNewPost(true)} className="fixed bottom-24 right-6 w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full shadow-lg flex items-center justify-center z-50 hover:scale-110 active:scale-95 transition-transform"><Plus className="w-8 h-8 text-primary-foreground" /></button>}
      {showNewPost && (
        <div className="fixed inset-0 bg-background z-50 flex flex-col">
          <div className="p-4 border-b flex items-center justify-between"><h2 className="text-xl font-bold">Deel je succes</h2><Button variant="ghost" size="icon" onClick={() => setShowNewPost(false)}><X className="w-5 h-5" /></Button></div>
          <div className="flex-1 p-6"><Textarea placeholder="Deel je succes..." value={newPostContent} onChange={(e) => setNewPostContent(e.target.value)} className="min-h-[200px] text-lg border-0 bg-muted/30 rounded-3xl p-6" /></div>
          <div className="p-6 border-t"><Button size="lg" onClick={handlePost} disabled={!newPostContent.trim()} className="w-full rounded-full">Plaatsen</Button></div>
        </div>
      )}
      <BottomNav />
    </div>
  );
};

export default Community;
