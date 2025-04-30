import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // For 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Smooth spring physics for the mouse movement
  const xSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 20 });
  
  // Transform mouse position to rotation values (limit to +/- 20 degrees)
  const rotateX = useTransform(ySpring, [-100, 100], [20, -20]);
  const rotateY = useTransform(xSpring, [-100, 100], [-20, 20]);
  
  // Transform for the shine effect
  const shineX = useTransform(xSpring, [-100, 100], ["-100%", "100%"]);
  const shineY = useTransform(ySpring, [-100, 100], ["-100%", "100%"]);
  
  // Handle mouse movement for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to the center of the button
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate the distance from center (normalize to -100 to 100)
    const mouseX = ((e.clientX - centerX) / (rect.width / 2)) * 100;
    const mouseY = ((e.clientY - centerY) / (rect.height / 2)) * 100;
    
    x.set(mouseX);
    y.set(mouseY);
  };
  
  const handleMouseLeave = () => {
    // Reset to neutral position
    x.set(0);
    y.set(0);
  };
  
  // Show button when user scrolls down 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('scroll', toggleVisibility);
    
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          ref={buttonRef}
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          onClick={scrollToTop}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="fixed bottom-8 right-8 p-4 rounded-full bg-orange-500 text-white z-50 shadow-lg"
          style={{
            perspective: "1000px",
            transformStyle: "preserve-3d",
            transform: `perspective(1000px) rotateX(${rotateX.get()}deg) rotateY(${rotateY.get()}deg)`,
            boxShadow: '0 10px 30px rgba(249, 115, 22, 0.4), 0 0 20px rgba(249, 115, 22, 0.2)'
          }}
          whileHover={{ 
            scale: 1.1,
          }}
          whileTap={{ scale: 0.95 }}
        >
          {/* 3D layered design */}
          <motion.div
            className="absolute inset-0 rounded-full bg-orange-600 -z-10"
            style={{ 
              transform: "translateZ(-6px)",
              filter: "blur(2px)",
              opacity: 0.8
            }}
          />
          
          <motion.div
            className="absolute inset-1 rounded-full bg-orange-400 -z-10"
            style={{ 
              transform: "translateZ(-3px)",
              filter: "blur(1px)",
              opacity: 0.9
            }}
          />
          
          {/* Outer pulse with 3D effect */}
          <motion.div
            className="absolute inset-0 rounded-full -z-10"
            style={{
              background: "linear-gradient(135deg, #f97316 0%, #fb923c 50%, #fdba74 100%)",
              transform: "translateZ(-1px)"
            }}
            animate={{ 
              boxShadow: [
                "0 0 0 0px rgba(249, 115, 22, 0)",
                "0 0 0 10px rgba(249, 115, 22, 0.3)",
                "0 0 0 20px rgba(249, 115, 22, 0)"
              ]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
          
          {/* Shine effect that moves with cursor */}
          <motion.div 
            className="absolute inset-0 rounded-full overflow-hidden"
            style={{ opacity: 0.5, zIndex: -1 }}
          >
            <motion.div 
              className="absolute inset-0 w-[200%] h-[200%]"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0) 100%)",
                top: shineY,
                left: shineX,
                transform: "translate(-50%, -50%)"
              }}
            />
          </motion.div>
          
          {/* 3D layered arrow icon */}
          <div className="relative" style={{ transformStyle: "preserve-3d" }}>
            {/* Shadow layer */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 absolute top-0 left-0 text-orange-800 opacity-30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              style={{ transform: "translateZ(-2px) scale(0.95) translateY(1px)" }}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2.5} 
                d="M5 10l7-7m0 0l7 7m-7-7v18" 
              />
            </svg>
            
            {/* Main arrow */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 relative text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              style={{ transform: "translateZ(4px)" }}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 10l7-7m0 0l7 7m-7-7v18" 
              />
            </svg>
            
            {/* Highlight layer */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 absolute top-0 left-0 text-white opacity-70"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              style={{ transform: "translateZ(6px) scale(0.9) translateY(-1px)" }}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1} 
                d="M5 10l7-7m0 0l7 7m-7-7v18" 
              />
            </svg>
          </div>
          
          {/* 3D hover ring */}
          <motion.div
            className="absolute -inset-2 rounded-full opacity-0"
            style={{ 
              background: "radial-gradient(circle at center, rgba(249, 115, 22, 0.4) 0%, transparent 70%)",
              transform: "translateZ(-10px)"
            }}
            whileHover={{ opacity: 0.6 }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}