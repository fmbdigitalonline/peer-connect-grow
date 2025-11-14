import { cn } from "@/lib/utils";

interface WizardProgressProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
}

export const WizardProgress = ({ currentStep, totalSteps, labels }: WizardProgressProps) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div key={step} className="flex flex-col items-center flex-1">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all",
                step < currentStep
                  ? "bg-primary text-primary-foreground"
                  : step === currentStep
                  ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {step}
            </div>
            {labels && labels[step - 1] && (
              <p
                className={cn(
                  "text-xs mt-2 text-center",
                  step === currentStep ? "font-semibold text-foreground" : "text-muted-foreground"
                )}
              >
                {labels[step - 1]}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="relative h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full bg-primary transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
};
