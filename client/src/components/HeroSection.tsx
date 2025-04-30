import { Button } from "@/components/ui/button";
import AIAnimationBackground from "./AIAnimationBackground";
import AIFloatingElement from "./AIFloatingElement";
import AITypingText from "./AITypingText";
import AINetworkEffect from "./AINetworkEffect";
import AIDataProcessingEffect from "./AIDataProcessingEffect";
import AIParticleField from "./AIParticleField";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoverEffect, setHoverEffect] = useState<string | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <section ref={sectionRef} className="relative pt-32 md:pt-40 pb-20 md:pb-28 lg:pb-36 px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-white via-orange-50 to-white min-h-[85vh] flex items-center">
      {/* AI Animation Background - Base layer */}
      <AIAnimationBackground />
      
      {/* Network animation - Adds connected nodes */}
      <AINetworkEffect className="opacity-30" nodeCount={20} />
      
      {/* Interactive particles with different shapes */}
      <AIParticleField className="opacity-20" particleCount={30} />
      
      {/* Floating AI Elements */}
      <AIFloatingElement className="w-36 h-36 top-24 right-[20%] hidden md:block" delay={0.5} />
      <AIFloatingElement className="w-24 h-24 bottom-32 left-[15%] hidden md:block" delay={1.2} />
      <AIFloatingElement className="w-16 h-16 top-40 left-[25%] hidden lg:block" delay={0.8} />
      
      {/* Data processing in the background */}
      <AIDataProcessingEffect className="opacity-30" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Circuit paths */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M0,100 C100,50 200,150 300,100 S400,50 500,100 S600,150 800,100" 
            stroke="#f97316" 
            fill="none" 
            strokeWidth="2"
          />
          <path 
            d="M0,200 C100,250 200,150 300,200 S400,250 500,200 S600,150 800,200" 
            stroke="#fdba74" 
            fill="none" 
            strokeWidth="1.5"
          />
          <path 
            d="M0,300 C100,350 200,250 300,300 S400,350 500,300 S600,250 800,300" 
            stroke="#fed7aa" 
            fill="none" 
            strokeWidth="1"
          />
        </svg>
      </div>
      
      {/* Main content */}
      <motion.div 
        className="max-w-7xl mx-auto relative z-10"
        style={{ opacity, y }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="mb-4 md:mb-6 text-xl md:text-2xl lg:text-3xl font-medium text-orange-600"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <AITypingText
            phrases={[
              "Innovative AI Solutions",
              "Future-Ready Development",
              "Cutting-Edge Technologies",
              "Custom SaaS Development",
              "Intelligent Business Automation"
            ]}
            className="font-medium"
          />
        </motion.div>
        
        {/* Main heading with enhanced effects */}
        <motion.h1 
          className="text-7xl sm:text-8xl md:text-9xl lg:text-mega font-black tracking-tight text-gray-900 text-size-fluid leading-tight relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {/* Advanced animated highlight that follows the text */}
          <motion.div
            className="absolute -inset-4 rounded-3xl opacity-0"
            animate={{ 
              opacity: hoverEffect === 'company' ? 0.05 : 0,
              backgroundColor: "#f97316"
            }}
            transition={{ duration: 0.3 }}
          />
          
          <motion.span 
            className="text-orange-600 relative inline-block"
            onMouseEnter={() => setHoverEffect('company')}
            onMouseLeave={() => setHoverEffect(null)}
            whileHover={{ 
              textShadow: "0px 0px 15px rgba(249, 115, 22, 0.5)",
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            COGNIFORGE AI
            
            {/* Animated underline */}
            <motion.span 
              className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-orange-600 to-orange-400"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1, duration: 1.2 }}
            />
            
            {/* Animated highlight dots */}
            <motion.span
              className="absolute -top-2 -left-2 w-2 h-2 rounded-full bg-orange-500"
              animate={{ 
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.span
              className="absolute -bottom-2 -right-2 w-2 h-2 rounded-full bg-orange-500"
              animate={{ 
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </motion.span>
          
          <br />
          
          {/* Enhanced web development text */}
          <motion.div
            className="absolute -inset-4 rounded-3xl opacity-0"
            animate={{ 
              opacity: hoverEffect === 'web' ? 0.05 : 0,
              backgroundColor: "#f97316"
            }}
            transition={{ duration: 0.3 }}
          />
          
          <motion.span 
            className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent inline-block relative"
            onMouseEnter={() => setHoverEffect('web')}
            onMouseLeave={() => setHoverEffect(null)}
            whileHover={{ 
              textShadow: "0px 0px 15px rgba(251, 146, 60, 0.5)",
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            WEB DEVELOPMENT
            
            {/* Animated underline with gradient */}
            <motion.span 
              className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-400 bg-size-200"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1.5, duration: 1.2 }}
              style={{
                backgroundSize: "200% 100%",
                animation: "gradientShift 3s ease infinite"
              }}
            />
            
            {/* Animated corner accents */}
            <motion.span
              className="absolute -top-1 -right-1 w-4 h-4 rounded-br-lg border-r-2 border-t-2 border-orange-400"
              animate={{ 
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.span
              className="absolute -bottom-1 -left-1 w-4 h-4 rounded-tl-lg border-l-2 border-b-2 border-orange-400"
              animate={{ 
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            />
          </motion.span>
          
          {/* Tech decorations */}
          <motion.div 
            className="absolute -right-20 top-10 hidden lg:block w-16 h-16 opacity-20"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" stroke="#f97316" strokeWidth="2" fill="none" />
              <circle cx="50" cy="5" r="4" fill="#f97316" />
              <circle cx="50" cy="95" r="4" fill="#f97316" />
              <circle cx="5" cy="50" r="4" fill="#f97316" />
              <circle cx="95" cy="50" r="4" fill="#f97316" />
              <line x1="50" y1="10" x2="50" y2="90" stroke="#f97316" strokeWidth="1" strokeDasharray="2,4" />
              <line x1="10" y1="50" x2="90" y2="50" stroke="#f97316" strokeWidth="1" strokeDasharray="2,4" />
            </svg>
          </motion.div>
        </motion.h1>
        
        {/* Enhanced tagline with animated gradient text */}
        <motion.p 
          className="mt-8 text-2xl md:text-4xl lg:text-5xl text-subheading-fluid text-gray-600 max-w-4xl leading-snug relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <motion.span
            className="relative inline-block"
            whileHover={{ 
              color: "#f97316",
              transition: { duration: 0.2 }
            }}
          >
            Building micro/mini SaaS solutions
          </motion.span> and 
          <motion.span
            className="relative ml-2 inline-block bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ['0% center', '100% center', '0% center'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            specialized AI agents
          </motion.span> for business automation | Custom web development
          
          {/* Tech accents */}
          <motion.span
            className="absolute -right-4 -bottom-4 w-8 h-8 border-r-2 border-b-2 border-orange-200 rounded-br-xl"
            animate={{ 
              opacity: [0.3, 0.6, 0.3],
              borderColor: ['#fed7aa', '#f97316', '#fed7aa']
            }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
          />
        </motion.p>
        
        {/* Enhanced buttons with advanced hover effects */}
        <motion.div 
          className="mt-12 flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Button 
              onClick={() => scrollToSection("projects")}
              className="text-xl md:text-3xl lg:text-4xl bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all h-auto group relative overflow-hidden"
            >
              <motion.span
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ mixBlendMode: "overlay" }}
              />
              
              <motion.span
                className="absolute -inset-10 opacity-30"
                animate={{
                  background: [
                    "radial-gradient(circle, rgba(249,115,22,0.4) 0%, rgba(249,115,22,0) 50%)",
                    "radial-gradient(circle, rgba(249,115,22,0.6) 0%, rgba(249,115,22,0) 50%)",
                    "radial-gradient(circle, rgba(249,115,22,0.4) 0%, rgba(249,115,22,0) 50%)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              <span className="relative z-10">View Projects</span>
              
              <motion.span 
                className="inline-block ml-2 relative z-10"
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </motion.span>
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Button 
              variant="outline"
              onClick={() => scrollToSection("contact")}
              className="text-xl md:text-3xl lg:text-4xl bg-white hover:bg-orange-50 text-orange-500 font-semibold py-4 px-8 rounded-xl border border-orange-200 transition-colors h-auto backdrop-blur-sm group relative overflow-hidden"
            >
              <motion.span
                className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br from-orange-200 to-amber-100"
                transition={{ duration: 0.3 }}
              />
              
              <motion.span
                className="absolute inset-0 opacity-0 group-hover:opacity-20"
                animate={{
                  background: [
                    "radial-gradient(circle at 20% 50%, rgba(249,115,22,0.4) 0%, rgba(249,115,22,0) 50%)",
                    "radial-gradient(circle at 80% 50%, rgba(249,115,22,0.4) 0%, rgba(249,115,22,0) 50%)",
                    "radial-gradient(circle at 20% 50%, rgba(249,115,22,0.4) 0%, rgba(249,115,22,0) 50%)"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              <span className="relative z-10 group-hover:text-orange-600 transition-colors duration-300">Contact Us</span>
              
              {/* Animated corner lines */}
              <motion.span
                className="absolute top-0 left-0 w-0 h-0 border-t-2 border-l-2 border-orange-400 opacity-0 group-hover:opacity-100"
                animate={{ width: "30%", height: "30%" }}
                transition={{ duration: 0.2, delay: 0.1 }}
              />
              <motion.span
                className="absolute bottom-0 right-0 w-0 h-0 border-b-2 border-r-2 border-orange-400 opacity-0 group-hover:opacity-100"
                animate={{ width: "30%", height: "30%" }}
                transition={{ duration: 0.2, delay: 0.1 }}
              />
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
