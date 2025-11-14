import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockLibraryItems } from "@/lib/mockSupporteeData";
import { Star, Clock, Users, Play } from "lucide-react";

const Library = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const selectedLibraryItem = mockLibraryItems.find((item) => item.id === selectedItem);

  return (
    <div className="min-h-screen bg-background pb-24">
      <Navigation />

      <div className="bg-card border-b px-6 py-4">
        <h1 className="text-xl font-bold">Bibliotheek</h1>
        <p className="text-sm text-muted-foreground">Microlearning op jouw niveau</p>
      </div>

      {selectedItem && selectedLibraryItem ? (
        <div className="px-6 py-6 max-w-4xl mx-auto">
          <Button variant="ghost" onClick={() => setSelectedItem(null)} className="mb-4">
            ← Terug
          </Button>

          <Card className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="text-6xl">{selectedLibraryItem.thumbnail}</div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">{selectedLibraryItem.title}</h2>
                <p className="text-muted-foreground mb-3">{selectedLibraryItem.description}</p>
                <div className="flex gap-2">
                  <Badge>{selectedLibraryItem.category}</Badge>
                  <Badge variant="outline">{selectedLibraryItem.duration}</Badge>
                </div>
              </div>
            </div>

            <div className="bg-muted rounded-lg aspect-video flex items-center justify-center mb-6">
              <div className="text-center">
                <Play className="h-16 w-16 mx-auto mb-2 text-primary" />
                <p className="text-sm">Video placeholder</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-3">Stappen</h3>
              <ol className="space-y-2">
                {selectedLibraryItem.instructions.map((instruction, idx) => (
                  <li key={idx} className="flex gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                      {idx + 1}
                    </div>
                    <p className="text-sm pt-1">{instruction}</p>
                  </li>
                ))}
              </ol>
            </div>
          </Card>
        </div>
      ) : (
        <div className="px-6 py-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockLibraryItems.map((item) => (
              <Card
                key={item.id}
                className="p-5 cursor-pointer hover:shadow-lg transition"
                onClick={() => setSelectedItem(item.id)}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="text-5xl">{item.thumbnail}</div>
                  <div className="flex-1">
                    <h3 className="font-bold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Badge variant="outline">{item.category}</Badge>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {item.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                      {item.rating}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Library;
