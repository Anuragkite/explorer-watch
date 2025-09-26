import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Users, Navigation, Wifi, Battery } from "lucide-react";
import Header from "@/components/Header";
import PanicButton from "@/components/PanicButton";
import SafetyScore from "@/components/SafetyScore";
import WeatherWidget from "@/components/WeatherWidget";

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

  return (
    <div className="min-h-screen bg-background">
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
        <Card className="shadow-soft">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Real-time Tracking</span>
                  <Badge variant={trackingEnabled ? "default" : "secondary"}>
                    {trackingEnabled ? "ON" : "OFF"}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Battery className="w-4 h-4 text-success" />
                <span className="text-sm text-muted-foreground">Device: 85%</span>
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
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Navigation className="w-5 h-5 text-primary" />
                  <span>Nearby Emergency Services</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {nearbyServices.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium text-foreground">{service.name}</p>
                        <p className="text-sm text-muted-foreground">{service.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-primary">{service.distance}</p>
                        <Button variant="outline" size="sm" className="mt-1">
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
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-center text-emergency">Emergency Response</CardTitle>
              </CardHeader>
              <CardContent className="py-6">
                <PanicButton />
              </CardContent>
            </Card>

            {/* Emergency Contacts */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>Emergency Contacts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {touristData.emergencyContacts.map((contact, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">{contact.name}</p>
                        <p className="text-sm text-muted-foreground">{contact.number}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Phone className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <MapPin className="w-4 h-4 mr-2" />
                  Share Location
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Guide
                </Button>
                <Button 
                  variant={trackingEnabled ? "secondary" : "default"}
                  className="w-full justify-start"
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
  );
};

export default TouristDashboard;