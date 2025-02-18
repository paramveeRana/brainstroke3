import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-white/20">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Brain Stroke Prevention
            </h3>
            <p className="text-sm text-muted-foreground">
              AI-powered platform for early stroke risk assessment and prevention.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Button 
                  variant="link" 
                  onClick={() => navigate("/assessment")}
                  className="text-muted-foreground hover:text-primary p-0 h-auto"
                >
                  Take Assessment
                </Button>
              </li>
              <li>
                <Button 
                  variant="link" 
                  onClick={() => navigate("/health-resources")}
                  className="text-muted-foreground hover:text-primary p-0 h-auto"
                >
                  Health Resources
                </Button>
              </li>
              <li>
                <Button 
                  variant="link" 
                  onClick={() => navigate("/about")}
                  className="text-muted-foreground hover:text-primary p-0 h-auto"
                >
                  About Us
                </Button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Email: nehaldixit@brainstroke.ai</li>
              <li>Phone: +91 6267-199559</li>
              <li>Location: wow girls Hostel,Infront of fool mandi, 26,Amitesh Nagar, near kesharbagh bridge, Basant Puri Colony, Indore, Madhya Pradesh 452012</li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/paramveerRana" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="mailto:contact@brainstroke.ai"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-gray-200">
          <p className="text-center text-sm text-muted-foreground">
            © {currentYear} Brain Stroke Prevention. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 