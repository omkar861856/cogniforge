import { Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import AIAssistantIndicator from "./AIAssistantIndicator";

export default function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  // Calculate header background opacity based on scroll position
  const headerBackgroundOpacity = useTransform(
    scrollY,
    [0, 100],
    [0, 1]
  );
  
  const headerBoxShadow = useTransform(
    scrollY,
    [0, 100],
    ["0 0 0 rgba(0,0,0,0)", "0 4px 20px rgba(0,0,0,0.08)"]
  );
  
  // Monitor scroll position to update state for fixed header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Determine active section
      const sections = ["projects", "about", "contact"];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 200 && rect.bottom >= 200;
      });
      
      setActiveSection(currentSection || null);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:py-6 lg:px-8 flex justify-between items-center backdrop-blur-sm"
      style={{ 
        backgroundColor: `rgba(255, 255, 255, ${headerBackgroundOpacity.get()})`,
        boxShadow: headerBoxShadow 
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div 
        className="flex items-center gap-3"
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {/* Logo with glow effect */}
        <div className="relative">
          <motion.div 
            className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent"
            whileHover={{
              textShadow: "0 0 8px rgba(249, 115, 22, 0.3)",
            }}
          >
            COGNIFORGE AI
          </motion.div>
          
          {/* Animated underline */}
          <motion.div
            className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-orange-500 to-amber-400"
            initial={{ width: 0 }}
            animate={{ width: isScrolled ? "100%" : "30%" }}
            transition={{ duration: 0.8 }}
          />
        </div>
        
        {/* AI indicator */}
        <div className="hidden md:block">
          <AIAssistantIndicator size="sm" label="AI Active" />
        </div>
      </motion.div>
      
      <nav className="relative">
        {/* Animated tech frame around menu on hover */}
        <motion.div
          className="absolute -inset-2 rounded-md border border-orange-200 opacity-0"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-orange-400"></div>
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-orange-400"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-orange-400"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-orange-400"></div>
        </motion.div>
        
        <ul className="flex space-x-6 text-xl md:text-2xl">
          {[
            { id: "projects", label: "Projects" },
            { id: "about", label: "About" },
            { id: "contact", label: "Contact" }
          ].map(item => (
            <motion.li key={item.id} whileHover={{ y: -2 }}>
              <a 
                href={`#${item.id}`} 
                className={`relative px-2 py-1 ${
                  activeSection === item.id 
                    ? "text-orange-500" 
                    : "text-gray-600 hover:text-orange-500"
                } transition-colors`}
              >
                {item.label}
                
                {/* Active indicator */}
                {activeSection === item.id && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-500"
                    layoutId="activeSection"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                
                {/* Hover indicator */}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-300 origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </a>
            </motion.li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
