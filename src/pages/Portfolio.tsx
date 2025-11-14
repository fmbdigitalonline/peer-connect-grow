import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="px-6 py-8">
        <Card className="p-8 max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Mijn Portfolio</h1>
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-3">Level Practitioner</h2>
              <Progress value={65} className="mb-2" />
              <p className="text-sm text-muted-foreground">65% naar Leader</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-3">Badges</h2>
              <div className="flex gap-3">
                <Badge>Actief Luisteraar 🎧</Badge>
                <Badge>Verbinder 🤝</Badge>
                <Badge>Reflectieheld 💭</Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Portfolio;
