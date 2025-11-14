import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { mockCommunityPosts } from "@/lib/mockSupporteeData";

const Community = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="px-6 py-8 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Community</h1>
        <div className="space-y-4">
          {mockCommunityPosts.map((post) => (
            <Card key={post.id} className="p-6">
              <div className="flex items-start gap-3">
                <div className="text-3xl">👤</div>
                <div className="flex-1">
                  <p className="font-semibold">{post.authorName}</p>
                  <p className="text-sm text-muted-foreground mb-2">{post.authorLevel}</p>
                  <p className="text-sm">{post.content}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
