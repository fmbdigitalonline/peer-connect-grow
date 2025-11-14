import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BottomNav } from "@/components/BottomNav";
import { ArrowLeft, Play } from "lucide-react";
import { mockLibraryItems } from "@/lib/mockSupporteeData";

const Library = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (selectedItem) {
    const item = mockLibraryItems.find(i => i.id === selectedItem);
    if (!item) return null;

    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="p-4">
          <Button variant="ghost" onClick={() => setSelectedItem(null)} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />Terug
          </Button>
          <Card className="border-0 overflow-hidden mb-6">
            <div className="aspect-video bg-muted flex items-center justify-center relative">
              <Play className="w-16 h-16 text-primary" />
            </div>
          </Card>
          <div className="space-y-6">
            <div>
              <Badge className="mb-2">{item.category}</Badge>
              <h1 className="text-3xl font-bold mb-2">{item.title}</h1>
              <p className="text-foreground/70">{item.description}</p>
            </div>
            <div className="flex gap-3">
              <Button size="lg" className="flex-1 rounded-full">Start</Button>
            </div>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  const item = mockLibraryItems[currentIndex];
  const gradients = ["from-headspace-peach to-headspace-pink", "from-headspace-sky to-headspace-lavender", "from-headspace-mint to-headspace-sky"];

  return (
    <div className="min-h-screen bg-background">
      <div className="h-screen snap-y snap-mandatory overflow-y-scroll scrollbar-hide">
        <div className="snap-start h-[90vh] mx-4 my-8">
          <Card className={`h-full border-0 bg-gradient-to-br ${gradients[currentIndex % gradients.length]} cursor-pointer`} onClick={() => setSelectedItem(item.id)}>
            <Badge className="absolute top-6 right-6 z-10 bg-white/80 text-foreground">{item.category}</Badge>
            <CardContent className="h-full flex flex-col items-center justify-between p-8">
              <div className="flex-1 flex items-center justify-center">
                <div className="text-9xl animate-bounce-in">{item.thumbnail}</div>
              </div>
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold leading-tight max-w-md">{item.title}</h2>
                <p className="text-sm text-foreground/80 animate-pulse">Tap om te starten ↑</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Library;
