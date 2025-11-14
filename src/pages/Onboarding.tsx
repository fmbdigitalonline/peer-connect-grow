import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import peerLogo from "@/assets/peer-logo.png";
import { roleList } from "@/lib/roleConfigs";
import { ArrowRight } from "lucide-react";

const Onboarding = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);

  useEffect(() => {
    const presetRole = searchParams.get("role");
    if (presetRole && roleList.some((role) => role.id === presetRole)) {
      const index = roleList.findIndex((role) => role.id === presetRole);
      setCurrentRoleIndex(index);
      setSelectedRoleId(presetRole);
    }
  }, [searchParams]);

  const selectedRole = useMemo(
    () => roleList.find((role) => role.id === selectedRoleId) || null,
    [selectedRoleId],
  );

  const currentRole = roleList[currentRoleIndex];

  const handleNext = () => {
    if (currentRoleIndex < roleList.length - 1) {
      setCurrentRoleIndex(currentRoleIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentRoleIndex > 0) {
      setCurrentRoleIndex(currentRoleIndex - 1);
    }
  };

  const handleSelectRole = () => {
    setSelectedRoleId(currentRole.id);
    localStorage.setItem("userRole", currentRole.id);
    localStorage.setItem("onboardingComplete", "true");
    
    // Navigate to specific onboarding flows
    if (currentRole.id === "supportee") {
      navigate("/supportee/onboarding");
    } else if (currentRole.id === "buddy") {
      navigate("/buddy/onboarding");
    } else if (currentRole.id === "peerLeader") {
      navigate("/leader/onboarding");
    } else {
      navigate(`/environment/${currentRole.id}`);
    }
  };

  // Touch handlers for swipe
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrevious();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex flex-col">
      {/* Minimal Header */}
      <div className="py-6 px-6">
        <div className="flex justify-center">
          <img src={peerLogo} alt="Peer2Peer" className="h-16 w-auto" />
        </div>
      </div>

      {/* Main Content - Swipeable Card */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-24">
        <div
          className="w-full max-w-md"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Role Card */}
          <div className="bg-card rounded-3xl shadow-2xl p-8 mb-8 animate-fade-in">
            {/* Large Icon/Emoji */}
            <div className="flex justify-center mb-6">
              <div className={cn(
                "w-24 h-24 rounded-full flex items-center justify-center shadow-lg",
                currentRole.badge
              )}>
                <currentRole.icon className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-extrabold text-center mb-3 text-foreground">
              {currentRole.title}
            </h1>

            {/* Single Line Description */}
            <p className="text-lg text-center text-muted-foreground mb-8 leading-relaxed">
              {currentRole.description}
            </p>

            {/* CTA Button */}
            <Button 
              size="lg" 
              className="w-full h-14 text-lg rounded-full shadow-lg"
              onClick={handleSelectRole}
            >
              Start als {currentRole.title}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mb-4">
            {roleList.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentRoleIndex(index)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  index === currentRoleIndex 
                    ? "w-8 bg-primary" 
                    : "w-2 bg-muted"
                )}
              />
            ))}
          </div>

          {/* Swipe Hint */}
          <p className="text-center text-sm text-muted-foreground">
            👈 Swipe om andere rollen te zien 👉
          </p>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
