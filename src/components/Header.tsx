import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/App";
import { Button } from "@/components/ui/button";
import { colors, animations, styles } from "@/styles/design-system";

const Header = () => {
  const { user } = useAuth();

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/50 border-b border-white/10"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <motion.span 
              className={`text-xl font-bold ${colors.text.gradient}`}
              whileHover={animations.hover}
            >
              Brain Stroke Prevention
            </motion.span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/assessment" 
              className="text-white/70 hover:text-white transition-colors"
            >
              Take Assessment
            </Link>
            <Link 
              to="/about" 
              className="text-white/70 hover:text-white transition-colors"
            >
              About
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              className={`${styles.button.outline} !px-6 !py-2`}
              onClick={() => window.location.href = user ? "/dashboard" : "/auth"}
              whileHover={animations.hover}
              whileTap={animations.tap}
            >
              {user ? "Dashboard" : "Sign In"}
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
