import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, AlertTriangle, MapPin, Phone, Download, 
  Filter, Search, Eye, UserCheck, Activity, 
  TrendingUp, Clock, Shield
} from "lucide-react";
import Header from "@/components/Header";
import kazirangaBg from "@/assets/kaziranga-bg.jpg";

const AdminDashboard = () => {
  const [selectedRole] = useState("tourism"); // "police" or "tourism"

  // Mock data - in real app would come from API
  const adminStats = {
    totalTourists: 1247,
    activeTourists: 892,
    alerts: 15,
    emergencies: 3,
    safetyScore: 78
  };

  const recentAlerts = [
    {
      id: "ALT-001",
      tourist: "John Traveler",
      type: "Location Drop",
      location: "Connaught Place",
      time: "5 mins ago",
      severity: "medium",
      status: "investigating"
    },
    {
      id: "ALT-002", 
      tourist: "Sarah Wilson",
      type: "Panic Button",
      location: "Red Fort",
      time: "12 mins ago",
      severity: "high",
      status: "responded"
    },
    {
      id: "ALT-003",
      tourist: "Mike Chen", 
      type: "Itinerary Deviation",
      location: "Old Delhi",
      time: "25 mins ago",
      severity: "low",
      status: "resolved"
    }
  ];

  const touristClusters = [
    { area: "India Gate", count: 156, risk: "low", coordinates: [28.6129, 77.2295] },
    { area: "Red Fort", count: 89, risk: "medium", coordinates: [28.6562, 77.2410] },
    { area: "Connaught Place", count: 234, risk: "high", coordinates: [28.6315, 77.2167] },
    { area: "Lotus Temple", count: 67, risk: "low", coordinates: [28.5535, 77.2588] }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "outline";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high": return "text-emergency";
      case "medium": return "text-warning";
      case "low": return "text-success";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden"
         style={{
           backgroundImage: `url(${kazirangaBg})`,
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundAttachment: 'fixed'
         }}>
      <div className="absolute inset-0 bg-background/50 backdrop-blur-sm"></div>
      <div className="relative z-10">
        <Header />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {selectedRole === "police" ? "Police Command Center" : "Tourism Department Portal"}
            </h2>
            <p className="text-muted-foreground">Real-time tourist safety monitoring</p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="text-success border-success">
              <Activity className="w-3 h-3 mr-1" />
              System Online
            </Badge>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="shadow-soft gradient-card hover-lift animate-fade-in transition-smooth">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold text-foreground">{adminStats.totalTourists}</p>
              <p className="text-sm text-muted-foreground">Total Tourists</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft gradient-card hover-lift animate-fade-in transition-smooth">
            <CardContent className="p-4 text-center">
              <UserCheck className="w-8 h-8 mx-auto mb-2 text-success" />
              <p className="text-2xl font-bold text-foreground">{adminStats.activeTourists}</p>
              <p className="text-sm text-muted-foreground">Active Now</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft gradient-card hover-lift animate-fade-in transition-smooth">
            <CardContent className="p-4 text-center">
              <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-warning" />
              <p className="text-2xl font-bold text-foreground">{adminStats.alerts}</p>
              <p className="text-sm text-muted-foreground">Active Alerts</p>
            </CardContent>
          </Card>

          <Card className="shadow-emergency gradient-emergency hover-lift animate-fade-in transition-smooth">
            <CardContent className="p-4 text-center">
              <Phone className="w-8 h-8 mx-auto mb-2 text-emergency-foreground" />
              <p className="text-2xl font-bold text-emergency-foreground">{adminStats.emergencies}</p>
              <p className="text-sm text-emergency-foreground/80">Emergencies</p>
            </CardContent>
          </Card>

          <Card className="shadow-glow gradient-primary hover-lift animate-fade-in transition-smooth">
            <CardContent className="p-4 text-center">
              <Shield className="w-8 h-8 mx-auto mb-2 text-primary-foreground" />
              <p className="text-2xl font-bold text-primary-foreground">{adminStats.safetyScore}%</p>
              <p className="text-sm text-primary-foreground/80">Safety Score</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="alerts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
            <TabsTrigger value="clusters">Tourist Clusters</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Active Alerts Tab */}
          <TabsContent value="alerts" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Recent Alerts & Incidents</h3>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {recentAlerts.map((alert) => (
                <Card key={alert.id} className="shadow-card gradient-card hover-lift animate-fade-in transition-smooth">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Badge variant={getSeverityColor(alert.severity)} className="shadow-glow">
                          {alert.type}
                        </Badge>
                        <div>
                          <p className="font-medium text-foreground">{alert.tourist}</p>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            <span>{alert.location}</span>
                            <Clock className="w-3 h-3 ml-2" />
                            <span>{alert.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="capitalize">
                          {alert.status}
                        </Badge>
                        <Button variant="outline" size="sm" className="hover:gradient-primary hover:text-primary-foreground transition-smooth">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tourist Clusters Tab */}
          <TabsContent value="clusters" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Tourist Distribution & Risk Areas</h3>
              <Button variant="outline" size="sm">
                <TrendingUp className="w-4 h-4 mr-2" />
                Analytics
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {touristClusters.map((cluster, index) => (
                <Card key={index} className="shadow-card gradient-card hover-lift animate-fade-in transition-smooth">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-foreground">{cluster.area}</h4>
                      <Badge variant="outline" className={`${getRiskColor(cluster.risk)} shadow-glow`}>
                        {cluster.risk.toUpperCase()} RISK
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Active Tourists</span>
                        <span className="font-medium">{cluster.count}</span>
                      </div>
                      
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-smooth ${
                            cluster.risk === 'high' ? 'bg-emergency shadow-emergency' :
                            cluster.risk === 'medium' ? 'bg-warning' : 'bg-success shadow-glow'
                          }`}
                          style={{ width: `${Math.min((cluster.count / 250) * 100, 100)}%` }}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <Button variant="outline" size="sm" className="hover:gradient-primary hover:text-primary-foreground transition-smooth">
                          <MapPin className="w-4 h-4 mr-1" />
                          View Map
                        </Button>
                        <Button variant="outline" size="sm" className="hover:gradient-emergency hover:text-emergency-foreground transition-smooth">
                          <AlertTriangle className="w-4 h-4 mr-1" />
                          Send Alert
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Reports & Analytics</h3>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-base">Missing Tourist Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-foreground mb-2">0</p>
                  <p className="text-sm text-success">All tourists accounted for</p>
                  <Button variant="outline" className="w-full mt-3" size="sm">
                    Auto-Generate Report
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-base">Daily Safety Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-success mb-2">Good</p>
                  <p className="text-sm text-muted-foreground">Overall safety status</p>
                  <Button variant="outline" className="w-full mt-3" size="sm">
                    View Details
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-base">Incident Response</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary mb-2">4.2 min</p>
                  <p className="text-sm text-muted-foreground">Average response time</p>
                  <Button variant="outline" className="w-full mt-3" size="sm">
                    Performance Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      </div>
    </div>
  );
};

export default AdminDashboard;