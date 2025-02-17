import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/App";

const HeroSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4 animate-fade-in">
      <div className="max-w-6xl mx-auto text-center">
        <span className="inline-block px-4 py-2 rounded-full bg-primary-light text-primary mb-6 animate-fade-up">
          Advanced AI-Powered Prevention
        </span>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-up" style={{ animationDelay: "0.1s" }}>
          Predict and Prevent Strokes <br />with Precision
        </h1>
        <p className="text-lg md:text-xl text-neutral mb-8 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
          Using advanced machine learning algorithms to analyze health data and provide early warning signs for stroke risk.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <Button 
            className="bg-primary hover:bg-primary-dark text-white px-8 py-6 rounded-lg flex items-center gap-2 transition-all"
            onClick={() => navigate(user ? "/assessment" : "/auth")}
          >
            Get Started 
            <ArrowRight className="w-5 h-5" />
          </Button>
          <Button variant="outline" className="px-8 py-6 rounded-lg">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
