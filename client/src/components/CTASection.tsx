import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import FuturisticElements from "./FuturisticElements";

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      window.scrollTo({
        top: contactSection.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-16 md:py-24 lg:py-32 px-6 lg:px-8 bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500 text-white overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Circuit grid pattern */}
        <div className="absolute inset-0 circuit-bg opacity-10"></div>
        
        {/* Animated radial gradient */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating particles */}
        {Array.from({ length: 10 }).map((_, index) => (
          <motion.div
            key={`particle-${index}`}
            className="absolute w-2 h-2 rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-heading-fluid leading-tight mb-8 relative inline-block">
            FUTURISTIC <span className="relative">
              AI 
              <motion.span 
                className="absolute -bottom-1 left-0 right-0 h-1 bg-white"
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </span> TECHNOLOGIES
          </h2>
          
          <motion.p 
            className="text-xl md:text-3xl lg:text-4xl text-orange-50 leading-relaxed mb-12 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Cutting-edge AI components and interactive visualizations power our solutions for business automation and efficiency.
          </motion.p>
        </motion.div>
        
        {/* Futuristic Elements Display */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-16"
        >
          <FuturisticElements />
        </motion.div>
        
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Button 
              onClick={scrollToContact}
              className="inline-block text-xl md:text-3xl lg:text-4xl bg-white hover:bg-orange-50 text-orange-500 font-semibold py-4 px-12 rounded-xl shadow-lg transition-all h-auto relative overflow-hidden group"
            >
              {/* Button highlight effect */}
              <motion.span
                className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-20 bg-gradient-to-r from-orange-300 to-amber-200"
                transition={{ duration: 0.3 }}
              />
              
              {/* Animated border effect */}
              <motion.span
                className="absolute inset-0 border-2 border-white rounded-xl opacity-0 group-hover:opacity-100"
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              
              {/* Button text with icon */}
              <span className="relative z-10 flex items-center justify-center">
                Get In Touch Now
                <motion.svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6 ml-2" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </motion.svg>
              </span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
