import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import peerLogo from "@/assets/peer-logo.png";
import { roleList } from "@/lib/roleConfigs";

const Onboarding = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);

  useEffect(() => {
    const presetRole = searchParams.get("role");
    if (presetRole && roleList.some((role) => role.id === presetRole)) {
      setSelectedRoleId(presetRole);
      setStep(2);
    }
  }, [searchParams]);

  const selectedRole = useMemo(
    () => roleList.find((role) => role.id === selectedRoleId) || null,
    [selectedRoleId],
  );

  const handleRoleSelect = (roleId: string) => {
    setSelectedRoleId(roleId);
  };

  const handleContinue = () => {
    if (step === 1 && selectedRoleId) {
      setStep(2);
      return;
    }

    if (step === 2 && selectedRole) {
      localStorage.setItem("userRole", selectedRole.id);
      localStorage.setItem("onboardingComplete", "true");
      
      // Navigate to supportee wizard for supportee role
      if (selectedRole.id === "supportee") {
        navigate("/supportee/onboarding");
      } else {
        navigate(`/environment/${selectedRole.id}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="bg-white py-8 px-6 border-b border-border shadow-sm">
        <div className="flex justify-center mb-4">
          <img src={peerLogo} alt="Peer2Peer" className="h-20 w-auto" />
        </div>
        <h1 className="text-4xl font-extrabold text-center text-foreground">
          Kies jouw rol en omgeving
        </h1>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto mt-2">
          Iedere rol heeft een eigen omgeving met configuraties, user flows en features.
          Je start pas zodra je de juiste omgeving gekozen hebt – zo voorkomen we dat
          iedereen in hetzelfde generieke systeem belandt.
        </p>
      </div>

      <div className="flex justify-center gap-2 py-6">
        {[1, 2].map((index) => (
          <div
            key={index}
            className={cn(
              "h-2 w-14 rounded-full transition-all",
              step >= index ? "bg-primary" : "bg-muted",
            )}
          />
        ))}
      </div>

      <div className="flex-1 px-4 pb-8 w-full max-w-6xl mx-auto">
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {roleList.map((role) => (
              <Card
                key={role.id}
                onClick={() => handleRoleSelect(role.id)}
                className={cn(
                  "cursor-pointer border-2 transition-all",
                  selectedRoleId === role.id
                    ? "border-primary shadow-xl"
                    : "border-transparent hover:border-border hover:shadow-lg",
                )}
              >
                <div className="p-6 h-full flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", role.badge)}>
                      <role.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{role.subtitle}</p>
                      <h3 className="text-xl font-semibold text-foreground">{role.title}</h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground flex-1">{role.description}</p>
                  <div className="space-y-1">
                    {role.focus.map((item) => (
                      <p key={item} className="text-sm text-foreground flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-primary" />
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {step === 2 && selectedRole && (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <div className="bg-muted/50 rounded-2xl p-8">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className={cn("w-16 h-16 rounded-3xl flex items-center justify-center", selectedRole.badge)}>
                      <selectedRole.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{selectedRole.subtitle}</p>
                      <h2 className="text-3xl font-bold">{selectedRole.title} omgeving</h2>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{selectedRole.environmentDescription}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedRole.highlights.map((highlight) => (
                      <div key={highlight.title} className="bg-background rounded-xl border p-4">
                        <p className="text-sm font-medium text-muted-foreground">{highlight.title}</p>
                        <p className="text-foreground text-lg font-semibold">{highlight.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex-1 space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Belangrijkste features</h3>
                    <div className="space-y-3">
                      {selectedRole.features.map((feature) => (
                        <div key={feature.title} className="flex gap-3 bg-white rounded-xl border p-3">
                          <feature.icon className="w-5 h-5 text-primary mt-1" />
                          <div>
                            <p className="font-semibold text-foreground">{feature.title}</p>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">User flows</h3>
                    <ol className="space-y-2">
                      {selectedRole.flows.map((flow, index) => (
                        <li key={flow} className="flex gap-3">
                          <span className="text-primary font-semibold">{index + 1}.</span>
                          <p className="text-muted-foreground">{flow}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-card border-t">
        <div className="max-w-2xl mx-auto flex gap-4">
          {step > 1 && (
            <Button variant="ghost" size="lg" onClick={() => setStep(1)} className="flex-1">
              Kies andere rol
            </Button>
          )}
          <Button
            size="lg"
            disabled={!selectedRoleId}
            className="flex-1"
            onClick={handleContinue}
          >
            {step === 1
              ? "Bekijk omgeving"
              : `Ga naar ${selectedRole?.title ?? "rol"} omgeving`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;

