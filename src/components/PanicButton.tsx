import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PanicButton = () => {
  const [isActivated, setIsActivated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handlePanicActivation = async () => {
    setIsLoading(true);
    
    try {
      // Get user's location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            
            // Simulate API call to panic endpoint
            // In real implementation: POST /api/panic with location data
            console.log("Panic activated at:", { latitude, longitude });
            
            setIsActivated(true);
            setIsLoading(false);
            
            toast({
              title: "🚨 EMERGENCY ALERT SENT",
              description: "Your location has been shared with emergency contacts and authorities.",
              variant: "destructive",
            });

            // Auto-deactivate after 30 seconds for demo
            setTimeout(() => {
              setIsActivated(false);
            }, 30000);
          },
          (error) => {
            console.error("Location error:", error);
            setIsLoading(false);
            
            toast({
              title: "Location Access Required",
              description: "Please enable location services for emergency response.",
              variant: "destructive",
            });
          }
        );
      } else {
        setIsLoading(false);
        toast({
          title: "Location Not Supported",
          description: "Your device doesn't support location services.",
          variant: "destructive",
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Panic activation error:", error);
    }
  };

  return (
    <div className="text-center space-y-4">
      <div className="relative">
        <Button
          onClick={handlePanicActivation}
          disabled={isLoading}
          className={`
            w-40 h-40 rounded-full text-xl font-bold shadow-emergency transition-smooth
            ${isActivated 
              ? 'bg-emergency hover:bg-emergency pulse-emergency' 
              : 'bg-emergency hover:bg-emergency-glow'
            }
            ${isLoading ? 'opacity-70' : ''}
          `}
        >
          <div className="flex flex-col items-center space-y-2">
            <AlertTriangle className={`w-12 h-12 ${isActivated ? 'animate-bounce' : ''}`} />
            <span className="text-emergency-foreground">
              {isLoading ? 'SENDING...' : isActivated ? 'ALERT SENT' : 'PANIC BUTTON'}
            </span>
          </div>
        </Button>
        
        {isActivated && (
          <div className="absolute -inset-4 rounded-full border-4 border-emergency-glow animate-ping opacity-75"></div>
        )}
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground">
          {isActivated ? "Emergency services notified" : "Press for immediate help"}
        </p>
        <p className="text-xs text-muted-foreground max-w-sm mx-auto">
          This will share your location with emergency contacts, local authorities, and tourist helpline
        </p>
      </div>

      {isActivated && (
        <div className="bg-emergency/10 border border-emergency/20 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-center space-x-6">
            <div className="flex items-center space-x-2 text-emergency">
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">Calling Help</span>
            </div>
            <div className="flex items-center space-x-2 text-primary">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">Location Shared</span>
            </div>
          </div>
          <p className="text-xs text-center text-muted-foreground">
            Help is on the way. Stay calm and stay where you are if safe.
          </p>
        </div>
      )}
    </div>
  );
};

export default PanicButton;