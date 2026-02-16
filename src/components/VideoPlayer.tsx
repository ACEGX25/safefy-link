import { Video, Play, AlertCircle, Download, Maximize2 } from "lucide-react";
import { useState } from "react";

interface VideoPlayerProps {
  videoUrl: string | null;
  capturedAt: Date | null;
  duration: number; // in seconds
  isUploading?: boolean;
  uploadFailed?: boolean;
}

const VideoPlayer = ({ videoUrl, capturedAt, duration, isUploading, uploadFailed }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const formatDuration = (seconds: number) => {
    return `${seconds}s burst`;
  };

  const formatTime = (date: Date | null) => {
    if (!date) return "—";
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="glass-card rounded-xl overflow-hidden card-shadow animate-slide-up" style={{ animationDelay: '0.2s' }}>
      {/* Video Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center border border-accent/20">
            <Video className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Burst Video</h3>
            <p className="text-xs text-muted-foreground">
              {capturedAt ? formatTime(capturedAt) : "No video captured"} • {formatDuration(duration)}
            </p>
          </div>
        </div>

        {videoUrl && (
          <a
            href={videoUrl}
            download
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 border border-border text-sm text-muted-foreground transition-colors"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Download</span>
          </a>
        )}
      </div>

      {/* Video Container - 9:16 aspect ratio for mobile burst video */}
      <div className="relative bg-secondary flex items-center justify-center p-4">
        <div className="relative w-full max-w-[200px] sm:max-w-[280px] aspect-[9/16] rounded-lg overflow-hidden bg-background/50 border border-border">
          {isUploading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full border-2 border-accent border-t-transparent animate-spin" />
              <span className="text-sm text-muted-foreground">Uploading video...</span>
            </div>
          ) : uploadFailed ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center">
              <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center border border-destructive/20">
                <AlertCircle className="w-7 h-7 text-destructive" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Upload Failed</p>
                <p className="text-xs text-muted-foreground mt-1">Video could not be uploaded. Check connection.</p>
              </div>
            </div>
          ) : videoUrl ? (
            <>
              <video
                src={videoUrl}
                className="w-full h-full object-cover"
                controls={isPlaying}
                playsInline
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
              />
              {!isPlaying && (
                <button
                  onClick={() => {
                    const video = document.querySelector('video');
                    if (video) {
                      video.play();
                      setIsPlaying(true);
                    }
                  }}
                  className="absolute inset-0 flex items-center justify-center bg-background/30 backdrop-blur-sm transition-opacity hover:bg-background/40"
                >
                  <div className="w-16 h-16 rounded-full bg-accent/90 flex items-center justify-center shadow-lg">
                    <Play className="w-7 h-7 text-accent-foreground ml-1" />
                  </div>
                </button>
              )}
              <button className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-background/50 backdrop-blur-sm flex items-center justify-center hover:bg-background/70 transition-colors">
                <Maximize2 className="w-4 h-4 text-foreground" />
              </button>
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center">
              <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center border border-border">
                <Video className="w-7 h-7 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">No Video</p>
                <p className="text-xs text-muted-foreground mt-1">Waiting for video upload...</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Video Info */}
      <div className="flex items-center justify-between p-4 bg-secondary/30 text-sm text-muted-foreground">
        <span>Burst capture: {duration} seconds</span>
        <span>Aspect: 9:16 (Portrait)</span>
      </div>
    </div>
  );
};

export default VideoPlayer;
