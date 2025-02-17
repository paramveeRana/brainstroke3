
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Input Health Data",
    description: "Enter basic health information and medical history"
  },
  {
    number: "02",
    title: "AI Analysis",
    description: "Our advanced AI processes your data using validated models"
  },
  {
    number: "03",
    title: "Risk Assessment",
    description: "Receive detailed risk analysis and personalized insights"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary-light text-primary mb-4">
            Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-neutral max-w-2xl mx-auto">
            Simple steps to get your stroke risk assessment
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative"
            >
              <div className="p-8 rounded-xl bg-white border border-gray-100 h-full">
                <span className="text-4xl font-bold text-primary-light mb-4 block">
                  {step.number}
                </span>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-neutral">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <ArrowRight className="hidden md:block absolute top-1/2 -right-4 w-8 h-8 text-primary transform -translate-y-1/2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
