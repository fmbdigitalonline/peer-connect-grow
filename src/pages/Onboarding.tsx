import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserCircle, Users, Sparkles, GraduationCap } from "lucide-react";
import peerLogo from "@/assets/peer-logo.png";

type Role = "supportee" | "buddy" | "leader" | "coach" | null;

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<Role>(null);
  const navigate = useNavigate();

  const roles = [
    {
      id: "supportee" as Role,
      title: "Supportee",
      description: "Ik wil hulp vragen en leren",
      icon: UserCircle,
      color: "peer-teal",
      gradient: "bg-gradient-fresh",
    },
    {
      id: "buddy" as Role,
      title: "Buddy",
      description: "Ik wil anderen helpen",
      icon: Users,
      color: "peer-orange",
      gradient: "bg-gradient-warm",
    },
    {
      id: "leader" as Role,
      title: "Peer Leader",
      description: "Ik begeleid groepen",
      icon: Sparkles,
      color: "peer-magenta",
      gradient: "bg-gradient-peer",
    },
    {
      id: "coach" as Role,
      title: "Docent-Coach",
      description: "Ik ondersteun peer leaders",
      icon: GraduationCap,
      color: "peer-purple",
      gradient: "bg-gradient-peer",
    },
  ];

  const handleRoleSelect = (selectedRole: Role) => {
    setRole(selectedRole);
  };

  const handleNext = () => {
    if (step === 1 && role) {
      setStep(2);
    } else if (step === 2) {
      localStorage.setItem("userRole", role || "");
      localStorage.setItem("onboardingComplete", "true");
      navigate("/home");
    }
  };

  const selectedRoleData = roles.find((r) => r.id === role);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with Logo */}
      <div className="bg-white py-8 px-6 border-b border-border">
        <div className="flex justify-center mb-4">
          <img src={peerLogo} alt="Peer2Peer Logo" className="h-20 w-auto" />
        </div>
        <h1 className="text-4xl font-extrabold text-center mb-2 text-foreground">Peer2Peer</h1>
        <p className="text-lg text-center text-muted-foreground">Leren van, met en door elkaar</p>
      </div>

      {/* Progress indicator */}
      <div className="flex justify-center gap-2 py-6">
        <div
          className={`h-2 w-8 rounded-full transition-all ${
            step >= 1 ? "bg-primary" : "bg-muted"
          }`}
        />
        <div
          className={`h-2 w-8 rounded-full transition-all ${
            step >= 2 ? "bg-primary" : "bg-muted"
          }`}
        />
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-8 animate-fade-in">
        {step === 1 && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-2">Wie ben jij?</h2>
            <p className="text-center text-muted-foreground mb-8">
              Kies je rol om te starten
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {roles.map((roleOption) => {
                const Icon = roleOption.icon;
                const isSelected = role === roleOption.id;
                return (
                  <Card
                    key={roleOption.id}
                    className={`cursor-pointer transition-all hover:scale-105 ${
                      isSelected ? "ring-4 ring-primary shadow-lg" : "hover:shadow-md"
                    }`}
                    onClick={() => handleRoleSelect(roleOption.id)}
                  >
                    <div className="p-6 text-center">
                      <div
                        className={`w-20 h-20 ${roleOption.gradient} rounded-full flex items-center justify-center mx-auto mb-4`}
                      >
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{roleOption.title}</h3>
                      <p className="text-muted-foreground">{roleOption.description}</p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && selectedRoleData && (
          <div className="max-w-md mx-auto text-center animate-slide-up">
            <div
              className={`w-24 h-24 ${selectedRoleData.gradient} rounded-full flex items-center justify-center mx-auto mb-6`}
            >
              <selectedRoleData.icon className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-4">
              Welkom, {selectedRoleData.title}! 💛
            </h2>
            <div className="space-y-4 text-left bg-muted/50 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">✨</span>
                <div>
                  <h3 className="font-semibold mb-1">Portfolio</h3>
                  <p className="text-sm text-muted-foreground">
                    Houd je groei en ontwikkeling bij
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <h3 className="font-semibold mb-1">Sessies & Reflecties</h3>
                  <p className="text-sm text-muted-foreground">
                    Log je sessies en leer van je ervaringen
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🌱</span>
                <div>
                  <h3 className="font-semibold mb-1">Community</h3>
                  <p className="text-sm text-muted-foreground">
                    Deel successen en inspireer elkaar
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Je kunt altijd je instellingen aanpassen
            </p>
          </div>
        )}
      </div>

      {/* Footer Button */}
      <div className="p-6 bg-card border-t">
        <div className="max-w-md mx-auto flex gap-3">
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1">
              Terug
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={step === 1 && !role}
            className="flex-1"
            size="lg"
          >
            {step === 1 ? "Volgende" : "Start! 🎉"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
