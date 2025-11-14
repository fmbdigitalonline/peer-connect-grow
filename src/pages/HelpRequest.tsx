import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Check, Sparkles, Clock, Save } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { toast } from "sonner";

type MoodEmoji = "😊" | "🙂" | "😐" | "😕" | "😔";

const subjects = [
  { id: "wiskunde", name: "Wiskunde", icon: "📐" },
  { id: "nederlands", name: "Nederlands", icon: "📚" },
  { id: "engels", name: "Engels", icon: "🇬🇧" },
  { id: "biologie", name: "Biologie", icon: "🧬" },
];

const HelpRequestPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [mood, setMood] = useState<MoodEmoji>("🙂");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const moods: MoodEmoji[] = ["😊", "🙂", "😐", "😕", "😔"];

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      toast.success("Hulpvraag ingediend!");
      navigate("/matches");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="px-6 py-8 max-w-2xl mx-auto">
        <Card className="p-8">
          <h1 className="text-2xl font-bold mb-6">Hulpvraag indienen</h1>
          
          {step === 1 && (
            <div className="space-y-4">
              <Label>Hoe voel je je?</Label>
              <div className="flex gap-3">
                {moods.map((m) => (
                  <button
                    key={m}
                    onClick={() => setMood(m)}
                    className={`text-4xl p-4 rounded-lg border-2 ${mood === m ? "border-primary" : "border-border"}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <Label>Kies een vak</Label>
              <div className="grid grid-cols-2 gap-3">
                {subjects.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSubject(s.id)}
                    className={`p-4 rounded-lg border-2 ${subject === s.id ? "border-primary bg-primary/5" : "border-border"}`}
                  >
                    <span className="text-2xl mr-2">{s.icon}</span>
                    {s.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <Label>Beschrijf je vraag</Label>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={6} />
            </div>
          )}

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={() => setStep(step - 1)} disabled={step === 1}>
              <ArrowLeft className="h-4 w-4 mr-2" />Vorige
            </Button>
            <Button onClick={handleNext}>
              {step === 3 ? "Indienen" : "Volgende"}<ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HelpRequestPage;
