import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, Shield, Users, MapPin } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const [language, setLanguage] = useState("en");
  const navigate = useNavigate();
  const location = useLocation();

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी" },
    { code: "bn", name: "বাংলা" },
    { code: "te", name: "తెలుగు" },
    { code: "mr", name: "मराठी" },
    { code: "ta", name: "தமிழ்" },
    { code: "gu", name: "ગુજરાતી" },
    { code: "kn", name: "ಕನ್ನಡ" },
    { code: "ml", name: "മലയാളം" },
    { code: "pa", name: "ਪੰਜਾਬੀ" },
    { code: "or", name: "ଓଡ଼ିଆ" }
  ];

  const currentPage = location.pathname;

  return (
    <header className="bg-background border-b border-border shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full gradient-primary">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Tourist Safety Hub</h1>
              <p className="text-sm text-muted-foreground">Smart Monitoring & Response</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Button
              variant={currentPage === "/" ? "default" : "ghost"}
              onClick={() => navigate("/")}
              className="flex items-center space-x-2"
            >
              <MapPin className="w-4 h-4" />
              <span>Tourist Dashboard</span>
            </Button>
            <Button
              variant={currentPage === "/admin" ? "default" : "ghost"}
              onClick={() => navigate("/admin")}
              className="flex items-center space-x-2"
            >
              <Users className="w-4 h-4" />
              <span>Admin Portal</span>
            </Button>
            <Button
              variant={currentPage === "/register" ? "default" : "ghost"}
              onClick={() => navigate("/register")}
              className="flex items-center space-x-2"
            >
              <Shield className="w-4 h-4" />
              <span>Register</span>
            </Button>
          </nav>

          {/* Language Selector */}
          <div className="flex items-center space-x-3">
            <Globe className="w-4 h-4 text-muted-foreground" />
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden mt-4 flex space-x-2">
          <Button
            variant={currentPage === "/" ? "default" : "outline"}
            size="sm"
            onClick={() => navigate("/")}
            className="flex-1"
          >
            Dashboard
          </Button>
          <Button
            variant={currentPage === "/admin" ? "default" : "outline"}
            size="sm"
            onClick={() => navigate("/admin")}
            className="flex-1"
          >
            Admin
          </Button>
          <Button
            variant={currentPage === "/register" ? "default" : "outline"}
            size="sm"
            onClick={() => navigate("/register")}
            className="flex-1"
          >
            Register
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;