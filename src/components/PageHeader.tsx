import peerLogo from "@/assets/peer-logo.png";

interface PageHeaderProps {
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
}

export const PageHeader = ({
  title,
  subtitle,
  showLogo = true,
}: PageHeaderProps) => {
  return (
    <div className="bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {showLogo && (
          <div className="flex justify-center mb-4">
            <img src={peerLogo} alt="Peer2Peer Logo" className="h-12 w-auto" />
          </div>
        )}
        {title && (
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground">{title}</h1>
            {subtitle && (
              <p className="text-muted-foreground mt-2">{subtitle}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
