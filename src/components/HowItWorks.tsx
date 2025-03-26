import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ClipboardCheck, Brain, LineChart, Shield } from "lucide-react";
import { colors, animations, styles } from "@/styles/design-system";

const steps = [
  {
    icon: ClipboardCheck,
    title: "Input Health Data",
    description: "Enter your health information and medical history through our secure platform."
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description: "Our advanced AI algorithms analyze your data to assess stroke risk factors."
  },
  {
    icon: LineChart,
    title: "Risk Assessment",
    description: "Get detailed insights and risk scores based on comprehensive analysis."
  },
  {
    icon: Shield,
    title: "Prevention Plan",
    description: "Receive personalized recommendations and preventive measures."
  }
];

const HowItWorks = () => {
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
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
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
            How It Works
          </motion.h2>
          <motion.p 
            variants={animations.item}
            className={styles.text.medium}
          >
            Our simple four-step process makes stroke prevention accessible and effective.
          </motion.p>
        </motion.div>

        <motion.div 
          variants={animations.container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => (
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
                  <step.icon className={styles.icon.size} />
                </motion.div>
                <div className="mb-4">
                  <span className="text-2xl font-bold text-white/20">0{index + 1}</span>
                </div>
                <h3 className={styles.heading.h3}>{step.title}</h3>
                <p className={styles.text.small}>{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
