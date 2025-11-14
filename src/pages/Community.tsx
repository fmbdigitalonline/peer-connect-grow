import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { mockCommunityPosts } from "@/lib/mockSupporteeData";
import { Heart, MessageCircle, Plus, Shield } from "lucide-react";
import { toast } from "sonner";

const Community = () => {
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");

  const handlePost = () => {
    if (!newPostContent.trim()) {
      toast.error("Schrijf eerst iets!");
      return;
    }
    toast.success("Post wordt gecontroleerd door een coach...");
    setNewPostContent("");
    setShowNewPost(false);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Navigation />

      <div className="bg-card border-b px-6 py-4">
        <h1 className="text-xl font-bold">Community</h1>
        <p className="text-sm text-muted-foreground">Deel je successen en inspireer anderen</p>
      </div>

      <div className="px-6 py-6 max-w-2xl mx-auto space-y-4">
        <Card className="p-4 bg-muted/50 border-primary/20">
          <div className="flex gap-3">
            <Shield className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-semibold mb-1">Veilige omgeving</p>
              <p className="text-sm text-muted-foreground">
                Alle posts worden gecontroleerd door een coach voordat ze zichtbaar worden.
              </p>
            </div>
          </div>
        </Card>

        {!showNewPost ? (
          <Button onClick={() => setShowNewPost(true)} className="w-full gap-2">
            <Plus className="h-4 w-4" />
            Deel een succesmoment
          </Button>
        ) : (
          <Card className="p-4">
            <Textarea
              placeholder="Deel je succes met anderen..."
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              rows={4}
              className="mb-3"
            />
            <div className="flex gap-2">
              <Button onClick={handlePost}>Plaatsen</Button>
              <Button variant="outline" onClick={() => setShowNewPost(false)}>
                Annuleren
              </Button>
            </div>
          </Card>
        )}

        {mockCommunityPosts.map((post) => (
          <Card key={post.id} className="p-6">
            <div className="flex items-start gap-3 mb-3">
              <div className="text-3xl">👤</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold">{post.authorName}</p>
                  <Badge variant="outline" className="text-xs">
                    {post.authorLevel}
                  </Badge>
                  {post.isSpotlighted && (
                    <Badge className="text-xs">Coach spotlight</Badge>
                  )}
                </div>
                <p className="text-sm">{post.content}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-3 border-t">
              {post.reactions.map((reaction) => (
                <button
                  key={reaction.type}
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition"
                >
                  <span>{reaction.type}</span>
                  <span>{reaction.count}</span>
                </button>
              ))}
              <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition ml-auto">
                <MessageCircle className="h-4 w-4" />
                <span>{post.comments.length}</span>
              </button>
            </div>

            {post.comments.length > 0 && (
              <div className="mt-4 pt-4 border-t space-y-3">
                {post.comments.map((comment, idx) => (
                  <div key={idx} className="flex gap-3 text-sm">
                    <p className="font-semibold">{comment.authorName}:</p>
                    <p className="text-muted-foreground">{comment.content}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Community;
