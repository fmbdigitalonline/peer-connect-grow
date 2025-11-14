import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { SupporteeProfile } from "@/types/supportee";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const TOTAL_STEPS = 5;

const interests = [
  { id: "sport", label: "Sport", emoji: "⚽" },
  { id: "art", label: "Kunst", emoji: "🎨" },
  { id: "music", label: "Muziek", emoji: "🎵" },
  { id: "gaming", label: "Gaming", emoji: "🎮" },
  { id: "reading", label: "Lezen", emoji: "📚" },
  { id: "science", label: "Wetenschap", emoji: "🔬" },
];

const SupporteeOnboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [profile, setProfile] = useState<Partial<SupporteeProfile>>({
    personalInfo: { name: "", class: "", school: "" },
    interests: [],
    privacyConsent: false,
  });

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    } else {
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
      toast.success("Profiel voltooid! 🎉");
      navigate("/supportee/hub");
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

  const canProceed = () => {
    switch (currentStep) {
      case 1: return !!profile.language;
      case 2: return !!profile.personalInfo?.name;
      case 3: return profile.interests && profile.interests.length > 0;
      case 4: return profile.privacyConsent;
      case 5: return true;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-headspace-mint via-headspace-sky to-headspace-lavender flex flex-col">
      {/* Thin Progress Bar */}
      <div className="h-1 bg-white/20">
        <div 
          className="h-full bg-white transition-all duration-300"
          style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md animate-fade-in">
          
          {/* Step 1: Language */}
          {currentStep === 1 && (
            <div className="text-center">
              <div className="text-8xl mb-8 animate-bounce-in">🌍</div>
              <h2 className="text-3xl font-bold mb-12">Welke taal spreek je?</h2>
              <div className="space-y-4">
                {[
                  { code: "nl" as const, label: "🇳🇱 Nederlands" },
                  { code: "en" as const, label: "🇬🇧 English" },
                ].map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setProfile({ ...profile, language: lang.code });
                      setTimeout(handleNext, 300);
                    }}
                    className={cn(
                      "w-full h-20 rounded-3xl text-xl font-bold transition-all shadow-lg",
                      profile.language === lang.code
                        ? "bg-gradient-to-r from-headspace-peach to-headspace-pink text-foreground scale-105"
                        : "bg-white/80 backdrop-blur hover:bg-white hover:scale-105 active:scale-95"
                    )}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Name */}
          {currentStep === 2 && (
            <div className="text-center">
              <div className="text-8xl mb-8 animate-bounce-in">👤</div>
              <h2 className="text-3xl font-bold mb-12">Hoe heet je?</h2>
              <Input
                type="text"
                placeholder="Voornaam"
                value={profile.personalInfo?.name || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    personalInfo: { ...profile.personalInfo!, name: e.target.value },
                  })
                }
                className="h-16 text-lg rounded-2xl mb-6 bg-white/80 backdrop-blur border-0"
              />
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                size="lg"
                className="w-full h-16 rounded-3xl text-lg font-bold shadow-lg bg-gradient-to-r from-headspace-peach to-headspace-pink hover:scale-105 active:scale-95 transition-transform"
              >
                Volgende
                <ArrowRight className="ml-2" />
              </Button>
            </div>
          )}

          {/* Step 3: Interests */}
          {currentStep === 3 && (
            <div className="text-center">
              <div className="text-8xl mb-8 animate-bounce-in">🎯</div>
              <h2 className="text-3xl font-bold mb-4">Waar ben je in geïnteresseerd?</h2>
              <p className="text-muted-foreground mb-8">Kies minimaal 1 interesse</p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {interests.map((interest) => (
                  <Card
                    key={interest.id}
                    onClick={() => toggleInterest(interest.id)}
                    className={cn(
                      "p-6 cursor-pointer transition-all border-0",
                      profile.interests?.includes(interest.id)
                        ? "bg-gradient-to-br from-headspace-peach to-headspace-pink scale-105"
                        : "bg-white/80 backdrop-blur hover:bg-white hover:scale-105 active:scale-95"
                    )}
                  >
                    <div className="text-5xl mb-2">{interest.emoji}</div>
                    <p className="font-semibold">{interest.label}</p>
                  </Card>
                ))}
              </div>
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                size="lg"
                className="w-full h-16 rounded-3xl text-lg font-bold shadow-lg bg-gradient-to-r from-headspace-mint to-headspace-sky hover:scale-105 active:scale-95 transition-transform"
              >
                Volgende
                <ArrowRight className="ml-2" />
              </Button>
            </div>
          )}

          {/* Step 4: Privacy Consent */}
          {currentStep === 4 && (
            <Card className="p-8 bg-white/90 backdrop-blur border-0">
              <div className="text-center mb-6">
                <div className="text-8xl mb-4 animate-bounce-in">🔒</div>
                <h2 className="text-2xl font-bold mb-4">Privacy & Veiligheid</h2>
              </div>
              <div className="space-y-4 text-left mb-6">
                <p className="text-sm">
                  • Je gegevens worden veilig opgeslagen
                </p>
                <p className="text-sm">
                  • We delen nooit persoonlijke informatie
                </p>
                <p className="text-sm">
                  • Je kunt je account op elk moment verwijderen
                </p>
              </div>
              <div className="flex items-start gap-3 mb-6">
                <Checkbox
                  id="consent"
                  checked={profile.privacyConsent}
                  onCheckedChange={(checked) =>
                    setProfile({ ...profile, privacyConsent: checked as boolean })
                  }
                />
                <label htmlFor="consent" className="text-sm cursor-pointer">
                  Ik ga akkoord met de privacyvoorwaarden en ben minimaal 13 jaar oud
                </label>
              </div>
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                size="lg"
                className="w-full h-16 rounded-3xl text-lg font-bold shadow-lg bg-gradient-to-r from-headspace-sky to-headspace-lavender hover:scale-105 active:scale-95 transition-transform"
              >
                Volgende
                <ArrowRight className="ml-2" />
              </Button>
            </Card>
          )}

          {/* Step 5: Complete */}
          {currentStep === 5 && (
            <div className="text-center">
              <div className="text-8xl mb-8 animate-bounce-in">🎉</div>
              <h2 className="text-3xl font-bold mb-4">Welkom bij Peer2Peer!</h2>
              <p className="text-lg mb-8 opacity-90">
                Je profiel is compleet. Tijd om te beginnen!
              </p>
              <Button
                onClick={handleNext}
                size="lg"
                className="w-full h-16 rounded-3xl text-lg font-bold shadow-lg bg-gradient-to-r from-headspace-peach via-headspace-coral to-headspace-pink hover:scale-105 active:scale-95 transition-transform"
              >
                Start je journey
                <ArrowRight className="ml-2" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupporteeOnboarding;
