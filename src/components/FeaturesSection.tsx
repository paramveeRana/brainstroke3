import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Shield, Activity, LineChart } from "lucide-react";
import { colors, animations, styles } from "@/styles/design-system";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced machine learning algorithms analyze your health data to predict stroke risk with high accuracy."
  },
  {
    icon: Shield,
    title: "Early Warning System",
    description: "Get timely alerts and recommendations to prevent potential stroke risks before they become critical."
  },
  {
    icon: Activity,
    title: "Real-time Monitoring",
    description: "Continuous tracking of vital health metrics to provide up-to-date risk assessments and insights."
  },
  {
    icon: LineChart,
    title: "Data Visualization",
    description: "Clear and intuitive visualizations of your health data and risk factors over time."
  }
];

const FeaturesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className={styles.section}>
      {/* Background Elements */}
      <motion.div 
        className={`absolute inset-0 bg-gradient-to-b ${colors.background.gradient}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      
      <motion.div 
        className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className={styles.container}>
        <motion.div
          ref={containerRef}
          variants={animations.container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={animations.item}
            className={`${styles.heading.h2} ${colors.text.gradient}`}
          >
            Key Features
          </motion.h2>
          <motion.p 
            variants={animations.item}
            className={styles.text.medium}
          >
            Our advanced system combines cutting-edge technology with medical expertise to provide comprehensive stroke prevention solutions.
          </motion.p>
        </motion.div>

        <motion.div 
          variants={animations.container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={animations.item}
              className="group relative"
              whileHover={animations.hover}
              transition={{ duration: 0.2 }}
            >
              <div className={`absolute inset-0 ${styles.card.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className={styles.card.base}>
                <motion.div 
                  className={styles.icon.container}
                  whileHover={animations.hover}
                  transition={{ duration: 0.2 }}
                >
                  <feature.icon className={styles.icon.size} />
                </motion.div>
                <h3 className={styles.heading.h3}>{feature.title}</h3>
                <p className={styles.text.small}>{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
