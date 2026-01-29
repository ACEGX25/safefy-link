import { MapPin, Video, Mic, Bell, CheckCircle2 } from "lucide-react";

interface TimelineItem {
  id: string;
  type: "alert" | "location" | "video" | "audio" | "safe";
  message: string;
  timestamp: Date;
  status: "success" | "failed" | "pending";
}

interface TimelineEventProps {
  events: TimelineItem[];
}

const TimelineEvent = ({ events }: TimelineEventProps) => {
  const getIcon = (type: TimelineItem["type"]) => {
    switch (type) {
      case "alert":
        return Bell;
      case "location":
        return MapPin;
      case "video":
        return Video;
      case "audio":
        return Mic;
      case "safe":
        return CheckCircle2;
    }
  };

  const getIconStyles = (type: TimelineItem["type"], status: TimelineItem["status"]) => {
    if (status === "failed") return "bg-destructive/10 border-destructive/20 text-destructive";
    if (status === "pending") return "bg-warning/10 border-warning/20 text-warning";
    
    switch (type) {
      case "alert":
        return "bg-primary/10 border-primary/20 text-primary";
      case "location":
        return "bg-accent/10 border-accent/20 text-accent";
      case "video":
        return "bg-accent/10 border-accent/20 text-accent";
      case "audio":
        return "bg-accent/10 border-accent/20 text-accent";
      case "safe":
        return "bg-success/10 border-success/20 text-success";
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="glass-card rounded-xl p-4 md:p-6 card-shadow animate-slide-up" style={{ animationDelay: '0.3s' }}>
      <h3 className="font-semibold text-foreground mb-4">Alert Timeline</h3>
      
      <div className="space-y-1">
        {events.map((event, index) => {
          const Icon = getIcon(event.type);
          const isLast = index === events.length - 1;
          
          return (
            <div key={event.id} className="flex gap-3">
              {/* Timeline line & icon */}
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${getIconStyles(event.type, event.status)}`}>
                  <Icon className="w-4 h-4" />
                </div>
                {!isLast && (
                  <div className="w-px h-8 bg-border mt-1" />
                )}
              </div>

              {/* Event content */}
              <div className="flex-1 pb-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm text-foreground">{event.message}</p>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{formatTime(event.timestamp)}</span>
                </div>
                {event.status === "failed" && (
                  <span className="text-xs text-destructive mt-1">Upload failed</span>
                )}
                {event.status === "pending" && (
                  <span className="text-xs text-warning mt-1">In progress...</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimelineEvent;
export type { TimelineItem };
