import { motion, useScroll, useTransform } from "framer-motion";
import { colors, animations, styles } from "@/styles/design-system";
import { Brain, Users, Lightbulb, Target, Code2, Shield, Activity, History } from "lucide-react";
import Header from "@/components/Header";
import { useRef } from "react";

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <div ref={containerRef} className={`min-h-screen ${colors.background.dark} relative overflow-hidden`}>
      <Header />
      
      {/* Background Layers */}
      <motion.div 
        style={{ opacity }}
        className={`fixed inset-0 bg-gradient-to-br ${colors.background.gradient} -z-10`}
      />
      
      {/* Animated Circles */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="fixed -top-40 -left-40 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl -z-10"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="fixed top-1/4 right-1/4 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl -z-10"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.45, 0.3]
        }}
        transition={{ 
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="fixed -bottom-20 -right-20 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl -z-10"
      />
      
      {/* Grid Pattern Overlay */}
      <motion.div 
        style={{ opacity }}
        className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzMzMzMzIyIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20 -z-10" 
      />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className={styles.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Status Badge */}
            <motion.span 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6,
                ease: "easeOut",
                delay: 0.2
              }}
              className="inline-block px-6 py-3 mb-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
            >
              <span className={colors.text.gradient}>
                About Brain Stroke Prevention
              </span>
            </motion.span>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8,
                ease: "easeOut",
                delay: 0.4
              }}
              className={`${styles.heading.h1} ${colors.text.gradient} mb-6`}
            >
              AI-powered stroke prediction and prevention
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="relative py-24">
        <div className={styles.container}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={animations.container}
            className="max-w-6xl mx-auto"
          >
            <motion.div className="flex items-center justify-center gap-3 mb-12" variants={animations.item}>
              <Users className="w-8 h-8 text-purple-400" />
              <motion.h2 
                variants={animations.item}
                className={`${styles.heading.h2} ${colors.text.gradient}`}
              >
                Who We Are
              </motion.h2>
            </motion.div>
            
            <motion.div 
              variants={animations.item}
              className={`${styles.card.glass} p-12 rounded-3xl`}
            >
              <div className="grid md:grid-cols-2 gap-12">
                {/* Team Member 1 */}
                <motion.div 
                  className="group"
                  whileHover={animations.hover}
                >
                  <div className={`${styles.card.base} h-full`}>
                    <div className={styles.icon.container}>
                      <Users className={styles.icon.size} />
                    </div>
                    <h3 className={styles.heading.h3}>Paramveer Singh</h3>
                    <p className={`${styles.text.medium} mb-4`}>
                      Full Stack Developer & ML Engineer
                    </p>
                    <p className={styles.text.small}>
                      Specializes in developing robust web applications and implementing machine learning models. Passionate about creating technology that makes a positive impact on healthcare.
                    </p>
                    <div className="mt-6 space-y-2">
                      <div className="flex items-center gap-2">
                        <Code2 className="w-5 h-5 text-purple-400" />
                        <span className={styles.text.small}>Full Stack Development</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Brain className="w-5 h-5 text-cyan-400" />
                        <span className={styles.text.small}>Machine Learning Expert</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Team Member 2 */}
                <motion.div 
                  className="group"
                  whileHover={animations.hover}
                >
                  <div className={`${styles.card.base} h-full`}>
                    <div className={styles.icon.container}>
                      <Users className={styles.icon.size} />
                    </div>
                    <h3 className={styles.heading.h3}>Nehal Dixit</h3>
                    <p className={`${styles.text.medium} mb-4`}>
                      Mental Support & Project Inspiration
                    </p>
                    <p className={styles.text.small}>
                      The driving force behind the project's success through her unwavering support and encouragement. Her presence and belief in Paramveer's vision helped turn this idea into reality. A constant source of motivation and positive energy throughout the development journey.
                    </p>
                    <div className="mt-6 space-y-2">
                      <div className="flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-purple-400" />
                        <span className={styles.text.small}>Project Vision & Support</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity className="w-5 h-5 text-cyan-400" />
                        <span className={styles.text.small}>Motivation & Guidance</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-24">
        <div className={styles.container}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={animations.container}
            className="max-w-6xl mx-auto"
          >
            <motion.div className="flex items-center justify-center gap-3 mb-12" variants={animations.item}>
              <Brain className="w-8 h-8 text-cyan-400" />
              <motion.h2 
                variants={animations.item}
                className={`${styles.heading.h2} ${colors.text.gradient}`}
              >
                How It Works
              </motion.h2>
            </motion.div>
            
            <motion.div 
              variants={animations.item}
              className={`${styles.card.glass} p-12 rounded-3xl`}
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className={`${styles.card.base}`}>
                  <div className={styles.icon.container}>
                    <Brain className={styles.icon.size} />
                  </div>
                  <h3 className={styles.heading.h3}>Advanced AI Analysis</h3>
                  <p className={styles.text.small}>
                    Our system utilizes state-of-the-art machine learning algorithms trained on extensive medical datasets to analyze health parameters and provide accurate risk assessments.
                  </p>
                </div>

                <div className={`${styles.card.base}`}>
                  <div className={styles.icon.container}>
                    <Shield className={styles.icon.size} />
                  </div>
                  <h3 className={styles.heading.h3}>Secure Data Handling</h3>
                  <p className={styles.text.small}>
                    Your health information is protected with enterprise-grade security measures, ensuring complete privacy and confidentiality.
                  </p>
                </div>

                <div className={`${styles.card.base}`}>
                  <div className={styles.icon.container}>
                    <History className={styles.icon.size} />
                  </div>
                  <h3 className={styles.heading.h3}>Real-time Monitoring</h3>
                  <p className={styles.text.small}>
                    Continuous analysis and tracking of your health metrics, providing instant alerts and recommendations when needed.
                  </p>
                </div>
              </div>

              <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-white/10">
                <h3 className={`${styles.heading.h3} text-center mb-6`}>Key Features</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2.5" />
                    <p className={styles.text.small}>
                      <span className="text-white font-medium">Real-time Risk Assessment:</span> Instant analysis of your health data using our ML model
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2.5" />
                    <p className={styles.text.small}>
                      <span className="text-white font-medium">Personalized Recommendations:</span> Tailored health advice based on your risk factors
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2.5" />
                    <p className={styles.text.small}>
                      <span className="text-white font-medium">Progress Tracking:</span> Monitor your risk levels over time with detailed history
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2.5" />
                    <p className={styles.text.small}>
                      <span className="text-white font-medium">Research-Backed:</span> Based on established medical research and validated datasets
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="relative py-24 mb-0">
        <div className={styles.container}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={animations.container}
            className="max-w-6xl mx-auto"
          >
            <motion.div className="flex items-center justify-center gap-3 mb-12" variants={animations.item}>
              <Target className="w-8 h-8 text-blue-400" />
              <motion.h2 
                variants={animations.item}
                className={`${styles.heading.h2} ${colors.text.gradient}`}
              >
                Our Mission
              </motion.h2>
            </motion.div>
            
            <motion.div 
              variants={animations.item}
              className={`${styles.card.glass} p-12 rounded-3xl`}
            >
              <div className="grid md:grid-cols-2 gap-12">
                <motion.div 
                  className="group"
                  whileHover={animations.hover}
                >
                  <div className={`${styles.card.base} h-full`}>
                    <div className={styles.icon.container}>
                      <Target className={styles.icon.size} />
                    </div>
                    <h3 className={styles.heading.h3}>Early Detection</h3>
                    <p className={styles.text.small}>
                      Identify potential stroke risks before they become critical through continuous monitoring and analysis. Our AI system processes multiple health parameters to provide accurate risk assessments.
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  className="group"
                  whileHover={animations.hover}
                >
                  <div className={`${styles.card.base} h-full`}>
                    <div className={styles.icon.container}>
                      <Lightbulb className={styles.icon.size} />
                    </div>
                    <h3 className={styles.heading.h3}>Prevention First</h3>
                    <p className={styles.text.small}>
                      Empower users with personalized recommendations and preventive measures to reduce stroke risks. We believe in proactive healthcare management through technology and education.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About; 