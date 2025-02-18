import { Brain, Code2, Users2, Workflow } from "lucide-react";
import Layout from "@/components/Layout";

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        
        <div className="max-w-5xl mx-auto relative z-10">
          {/* Hero Section */}
          <div className="text-center mb-16 backdrop-blur-sm bg-white/80 p-8 rounded-2xl shadow-xl border border-white/20 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              About Brain Stroke Prevention
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Empowering individuals with AI-driven stroke risk assessment and prevention strategies
            </p>
          </div>

          {/* Who We Are Section */}
          <section className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <Users2 className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-semibold">Who We Are</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="backdrop-blur-sm bg-white/80 rounded-2xl shadow-xl border border-white/20 p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
                <h3 className="text-xl font-semibold mb-3">Paramveer Singh</h3>
                <p className="text-muted-foreground mb-4">
                  Full Stack Developer & ML Engineer
                </p>
                <p className="text-muted-foreground">
                  Specializes in developing robust web applications and implementing machine learning models.
                  Passionate about creating technology that makes a positive impact on healthcare.
                </p>
              </div>
              <div className="backdrop-blur-sm bg-white/80 rounded-2xl shadow-xl border border-white/20 p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
                <h3 className="text-xl font-semibold mb-3">Nehal Dixit</h3>
                <p className="text-muted-foreground mb-4">
                  Mental Support & Project Inspiration
                </p>
                <p className="text-muted-foreground">
                  The driving force behind the project's success through her unwavering support and encouragement.
                  Her presence and belief in Paramveer's vision helped turn this idea into reality.
                  A constant source of motivation and positive energy throughout the development journey.
                </p>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <Workflow className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-semibold">How It Works</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="backdrop-blur-sm bg-white/80 rounded-2xl shadow-xl border border-white/20 p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Brain className="w-5 h-5 text-primary" />
                    Advanced Machine Learning
                  </h3>
                  <p className="text-muted-foreground">
                    Our system utilizes state-of-the-art machine learning algorithms trained on extensive medical datasets.
                    The model analyzes various health parameters to provide accurate risk assessments.
                  </p>
                </div>
                <div className="backdrop-blur-sm bg-white/80 rounded-2xl shadow-xl border border-white/20 p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-primary" />
                    Technical Implementation
                  </h3>
                  <p className="text-muted-foreground">
                    Built using modern web technologies including React, TypeScript, and Tailwind CSS.
                    The backend is powered by Supabase, ensuring secure and scalable data management.
                  </p>
                </div>
              </div>
              <div className="backdrop-blur-sm bg-white/80 rounded-2xl shadow-xl border border-white/20 p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
                <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <p className="text-muted-foreground">
                      <span className="font-medium text-foreground">Real-time Risk Assessment:</span> Instant analysis of your health data using our ML model
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <p className="text-muted-foreground">
                      <span className="font-medium text-foreground">Personalized Recommendations:</span> Tailored health advice based on your risk factors
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <p className="text-muted-foreground">
                      <span className="font-medium text-foreground">Secure Data Handling:</span> Your health information is protected with enterprise-grade security
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <p className="text-muted-foreground">
                      <span className="font-medium text-foreground">Progress Tracking:</span> Monitor your risk levels over time with detailed history
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <p className="text-muted-foreground">
                      <span className="font-medium text-foreground">Research-Backed:</span> Based on established medical research and validated datasets
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Mission Statement */}
          <section className="text-center max-w-3xl mx-auto backdrop-blur-sm bg-white/80 rounded-2xl shadow-xl border border-white/20 p-8 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground">
              We're committed to making stroke prevention accessible to everyone through technology.
              Our goal is to empower individuals with the knowledge and tools they need to understand
              and manage their stroke risk factors effectively.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default About; 