import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  rotation: number;
  shape: 'circle' | 'square' | 'triangle'; // Different particle shapes
  color: string;
  velocity: {
    x: number;
    y: number;
    rotation: number;
  };
}

interface AIParticleFieldProps {
  className?: string;
  particleCount?: number;
  baseColor?: string;
  interactOnHover?: boolean;
}

export default function AIParticleField({
  className = '',
  particleCount = 50,
  baseColor = '#f97316', // Orange base color
  interactOnHover = true
}: AIParticleFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mouseInside, setMouseInside] = useState(false);
  const animationRef = useRef<number>();
  
  // Initialize particles
  useEffect(() => {
    if (!containerRef.current) return;
    
    const { width, height } = containerRef.current.getBoundingClientRect();
    setDimensions({ width, height });
    
    // Generate particles with different shapes, sizes, and variations of the base color
    const newParticles: Particle[] = Array.from({ length: particleCount }).map((_, i) => {
      // Generate variations of the base color
      let color = baseColor;
      const colorVariation = Math.random();
      if (colorVariation > 0.7) {
        // Lighter variation
        color = '#fdba74'; // Orange-200
      } else if (colorVariation > 0.4) {
        // Darker variation
        color = '#ea580c'; // Orange-600
      }
      
      // Pick a shape
      const shapes: Array<'circle' | 'square' | 'triangle'> = ['circle', 'square', 'triangle'];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      
      return {
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 2, // Size between 2-10px
        opacity: Math.random() * 0.5 + 0.2, // Opacity between 0.2-0.7
        rotation: Math.random() * 360, // Random initial rotation
        shape,
        color,
        velocity: {
          x: (Math.random() - 0.5) * 1, // Slow horizontal movement
          y: (Math.random() - 0.5) * 1, // Slow vertical movement
          rotation: (Math.random() - 0.5) * 2, // Slow rotation
        }
      };
    });
    
    setParticles(newParticles);
    
    // Set up resize handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particleCount, baseColor]);
  
  // Set up mouse interaction
  useEffect(() => {
    if (!containerRef.current || !interactOnHover) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };
    
    const handleMouseEnter = () => {
      setMouseInside(true);
    };
    
    const handleMouseLeave = () => {
      setMouseInside(false);
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
  }, [interactOnHover]);
  
  // Animation loop
  useEffect(() => {
    if (particles.length === 0 || !dimensions.width || !dimensions.height) return;
    
    const animate = () => {
      setParticles(currentParticles => {
        return currentParticles.map(particle => {
          let { x, y, rotation } = particle;
          let { x: vx, y: vy, rotation: vRotation } = particle.velocity;
          
          // Apply mouse interaction if mouse is inside container
          if (mouseInside && interactOnHover) {
            const dx = mousePosition.x - x;
            const dy = mousePosition.y - y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 150; // How far the mouse effect reaches
            
            if (distance < maxDistance) {
              // Calculate repulsion force (stronger when closer)
              const force = (1 - distance / maxDistance) * 0.5;
              const angle = Math.atan2(dy, dx);
              
              // Apply force in opposite direction of mouse
              vx -= Math.cos(angle) * force;
              vy -= Math.sin(angle) * force;
              
              // Increase rotation when near mouse
              vRotation += force * 2;
            }
          }
          
          // Update position and rotation
          x += vx;
          y += vy;
          rotation += vRotation;
          
          // Boundary check with wrapping
          if (x < -20) x = dimensions.width + 20;
          if (x > dimensions.width + 20) x = -20;
          if (y < -20) y = dimensions.height + 20;
          if (y > dimensions.height + 20) y = -20;
          
          // Apply some random movement to make it more organic
          vx += (Math.random() - 0.5) * 0.1;
          vy += (Math.random() - 0.5) * 0.1;
          vRotation += (Math.random() - 0.5) * 0.1;
          
          // Dampen velocity to prevent extreme speeds
          vx *= 0.99;
          vy *= 0.99;
          vRotation *= 0.98;
          
          return {
            ...particle,
            x,
            y,
            rotation,
            velocity: { x: vx, y: vy, rotation: vRotation }
          };
        });
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particles, dimensions, mousePosition, mouseInside, interactOnHover]);
  
  // Render shapes based on their type
  const renderParticle = (particle: Particle) => {
    const { x, y, size, opacity, rotation, shape, color } = particle;
    
    switch (shape) {
      case 'circle':
        return (
          <motion.div
            key={`particle-${particle.id}`}
            className="absolute rounded-full"
            style={{
              left: `${x}px`,
              top: `${y}px`,
              width: `${size}px`,
              height: `${size}px`,
              opacity,
              backgroundColor: color,
              transform: `rotate(${rotation}deg)`,
            }}
            animate={{
              opacity: [opacity, opacity * 1.5, opacity],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        );
        
      case 'square':
        return (
          <motion.div
            key={`particle-${particle.id}`}
            className="absolute"
            style={{
              left: `${x}px`,
              top: `${y}px`,
              width: `${size}px`,
              height: `${size}px`,
              opacity,
              backgroundColor: color,
              transform: `rotate(${rotation}deg)`,
            }}
            animate={{
              opacity: [opacity, opacity * 1.5, opacity],
              rotate: [rotation, rotation + 180, rotation],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        );
        
      case 'triangle':
        const triangleStyle = {
          width: 0,
          height: 0,
          borderLeft: `${size / 2}px solid transparent`,
          borderRight: `${size / 2}px solid transparent`,
          borderBottom: `${size}px solid ${color}`,
        };
        
        return (
          <motion.div
            key={`particle-${particle.id}`}
            className="absolute"
            style={{
              left: `${x}px`,
              top: `${y}px`,
              opacity,
              transform: `rotate(${rotation}deg)`,
              ...triangleStyle,
            }}
            animate={{
              opacity: [opacity, opacity * 1.5, opacity],
              rotate: [rotation, rotation + 120, rotation],
            }}
            transition={{
              duration: 3.5 + Math.random() * 2.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ position: 'absolute' }}
    >
      {particles.map(renderParticle)}
      
      {/* Optional glow effect in the center */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '30%',
          height: '30%',
          background: `radial-gradient(circle, ${baseColor}20 0%, transparent 70%)`,
        }}
      />
    </div>
  );
}