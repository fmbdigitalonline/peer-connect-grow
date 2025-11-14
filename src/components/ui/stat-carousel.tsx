import { cn } from "@/lib/utils";
import { useRef, useEffect, useState } from "react";

interface StatCarouselProps {
  children: React.ReactNode;
  className?: string;
}

export const StatCarousel = ({ children, className }: StatCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showDots, setShowDots] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    if (scrollRef.current) {
      const count = scrollRef.current.children.length;
      setItemCount(count);
      setShowDots(count > 1);
    }
  }, [children]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const itemWidth = scrollRef.current.children[0]?.clientWidth || 0;
    const index = Math.round(scrollLeft / itemWidth);
    setActiveIndex(index);
  };

  return (
    <div className={cn("relative", className)}>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {children}
      </div>
      {showDots && (
        <div className="flex justify-center gap-1.5 mt-3">
          {Array.from({ length: itemCount }).map((_, index) => (
            <div
              key={index}
              className={cn(
                "h-1.5 rounded-full transition-all",
                index === activeIndex
                  ? "w-6 bg-primary"
                  : "w-1.5 bg-muted-foreground/30"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
};
