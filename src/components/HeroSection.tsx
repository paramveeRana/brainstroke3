import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/App";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { colors, animations, styles } from "@/styles/design-system";

const HeroSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className={`relative min-h-screen w-full overflow-hidden ${colors.background.dark}`}>
      {/* Background Layers */}
      <motion.div 
        style={{ opacity }}
        className={`absolute inset-0 bg-gradient-to-br ${colors.background.gradient}`}
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
        className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
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
        className="absolute top-1/4 right-1/4 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"
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
        className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"
      />
      
      {/* Grid Pattern Overlay */}
      <motion.div 
        style={{ opacity }}
        className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzMzMzMzIyIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" 
      />

      {/* Main Content */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 flex min-h-screen items-center justify-center px-4 pt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-6xl mx-auto text-center">
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
            <motion.span 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"
            />
            <span className={colors.text.gradient}>
              AI-Powered Stroke Prevention System
            </span>
          </motion.span>

          {/* Main Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.8,
              ease: "easeOut",
              delay: 0.4
            }}
            className={`${styles.card.glass} p-12 rounded-3xl`}
          >
            {/* Title */}
            <motion.h1 
              className={styles.heading.h1}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8,
                ease: "easeOut",
                delay: 0.6
              }}
            >
              <span className={colors.text.gradient}>
                Predict and Prevent
              </span>
              <span className={`block ${colors.text.primary} mt-2`}>
                Brain Strokes
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p 
              className={`${styles.text.large} mb-8 max-w-2xl mx-auto`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8,
                ease: "easeOut",
                delay: 0.8
              }}
            >
              Using advanced machine learning algorithms to analyze health data and provide early warning signs for stroke risk.
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8,
                ease: "easeOut",
                delay: 1
              }}
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
                  Get Started
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
      </motion.div>
    </section>
  );
};

export default HeroSection;
