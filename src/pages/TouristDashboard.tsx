import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Users, Navigation, Wifi, Battery, Share2, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import PanicButton from "@/components/PanicButton";
import SafetyScore from "@/components/SafetyScore";
import WeatherWidget from "@/components/WeatherWidget";
import kazirangaBg from "@/assets/kaziranga-bg.jpg";

const TouristDashboard = () => {
  const [trackingEnabled, setTrackingEnabled] = useState(true);

  // Mock data - in real app would come from API
  const touristData = {
    name: "John Traveler",
    id: "TST-2024-001",
    safetyScore: 85,
    location: "Connaught Place, New Delhi",
    lastUpdate: "2 minutes ago",
    riskFactors: ["Crowded Area", "Peak Hours"],
    emergencyContacts: [
      { name: "Tourist Helpline", number: "1363" },
      { name: "Police", number: "100" },
      { name: "Medical Emergency", number: "102" }
    ]
  };

  const nearbyServices = [
    { name: "Delhi Police Station", distance: "0.3 km", type: "Police" },
    { name: "All India Institute of Medical Sciences", distance: "1.2 km", type: "Hospital" },
    { name: "Tourist Information Center", distance: "0.1 km", type: "Info" }
  ];

  const handleShareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const locationUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
        navigator.share?.({
          title: 'My Current Location',
          url: locationUrl
        }) || navigator.clipboard.writeText(locationUrl);
      });
    }
  };

  return (
    <div 
      className="min-h-screen bg-background relative overflow-hidden"
      style={{
        backgroundImage: `url(${kazirangaBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-background/50 backdrop-blur-sm"></div>
      <div className="relative z-10">
        <Header />
      
        <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Welcome Section */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Welcome, {touristData.name}</h2>
          <p className="text-muted-foreground">Tourist ID: {touristData.id}</p>
          <Badge variant="outline" className="text-primary border-primary">
            <Wifi className="w-3 h-3 mr-1" />
            Connected
          </Badge>
        </div>

        {/* Status Bar */}
        <Card className="shadow-soft gradient-hero border-primary/20 hover-lift animate-fade-in">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">Real-time Tracking</span>
                  <Badge variant={trackingEnabled ? "default" : "secondary"} className="shadow-glow">
                    {trackingEnabled ? "ON" : "OFF"}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Battery className="w-4 h-4 text-success" />
                <span className="text-sm text-primary-foreground/80">Device: 85%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Safety Score */}
            <SafetyScore
              score={touristData.safetyScore}
              location={touristData.location}
              lastUpdate={touristData.lastUpdate}
              riskFactors={touristData.riskFactors}
            />

            {/* Weather Widget */}
            <WeatherWidget />

            {/* Nearby Emergency Services */}
            <Card className="shadow-card gradient-card border-primary/20 hover-lift animate-fade-in">
              <CardHeader className="gradient-accent rounded-t-lg">
                <CardTitle className="flex items-center space-x-2 text-accent-foreground">
                  <Navigation className="w-5 h-5" />
                  <span>Nearby Emergency Services</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-card">
                <div className="space-y-3">
                  {nearbyServices.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg gradient-interactive border border-primary/10 hover-lift transition-smooth">
                      <div>
                        <p className="font-medium text-foreground">{service.name}</p>
                        <p className="text-sm text-muted-foreground">{service.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-primary">{service.distance}</p>
                        <Button variant="outline" size="sm" className="mt-1 shadow-glow hover:gradient-primary hover:text-primary-foreground transition-smooth">
                          Directions
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Panic Button */}
            <Card className="shadow-emergency gradient-emergency border-emergency/30 hover-lift animate-fade-in pulse-emergency">
              <CardHeader className="bg-emergency/10 rounded-t-lg">
                <CardTitle className="text-center text-emergency-foreground">Emergency Response</CardTitle>
              </CardHeader>
              <CardContent className="py-6 bg-card">
                <PanicButton />
              </CardContent>
            </Card>

            {/* Emergency Contacts */}
            <Card className="shadow-card gradient-card border-primary/20 hover-lift animate-fade-in">
              <CardHeader className="gradient-accent rounded-t-lg">
                <CardTitle className="flex items-center space-x-2 text-accent-foreground">
                  <Phone className="w-5 h-5" />
                  <span>Emergency Contacts</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-card">
                <div className="space-y-3">
                  {touristData.emergencyContacts.map((contact, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg gradient-interactive hover-lift transition-smooth">
                      <div>
                        <p className="font-medium text-foreground">{contact.name}</p>
                        <p className="text-sm text-muted-foreground">{contact.number}</p>
                      </div>
                      <Button variant="outline" size="sm" className="shadow-glow hover:gradient-primary hover:text-primary-foreground transition-smooth">
                        <Phone className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-card gradient-card border-primary/20 hover-lift animate-fade-in">
              <CardHeader className="gradient-accent rounded-t-lg">
                <CardTitle className="flex items-center space-x-2 text-accent-foreground">
                  <Users className="w-5 h-5" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 bg-card">
                <Button 
                  variant="outline" 
                  className="w-full justify-start hover-lift gradient-interactive border-primary/30 shadow-glow transition-smooth hover:scale-105"
                  onClick={handleShareLocation}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Location
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start hover-lift gradient-interactive border-primary/30 shadow-glow transition-smooth hover:scale-105"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Guide
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start hover-lift gradient-interactive border-primary/30 shadow-glow transition-smooth hover:scale-105"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  AI Assistant
                </Button>
                <Button 
                  variant={trackingEnabled ? "secondary" : "default"}
                  className="w-full justify-start hover-lift transition-smooth hover:scale-105"
                  onClick={() => setTrackingEnabled(!trackingEnabled)}
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  {trackingEnabled ? "Disable" : "Enable"} Tracking
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        </main>
      </div>
    </div>
  );
};

export default TouristDashboard;