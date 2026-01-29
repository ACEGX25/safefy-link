import { AlertTriangle, User, Phone } from "lucide-react";

interface AlertStatusProps {
  personName: string;
  phoneNumber: string;
  threatLevel: "high" | "medium" | "low";
  message: string;
}

const AlertStatus = ({ personName, phoneNumber, threatLevel, message }: AlertStatusProps) => {
  const getThreatStyles = () => {
    switch (threatLevel) {
      case "high":
        return {
          bg: "bg-primary/10",
          border: "border-primary/30",
          text: "text-primary",
          label: "HIGH THREAT"
        };
      case "medium":
        return {
          bg: "bg-warning/10",
          border: "border-warning/30",
          text: "text-warning",
          label: "MEDIUM THREAT"
        };
      case "low":
        return {
          bg: "bg-accent/10",
          border: "border-accent/30",
          text: "text-accent",
          label: "LOW THREAT"
        };
    }
  };

  const styles = getThreatStyles();

  return (
    <div className="glass-card rounded-xl p-4 md:p-6 card-shadow animate-slide-up">
      {/* Threat Banner */}
      <div className={`flex items-center gap-3 px-4 py-3 rounded-lg ${styles.bg} ${styles.border} border mb-4`}>
        <AlertTriangle className={`w-5 h-5 ${styles.text}`} />
        <span className={`text-sm font-semibold ${styles.text}`}>{styles.label}</span>
        <span className="text-sm text-muted-foreground ml-auto">Possible threat detected</span>
      </div>

      {/* Person Info */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center border border-border">
            <User className="w-6 h-6 text-muted-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">{personName}</h2>
            <p className="text-sm text-muted-foreground">{message}</p>
          </div>
        </div>

        <a 
          href={`tel:${phoneNumber}`}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent text-accent-foreground font-medium text-sm hover:opacity-90 transition-opacity sm:ml-auto"
        >
          <Phone className="w-4 h-4" />
          Call {personName.split(' ')[0]}
        </a>
      </div>
    </div>
  );
};

export default AlertStatus;
