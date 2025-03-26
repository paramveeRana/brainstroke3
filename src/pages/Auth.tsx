import { AuthForm } from "@/components/AuthForm";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { motion, useScroll, useTransform } from "framer-motion";
import { colors, animations, styles } from "@/styles/design-system";
import Header from "@/components/Header";

const Auth = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/");
      }
    };
    
    checkUser();
  }, [navigate]);

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
      
      {/* Auth Form Container */}
      <div className="relative min-h-screen flex items-center justify-center px-4">
        {/* Glass Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.8,
            ease: "easeOut"
          }}
          className="bg-black/50 border border-gray-800 p-8 rounded-xl w-full max-w-md shadow-2xl backdrop-blur-md"
        >
          <AuthForm />
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
