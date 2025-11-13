import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navigation } from "@/components/Navigation";
import {
  Search,
  Clock,
  Users,
  BookOpen,
  Lightbulb,
  Heart,
  Brain,
  Target,
  Star,
  Bookmark,
} from "lucide-react";

type ContentType = "energizer" | "icebreaker" | "didactic" | "subject" | "reflection";

interface LibraryContent {
  id: string;
  type: ContentType;
  title: string;
  description: string;
  duration: number; // minutes
  groupSize: { min: number; max: number };
  difficulty: "beginner" | "intermediate" | "advanced";
  rating: number;
  bookmarked: boolean;
}

const mockContent: LibraryContent[] = [
  {
    id: "1",
    type: "energizer",
    title: "Duimen Check-out",
    description: "Snelle ronde waar iedereen met duim aangeeft hoe het gaat. Simpel maar effectief om de sfeer te peilen.",
    duration: 5,
    groupSize: { min: 3, max: 30 },
    difficulty: "beginner",
    rating: 4.5,
    bookmarked: true,
  },
  {
    id: "2",
    type: "energizer",
    title: "Popcorn Reflectie",
    description: "Iedereen noemt willekeurig één woord dat de sessie samenvat. Geen volgorde, gewoon 'popcorn' style.",
    duration: 10,
    groupSize: { min: 5, max: 20 },
    difficulty: "beginner",
    rating: 4.8,
    bookmarked: false,
  },
  {
    id: "3",
    type: "icebreaker",
    title: "Vind je Partner",
    description: "Iedereen krijgt een kaartje en moet zijn/haar matching partner vinden. Leuk om groepen te vormen!",
    duration: 15,
    groupSize: { min: 6, max: 30 },
    difficulty: "beginner",
    rating: 4.3,
    bookmarked: false,
  },
  {
    id: "4",
    type: "didactic",
    title: "Actief Luisteren Technieken",
    description: "5 concrete tips om beter te luisteren: parafraseren, doorvragen, samenvatten, bevestigen, en non-verbale signalen.",
    duration: 20,
    groupSize: { min: 2, max: 4 },
    difficulty: "intermediate",
    rating: 4.9,
    bookmarked: true,
  },
  {
    id: "5",
    type: "didactic",
    title: "Feedback Geven Framework",
    description: "De sandwich-methode: Begin met positief, geef constructieve feedback, sluit af met bemoediging.",
    duration: 15,
    groupSize: { min: 2, max: 10 },
    difficulty: "intermediate",
    rating: 4.7,
    bookmarked: false,
  },
  {
    id: "6",
    type: "subject",
    title: "Breuken Rekenen Tips",
    description: "Visuele trucs om breukrekenen makkelijker te maken. Inclusief pizza-methode en kruislings vermenigvuldigen.",
    duration: 30,
    groupSize: { min: 1, max: 5 },
    difficulty: "beginner",
    rating: 4.6,
    bookmarked: false,
  },
  {
    id: "7",
    type: "reflection",
    title: "Competentie Rubrics Uitgelegd",
    description: "Uitleg van de 12 competenties: Verbinding, Eigenaarschap en Groei. Met voorbeelden per niveau (0-4).",
    duration: 25,
    groupSize: { min: 1, max: 100 },
    difficulty: "beginner",
    rating: 4.8,
    bookmarked: true,
  },
  {
    id: "8",
    type: "energizer",
    title: "Stretch & Shake",
    description: "Korte bewegingsoefening: armen strekken, schouders rollen, hoofd draaien. Geeft energie!",
    duration: 3,
    groupSize: { min: 1, max: 100 },
    difficulty: "beginner",
    rating: 4.2,
    bookmarked: false,
  },
];

const Library = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<ContentType | "all">("all");
  const [content] = useState<LibraryContent[]>(mockContent);

  const filteredContent = content.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getCategoryIcon = (type: ContentType) => {
    const icons = {
      energizer: Lightbulb,
      icebreaker: Heart,
      didactic: Brain,
      subject: BookOpen,
      reflection: Target,
    };
    return icons[type];
  };

  const getCategoryLabel = (type: ContentType) => {
    const labels = {
      energizer: "Energizer",
      icebreaker: "Icebreaker",
      didactic: "Didactiek",
      subject: "Vak-specifiek",
      reflection: "Reflectie",
    };
    return labels[type];
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      beginner: "bg-peer-teal/10 text-peer-teal",
      intermediate: "bg-peer-orange/10 text-peer-orange",
      advanced: "bg-peer-purple/10 text-peer-purple",
    };
    return colors[difficulty as keyof typeof colors];
  };

  const bookmarkedCount = content.filter((item) => item.bookmarked).length;

  return (
    <div className="min-h-screen bg-gradient-soft pb-20">
      <Navigation />
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-foreground">Bibliotheek</h1>
            <p className="text-sm text-muted-foreground">
              Oefeningen, tips en materialen
            </p>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Zoek oefeningen, tips..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Tabs */}
        <Tabs value={selectedType} onValueChange={(v) => setSelectedType(v as ContentType | "all")}>
          <TabsList className="w-full justify-start overflow-x-auto mb-6">
            <TabsTrigger value="all">Alles</TabsTrigger>
            <TabsTrigger value="energizer">Energizers</TabsTrigger>
            <TabsTrigger value="icebreaker">Icebreakers</TabsTrigger>
            <TabsTrigger value="didactic">Didactiek</TabsTrigger>
            <TabsTrigger value="subject">Vak-specifiek</TabsTrigger>
            <TabsTrigger value="reflection">Reflectie</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedType} className="mt-0">
            {/* Stats */}
            <div className="flex gap-3 mb-6">
              <Card className="flex-1 p-4 bg-card">
                <div className="text-sm text-muted-foreground">Gevonden</div>
                <div className="text-2xl font-bold text-foreground">
                  {filteredContent.length}
                </div>
              </Card>
              <Card className="flex-1 p-4 bg-card">
                <div className="text-sm text-muted-foreground">Bewaard</div>
                <div className="text-2xl font-bold text-foreground flex items-center gap-2">
                  {bookmarkedCount}
                  <Bookmark className="h-5 w-5 text-peer-orange" />
                </div>
              </Card>
            </div>

            {/* Content Grid */}
            {filteredContent.length === 0 ? (
              <Card className="p-8 text-center bg-card">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  Geen resultaten
                </h3>
                <p className="text-muted-foreground">
                  Probeer een andere zoekterm of filter
                </p>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredContent.map((item) => {
                  const Icon = getCategoryIcon(item.type);
                  return (
                    <Card
                      key={item.id}
                      className="p-4 hover:shadow-md transition-all cursor-pointer bg-card border-border"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-lg bg-peer-teal/10">
                            <Icon className="h-5 w-5 text-peer-teal" />
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {getCategoryLabel(item.type)}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <Bookmark
                            className={`h-4 w-4 ${
                              item.bookmarked
                                ? "fill-peer-orange text-peer-orange"
                                : "text-muted-foreground"
                            }`}
                          />
                        </Button>
                      </div>

                      <h3 className="font-semibold text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {item.description}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {item.duration} min
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {item.groupSize.min}-{item.groupSize.max}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-peer-yellow text-peer-yellow" />
                          {item.rating}
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-border">
                        <Badge
                          variant="secondary"
                          className={getDifficultyColor(item.difficulty)}
                        >
                          {item.difficulty === "beginner" && "Beginner"}
                          {item.difficulty === "intermediate" && "Gemiddeld"}
                          {item.difficulty === "advanced" && "Gevorderd"}
                        </Badge>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Library;
