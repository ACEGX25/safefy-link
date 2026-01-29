import { MapPin, Navigation, ExternalLink, RefreshCw } from "lucide-react";

interface LocationMapProps {
  latitude: number;
  longitude: number;
  lastUpdated: Date;
  isLive: boolean;
}

const LocationMap = ({ latitude, longitude, lastUpdated, isLive }: LocationMapProps) => {
  const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${latitude},${longitude}&zoom=15`;

  const formatCoordinates = (lat: number, lng: number) => {
    return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  };

  const getTimeSince = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    return `${Math.floor(seconds / 3600)}h ago`;
  };

  return (
    <div className="glass-card rounded-xl overflow-hidden card-shadow animate-slide-up" style={{ animationDelay: '0.1s' }}>
      {/* Map Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Live Location</h3>
            <p className="text-xs text-muted-foreground">{formatCoordinates(latitude, longitude)}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isLive && (
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-primary/10 border border-primary/20">
              <RefreshCw className="w-3 h-3 text-primary animate-spin" style={{ animationDuration: '3s' }} />
              <span className="text-xs text-primary font-medium">Updating</span>
            </div>
          )}
          <span className="text-xs text-muted-foreground">{getTimeSince(lastUpdated)}</span>
        </div>
      </div>

      {/* Map Embed */}
      <div className="relative aspect-video md:aspect-[21/9] bg-secondary">
        <iframe
          src={embedUrl}
          className="w-full h-full"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/20 to-transparent" />
        
        {/* Location pin indicator */}
        {isLive && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="relative">
              <span className="absolute inset-0 w-8 h-8 bg-primary/30 rounded-full animate-ping" />
            </div>
          </div>
        )}
      </div>

      {/* Map Actions */}
      <div className="flex items-center justify-between p-4 bg-secondary/30">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Navigation className="w-4 h-4" />
          <span>Tracking active</span>
        </div>

        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 border border-border text-sm font-medium text-foreground transition-colors"
        >
          Open in Maps
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default LocationMap;
