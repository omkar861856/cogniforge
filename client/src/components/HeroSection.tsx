import { Button } from "@/components/ui/button";
import AIAnimationBackground from "./AIAnimationBackground";
import AIFloatingElement from "./AIFloatingElement";
import AITypingText from "./AITypingText";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
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
    <section ref={sectionRef} className="relative py-20 md:py-28 lg:py-36 px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-white via-orange-50 to-white min-h-[85vh] flex items-center">
      {/* AI Animation Background */}
      <AIAnimationBackground />
      
      {/* Floating AI Elements */}
      <AIFloatingElement className="w-36 h-36 top-24 right-[20%] hidden md:block" delay={0.5} />
      <AIFloatingElement className="w-24 h-24 bottom-32 left-[15%] hidden md:block" delay={1.2} />
      <AIFloatingElement className="w-16 h-16 top-40 left-[25%] hidden lg:block" delay={0.8} />
      
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
              "Cutting-Edge Technologies" 
            ]}
            className="font-medium"
          />
        </motion.div>
        
        <motion.h1 
          className="text-7xl sm:text-8xl md:text-9xl lg:text-mega font-black tracking-tight text-gray-900 text-size-fluid leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <span className="text-orange-600 relative">
            COGNIFORGE AI
            <motion.span 
              className="absolute -bottom-1 left-0 h-1 bg-orange-500"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1, duration: 1.2 }}
            />
          </span>
          <br />
          <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent inline-block relative">
            WEB DEVELOPMENT
            <motion.span 
              className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-orange-400 to-amber-400"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1.5, duration: 1.2 }}
            />
          </span>
        </motion.h1>
        
        <motion.p 
          className="mt-8 text-2xl md:text-4xl lg:text-5xl text-subheading-fluid text-gray-600 max-w-4xl leading-snug"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          Building micro/mini SaaS solutions and specialized AI agents for business automation | Custom web development
        </motion.p>
        
        <motion.div 
          className="mt-12 flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
        >
          <Button 
            onClick={() => scrollToSection("projects")}
            className="text-xl md:text-3xl lg:text-4xl bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all transform hover:scale-105 h-auto group"
          >
            <span>View Projects</span>
            <motion.span 
              className="inline-block ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >→</motion.span>
          </Button>
          <Button 
            variant="outline"
            onClick={() => scrollToSection("contact")}
            className="text-xl md:text-3xl lg:text-4xl bg-white hover:bg-orange-50 text-orange-500 font-semibold py-4 px-8 rounded-xl border border-orange-200 transition-colors h-auto backdrop-blur-sm"
          >
            Contact Us
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
