import { Shield, Clock } from "lucide-react";

interface AlertHeaderProps {
  personName: string;
  alertTime: Date;
  isLive: boolean;
}

const AlertHeader = ({ personName, alertTime, isLive }: AlertHeaderProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <header className="w-full py-4 px-4 md:px-6 emergency-gradient">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            {isLive && (
              <>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse-dot" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse-ring" />
              </>
            )}
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-foreground">SAFORA</h1>
            <p className="text-xs text-muted-foreground">Emergency Alert System</p>
          </div>
        </div>

        {/* Alert Info */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{formatTime(alertTime)}</span>
          </div>
          
          {isLive && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-sm font-medium text-primary">LIVE</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AlertHeader;
