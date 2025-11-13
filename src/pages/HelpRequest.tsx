import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { subjects, mockBuddies, setStorageData, getStorageData } from "@/lib/mockData";
import type { HelpRequest, Urgency, Format } from "@/types";
import { toast } from "sonner";

const HelpRequestPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    subject: "",
    topic: "",
    description: "",
    urgency: "flexible" as Urgency,
    format: "1on1" as Format,
    preferredTime: "",
  });

  const handleNext = () => {
    if (step === 1 && !formData.subject) {
      toast.error("Kies een vak");
      return;
    }
    if (step === 2 && !formData.description) {
      toast.error("Geef een beschrijving");
      return;
    }
    if (step < 5) setStep(step + 1);
  };

  const handleSubmit = () => {
    // Simple mock matching: pick random buddy with subject expertise
    const matchingBuddies = mockBuddies.filter((b) =>
      b.expertise.includes(formData.subject)
    );
    const selectedBuddy =
      matchingBuddies[Math.floor(Math.random() * matchingBuddies.length)] ||
      mockBuddies[0];

    const request: HelpRequest = {
      id: `req_${Date.now()}`,
      supporteeId: "current_user",
      subject: formData.subject,
      topic: formData.topic,
      description: formData.description,
      urgency: formData.urgency,
      format: formData.format,
      preferredTimes: [formData.preferredTime],
      status: "matched",
      createdAt: new Date(),
      matchedBuddyId: selectedBuddy.id,
    };

    // Save to localStorage
    const requests = getStorageData<HelpRequest[]>("helpRequests", []);
    requests.push(request);
    setStorageData("helpRequests", requests);

    toast.success("Match gevonden! 💛");
    navigate("/matches");
  };

  const totalSteps = 5;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-card border-b px-6 py-4 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Hulp vragen</h1>
      </header>

      {/* Progress */}
      <div className="px-6 py-4">
        <div className="flex gap-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-all ${
                i < step ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Stap {step} van {totalSteps}
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-24">
        <Card className="p-6 max-w-2xl mx-auto">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold mb-2">Waar heb je hulp bij nodig?</h2>
                <p className="text-muted-foreground">Kies een vak</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {subjects.map((subject) => (
                  <button
                    key={subject.id}
                    onClick={() => setFormData({ ...formData, subject: subject.id })}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      formData.subject === subject.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="text-2xl mb-1">{subject.icon}</div>
                    <div className="font-semibold">{subject.name}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold mb-2">Vertel iets meer</h2>
                <p className="text-muted-foreground">Waar loop je precies tegenaan?</p>
              </div>
              <div className="space-y-4">
                <div>
                  <Label>Onderwerp (optioneel)</Label>
                  <Input
                    placeholder="Bijv. Breukrekenen, Werkwoorden, etc."
                    value={formData.topic}
                    onChange={(e) =>
                      setFormData({ ...formData, topic: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Beschrijving</Label>
                  <Textarea
                    placeholder="Vertel wat je wilt leren of oefenen..."
                    rows={5}
                    maxLength={200}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {formData.description.length}/200 karakters
                  </p>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold mb-2">Wanneer past het?</h2>
                <p className="text-muted-foreground">Kies je urgentie</p>
              </div>
              <RadioGroup
                value={formData.urgency}
                onValueChange={(value) =>
                  setFormData({ ...formData, urgency: value as Urgency })
                }
              >
                <div className="flex items-center space-x-3 p-4 rounded-lg border">
                  <RadioGroupItem value="urgent" id="urgent" />
                  <Label htmlFor="urgent" className="flex-1 cursor-pointer">
                    <div className="font-semibold">Vandaag nog 🔥</div>
                    <div className="text-sm text-muted-foreground">
                      Ik heb snel hulp nodig
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-lg border">
                  <RadioGroupItem value="this_week" id="this_week" />
                  <Label htmlFor="this_week" className="flex-1 cursor-pointer">
                    <div className="font-semibold">Deze week</div>
                    <div className="text-sm text-muted-foreground">
                      Binnen een paar dagen
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-lg border">
                  <RadioGroupItem value="flexible" id="flexible" />
                  <Label htmlFor="flexible" className="flex-1 cursor-pointer">
                    <div className="font-semibold">Flexibel ✨</div>
                    <div className="text-sm text-muted-foreground">
                      Wanneer het uitkomt
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold mb-2">Hoe wil je graag leren?</h2>
                <p className="text-muted-foreground">Kies een format</p>
              </div>
              <RadioGroup
                value={formData.format}
                onValueChange={(value) =>
                  setFormData({ ...formData, format: value as Format })
                }
              >
                <div className="flex items-center space-x-3 p-4 rounded-lg border">
                  <RadioGroupItem value="1on1" id="1on1" />
                  <Label htmlFor="1on1" className="flex-1 cursor-pointer">
                    <div className="font-semibold">1-op-1 👥</div>
                    <div className="text-sm text-muted-foreground">
                      Persoonlijke begeleiding
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-lg border">
                  <RadioGroupItem value="small_group" id="small_group" />
                  <Label htmlFor="small_group" className="flex-1 cursor-pointer">
                    <div className="font-semibold">Kleine groep 👥👥</div>
                    <div className="text-sm text-muted-foreground">
                      Leren met 2-4 peers
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-lg border">
                  <RadioGroupItem value="online" id="online" />
                  <Label htmlFor="online" className="flex-1 cursor-pointer">
                    <div className="font-semibold">Online 💻</div>
                    <div className="text-sm text-muted-foreground">
                      Via videobellen
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold mb-2">Bijna klaar! ✨</h2>
                <p className="text-muted-foreground">Controleer je aanvraag</p>
              </div>
              <div className="space-y-3 bg-muted/50 p-4 rounded-lg">
                <div>
                  <div className="text-sm text-muted-foreground">Vak</div>
                  <div className="font-semibold">
                    {subjects.find((s) => s.id === formData.subject)?.name}
                  </div>
                </div>
                {formData.topic && (
                  <div>
                    <div className="text-sm text-muted-foreground">Onderwerp</div>
                    <div className="font-semibold">{formData.topic}</div>
                  </div>
                )}
                <div>
                  <div className="text-sm text-muted-foreground">Beschrijving</div>
                  <div>{formData.description}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Urgentie</div>
                  <div className="font-semibold capitalize">{formData.urgency}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Format</div>
                  <div className="font-semibold">{formData.format}</div>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t p-6">
        <div className="max-w-2xl mx-auto flex gap-3">
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Terug
            </Button>
          )}
          <Button onClick={step === 5 ? handleSubmit : handleNext} className="flex-1">
            {step === 5 ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Verstuur vraag
              </>
            ) : (
              <>
                Volgende
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HelpRequestPage;
