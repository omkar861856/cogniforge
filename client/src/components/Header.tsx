import { Link } from "wouter";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import AIAssistantIndicator from "./AIAssistantIndicator";

export default function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  
  // For 3D title effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Smooth spring physics for the mouse movement (reduced damping for faster response)
  const xSpring = useSpring(x, { stiffness: 500, damping: 12 });
  const ySpring = useSpring(y, { stiffness: 500, damping: 12 });
  
  // Transform mouse position to rotation values (limit to smaller range for subtlety)
  const rotateX = useTransform(ySpring, [-100, 100], [5, -5]);
  const rotateY = useTransform(xSpring, [-100, 100], [-5, 5]);
  
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
  
  // Handle mouse movement for 3D effect on logo
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!logoRef.current) return;
    
    const rect = logoRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to the center of the logo
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate the distance from center (normalize to -100 to 100)
    const mouseX = ((e.clientX - centerX) / (rect.width / 2)) * 100;
    const mouseY = ((e.clientY - centerY) / (rect.height / 2)) * 100;
    
    x.set(mouseX);
    y.set(mouseY);
  };
  
  const handleMouseLeave = () => {
    // Reset to neutral position with smooth animation
    x.set(0);
    y.set(0);
  };
  
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
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 md:py-6 lg:px-8 flex justify-between items-center ${isScrolled ? 'glass-orange' : ''}`}
      style={{ 
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0)',
        boxShadow: headerBoxShadow,
        borderBottom: isScrolled ? '1px solid rgba(249, 115, 22, 0.1)' : 'none',
        backdropFilter: `blur(${isScrolled ? '12px' : '0px'})`,
        WebkitBackdropFilter: `blur(${isScrolled ? '12px' : '0px'})`,
        transition: 'all 0.3s ease-in-out'
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
        {/* Logo with 3D effect */}
        <div 
          ref={logoRef} 
          className="relative" 
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ 
            transformStyle: "preserve-3d",
            perspective: "1000px"
          }}
        >
          <motion.div 
            className="text-4xl md:text-5xl font-bold tracking-tight text-orange-500"
            style={{ 
              transformStyle: "preserve-3d",
              transform: `perspective(1000px) rotateX(${rotateX.get()}deg) rotateY(${rotateY.get()}deg)`,
              transformOrigin: "center center"
            }}
            whileHover={{
              transition: { duration: 0.2 }
            }}
          >
            {/* Shadow layer for depth */}
            <span 
              className="absolute text-4xl md:text-5xl font-bold tracking-tight text-orange-800/20"
              style={{ 
                transform: "translateZ(-2px) scale(1.01)",
                transformOrigin: "center center",
                filter: "blur(1px)"
              }}
            >
              COGNIFORGE AI
            </span>
            
            {/* Base layer */}
            <span className="relative block bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">COGNIFORGE AI</span>
            
            {/* Highlight layer for 3D effect */}
            <span 
              className="absolute top-0 left-0 text-4xl md:text-5xl font-bold tracking-tight text-white/20"
              style={{ 
                transform: "translateZ(1px) translateY(-0.5px) scale(0.99)",
                transformOrigin: "center center"
              }}
            >
              COGNIFORGE AI
            </span>
          </motion.div>
          
          {/* 3D animated underline */}
          <div style={{ transformStyle: "preserve-3d" }}>
            {/* Underline shadow */}
            <motion.div
              className="absolute -bottom-2 left-0 h-0.5 bg-orange-600/30"
              style={{ 
                transform: "translateZ(-2px) scale(1.05)",
                filter: "blur(1px)"
              }}
              initial={{ width: 0 }}
              animate={{ width: isScrolled ? "100%" : "30%" }}
              transition={{ duration: 0.4 }}
            />
            
            {/* Main underline */}
            <motion.div
              className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-orange-500 to-amber-400"
              style={{ transform: "translateZ(1px)" }}
              initial={{ width: 0 }}
              animate={{ width: isScrolled ? "100%" : "30%" }}
              transition={{ duration: 0.4 }}
            />
            
            {/* Highlight underline */}
            <motion.div
              className="absolute -bottom-1 left-0 h-0.5 w-[30%] bg-white/30"
              style={{ 
                transform: "translateZ(3px) translateX(5px) translateY(-0.5px) scale(0.95)",
              }}
              initial={{ width: 0 }}
              animate={{ width: isScrolled ? "30%" : "15%" }}
              transition={{ duration: 0.4 }}
            />
          </div>
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
          transition={{ duration: 0.15 }}
        >
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-orange-400"></div>
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-orange-400"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-orange-400"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-orange-400"></div>
        </motion.div>
        
        <ul className="flex space-x-6 text-xl md:text-2xl" style={{ perspective: "1000px" }}>
          {[
            { id: "projects", label: "Projects" },
            { id: "about", label: "About" },
            { id: "contact", label: "Contact" }
          ].map((item, index) => (
            <motion.li 
              key={item.id} 
              style={{ 
                transformStyle: "preserve-3d", 
                transform: `perspective(1000px) translateZ(0px) rotateX(0deg) rotateY(0deg)`,
                transformOrigin: "center center",
                transition: "transform 0.2s ease"
              }}
              whileHover={{ 
                y: -2, 
                z: 20, 
                rotateX: 5,
                rotateY: index === 0 ? 15 : index === 2 ? -15 : 0
              }}
            >
              <a 
                href={`#${item.id}`} 
                className={`relative px-2 py-1 inline-block ${
                  activeSection === item.id 
                    ? "text-orange-500" 
                    : "text-gray-600 hover:text-orange-500"
                } transition-colors`}
                style={{ 
                  transformStyle: "preserve-3d",
                  textShadow: activeSection === item.id 
                    ? "0 0 8px rgba(249, 115, 22, 0.3)" 
                    : "none"
                }}
              >
                {/* Shadow text for 3D effect */}
                <span 
                  className={`absolute inset-0 ${
                    activeSection === item.id 
                      ? "text-orange-800/10" 
                      : "text-gray-800/10"
                  }`}
                  style={{ 
                    transform: "translateZ(-2px) scale(1.01)", 
                    filter: "blur(1px)"
                  }}
                >
                  {item.label}
                </span>
                
                {/* Main text */}
                <span className="relative block">
                  {item.label}
                </span>
                
                {/* Highlight text for 3D effect */}
                <span 
                  className="absolute inset-0 text-white/10"
                  style={{ 
                    transform: "translateZ(1px) translateY(-0.5px) scale(0.99)"
                  }}
                >
                  {item.label}
                </span>
                
                {/* Active indicator with 3D effect */}
                {activeSection === item.id && (
                  <div style={{ transformStyle: "preserve-3d" }}>
                    {/* Shadow layer */}
                    <motion.div
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-orange-600/30"
                      style={{ 
                        transform: "translateZ(-2px) scale(1.05)",
                        filter: "blur(1px)"
                      }}
                      layoutId="activeSection-shadow"
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    />
                    
                    {/* Main layer */}
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-500"
                      style={{ transform: "translateZ(0px)" }}
                      layoutId="activeSection"
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    />
                    
                    {/* Highlight layer */}
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white/30 w-[70%] mx-auto"
                      style={{ 
                        transform: "translateZ(2px) translateY(-0.5px) scale(0.9)"
                      }}
                      layoutId="activeSection-highlight"
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    />
                  </div>
                )}
                
                {/* Hover indicator with 3D effect */}
                <div style={{ transformStyle: "preserve-3d" }}>
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-300 origin-left"
                    style={{ transform: "translateZ(0px)" }}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.15 }}
                  />
                  
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white/20 origin-left"
                    style={{ 
                      transform: "translateZ(1px) translateY(-0.5px) scale(0.98)"
                    }}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 0.7 }}
                    transition={{ duration: 0.15, delay: 0.05 }}
                  />
                </div>
                
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute -inset-3 rounded-lg opacity-0 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at center, rgba(249, 115, 22, 0.15) 0%, transparent 70%)",
                    transform: "translateZ(-5px)"
                  }}
                  whileHover={{ opacity: 1 }}
                />
              </a>
            </motion.li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
