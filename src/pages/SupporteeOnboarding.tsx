import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { WizardProgress } from "@/components/WizardProgress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Check, Globe, GraduationCap, Target, Shield, Sparkles } from "lucide-react";
import { SupporteeProfile } from "@/types/supportee";
import { toast } from "sonner";
import peerLogo from "@/assets/peer-logo.png";

const TOTAL_STEPS = 5;

const SupporteeOnboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [profile, setProfile] = useState<Partial<SupporteeProfile>>({
    language: "nl",
    languageLevel: "intermediate",
    personalInfo: { name: "", class: "", school: "" },
    interests: [],
    goals: "",
    expectations: "",
    privacyConsent: false,
  });

  const stepLabels = ["Taal", "Info", "Doelen", "Veiligheid", "Klaar"];

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save to localStorage and redirect
      const completedProfile: SupporteeProfile = {
        id: "supportee-demo",
        ...profile as any,
        completedAt: new Date(),
        currentStep: TOTAL_STEPS,
        xp: 0,
        sessionsCompleted: 0,
        status: "active",
      };
      localStorage.setItem("supporteeProfile", JSON.stringify(completedProfile));
      toast.success("Profiel voltooid! Welkom bij Peer2Peer 🎉");
      navigate("/supportee/hub");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return profile.language && profile.languageLevel;
      case 2:
        return profile.personalInfo?.name && profile.personalInfo?.class;
      case 3:
        return profile.goals && profile.interests && profile.interests.length > 0;
      case 4:
        return profile.privacyConsent;
      case 5:
        return true;
      default:
        return false;
    }
  };

  const toggleInterest = (interest: string) => {
    const current = profile.interests || [];
    if (current.includes(interest)) {
      setProfile({ ...profile, interests: current.filter((i) => i !== interest) });
    } else {
      setProfile({ ...profile, interests: [...current, interest] });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border px-6 py-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-4">
            <img src={peerLogo} alt="Peer2Peer" className="h-12 w-auto" />
          </div>
          <h1 className="text-2xl font-bold text-center text-foreground mb-2">Supportee Onboarding</h1>
          <p className="text-center text-muted-foreground">Welkom! We maken jouw profiel in 5 stappen</p>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white border-b border-border px-6 py-4">
        <div className="max-w-3xl mx-auto">
          <WizardProgress currentStep={currentStep} totalSteps={TOTAL_STEPS} labels={stepLabels} />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-8">
        <Card className="p-8">
          {/* Step 1: Language */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Taalvoorkeur</h2>
                  <p className="text-muted-foreground">In welke taal voel jij je het meest comfortabel?</p>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Kies je taal</Label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "nl", label: "Nederlands 🇳🇱" },
                    { value: "en", label: "English 🇬🇧" },
                  ].map((lang) => (
                    <button
                      key={lang.value}
                      onClick={() => setProfile({ ...profile, language: lang.value as any })}
                      className={`p-4 rounded-lg border-2 transition ${
                        profile.language === lang.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <p className="font-semibold">{lang.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label>Wat is je taalniveau?</Label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: "beginner", label: "Beginner", desc: "Basis niveau" },
                    { value: "intermediate", label: "Gemiddeld", desc: "Goed niveau" },
                    { value: "advanced", label: "Gevorderd", desc: "Hoog niveau" },
                  ].map((level) => (
                    <button
                      key={level.value}
                      onClick={() => setProfile({ ...profile, languageLevel: level.value as any })}
                      className={`p-4 rounded-lg border-2 transition ${
                        profile.languageLevel === level.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <p className="font-semibold text-sm">{level.label}</p>
                      <p className="text-xs text-muted-foreground">{level.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Personal Info */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Persoonlijke informatie</h2>
                  <p className="text-muted-foreground">Vertel ons iets meer over jezelf</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Je naam</Label>
                  <Input
                    id="name"
                    placeholder="Bijv. Lisa"
                    value={profile.personalInfo?.name}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        personalInfo: { ...profile.personalInfo!, name: e.target.value },
                      })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="class">Klas</Label>
                  <Input
                    id="class"
                    placeholder="Bijv. 3A"
                    value={profile.personalInfo?.class}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        personalInfo: { ...profile.personalInfo!, class: e.target.value },
                      })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="school">School (optioneel)</Label>
                  <Input
                    id="school"
                    placeholder="Bijv. Montessori College"
                    value={profile.personalInfo?.school}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        personalInfo: { ...profile.personalInfo!, school: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Goals & Interests */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Jouw doelen</h2>
                  <p className="text-muted-foreground">Waar wil je aan werken?</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Kies je interesses (selecteer minimaal 1)</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {[
                      "Rekenen",
                      "Nederlands",
                      "Engels",
                      "Presenteren",
                      "Time management",
                      "Motivatie",
                      "Samenwerken",
                      "Plannen",
                    ].map((interest) => (
                      <Badge
                        key={interest}
                        variant={profile.interests?.includes(interest) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleInterest(interest)}
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="goals">Wat zijn je doelen?</Label>
                  <Textarea
                    id="goals"
                    placeholder="Bijv. Meer zelfvertrouwen bij presentaties en beter plannen..."
                    value={profile.goals}
                    onChange={(e) => setProfile({ ...profile, goals: e.target.value })}
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="expectations">Wat verwacht je van je buddy? (optioneel)</Label>
                  <Textarea
                    id="expectations"
                    placeholder="Bijv. Wekelijks contact en concrete tips..."
                    value={profile.expectations}
                    onChange={(e) => setProfile({ ...profile, expectations: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Safety */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Veiligheid & Privacy</h2>
                  <p className="text-muted-foreground">Zo werken we samen veilig</p>
                </div>
              </div>

              <div className="space-y-4">
                <Card className="p-4 bg-muted/50 border-0">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    Hoe werkt buddy matching?
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-7">
                    <li>• AI maakt een voorstel gebaseerd op jouw doelen</li>
                    <li>• Een coach controleert de match</li>
                    <li>• Jij beslist of je de buddy accepteert</li>
                    <li>• Alles is vrijblijvend en veilig</li>
                  </ul>
                </Card>

                <Card className="p-4 bg-muted/50 border-0">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    Privacy & Beveiliging
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-7">
                    <li>• Al je data blijft binnen school</li>
                    <li>• Coaches kunnen meelezen voor veiligheid</li>
                    <li>• Je bepaalt zelf wat je deelt op community</li>
                    <li>• Je kunt altijd stoppen of pauzeren</li>
                  </ul>
                </Card>

                <div className="flex items-start gap-3 p-4 border-2 border-primary/30 rounded-lg">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={profile.privacyConsent}
                    onChange={(e) => setProfile({ ...profile, privacyConsent: e.target.checked })}
                    className="mt-1"
                  />
                  <label htmlFor="consent" className="text-sm flex-1 cursor-pointer">
                    Ik begrijp hoe buddy matching werkt en ga akkoord met de privacy voorwaarden. Ik weet dat een
                    coach kan meelezen voor veiligheid.
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Complete */}
          {currentStep === 5 && (
            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <div className="p-6 rounded-full bg-gradient-to-br from-primary to-primary/60">
                  <Sparkles className="h-12 w-12 text-white" />
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Profiel compleet! 🎉</h2>
                <p className="text-lg text-muted-foreground">
                  Welkom {profile.personalInfo?.name}! Je bent nu klaar om te starten.
                </p>
              </div>

              <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <h3 className="font-semibold text-lg mb-3">Je hebt je eerste badge verdiend!</h3>
                <div className="inline-flex items-center gap-3 bg-white px-6 py-4 rounded-lg shadow-sm">
                  <span className="text-4xl">🎯</span>
                  <div className="text-left">
                    <p className="font-bold text-foreground">Starter Badge</p>
                    <p className="text-sm text-muted-foreground">+10 XP</p>
                  </div>
                </div>
              </Card>

              <div className="space-y-2">
                <h3 className="font-semibold">Volgende stappen:</h3>
                <div className="grid gap-3 text-left">
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                      1
                    </div>
                    <p className="text-sm">Dien je eerste hulpvraag in</p>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                      2
                    </div>
                    <p className="text-sm">Bekijk buddy matches</p>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                      3
                    </div>
                    <p className="text-sm">Plan je eerste sessie</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Vorige
            </Button>
            <Button onClick={handleNext} disabled={!canProceed()}>
              {currentStep === TOTAL_STEPS ? "Start met Peer2Peer" : "Volgende"}
              {currentStep < TOTAL_STEPS && <ArrowRight className="h-4 w-4 ml-2" />}
            </Button>
          </div>

          {currentStep < TOTAL_STEPS && (
            <p className="text-center text-sm text-muted-foreground mt-4">
              Stap {currentStep} van {TOTAL_STEPS}
            </p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default SupporteeOnboarding;
