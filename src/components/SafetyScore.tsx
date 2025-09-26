import { Shield, MapPin, Clock, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface SafetyScoreProps {
  score: number;
  location: string;
  lastUpdate: string;
  riskFactors: string[];
}

const SafetyScore = ({ score, location, lastUpdate, riskFactors }: SafetyScoreProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-emergency";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Safe";
    if (score >= 60) return "Caution";
    return "High Risk";
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return "gradient-safe";
    if (score >= 60) return "bg-warning";
    return "bg-emergency";
  };

  return (
    <Card className="shadow-card border-0">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-primary" />
          <span>Safety Score</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Score Display */}
        <div className="text-center space-y-2">
          <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
            {score}
          </div>
          <Badge 
            variant="outline" 
            className={`${getScoreColor(score)} border-current`}
          >
            {getScoreLabel(score)}
          </Badge>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Risk Level</span>
            <span className="font-medium">{score}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-smooth ${getProgressColor(score)}`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>

        {/* Location & Time */}
        <div className="space-y-2 pt-2 border-t">
          <div className="flex items-center space-x-2 text-sm">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground">{location}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Updated {lastUpdate}</span>
          </div>
        </div>

        {/* Risk Factors */}
        {riskFactors.length > 0 && (
          <div className="space-y-2 pt-2 border-t">
            <div className="flex items-center space-x-2 text-sm font-medium">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span>Active Risk Factors</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {riskFactors.map((factor, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {factor}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SafetyScore;