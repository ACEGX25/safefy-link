import { Video, Eye, EyeOff, ChevronRight } from "lucide-react";

interface Clip {
  id: string;
  timestamp: Date;
  seen: boolean;
  status: "uploaded" | "uploading" | "failed";
}

interface ClipQueueProps {
  clips: Clip[];
  onClipSelect?: (clipId: string) => void;
}

const ClipQueue = ({ clips, onClipSelect }: ClipQueueProps) => {
  const seenCount = clips.filter(c => c.seen).length;
  const unseenCount = clips.filter(c => !c.seen).length;
  const totalCount = clips.length;

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="glass-card rounded-xl overflow-hidden card-shadow animate-slide-up" style={{ animationDelay: '0.15s' }}>
      {/* Header */}
      <div className="flex items-center justify-between p-3 sm:p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-accent/10 flex items-center justify-center border border-accent/20">
            <Video className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-sm sm:text-base">Clip Queue</h3>
            <p className="text-xs text-muted-foreground">{totalCount} burst clips captured</p>
          </div>
        </div>

        {/* Counters */}
        <div className="flex items-center gap-2">
          {unseenCount > 0 && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 border border-primary/20">
              <EyeOff className="w-3 h-3 text-primary" />
              <span className="text-xs font-semibold text-primary">{unseenCount} new</span>
            </div>
          )}
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-muted border border-border">
            <Eye className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{seenCount} seen</span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-3 sm:px-4 pt-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
          <span>Viewed {seenCount} of {totalCount}</span>
          <span>{totalCount > 0 ? Math.round((seenCount / totalCount) * 100) : 0}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full rounded-full bg-accent transition-all duration-500"
            style={{ width: `${totalCount > 0 ? (seenCount / totalCount) * 100 : 0}%` }}
          />
        </div>
      </div>

      {/* Clip list */}
      <div className="p-3 sm:p-4 space-y-2 max-h-48 overflow-y-auto">
        {clips.map((clip) => (
          <button
            key={clip.id}
            onClick={() => onClipSelect?.(clip.id)}
            className={`w-full flex items-center gap-3 p-2 rounded-lg border transition-colors text-left ${
              clip.seen
                ? "border-border bg-secondary/30 opacity-60"
                : "border-primary/20 bg-primary/5 hover:bg-primary/10"
            }`}
          >
            <div className={`w-8 h-8 rounded flex items-center justify-center shrink-0 ${
              clip.seen ? "bg-muted" : "bg-primary/10"
            }`}>
              <Video className={`w-4 h-4 ${clip.seen ? "text-muted-foreground" : "text-primary"}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm truncate ${clip.seen ? "text-muted-foreground" : "text-foreground font-medium"}`}>
                Burst #{clip.id}
                {clip.status === "failed" && <span className="text-destructive ml-1">(failed)</span>}
                {clip.status === "uploading" && <span className="text-warning ml-1">(uploading…)</span>}
              </p>
              <p className="text-xs text-muted-foreground">{formatTime(clip.timestamp)}</p>
            </div>
            {!clip.seen && (
              <div className="w-2 h-2 rounded-full bg-primary shrink-0 animate-pulse" />
            )}
            <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ClipQueue;
export type { Clip };
