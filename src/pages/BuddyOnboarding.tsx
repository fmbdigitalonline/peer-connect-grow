import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { WizardProgress } from "@/components/WizardProgress";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Users,
  Clock,
  BookOpen,
  Shield,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

const subjects = [
  "Wiskunde", "Nederlands", "Engels", "Geschiedenis", "Aardrijkskunde",
  "Biologie", "Scheikunde", "Natuurkunde", "Economie", "Frans", "Duits",
];

const availabilitySlots = [
  "Ma 14:00", "Ma 15:00", "Ma 16:00",
  "Di 14:00", "Di 15:00", "Di 16:00",
  "Wo 14:00", "Wo 15:00", "Wo 16:00",
  "Do 14:00", "Do 15:00", "Do 16:00",
  "Vr 14:00", "Vr 15:00", "Vr 16:00",
];

interface BuddyProfile {
  name: string;
  class: string;
  expertise: string[];
  availability: string[];
  motivation: string;
  safetyAgreed: boolean;
}

export default function BuddyOnboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [profile, setProfile] = useState<BuddyProfile>({
    name: "",
    class: "",
    expertise: [],
    availability: [],
    motivation: "",
    safetyAgreed: false,
  });

  const totalSteps = 5;
  const stepLabels = ["Welkom", "Profiel", "Expertise", "Beschikbaarheid", "Veiligheid"];

  const handleNext = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
      return;
    }
    
    if (currentStep === 2) {
      if (!profile.name || !profile.class) {
        toast.error("Vul je naam en klas in");
        return;
      }
      setCurrentStep(3);
      return;
    }

    if (currentStep === 3) {
      if (profile.expertise.length === 0) {
        toast.error("Selecteer minimaal 1 vakgebied");
        return;
      }
      setCurrentStep(4);
      return;
    }

    if (currentStep === 4) {
      if (profile.availability.length === 0) {
        toast.error("Selecteer minimaal 1 tijdslot");
        return;
      }
      setCurrentStep(5);
      return;
    }

    if (currentStep === 5) {
      if (!profile.safetyAgreed) {
        toast.error("Accepteer de veiligheidsrichtlijnen om door te gaan");
        return;
      }
      handleComplete();
    }
  };

  const handleComplete = () => {
    const completedProfile = {
      ...profile,
      completedAt: new Date(),
      xp: 0,
      sessionsCompleted: 0,
      status: "active",
      level: "Starter",
    };
    
    localStorage.setItem("buddyProfile", JSON.stringify(completedProfile));
    localStorage.setItem("userRole", "buddy");
    
    toast.success("Profiel voltooid! Welkom als Buddy 🎉");
    navigate("/buddy/hub");
  };

  const toggleExpertise = (subject: string) => {
    setProfile((prev) => ({
      ...prev,
      expertise: prev.expertise.includes(subject)
        ? prev.expertise.filter((s) => s !== subject)
        : [...prev.expertise, subject],
    }));
  };

  const toggleAvailability = (slot: string) => {
    setProfile((prev) => ({
      ...prev,
      availability: prev.availability.includes(slot)
        ? prev.availability.filter((s) => s !== slot)
        : [...prev.availability, slot],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <Badge variant="secondary" className="gap-2">
            <Users className="h-3 w-3" />
            Buddy Onboarding
          </Badge>
          <h1 className="text-3xl font-bold text-foreground">Word een Buddy</h1>
          <p className="text-muted-foreground">
            Help anderen en bouw je eigen vaardigheden op
          </p>
        </div>

        <WizardProgress currentStep={currentStep} totalSteps={totalSteps} labels={stepLabels} />

        <Card>
          <CardHeader>
            <CardTitle>
              {currentStep === 1 && "Welkom bij Buddy Onboarding"}
              {currentStep === 2 && "Jouw gegevens"}
              {currentStep === 3 && "Jouw expertise"}
              {currentStep === 4 && "Beschikbaarheid"}
              {currentStep === 5 && "Veiligheid & Grenzen"}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Leer wat het betekent om een buddy te zijn"}
              {currentStep === 2 && "Vertel ons iets over jezelf"}
              {currentStep === 3 && "In welke vakken kun je anderen helpen?"}
              {currentStep === 4 && "Wanneer ben je beschikbaar?"}
              {currentStep === 5 && "Belangrijke richtlijnen voor veilige begeleiding"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="p-4 bg-primary/5 border-primary/20">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Wat is een buddy?</h3>
                        <p className="text-sm text-muted-foreground">
                          Je helpt medeleerlingen met schoolvakken, taal of aanpassing aan school.
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 bg-primary/5 border-primary/20">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Veiligheid eerst</h3>
                        <p className="text-sm text-muted-foreground">
                          Je krijgt training over grenzen, privacy en hoe je hulp vraagt als het nodig is.
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 bg-primary/5 border-primary/20">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Groeien samen</h3>
                        <p className="text-sm text-muted-foreground">
                          Je bouwt Future Skills zoals samenwerken, empathie en communicatie.
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 bg-primary/5 border-primary/20">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Portfolio opbouwen</h3>
                        <p className="text-sm text-muted-foreground">
                          Alle reflecties en feedback komen in je eigen portfolio voor je CV.
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Tijdsinvestering
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    De meeste buddies besteden 2-4 uur per week aan hun begeleiding. Je bepaalt zelf je beschikbaarheid.
                  </p>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Naam</Label>
                  <Input
                    id="name"
                    placeholder="Je volledige naam"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="class">Klas</Label>
                  <Input
                    id="class"
                    placeholder="Bijv. 4B of 5A"
                    value={profile.class}
                    onChange={(e) => setProfile({ ...profile, class: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="motivation">Waarom wil je buddy worden? (optioneel)</Label>
                  <Input
                    id="motivation"
                    placeholder="Vertel iets over je motivatie..."
                    value={profile.motivation}
                    onChange={(e) => setProfile({ ...profile, motivation: e.target.value })}
                  />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Selecteer de vakken waarin je anderen kunt helpen. Kies minimaal 1 en maximaal 5 vakken.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {subjects.map((subject) => (
                    <Card
                      key={subject}
                      className={`p-3 cursor-pointer transition-all hover:shadow-md ${
                        profile.expertise.includes(subject)
                          ? "border-primary bg-primary/5"
                          : "border-border"
                      }`}
                      onClick={() => toggleExpertise(subject)}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                            profile.expertise.includes(subject)
                              ? "border-primary bg-primary"
                              : "border-muted-foreground"
                          }`}
                        >
                          {profile.expertise.includes(subject) && (
                            <CheckCircle2 className="h-3 w-3 text-primary-foreground" />
                          )}
                        </div>
                        <span className="text-sm font-medium">{subject}</span>
                      </div>
                    </Card>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Geselecteerd: {profile.expertise.length} / 5
                </p>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Wanneer ben je beschikbaar voor buddy-sessies? Selecteer alle tijdsloten die voor jou werken.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {availabilitySlots.map((slot) => (
                    <Card
                      key={slot}
                      className={`p-3 cursor-pointer transition-all hover:shadow-md ${
                        profile.availability.includes(slot)
                          ? "border-primary bg-primary/5"
                          : "border-border"
                      }`}
                      onClick={() => toggleAvailability(slot)}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                            profile.availability.includes(slot)
                              ? "border-primary bg-primary"
                              : "border-muted-foreground"
                          }`}
                        >
                          {profile.availability.includes(slot) && (
                            <CheckCircle2 className="h-3 w-3 text-primary-foreground" />
                          )}
                        </div>
                        <span className="text-sm font-medium">{slot}</span>
                      </div>
                    </Card>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Geselecteerd: {profile.availability.length} tijdsloten
                </p>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <Card className="p-4 bg-primary/5 border-primary/20">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      Veiligheidsrichtlijnen
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Alle sessies vinden plaats op school of in online omgevingen die door de school worden goedgekeurd</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Je deelt geen persoonlijke contactgegevens buiten het platform</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Bij oncomfortabele situaties meld je dit direct bij een coach of mentor</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Je respecteert privacy en vertrouwelijkheid van je buddy</span>
                      </li>
                    </ul>
                  </Card>

                  <Card className="p-4 bg-muted/50">
                    <h3 className="font-semibold text-foreground mb-2">Grenzen & Ondersteuning</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Je bent geen professional en hoeft dat ook niet te zijn. Als een situatie te complex wordt, 
                      schakel je altijd een coach in. Je wordt getraind om signalen te herkennen.
                    </p>
                  </Card>
                </div>

                <div className="flex items-start gap-3 p-4 border border-border rounded-lg">
                  <Checkbox
                    id="safety"
                    checked={profile.safetyAgreed}
                    onCheckedChange={(checked) =>
                      setProfile({ ...profile, safetyAgreed: checked as boolean })
                    }
                  />
                  <Label htmlFor="safety" className="cursor-pointer text-sm leading-relaxed">
                    Ik heb de veiligheidsrichtlijnen gelezen en begrijp mijn rol en verantwoordelijkheden als buddy.
                    Ik weet dat ik altijd ondersteuning kan vragen van coaches.
                  </Label>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : navigate("/onboarding")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Terug
          </Button>
          <Button onClick={handleNext} className="gap-2">
            {currentStep === totalSteps ? "Voltooien" : "Volgende"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
