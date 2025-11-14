import { Home, BookOpen, Award, Users, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", path: "/supportee/hub" },
  { icon: BookOpen, label: "Leren", path: "/library" },
  { icon: Award, label: "Portfolio", path: "/portfolio" },
  { icon: Users, label: "Community", path: "/community" },
  { icon: User, label: "Profiel", path: "/supportee/journey" },
];

export const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-xl border-t border-border/50 z-50 md:hidden shadow-[0_-8px_24px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-around h-18 px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 py-2 px-4 rounded-full transition-all min-w-[64px] relative",
                isActive 
                  ? "text-primary scale-110" 
                  : "text-muted-foreground hover:text-foreground active:scale-95"
              )}
            >
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-sm" />
              )}
              <Icon className={cn("h-7 w-7 relative z-10 transition-transform", isActive && "scale-110")} />
              {isActive && (
                <span className="text-[9px] font-semibold relative z-10">{item.label}</span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
