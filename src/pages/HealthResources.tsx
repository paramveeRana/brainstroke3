import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Book,
  Brain,
  HeartPulse,
  Leaf,
  Phone,
  Pill,
  ScrollText,
  Utensils,
  Youtube,
  ExternalLink,
  Clock,
} from "lucide-react";

const HealthResources = () => {
  const emergencyContacts = [
    { country: "United States", number: "911" },
    { country: "India", number: "112" },
    { country: "United Kingdom", number: "999" },
    { country: "Australia", number: "000" },
  ];

  const warningSignsData = [
    "Sudden numbness or weakness in face, arm, or leg (especially on one side)",
    "Sudden confusion, trouble speaking or understanding speech",
    "Sudden trouble seeing in one or both eyes",
    "Sudden trouble walking, dizziness, loss of balance",
    "Sudden severe headache with no known cause",
  ];

  const preventionTipsData = [
    {
      icon: HeartPulse,
      title: "Blood Pressure Management",
      description: "Regular monitoring and medication adherence if prescribed",
    },
    {
      icon: Utensils,
      title: "Healthy Diet",
      description: "Focus on fruits, vegetables, whole grains, and lean proteins",
    },
    {
      icon: Leaf,
      title: "Regular Exercise",
      description: "At least 150 minutes of moderate activity per week",
    },
    {
      icon: Pill,
      title: "Medication Adherence",
      description: "Take prescribed medications as directed by your healthcare provider",
    },
  ];

  const educationalResources = [
    {
      title: "Understanding Stroke Risk Factors",
      source: "American Stroke Association",
      url: "https://www.stroke.org/en/about-stroke/stroke-risk-factors",
      type: "Article",
    },
    {
      title: "Stroke Prevention Guidelines",
      source: "World Health Organization",
      url: "https://www.who.int/news-room/fact-sheets/detail/cardiovascular-diseases-(cvds)#stroke",
      type: "Guidelines",
    },
    {
      title: "Healthy Living for Stroke Prevention",
      source: "National Health Service",
      url: "https://www.nhs.uk/conditions/stroke/",
      type: "Guide",
    },
    {
      title: "Emergency Stroke Care Guide",
      source: "Mayo Clinic",
      url: "https://www.mayoclinic.org/diseases-conditions/stroke/symptoms-causes/syc-20350113",
      type: "Medical Guide",
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Health Resources & Information
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive resources and information to help you understand, prevent, and manage stroke risks.
            </p>
          </div>

          {/* Emergency Information Section */}
          <div className="mb-12 backdrop-blur-sm bg-white/80 rounded-2xl shadow-xl border border-white/20 p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
            <div className="flex items-center gap-3 mb-6">
              <Phone className="w-6 h-6 text-red-500" />
              <h2 className="text-2xl font-semibold">Emergency Contacts</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {emergencyContacts.map((contact) => (
                <div key={contact.country} className="p-4 bg-red-50 rounded-lg transition-all duration-300 hover:shadow-md hover:scale-105">
                  <p className="text-sm text-gray-600 mb-1">{contact.country}</p>
                  <p className="text-xl font-bold text-red-600">{contact.number}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Warning Signs Section */}
          <div className="mb-12 backdrop-blur-sm bg-white/80 rounded-2xl shadow-xl border border-white/20 p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-yellow-500" />
              <h2 className="text-2xl font-semibold">Warning Signs (FAST)</h2>
            </div>
            <div className="grid gap-4">
              {warningSignsData.map((sign, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg transition-all duration-300 hover:shadow-md hover:scale-105">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2" />
                  <p className="text-gray-800">{sign}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Prevention Tips Section */}
          <div className="mb-12 backdrop-blur-sm bg-white/80 rounded-2xl shadow-xl border border-white/20 p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
            <div className="flex items-center gap-3 mb-6">
              <Brain className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold">Prevention Tips</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {preventionTipsData.map((tip, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105">
                  <tip.icon className="w-6 h-6 text-primary shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">{tip.title}</h3>
                    <p className="text-sm text-gray-600">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Educational Resources Section */}
          <div className="backdrop-blur-sm bg-white/80 rounded-2xl shadow-xl border border-white/20 p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
            <div className="flex items-center gap-3 mb-6">
              <Book className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold">Educational Resources</h2>
            </div>
            <div className="grid gap-4">
              {educationalResources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-primary/5 group"
                >
                  <ScrollText className="w-6 h-6 text-primary shrink-0 transition-transform group-hover:scale-110" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {resource.title}
                      </h3>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors group-hover:translate-x-1" />
                    </div>
                    <p className="text-sm text-gray-600">
                      {resource.source} • {resource.type}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Video Resources Button */}
          <div className="mt-8 text-center">
            <Button
              className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto transition-all duration-300 hover:scale-105 hover:shadow-xl group"
              onClick={() => window.open("https://www.youtube.com/results?search_query=stroke+prevention+tips", "_blank")}
            >
              <Youtube className="w-5 h-5 transition-transform group-hover:scale-110" />
              Watch Video Resources
              <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HealthResources; 