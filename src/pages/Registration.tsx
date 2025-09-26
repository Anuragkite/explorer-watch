import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Shield, MapPin, Phone, Calendar, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";

interface FormData {
  name: string;
  email: string;
  phone: string;
  nationality: string;
  idType: string;
  idNumber: string;
  emergencyContact: string;
  emergencyPhone: string;
  arrivalDate: string;
  departureDate: string;
  itinerary: string;
  accommodation: string;
  agreeTerms: boolean;
  enableTracking: boolean;
}

const Registration = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    nationality: "",
    idType: "",
    idNumber: "",
    emergencyContact: "",
    emergencyPhone: "",
    arrivalDate: "",
    departureDate: "",
    itinerary: "",
    accommodation: "",
    agreeTerms: false,
    enableTracking: true
  });

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeTerms) {
      toast({
        title: "Agreement Required",
        description: "Please agree to the terms and conditions to proceed.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call - in real app would POST to /api/register
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock tourist ID
      const touristId = `TST-2024-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
      
      toast({
        title: "Registration Successful! 🎉",
        description: `Your Tourist ID: ${touristId}. Welcome to the safety monitoring system.`,
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        nationality: "",
        idType: "",
        idNumber: "",
        emergencyContact: "",
        emergencyPhone: "",
        arrivalDate: "",
        departureDate: "",
        itinerary: "",
        accommodation: "",
        agreeTerms: false,
        enableTracking: true
      });

    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Please try again or contact support.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nationalities = [
    "Afghanistan", "Albania", "Algeria", "Argentina", "Australia", "Austria", "Bangladesh", 
    "Belgium", "Brazil", "Canada", "China", "Denmark", "Egypt", "France", "Germany", 
    "India", "Indonesia", "Italy", "Japan", "Malaysia", "Netherlands", "Norway", 
    "Pakistan", "Philippines", "Singapore", "South Korea", "Spain", "Sri Lanka", 
    "Sweden", "Switzerland", "Thailand", "Turkey", "United Arab Emirates", 
    "United Kingdom", "United States", "Vietnam"
  ];

  const idTypes = [
    "Passport",
    "Aadhaar Card",
    "Driving License",
    "Voter ID",
    "National ID Card"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center w-16 h-16 rounded-full gradient-primary mx-auto mb-4">
              <UserPlus className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Tourist Registration</h2>
            <p className="text-muted-foreground">Join the smart safety monitoring system for a secure travel experience</p>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <Shield className="w-8 h-8 mx-auto mb-2 text-success" />
              <p className="font-medium text-foreground">24/7 Safety Monitoring</p>
              <p className="text-sm text-muted-foreground">Real-time location tracking</p>
            </div>
            <div className="text-center p-4">
              <Phone className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="font-medium text-foreground">Emergency Response</p>
              <p className="text-sm text-muted-foreground">Instant help at your fingertips</p>
            </div>
            <div className="text-center p-4">
              <Users className="w-8 h-8 mx-auto mb-2 text-warning" />
              <p className="font-medium text-foreground">Family Notifications</p>
              <p className="text-sm text-muted-foreground">Keep loved ones informed</p>
            </div>
          </div>

          {/* Registration Form */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Registration Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground flex items-center">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Personal Information
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+91 98765 43210"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="nationality">Nationality *</Label>
                      <Select value={formData.nationality} onValueChange={(value) => handleInputChange("nationality", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your nationality" />
                        </SelectTrigger>
                        <SelectContent>
                          {nationalities.map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Identity Verification */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    Identity Verification
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="idType">ID Document Type *</Label>
                      <Select value={formData.idType} onValueChange={(value) => handleInputChange("idType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select ID type" />
                        </SelectTrigger>
                        <SelectContent>
                          {idTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="idNumber">ID Number *</Label>
                      <Input
                        id="idNumber"
                        value={formData.idNumber}
                        onChange={(e) => handleInputChange("idNumber", e.target.value)}
                        placeholder="Enter ID number"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    Emergency Contact
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContact">Emergency Contact Name *</Label>
                      <Input
                        id="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                        placeholder="Contact person name"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="emergencyPhone">Emergency Contact Phone *</Label>
                      <Input
                        id="emergencyPhone"
                        value={formData.emergencyPhone}
                        onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                        placeholder="+91 98765 43210"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Travel Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    Travel Information
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="arrivalDate">Arrival Date *</Label>
                      <Input
                        id="arrivalDate"
                        type="date"
                        value={formData.arrivalDate}
                        onChange={(e) => handleInputChange("arrivalDate", e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="departureDate">Departure Date *</Label>
                      <Input
                        id="departureDate"
                        type="date"
                        value={formData.departureDate}
                        onChange={(e) => handleInputChange("departureDate", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accommodation">Accommodation Details</Label>
                    <Input
                      id="accommodation"
                      value={formData.accommodation}
                      onChange={(e) => handleInputChange("accommodation", e.target.value)}
                      placeholder="Hotel name and address"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="itinerary">Travel Itinerary</Label>
                    <Textarea
                      id="itinerary"
                      value={formData.itinerary}
                      onChange={(e) => handleInputChange("itinerary", e.target.value)}
                      placeholder="Brief description of places you plan to visit..."
                      rows={3}
                    />
                  </div>
                </div>

                {/* Privacy Settings */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Privacy & Safety Settings</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="enableTracking"
                        checked={formData.enableTracking}
                        onCheckedChange={(checked) => handleInputChange("enableTracking", !!checked)}
                      />
                      <Label htmlFor="enableTracking" className="text-sm">
                        Enable real-time location tracking for safety monitoring
                      </Label>
                      <Badge variant="outline" className="text-success border-success">
                        Recommended
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="agreeTerms"
                        checked={formData.agreeTerms}
                        onCheckedChange={(checked) => handleInputChange("agreeTerms", !!checked)}
                      />
                      <Label htmlFor="agreeTerms" className="text-sm">
                        I agree to the <span className="text-primary cursor-pointer">Terms & Conditions</span> and <span className="text-primary cursor-pointer">Privacy Policy</span> *
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 mr-2 animate-spin border-2 border-primary-foreground border-t-transparent rounded-full" />
                      Processing Registration...
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Complete Registration
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Registration;