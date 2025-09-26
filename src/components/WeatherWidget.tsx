import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Sun, CloudRain, AlertTriangle, Thermometer } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  alerts: string[];
}

const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock weather data - in real app would use OpenWeather API
  useEffect(() => {
    const fetchWeather = async () => {
      // Simulate API call delay
      setTimeout(() => {
        setWeather({
          temperature: 28,
          condition: "Partly Cloudy",
          humidity: 72,
          windSpeed: 15,
          visibility: 8,
          alerts: ["UV Index High", "Air Quality Moderate"]
        });
        setLoading(false);
      }, 1000);
    };

    fetchWeather();
  }, []);

  const getWeatherIcon = (condition: string) => {
    if (condition.includes("Rain")) return CloudRain;
    if (condition.includes("Cloud")) return Cloud;
    return Sun;
  };

  const getWeatherAlert = (alerts: string[]) => {
    const highRiskAlerts = alerts.filter(alert => 
      alert.includes("High") || alert.includes("Severe") || alert.includes("Warning")
    );
    return highRiskAlerts.length > 0 ? "warning" : "safe";
  };

  if (loading) {
    return (
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Cloud className="w-5 h-5 text-primary animate-pulse" />
            <span>Weather Conditions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!weather) return null;

  const WeatherIcon = getWeatherIcon(weather.condition);
  const alertLevel = getWeatherAlert(weather.alerts);

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <WeatherIcon className="w-5 h-5 text-primary" />
          <span>Weather Conditions</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Temperature and Condition */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Thermometer className="w-4 h-4 text-muted-foreground" />
              <span className="text-2xl font-bold text-foreground">{weather.temperature}°C</span>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium text-foreground">{weather.condition}</p>
            <p className="text-sm text-muted-foreground">Feels comfortable</p>
          </div>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-3 gap-4 pt-2 border-t">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Humidity</p>
            <p className="font-medium">{weather.humidity}%</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Wind</p>
            <p className="font-medium">{weather.windSpeed} km/h</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Visibility</p>
            <p className="font-medium">{weather.visibility} km</p>
          </div>
        </div>

        {/* Weather Alerts */}
        {weather.alerts.length > 0 && (
          <div className="space-y-2 pt-2 border-t">
            <div className="flex items-center space-x-2">
              <AlertTriangle className={`w-4 h-4 ${alertLevel === 'warning' ? 'text-warning' : 'text-muted-foreground'}`} />
              <span className="text-sm font-medium">Weather Alerts</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {weather.alerts.map((alert, index) => (
                <Badge 
                  key={index} 
                  variant={alertLevel === 'warning' ? 'destructive' : 'secondary'}
                  className="text-xs"
                >
                  {alert}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;