import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { mockLibraryItems } from "@/lib/mockSupporteeData";

const Library = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="px-6 py-8">
        <h1 className="text-2xl font-bold mb-6">Bibliotheek</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockLibraryItems.map((item) => (
            <Card key={item.id} className="p-6">
              <div className="text-4xl mb-3">{item.thumbnail}</div>
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Library;
