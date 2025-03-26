import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/App";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { colors, animations, styles } from "@/styles/design-system";

const CTASection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
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
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div 
            variants={animations.item}
            className="inline-block px-6 py-3 mb-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
          >
            <span className={colors.text.gradient}>
              Ready to Get Started?
            </span>
          </motion.div>

          <motion.h2 
            variants={animations.item}
            className={`${styles.heading.h2} ${colors.text.gradient}`}
          >
            Take Control of Your Health Today
          </motion.h2>

          <motion.p 
            variants={animations.item}
            className={`${styles.text.medium} mb-8 max-w-2xl mx-auto`}
          >
            Join thousands of users who are already using our AI-powered system to monitor and prevent stroke risks.
          </motion.p>

          <motion.div 
            variants={animations.item}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              className={styles.button.primary}
              onClick={() => navigate(user ? "/assessment" : "/auth")}
              whileHover={animations.hover}
              whileTap={animations.tap}
            >
              <motion.span 
                className="absolute inset-0 bg-white/30"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
              <span className="relative flex items-center gap-2">
                Start Your Assessment
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </span>
            </Button>
            <Button 
              variant="outline" 
              className={styles.button.outline}
              onClick={() => navigate("/about")}
              whileHover={animations.hover}
              whileTap={animations.tap}
            >
              Learn More
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
