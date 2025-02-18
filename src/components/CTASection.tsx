import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/App";

const CTASection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 via-primary/5 to-primary/10" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="backdrop-blur-sm bg-white/80 p-12 rounded-2xl border border-white/20 shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
            Take the First Step Towards Prevention
          </h2>
          <p className="text-lg mb-8 text-gray-600">
            Join thousands of users who have already benefited from our early detection system
          </p>
          <Button 
            className="bg-primary hover:bg-primary-dark text-white px-8 py-6 rounded-lg flex items-center gap-2 mx-auto transition-all duration-300 hover:scale-105 hover:shadow-xl group"
            onClick={() => navigate(user ? "/assessment" : "/auth")}
          >
            Get Started Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
