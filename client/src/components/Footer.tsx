import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: false, amount: 0.2 });
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  
  const linkVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
    hover: { x: 10, color: "#ffffff", textShadow: "0 0 8px rgba(255,165,0,0.5)" }
  };

  return (
    <footer 
      ref={footerRef}
      className="relative py-12 md:py-16 px-6 lg:px-8 bg-gray-900 text-white overflow-hidden"
    >
      {/* AI Circuit Board Background */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M30,15 L90,15 M60,15 L60,30 M30,45 L90,45 M60,45 L60,60 M30,75 L90,75 M60,75 L60,90 M30,105 L90,105" 
                stroke="#f97316" strokeWidth="1" fill="none" />
              <circle cx="30" cy="15" r="3" fill="#f97316" />
              <circle cx="90" cy="15" r="3" fill="#f97316" />
              <circle cx="60" cy="30" r="3" fill="#f97316" />
              <circle cx="30" cy="45" r="3" fill="#f97316" />
              <circle cx="90" cy="45" r="3" fill="#f97316" />
              <circle cx="60" cy="60" r="3" fill="#f97316" />
              <circle cx="30" cy="75" r="3" fill="#f97316" />
              <circle cx="90" cy="75" r="3" fill="#f97316" />
              <circle cx="60" cy="90" r="3" fill="#f97316" />
              <circle cx="30" cy="105" r="3" fill="#f97316" />
              <circle cx="90" cy="105" r="3" fill="#f97316" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
        </svg>
      </div>
      
      {/* Animated gradient lines */}
      <motion.div 
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent"
        initial={{ opacity: 0, scaleX: 0.5 }}
        animate={isInView ? { opacity: 0.3, scaleX: 1 } : { opacity: 0, scaleX: 0.5 }}
        transition={{ duration: 1.5 }}
      />
      
      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div 
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 relative inline-block"
          variants={itemVariants}
        >
          <motion.span
            className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent ai-text-glow"
            animate={{ 
              textShadow: ["0px 0px 0px rgba(255,145,0,0.2)", "0px 0px 10px rgba(255,145,0,0.5)", "0px 0px 0px rgba(255,145,0,0.2)"]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            COGNIFORGE AI
          </motion.span>
          <motion.div 
            className="absolute -left-6 -top-6 w-12 h-12 border border-orange-500/30 rounded-full"
            animate={{ 
              rotate: 360,
              borderColor: ["rgba(249, 115, 22, 0.3)", "rgba(251, 146, 60, 0.5)", "rgba(249, 115, 22, 0.3)"] 
            }}
            transition={{ 
              rotate: { duration: 8, repeat: Infinity, ease: "linear" },
              borderColor: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          />
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <motion.div variants={itemVariants}>
            <motion.h3 
              className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 text-orange-400"
              variants={itemVariants}
            >
              Navigation
            </motion.h3>
            <ul className="space-y-2">
              <motion.li variants={itemVariants}>
                <motion.a 
                  href="#" 
                  className="text-lg md:text-xl lg:text-2xl text-gray-300 hover:text-white transition-colors inline-block"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  variants={linkVariants}
                  whileHover="hover"
                >
                  Home
                  <motion.span 
                    className="block h-px bg-orange-400 mt-1"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              </motion.li>
              <motion.li variants={itemVariants}>
                <motion.a 
                  href="#projects" 
                  className="text-lg md:text-xl lg:text-2xl text-gray-300 hover:text-white transition-colors inline-block"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("projects");
                  }}
                  variants={linkVariants}
                  whileHover="hover"
                >
                  Projects
                  <motion.span 
                    className="block h-px bg-orange-400 mt-1"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              </motion.li>
              <motion.li variants={itemVariants}>
                <motion.a 
                  href="#about" 
                  className="text-lg md:text-xl lg:text-2xl text-gray-300 hover:text-white transition-colors inline-block"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("about");
                  }}
                  variants={linkVariants}
                  whileHover="hover"
                >
                  About
                  <motion.span 
                    className="block h-px bg-orange-400 mt-1"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              </motion.li>
              <motion.li variants={itemVariants}>
                <motion.a 
                  href="#contact" 
                  className="text-lg md:text-xl lg:text-2xl text-gray-300 hover:text-white transition-colors inline-block"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("contact");
                  }}
                  variants={linkVariants}
                  whileHover="hover"
                >
                  Contact
                  <motion.span 
                    className="block h-px bg-orange-400 mt-1"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              </motion.li>
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <motion.h3 
              className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 text-orange-400"
              variants={itemVariants}
            >
              Connect
            </motion.h3>
            <ul className="space-y-2">
              <motion.li variants={itemVariants}>
                <motion.a 
                  href="https://www.linkedin.com/in/cogniforge-ai-5833b7315" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-lg md:text-xl lg:text-2xl text-gray-300 hover:text-white transition-colors inline-block group"
                  variants={linkVariants}
                  whileHover="hover"
                >
                  <span className="flex items-center">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2 text-orange-400 group-hover:text-white">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    LinkedIn
                  </span>
                  <motion.span 
                    className="block h-px bg-orange-400 mt-1"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              </motion.li>
              <motion.li variants={itemVariants}>
                <motion.a 
                  href="mailto:omkar861856@gmail.com" 
                  className="text-lg md:text-xl lg:text-2xl text-gray-300 hover:text-white transition-colors inline-block group"
                  variants={linkVariants}
                  whileHover="hover"
                >
                  <span className="flex items-center">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2 text-orange-400 group-hover:text-white">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                    Email
                  </span>
                  <motion.span 
                    className="block h-px bg-orange-400 mt-1"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              </motion.li>
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <motion.h3 
              className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 text-orange-400"
              variants={itemVariants}
            >
              Services
            </motion.h3>
            <ul className="space-y-2">
              <motion.li variants={itemVariants} whileHover={{ x: 5 }}>
                <motion.div className="flex items-center text-lg md:text-xl lg:text-2xl text-gray-300 group">
                  <motion.span 
                    className="inline-block w-2 h-2 rounded-full bg-orange-500 mr-2"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  />
                  <span className="group-hover:text-white transition-colors">AI Voice & Chat Agents</span>
                </motion.div>
              </motion.li>
              <motion.li variants={itemVariants} whileHover={{ x: 5 }}>
                <motion.div className="flex items-center text-lg md:text-xl lg:text-2xl text-gray-300 group">
                  <motion.span 
                    className="inline-block w-2 h-2 rounded-full bg-orange-500 mr-2" 
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
                  />
                  <span className="group-hover:text-white transition-colors">Automation Solutions</span>
                </motion.div>
              </motion.li>
              <motion.li variants={itemVariants} whileHover={{ x: 5 }}>
                <motion.div className="flex items-center text-lg md:text-xl lg:text-2xl text-gray-300 group">
                  <motion.span 
                    className="inline-block w-2 h-2 rounded-full bg-orange-500 mr-2"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 1 }}
                  />
                  <span className="group-hover:text-white transition-colors">Custom Web Development</span>
                </motion.div>
              </motion.li>
            </ul>
          </motion.div>
        </div>
        
        <motion.div 
          className="text-lg md:text-xl lg:text-2xl text-gray-400 border-t border-gray-800 pt-8 relative"
          variants={itemVariants}
        >
          <motion.div 
            className="absolute top-0 left-0 right-0 h-px"
            initial={{ scaleX: 0, opacity: 0, backgroundImage: "linear-gradient(90deg, transparent, #f97316, transparent)" }}
            animate={isInView ? { scaleX: 1, opacity: 0.5 } : { scaleX: 0, opacity: 0 }}
            transition={{ duration: 1.5 }}
          />
          &copy; {new Date().getFullYear()} CogniForge AI. All rights reserved.
        </motion.div>
        
        {/* Floating orbs */}
        <motion.div 
          className="absolute bottom-20 right-20 w-40 h-40 rounded-full radial-pulse hidden lg:block pointer-events-none"
          style={{ 
            background: "radial-gradient(circle, rgba(249,115,22,0.1) 0%, rgba(249,115,22,0) 70%)",
          }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
        
        <motion.div 
          className="absolute top-0 left-0 w-4 h-4 rounded-full bg-orange-500/20 hidden lg:block"
          animate={{ 
            y: [0, 30],
            opacity: [0, 0.5, 0]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatType: "loop" 
          }}
        />
        
        <motion.div 
          className="absolute bottom-10 left-10 w-3 h-3 rounded-full bg-orange-400/30 hidden lg:block"
          animate={{ 
            y: [0, -20],
            opacity: [0, 0.5, 0]
          }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity,
            repeatType: "loop",
            delay: 0.5
          }}
        />
      </motion.div>
    </footer>
  );
}
