import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface AI3DPerspectiveEffectProps {
  className?: string;
  children: React.ReactNode;
  intensity?: number;
  perspective?: number;
  rotationFactor?: number; 
  glowIntensity?: number;
  glowColor?: string;
  disabled?: boolean;
}

export default function AI3DPerspectiveEffect({
  className = '',
  children,
  intensity = 15,
  perspective = 1000,
  rotationFactor = 1,
  glowIntensity = 0.2,
  glowColor = 'rgba(249, 115, 22, 0.3)',
  disabled = false
}: AI3DPerspectiveEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  // Handle mouse movement for 3D perspective effect
  useEffect(() => {
    if (disabled || !containerRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      
      // Calculate mouse position relative to the center of the container
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      // Apply rotation based on mouse position
      setRotation({
        x: -y * intensity * rotationFactor, // Inverse Y for correct perspective
        y: x * intensity * rotationFactor
      });
      
      // Apply subtle position shift for parallax effect
      setPosition({
        x: x * intensity / 2,
        y: y * intensity / 2
      });
    };
    
    const handleMouseEnter = () => {
      setIsHovering(true);
    };
    
    const handleMouseLeave = () => {
      setIsHovering(false);
      // Reset rotations smoothly when mouse leaves
      setRotation({ x: 0, y: 0 });
      setPosition({ x: 0, y: 0 });
    };
    
    const element = containerRef.current;
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [disabled, intensity, rotationFactor]);
  
  // Disable the effect entirely if requested
  if (disabled) {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }
  
  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
      style={{ perspective: `${perspective}px` }}
    >
      <motion.div
        style={{
          rotateX: rotation.x,
          rotateY: rotation.y,
          translateX: position.x,
          translateY: position.y,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 0.5
        }}
        className="w-full h-full"
      >
        {children}
        
        {/* Simulated light reflection/glow effect */}
        {isHovering && (
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${50 + rotation.y / intensity * 100}% ${50 + rotation.x / intensity * 100}%, ${glowColor} 0%, transparent 70%)`,
              opacity: glowIntensity,
              mixBlendMode: "overlay"
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: glowIntensity }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.div>
    </div>
  );
}