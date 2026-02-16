import AlertHeader from "@/components/AlertHeader";
import AlertStatus from "@/components/AlertStatus";
import LocationMap from "@/components/LocationMap";
import VideoPlayer from "@/components/VideoPlayer";
import TimelineEvent, { TimelineItem } from "@/components/TimelineEvent";

// Mock data - In production, this would come from Firebase
const mockAlertData = {
  personName: "Priya Sharma",
  phoneNumber: "+91-9876543210",
  alertTime: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
  threatLevel: "high" as const,
  message: "Possible threat detected - Stay alert",
  location: {
    latitude: 18.4558961,
    longitude: 73.786999,
    lastUpdated: new Date(Date.now() - 30 * 1000), // 30 seconds ago
  },
  video: {
    url: null, // Set to a video URL when available
    capturedAt: null,
    duration: 10,
    isUploading: false,
    uploadFailed: true,
  },
  isLive: true,
};

const mockTimelineEvents: TimelineItem[] = [
  {
    id: "1",
    type: "alert",
    message: "Emergency alert triggered",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    status: "success",
  },
  {
    id: "2",
    type: "location",
    message: "Location shared: Pune, Maharashtra",
    timestamp: new Date(Date.now() - 4 * 60 * 1000),
    status: "success",
  },
  {
    id: "3",
    type: "audio",
    message: "Audio capture attempted",
    timestamp: new Date(Date.now() - 3 * 60 * 1000),
    status: "failed",
  },
  {
    id: "4",
    type: "video",
    message: "Video burst capture attempted",
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    status: "failed",
  },
  {
    id: "5",
    type: "location",
    message: "Location updated",
    timestamp: new Date(Date.now() - 30 * 1000),
    status: "success",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <AlertHeader 
        personName={mockAlertData.personName}
        alertTime={mockAlertData.alertTime}
        isLive={mockAlertData.isLive}
      />

      <main className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Alert Status Banner */}
        <AlertStatus 
          personName={mockAlertData.personName}
          phoneNumber={mockAlertData.phoneNumber}
          threatLevel={mockAlertData.threatLevel}
          message={mockAlertData.message}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <LocationMap 
              latitude={mockAlertData.location.latitude}
              longitude={mockAlertData.location.longitude}
              lastUpdated={mockAlertData.location.lastUpdated}
              isLive={mockAlertData.isLive}
            />
          </div>

          {/* Video Player - Single column */}
          <div className="lg:col-span-1">
            <VideoPlayer 
              videoUrl={mockAlertData.video.url}
              capturedAt={mockAlertData.video.capturedAt}
              duration={mockAlertData.video.duration}
              isUploading={mockAlertData.video.isUploading}
              uploadFailed={mockAlertData.video.uploadFailed}
            />
          </div>
        </div>

        {/* Timeline */}
        <TimelineEvent events={mockTimelineEvents} />

        {/* Footer */}
        <footer className="text-center py-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Safora Emergency Alert System • Stay Safe
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            If this is an emergency, please contact local authorities immediately.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
