import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/App";

const CTASection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <section className="py-20 px-4 bg-primary text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Take the First Step Towards Prevention
        </h2>
        <p className="text-lg mb-8 opacity-90">
          Join thousands of users who have already benefited from our early detection system
        </p>
        <Button 
          className="bg-white text-primary hover:bg-gray-100 px-8 py-6 rounded-lg flex items-center gap-2 mx-auto"
          onClick={() => navigate(user ? "/assessment" : "/auth")}
        >
          Get Started Now
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
