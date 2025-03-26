import { Variants } from "framer-motion";

export const colors = {
  primary: {
    purple: "from-purple-400 to-cyan-400",
    blue: "from-blue-400 to-purple-400",
    cyan: "from-cyan-400 to-blue-400",
    gradient: "from-purple-400 via-cyan-400 to-blue-400"
  },
  background: {
    dark: "bg-black",
    glass: "bg-white/5",
    gradient: "from-purple-900/10 via-cyan-900/10 to-blue-900/10"
  },
  text: {
    primary: "text-white",
    secondary: "text-gray-300",
    gradient: "bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent"
  }
};

export const animations = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  } as Variants,
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  } as Variants,
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 }
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.2 }
  }
};

export const styles = {
  section: "py-24 bg-black relative overflow-hidden",
  container: "container mx-auto px-4",
  card: {
    base: "relative p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-colors duration-300",
    glass: "backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl",
    gradient: "bg-gradient-to-br from-purple-500/20 to-cyan-500/20"
  },
  button: {
    primary: "group relative px-8 py-6 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl",
    outline: "px-8 py-6 rounded-xl text-gray-300 hover:text-white border border-white/30 hover:bg-white/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
  },
  icon: {
    container: "w-16 h-16 mb-6 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center",
    size: "w-8 h-8 text-white"
  },
  heading: {
    h1: "text-5xl md:text-7xl font-bold mb-6 leading-tight",
    h2: "text-4xl md:text-5xl font-bold mb-6",
    h3: "text-xl font-semibold mb-4 text-white"
  },
  text: {
    large: "text-lg md:text-xl text-gray-300",
    medium: "text-lg text-gray-300",
    small: "text-gray-300"
  }
}; 