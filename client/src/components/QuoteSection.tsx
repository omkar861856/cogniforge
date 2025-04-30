import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AIFloatingElement from "./AIFloatingElement";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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
  
  const highlightVariants = {
    hidden: { width: 0 },
    visible: { 
      width: "100%",
      transition: { 
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };
  
  return (
    <section 
      ref={sectionRef} 
      id="about" 
      className="relative py-16 md:py-24 lg:py-32 px-6 lg:px-8 bg-orange-50 overflow-hidden"
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 ai-grid-bg opacity-70"></div>
      
      {/* AI Floating Elements */}
      <AIFloatingElement className="w-28 h-28 top-24 right-[10%] hidden lg:block" delay={1.2} />
      <AIFloatingElement className="w-20 h-20 bottom-40 left-[10%] hidden md:block" delay={0.8} />
      
      {/* Neural network nodes */}
      <motion.div 
        className="neural-node hidden lg:block"
        style={{ top: "30%", left: "30%" }}
        animate={{ 
          scale: [1, 1.4, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div 
        className="neural-node hidden lg:block"
        style={{ top: "70%", left: "20%" }}
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div 
        className="neural-node hidden lg:block"
        style={{ top: "40%", right: "15%" }}
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.6, 0.9, 0.6]
        }}
        transition={{ 
          duration: 3.5,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Neural connections */}
      <motion.div 
        className="neural-connection hidden lg:block"
        style={{ 
          top: "30%", 
          left: "30%", 
          width: "40%",
          transformOrigin: "left center",
          transform: "rotate(10deg)"
        }}
        animate={{ 
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div 
        className="neural-connection hidden lg:block"
        style={{ 
          top: "70%", 
          left: "20%", 
          width: "30%",
          transformOrigin: "left center",
          transform: "rotate(-15deg)"
        }}
        animate={{ 
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div 
        className="max-w-6xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h2 
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-heading-fluid leading-tight mb-12 md:mb-16 relative"
          variants={itemVariants}
        >
          <span className="text-orange-500 ai-text-glow">ABOUT</span> US
          <motion.span
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-orange-400 to-amber-400"
            variants={highlightVariants}
          />
        </motion.h2>
        
        <motion.div 
          className="text-xl md:text-3xl lg:text-4xl text-gray-700 leading-relaxed space-y-8"
        >
          <motion.p variants={itemVariants}>
            At <motion.span 
              className="font-semibold text-orange-500"
              animate={{ 
                textShadow: ["0px 0px 0px rgba(255,145,0,0)", "0px 0px 10px rgba(255,145,0,0.5)", "0px 0px 0px rgba(255,145,0,0)"]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >CogniForge AI</motion.span>, we specialize in creating powerful micro/mini SaaS solutions and AI agents that transform business operations and communication.
          </motion.p>
          
          <motion.p variants={itemVariants}>
            Our company focuses on developing specialized AI tools that automate repetitive tasks and enhance customer engagement through intelligent voice and chat agents.
          </motion.p>
          
          <motion.blockquote 
            className="text-3xl md:text-4xl lg:text-5xl font-light text-orange-900 leading-tight italic pl-6 border-l-4 border-orange-500 mt-12 mb-12 relative overflow-hidden"
            variants={itemVariants}
          >
            <motion.div
              className="absolute -left-4 top-0 bottom-0 w-4 bg-orange-500"
              initial={{ height: 0 }}
              animate={isInView ? { height: "100%" } : { height: 0 }}
              transition={{ duration: 1, delay: 1 }}
            />
            "The best solutions don't just solve problems—they <motion.span 
              className="font-semibold"
              animate={{ color: ["#f97316", "#fdba74", "#f97316"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >transform</motion.span> how businesses <motion.span 
              className="font-semibold"
              animate={{ color: ["#f97316", "#fdba74", "#f97316"] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            >operate</motion.span>."
          </motion.blockquote>
          
          <motion.p variants={itemVariants}>
            With expertise in both frontend and backend development, we build complete solutions from conception to deployment, focusing on clean design and powerful functionality that delivers real business value.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}
