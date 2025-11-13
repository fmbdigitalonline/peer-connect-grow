import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { roleConfigs, type RoleConfig } from "@/lib/roleConfigs";
import { cn } from "@/lib/utils";
import SupporteeJourney from "./SupporteeJourney";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="space-y-4">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
      <div className="h-px flex-1 ml-4 bg-border" />
    </div>
    {children}
  </section>
);

const RoleEnvironment = () => {
  const navigate = useNavigate();
  const { roleId } = useParams<{ roleId: string }>();

  const role: RoleConfig | undefined = useMemo(() => {
    if (!roleId) return undefined;
    return roleConfigs[roleId as keyof typeof roleConfigs];
  }, [roleId]);

  if (!role) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-muted/40 px-4 text-center">
        <p className="text-2xl font-semibold text-foreground">Onbekende rolomgeving</p>
        <p className="text-muted-foreground max-w-lg">
          Deze omgeving bestaat nog niet. Kies opnieuw een rol zodat we de juiste configuratie kunnen laden.
        </p>
        <Button size="lg" onClick={() => navigate("/onboarding")}>Terug naar onboarding</Button>
      </div>
    );
  }

  if (role.id === "supportee") {
    return <SupporteeJourney />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-6 lg:flex-row lg:items-center">
          <div className="flex items-center gap-6 flex-1">
            <div className={cn("w-20 h-20 rounded-3xl flex items-center justify-center", role.badge)}>
              <role.icon className="w-10 h-10 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wide">{role.subtitle}</p>
              <h1 className="text-4xl font-bold text-foreground">{role.title}</h1>
              <p className="text-muted-foreground mt-2 max-w-2xl">{role.environmentDescription}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Button size="lg" onClick={() => navigate("/onboarding")}>Kies andere rol</Button>
            <Button variant="outline" size="lg" onClick={() => navigate("/home")}>Ga naar home</Button>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-10">
        <Section title="Configuratie highlights">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {role.highlights.map((highlight) => (
              <Card key={highlight.title} className="p-6">
                <p className="text-sm font-medium text-muted-foreground">{highlight.title}</p>
                <p className="text-xl font-semibold text-foreground">{highlight.description}</p>
              </Card>
            ))}
          </div>
        </Section>

        <Section title="Belangrijkste features">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {role.features.map((feature) => (
              <Card key={feature.title} className="p-5 flex gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <feature.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-foreground">{feature.title}</p>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        <Section title="User flows">
          <div className="bg-muted/50 rounded-2xl p-6">
            <ol className="space-y-4">
              {role.flows.map((flow, index) => (
                <li key={flow} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>
                  <p className="text-lg text-foreground flex-1">{flow}</p>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        <Section title="Wat betekent dit voor jou?">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">Focus van deze omgeving</h3>
              <ul className="space-y-2">
                {role.focus.map((focus) => (
                  <li key={focus} className="flex items-center gap-2 text-muted-foreground">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    {focus}
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">Volgende stappen</h3>
              <p className="text-muted-foreground">
                Start de onboarding journey zodat we deze omgeving voor je klaarzetten. Kies hieronder of je de rol direct wilt
                activeren of terug wilt naar de rolkeuze.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button onClick={() => navigate(`/onboarding?role=${role.id}`)} variant="outline">
                  Opnieuw configureren
                </Button>
                <Button onClick={() => navigate("/home")}>Activeer en ga door</Button>
              </div>
            </Card>
          </div>
        </Section>
      </main>
    </div>
  );
};

export default RoleEnvironment;

