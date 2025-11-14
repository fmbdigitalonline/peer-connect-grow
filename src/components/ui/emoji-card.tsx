import { cn } from "@/lib/utils";
import { Card } from "./card";

interface EmojiCardProps {
  emoji: string;
  title?: string;
  value?: string | number;
  subtitle?: string;
  gradient?: string;
  onClick?: () => void;
  className?: string;
}

export const EmojiCard = ({
  emoji,
  title,
  value,
  subtitle,
  gradient = "from-headspace-peach to-headspace-pink",
  onClick,
  className
}: EmojiCardProps) => {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center p-6 bg-gradient-to-br transition-transform active:scale-95 cursor-pointer min-w-[120px] min-h-[140px]",
        gradient,
        className
      )}
    >
      <div className="text-6xl mb-2 animate-bounce-in">{emoji}</div>
      {value !== undefined && (
        <div className="text-3xl font-bold text-foreground">{value}</div>
      )}
      {title && (
        <div className="text-sm font-semibold text-foreground/80 mt-1">{title}</div>
      )}
      {subtitle && (
        <div className="text-xs text-foreground/60 mt-0.5">{subtitle}</div>
      )}
    </Card>
  );
};
