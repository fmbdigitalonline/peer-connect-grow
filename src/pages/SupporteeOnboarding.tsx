import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SupporteeProfile } from "@/types/supportee";
import { toast } from "sonner";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const TOTAL_STEPS = 5;

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
      // Save and navigate
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
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex flex-col">
      {/* Thin Progress Bar */}
      <div className="h-1 bg-muted">
        <div 
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md animate-fade-in">
          
          {/* Step 1: Language */}
          {currentStep === 1 && (
            <div className="text-center">
              <div className="text-7xl mb-8">🌍</div>
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
                      "w-full h-16 rounded-2xl text-lg font-semibold transition-all shadow-md",
                      profile.language === lang.code
                        ? "bg-primary text-primary-foreground scale-105"
                        : "bg-card hover:bg-muted"
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
              <div className="text-7xl mb-8">👤</div>
              <h2 className="text-3xl font-bold mb-12">Hoe heet je?</h2>
              <Input
                type="text"
                placeholder="Je naam..."
                value={profile.personalInfo?.name || ""}
                onChange={(e) => setProfile({
                  ...profile,
                  personalInfo: { ...profile.personalInfo!, name: e.target.value }
                })}
                className="h-16 text-lg text-center rounded-2xl mb-8"
                autoFocus
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && canProceed()) handleNext();
                }}
              />
              <Button
                size="lg"
                className="w-full h-14 text-lg rounded-full"
                onClick={handleNext}
                disabled={!canProceed()}
              >
                Volgende <ArrowRight className="ml-2" />
              </Button>
            </div>
          )}

          {/* Step 3: Interests */}
          {currentStep === 3 && (
            <div className="text-center">
              <div className="text-7xl mb-8">🎯</div>
              <h2 className="text-3xl font-bold mb-12">Waar wil je hulp bij?</h2>
              <div className="space-y-3 mb-8">
                {[
                  { id: "homework", label: "📚 Huiswerk" },
                  { id: "language", label: "🗣️ Taal leren" },
                  { id: "friends", label: "🤝 Vrienden maken" },
                  { id: "sports", label: "⚽ Sport & bewegen" },
                  { id: "creative", label: "🎨 Creatief bezig zijn" },
                ].map((interest) => (
                  <button
                    key={interest.id}
                    onClick={() => toggleInterest(interest.id)}
                    className={cn(
                      "w-full h-14 rounded-2xl text-lg font-semibold transition-all",
                      profile.interests?.includes(interest.id)
                        ? "bg-primary text-primary-foreground shadow-lg scale-105"
                        : "bg-card hover:bg-muted"
                    )}
                  >
                    {interest.label}
                  </button>
                ))}
              </div>
              <Button
                size="lg"
                className="w-full h-14 text-lg rounded-full"
                onClick={handleNext}
                disabled={!canProceed()}
              >
                Volgende <ArrowRight className="ml-2" />
              </Button>
            </div>
          )}

          {/* Step 4: Privacy */}
          {currentStep === 4 && (
            <div className="text-center">
              <div className="text-7xl mb-8">🔒</div>
              <h2 className="text-3xl font-bold mb-6">Je bent veilig hier</h2>
              <div className="bg-card rounded-2xl p-6 mb-8 space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <p className="text-muted-foreground">Privacy gewaarborgd</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">👁️</span>
                  <p className="text-muted-foreground">Coaches kijken mee</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🚨</span>
                  <p className="text-muted-foreground">Meld altijd problemen</p>
                </div>
              </div>
              <Button
                size="lg"
                className="w-full h-14 text-lg rounded-full"
                onClick={() => {
                  setProfile({ ...profile, privacyConsent: true });
                  setTimeout(handleNext, 300);
                }}
              >
                Ik snap het <ArrowRight className="ml-2" />
              </Button>
            </div>
          )}

          {/* Step 5: Complete */}
          {currentStep === 5 && (
            <div className="text-center">
              <div className="text-7xl mb-8 animate-bounce">🎉</div>
              <h2 className="text-4xl font-bold mb-6">Je bent klaar!</h2>
              <div className="bg-card rounded-2xl p-8 mb-8 shadow-lg">
                <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center text-4xl">
                  👤
                </div>
                <p className="text-2xl font-bold">{profile.personalInfo?.name}</p>
                <p className="text-muted-foreground mt-2">Supportee</p>
              </div>
              <Button
                size="lg"
                className="w-full h-14 text-lg rounded-full bg-gradient-to-r from-primary to-accent shadow-lg"
                onClick={handleNext}
              >
                <Sparkles className="mr-2" />
                Start met Peer2Peer
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupporteeOnboarding;
