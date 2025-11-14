import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockBuddies } from "@/lib/mockBuddies";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { toast } from "sonner";

const Matches = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="px-6 py-8 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Buddy Matches</h1>
        
        <div className="space-y-4">
          {mockBuddies.map((buddy) => (
            <Card key={buddy.id} className="p-6">
              <div className="flex items-start gap-4">
                <div className="text-5xl">{buddy.avatar}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold">{buddy.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{buddy.class} • {buddy.level}</p>
                  <p className="text-sm mb-3">{buddy.bio}</p>
                  <div className="flex gap-2 mb-3">
                    {buddy.expertise.map((skill) => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                  <Button onClick={() => { toast.success("Match geaccepteerd!"); navigate("/sessions"); }}>
                    <Check className="h-4 w-4 mr-2" />Accepteer
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Matches;
