import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Navigation } from "@/components/Navigation";
import {
  PlayCircle,
  CheckCircle,
  MessageSquare,
  Target,
  Clock,
  Sparkles,
  Camera,
  FileText,
  Link as LinkIcon,
} from "lucide-react";
import { toast } from "sonner";

type MoodEmoji = "😊" | "🙂" | "😐" | "😕" | "😔";
type SessionPhase = "pre" | "active" | "post";

const futureSkills = [
  { id: "communicatie", name: "Communicatie", category: "verbinding" },
  { id: "samenwerken", name: "Samenwerken", category: "verbinding" },
  { id: "eigenaarschap", name: "Eigenaarschap", category: "eigenaarschap" },
  { id: "doorzetten", name: "Doorzettingsvermogen", category: "eigenaarschap" },
  { id: "creativiteit", name: "Creativiteit", category: "groei" },
  { id: "reflecteren", name: "Reflecteren", category: "groei" },
];

const SessionDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [phase, setPhase] = useState<SessionPhase>("pre");
  const [preMood, setPreMood] = useState<MoodEmoji>("🙂");
  const [preGoal, setPreGoal] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [notes, setNotes] = useState("");
  
  const [postMood, setPostMood] = useState<MoodEmoji>("😊");
  const [learnings, setLearnings] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [skillRatings, setSkillRatings] = useState<Record<string, number>>({});

  const moods: MoodEmoji[] = ["😊", "🙂", "😐", "😕", "😔"];
  const moodLabels = {
    "😊": "Super!",
    "🙂": "Goed",
    "😐": "Oké",
    "😕": "Mwah",
    "😔": "Niet goed",
  };

  const handleStartSession = () => {
    if (!preGoal.trim()) {
      toast.error("Voer eerst een doel in");
      return;
    }
    setPhase("active");
    setIsActive(true);
    toast.success("Sessie gestart! 🎯");
  };

  const handleEndSession = () => {
    setIsActive(false);
    setPhase("post");
    toast.success("Sessie beëindigd. Tijd voor reflectie!");
  };

  const toggleSkill = (skillId: string) => {
    if (selectedSkills.includes(skillId)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skillId));
      const newRatings = { ...skillRatings };
      delete newRatings[skillId];
      setSkillRatings(newRatings);
    } else {
      setSelectedSkills([...selectedSkills, skillId]);
      setSkillRatings({ ...skillRatings, [skillId]: 3 });
    }
  };

  const handleSubmitReflection = () => {
    const reflection = {
      sessionId: id,
      preMood,
      preGoal,
      postMood,
      learnings,
      skills: selectedSkills.map((skillId) => ({
        skillId,
        rating: skillRatings[skillId],
      })),
      notes,
      duration: elapsedTime,
      completedAt: new Date().toISOString(),
    };
    
    const reflections = JSON.parse(localStorage.getItem("sessionReflections") || "[]");
    reflections.push(reflection);
    localStorage.setItem("sessionReflections", JSON.stringify(reflections));

    toast.success("Reflectie opgeslagen! +15 XP 🌟");
    setTimeout(() => navigate("/portfolio"), 1000);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Navigation />
      
      <div className="bg-card border-b px-6 py-4">
        <h1 className="text-xl font-bold">Buddy Sessie</h1>
        <p className="text-sm text-muted-foreground">Met Sophie de Vries</p>
      </div>

      <div className="px-6 py-6 max-w-3xl mx-auto space-y-6">
        {phase === "pre" && (
          <>
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Voor de sessie
              </h2>

              <div className="space-y-6">
                <div>
                  <p className="font-semibold mb-3">Hoe voel je je nu?</p>
                  <div className="flex gap-3">
                    {moods.map((m) => (
                      <button
                        key={m}
                        onClick={() => setPreMood(m)}
                        className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition ${
                          preMood === m ? "border-primary bg-primary/5" : "border-border"
                        }`}
                      >
                        <span className="text-3xl">{m}</span>
                        <span className="text-xs">{moodLabels[m]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-semibold block mb-2">
                    Waar wil je vandaag aan werken?
                  </label>
                  <Textarea
                    placeholder="Bijv. Ik wil breuken beter snappen..."
                    value={preGoal}
                    onChange={(e) => setPreGoal(e.target.value)}
                    rows={3}
                  />
                </div>

                <Button onClick={handleStartSession} className="w-full" size="lg">
                  <PlayCircle className="h-5 w-5 mr-2" />
                  Start sessie
                </Button>
              </div>
            </Card>

            <Card className="p-4 bg-muted/50">
              <div className="flex gap-3">
                <Target className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-semibold mb-1">Tip voor deze sessie</p>
                  <p className="text-sm text-muted-foreground">
                    Stel je buddy vragen als je iets niet snapt. Samen leren is leuker dan alleen!
                  </p>
                </div>
              </div>
            </Card>
          </>
        )}

        {phase === "active" && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <PlayCircle className="h-5 w-5 text-primary" />
                Sessie loopt
              </h2>
              <Badge variant="default" className="animate-pulse">Live</Badge>
            </div>

            <div className="space-y-6">
              <div className="text-center p-6 bg-muted/50 rounded-2xl">
                <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-4xl font-bold">
                  {Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, "0")}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Verstreken tijd</p>
              </div>

              <div>
                <p className="font-semibold mb-2">Je doel voor vandaag:</p>
                <Card className="p-3 bg-primary/5 border-primary/20">
                  <p className="text-sm">{preGoal}</p>
                </Card>
              </div>

              <div>
                <label className="font-semibold block mb-2">Notities (optioneel)</label>
                <Textarea
                  placeholder="Wat heb je geleerd? Wat vond je lastig?"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                />
              </div>

              <Button onClick={handleEndSession} variant="outline" className="w-full" size="lg">
                <CheckCircle className="h-5 w-5 mr-2" />
                Beëindig sessie
              </Button>
            </div>
          </Card>
        )}

        {phase === "post" && (
          <>
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Reflectie
              </h2>

              <div className="space-y-6">
                <div>
                  <p className="font-semibold mb-3">Hoe voel je je nu?</p>
                  <div className="flex gap-3">
                    {moods.map((m) => (
                      <button
                        key={m}
                        onClick={() => setPostMood(m)}
                        className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition ${
                          postMood === m ? "border-primary bg-primary/5" : "border-border"
                        }`}
                      >
                        <span className="text-3xl">{m}</span>
                        <span className="text-xs">{moodLabels[m]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-semibold block mb-2">
                    Wat heb je geleerd?
                  </label>
                  <Textarea
                    placeholder="Vertel wat je geleerd hebt tijdens deze sessie..."
                    value={learnings}
                    onChange={(e) => setLearnings(e.target.value)}
                    rows={4}
                  />
                </div>

                <div>
                  <p className="font-semibold mb-2">Aan welke vaardigheden heb je gewerkt?</p>
                  <div className="grid grid-cols-2 gap-2">
                    {futureSkills.map((skill) => (
                      <button
                        key={skill.id}
                        onClick={() => toggleSkill(skill.id)}
                        className={`p-3 rounded-lg border-2 text-left transition ${
                          selectedSkills.includes(skill.id)
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        <p className="font-semibold text-sm">{skill.name}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedSkills.length > 0 && (
                  <div>
                    <p className="font-semibold mb-3">Hoe goed ging het?</p>
                    {selectedSkills.map((skillId) => {
                      const skill = futureSkills.find((s) => s.id === skillId);
                      if (!skill) return null;
                      
                      return (
                        <div key={skillId} className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium">{skill.name}</p>
                            <Badge variant="outline">{skillRatings[skillId]}/5</Badge>
                          </div>
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <button
                                key={rating}
                                onClick={() => setSkillRatings({ ...skillRatings, [skillId]: rating })}
                                className={`flex-1 h-10 rounded-lg border-2 transition ${
                                  skillRatings[skillId] >= rating
                                    ? "border-primary bg-primary text-white"
                                    : "border-border hover:border-primary/50"
                                }`}
                              >
                                {rating}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                <Button 
                  onClick={handleSubmitReflection} 
                  className="w-full" 
                  size="lg"
                  disabled={!learnings.trim() || selectedSkills.length === 0}
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Bewaar reflectie
                </Button>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <div className="flex gap-3">
                <Sparkles className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold mb-1">AI Samenvatting</p>
                  <p className="text-sm text-muted-foreground">
                    Super dat je blijft doorwerken! 💪
                  </p>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default SessionDetail;
