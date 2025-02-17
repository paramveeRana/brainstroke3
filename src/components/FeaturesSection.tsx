
import { Check, Brain, Clock, Shield } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced algorithms process multiple health parameters for accurate predictions"
  },
  {
    icon: Clock,
    title: "Real-Time Results",
    description: "Get instant risk assessments and preventive recommendations"
  },
  {
    icon: Shield,
    title: "Privacy Focused",
    description: "Your health data is encrypted and protected with military-grade security"
  },
  {
    icon: Check,
    title: "Clinically Validated",
    description: "Tested and verified with extensive clinical trials and research"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 px-4 bg-neutral-light">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary-light text-primary mb-4">
            Key Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Advanced Technology for Better Prevention
          </h2>
          <p className="text-neutral max-w-2xl mx-auto">
            Our system combines cutting-edge AI with medical expertise to provide accurate stroke risk assessment
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-neutral">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
