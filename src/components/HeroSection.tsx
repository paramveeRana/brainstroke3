import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/App";

const HeroSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <section className="min-h-[90vh] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <span className="inline-block px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg text-primary mb-8 animate-fade-up">
          Advanced AI-Powered Prevention
        </span>
        
        <div className="backdrop-blur-sm bg-white/50 p-12 rounded-2xl border border-white/20 shadow-xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-up bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
            Predict and Prevent Strokes <br />with Precision
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-up">
            Using advanced machine learning algorithms to analyze health data and provide early warning signs for stroke risk.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up">
            <Button 
              className="bg-primary hover:bg-primary-dark text-white px-8 py-6 rounded-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-xl group"
              onClick={() => navigate(user ? "/assessment" : "/auth")}
            >
              Get Started 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              className="px-8 py-6 rounded-lg border-primary text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
