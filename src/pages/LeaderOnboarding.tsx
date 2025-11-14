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
  Target,
  Shield,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Users,
  Flag,
  MessageSquare,
  Award,
} from "lucide-react";

interface LeaderProfile {
  currentLevel: string;
  buddySessions: number;
  motivation: string;
  moderationAgreed: boolean;
  leadershipAgreed: boolean;
}

export default function LeaderOnboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [profile, setProfile] = useState<LeaderProfile>({
    currentLevel: "Leader",
    buddySessions: 10,
    motivation: "",
    moderationAgreed: false,
    leadershipAgreed: false,
  });

  const totalSteps = 4;
  const stepLabels = ["Level Check", "Moderatie", "Leiderschap", "Akkoord"];

  const handleNext = () => {
    if (currentStep === 1) {
      if (profile.currentLevel !== "Leader" || profile.buddySessions < 10) {
        toast.error("Je hebt minimaal Leader level en 10 buddy sessies nodig");
        return;
      }
      setCurrentStep(2);
      return;
    }
    
    if (currentStep === 2) {
      if (!profile.moderationAgreed) {
        toast.error("Accepteer de moderatie richtlijnen om door te gaan");
        return;
      }
      setCurrentStep(3);
      return;
    }

    if (currentStep === 3) {
      if (!profile.leadershipAgreed) {
        toast.error("Accepteer de leiderschap principes om door te gaan");
        return;
      }
      setCurrentStep(4);
      return;
    }

    if (currentStep === 4) {
      handleComplete();
    }
  };

  const handleComplete = () => {
    const completedProfile = {
      ...profile,
      completedAt: new Date(),
      role: "peerLeader",
      status: "active",
    };
    
    localStorage.setItem("leaderProfile", JSON.stringify(completedProfile));
    localStorage.setItem("userRole", "peerLeader");
    
    toast.success("Profiel voltooid! Welkom als Peer Leader 🎉");
    navigate("/leader/hub");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <Badge variant="secondary" className="gap-2">
            <Target className="h-3 w-3" />
            Peer Leader Onboarding
          </Badge>
          <h1 className="text-3xl font-bold text-foreground">Word een Peer Leader</h1>
          <p className="text-muted-foreground">
            Extra verantwoordelijkheden voor ervaren buddies
          </p>
        </div>

        <WizardProgress currentStep={currentStep} totalSteps={totalSteps} labels={stepLabels} />

        <Card>
          <CardHeader>
            <CardTitle>
              {currentStep === 1 && "Level Check"}
              {currentStep === 2 && "Moderatie Richtlijnen"}
              {currentStep === 3 && "Leiderschap Principes"}
              {currentStep === 4 && "Bevestiging"}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Controleer je voortgang en ervaring"}
              {currentStep === 2 && "Leer hoe je de community veilig houdt"}
              {currentStep === 3 && "Begrijp je rol als groepsleider"}
              {currentStep === 4 && "Laatste stap: bevestig je commitment"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Vereisten voor Peer Leader
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-7">
                    <li>✓ Minimaal Leader level bereikt</li>
                    <li>✓ Minimaal 10 voltooide buddy sessies</li>
                    <li>✓ Minimaal 5 peer feedbacks ontvangen</li>
                    <li>✓ Coach goedkeuring</li>
                  </ul>
                </div>

                <div>
                  <Label htmlFor="level">Huidig Level</Label>
                  <Input
                    id="level"
                    value={profile.currentLevel}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Je huidige level op basis van je buddy activiteiten
                  </p>
                </div>

                <div>
                  <Label htmlFor="sessions">Aantal Voltooide Buddy Sessies</Label>
                  <Input
                    id="sessions"
                    type="number"
                    value={profile.buddySessions}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Minimaal 10 sessies vereist
                  </p>
                </div>

                <div>
                  <Label htmlFor="motivation">Waarom wil je Peer Leader worden?</Label>
                  <Input
                    id="motivation"
                    placeholder="Deel je motivatie..."
                    value={profile.motivation}
                    onChange={(e) => setProfile({ ...profile, motivation: e.target.value })}
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <Card className="p-4 bg-primary/5 border-primary/20">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Flag className="h-4 w-4 text-primary" />
                      Community Moderatie
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Je kunt posts highlighten die inspirerend of leerzaam zijn</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Je flaggt posts die ongepast zijn of veiligheidsrisico's vormen</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Je escaleert complexe situaties altijd naar een coach</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Je respecteert privacy en communiceert empathisch</span>
                      </li>
                    </ul>
                  </Card>

                  <Card className="p-4 bg-muted/50">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Themaweken & Highlights
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Als Peer Leader kun je themaweken starten (bijv. "Welzijn Week") en posts highlighten 
                      om positieve verhalen zichtbaarder te maken. Zo help je de community groeien.
                    </p>
                  </Card>

                  <Card className="p-4 bg-muted/50">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Shield className="h-4 w-4 text-destructive" />
                      Rode Vlaggen
                    </h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Pesten of intimidatie</li>
                      <li>• Delen van persoonlijke contactgegevens</li>
                      <li>• Ongepaste taal of content</li>
                      <li>• Signalen van crisis (altijd direct naar coach)</li>
                    </ul>
                  </Card>
                </div>

                <div className="flex items-start gap-3 p-4 border border-border rounded-lg">
                  <Checkbox
                    id="moderation"
                    checked={profile.moderationAgreed}
                    onCheckedChange={(checked) =>
                      setProfile({ ...profile, moderationAgreed: checked as boolean })
                    }
                  />
                  <Label htmlFor="moderation" className="cursor-pointer text-sm leading-relaxed">
                    Ik begrijp mijn rol als community moderator en zal posts fair en empathisch beoordelen.
                    Ik escaleer complexe situaties naar coaches.
                  </Label>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <Card className="p-4 bg-primary/5 border-primary/20">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      Groepsfacilitatie
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Je maakt buddy-cirkels en challenges voor groepsontwikkeling</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Je host groepsreflecties en zorgt dat iedereen aan bod komt</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Je gebruikt rubrics om groei te volgen en feedback te geven</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Je stimuleert participatie zonder te pushen</span>
                      </li>
                    </ul>
                  </Card>

                  <Card className="p-4 bg-muted/50">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Challenge Builder
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Je krijgt toegang tot de challenge builder waarmee je wekelijkse of maandelijkse 
                      challenges kunt maken voor buddy-cirkels. Denk aan: "Check-in over welbevinden" 
                      of "Deel een leersucces".
                    </p>
                  </Card>

                  <Card className="p-4 bg-muted/50">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Jouw Ontwikkeling
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Als Peer Leader bouw je leiderschap, groepsfacilitatie en coaching vaardigheden op. 
                      Dit kan een opstap zijn naar een rol als Trainer of Coach binnen het programma.
                    </p>
                  </Card>
                </div>

                <div className="flex items-start gap-3 p-4 border border-border rounded-lg">
                  <Checkbox
                    id="leadership"
                    checked={profile.leadershipAgreed}
                    onCheckedChange={(checked) =>
                      setProfile({ ...profile, leadershipAgreed: checked as boolean })
                    }
                  />
                  <Label htmlFor="leadership" className="cursor-pointer text-sm leading-relaxed">
                    Ik begrijp de extra verantwoordelijkheden als Peer Leader en commitment om 
                    groepen effectief te faciliteren en een positieve community te helpen bouwen.
                  </Label>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center space-y-4 py-6">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <Sparkles className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Bijna klaar!</h3>
                  <p className="text-muted-foreground max-w-lg mx-auto">
                    Je hebt alle stappen doorlopen. Klik op "Voltooien" om je Peer Leader status te activeren.
                  </p>
                </div>

                <Card className="p-6 bg-gradient-to-r from-primary/10 to-transparent border-primary/20">
                  <h3 className="font-semibold text-foreground mb-4">Wat gebeurt er nu?</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Een coach beoordeelt je aanvraag binnen 24 uur</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Je krijgt toegang tot moderatie tools en de challenge builder</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Je kunt buddy-cirkels maken en groepsreflecties hosten</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Je badge wordt geüpdatet naar "Peer Leader"</span>
                    </li>
                  </ul>
                </Card>
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
