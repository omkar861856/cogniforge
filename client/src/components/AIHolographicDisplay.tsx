import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface AIHolographicDisplayProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  intensity?: number;
  color?: string;
  children?: React.ReactNode;
  scanLines?: boolean;
  flicker?: boolean;
  isActive?: boolean;
}

export default function AIHolographicDisplay({
  className = '',
  width = 300,
  height = 200,
  intensity = 0.5,
  color = '#f97316', // Orange color
  children,
  scanLines = true,
  flicker = true,
  isActive = true
}: AIHolographicDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [noisePattern, setNoisePattern] = useState<string>('');
  const [isHovered, setIsHovered] = useState(false);
  const [flickers, setFlickers] = useState<{opacity: number}[]>([]);
  
  // Generate data noise pattern for futuristic look
  useEffect(() => {
    // Create a noise pattern data URI
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = 200;
    canvas.height = 100;
    
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Generate noise
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      // Value from 0 to 255 with high probability of 0
      const value = Math.random() > 0.92 ? Math.floor(Math.random() * 255) : 0;
      
      data[i] = data[i + 1] = data[i + 2] = value;
      data[i + 3] = Math.random() > 0.7 ? Math.floor(Math.random() * 40) : 0; // Alpha value
    }
    
    ctx.putImageData(imageData, 0, 0);
    setNoisePattern(`url(${canvas.toDataURL('image/png')})`);
    
    // Initialize flicker elements
    if (flicker) {
      const newFlickers = Array.from({ length: 4 }).map(() => ({
        opacity: Math.random() * 0.5
      }));
      setFlickers(newFlickers);
    }
  }, [flicker]);
  
  // Update flicker effect
  useEffect(() => {
    if (!flicker || !isActive) return;
    
    const flickerInterval = setInterval(() => {
      setFlickers(prev => prev.map(() => ({
        opacity: Math.random() * 0.5
      })));
    }, 120);
    
    return () => clearInterval(flickerInterval);
  }, [flicker, isActive]);
  
  // Convert hex color to RGB for glow effect
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 249, g: 115, b: 22 }; // Default orange color
  };
  
  const rgbColor = hexToRgb(color);
  const glowColor = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, ${intensity})`;
  
  // Base styles
  const baseStyles = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };
  
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  
  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
      style={baseStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Holographic container */}
      <motion.div
        className="absolute inset-0 overflow-hidden rounded-lg border border-opacity-30 flex items-center justify-center"
        style={{ 
          borderColor: color,
          backgroundColor: `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.03)`,
          boxShadow: `0 0 10px ${glowColor}, inset 0 0 5px ${glowColor}`
        }}
        animate={isActive ? {
          borderColor: [
            `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.3)`,
            `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.8)`,
            `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.3)`
          ],
          boxShadow: [
            `0 0 5px ${glowColor}, inset 0 0 2px ${glowColor}`,
            `0 0 15px ${glowColor}, inset 0 0 8px ${glowColor}`,
            `0 0 5px ${glowColor}, inset 0 0 2px ${glowColor}`
          ]
        } : {}}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Scan lines */}
        {scanLines && (
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: `repeating-linear-gradient(
                to bottom,
                transparent,
                transparent 2px,
                rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.03) 2px,
                rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.03) 4px
              )`
            }}
          />
        )}
        
        {/* Noise pattern */}
        <div
          className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: noisePattern }}
        />
        
        {/* Flicker elements */}
        {flicker && isActive && flickers.map((flick, i) => (
          <div
            key={`flicker-${i}`}
            className="absolute inset-0"
            style={{
              opacity: flick.opacity,
              background: `linear-gradient(${i * 45}deg, transparent 0%, ${glowColor} 50%, transparent 100%)`,
              mixBlendMode: "overlay"
            }}
          />
        ))}
        
        {/* Content */}
        <div className="relative z-20 w-full h-full p-4 flex items-center justify-center">
          {/* Hover effect - glow intensifies */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: isHovered ? 0.2 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
              mixBlendMode: "screen"
            }}
          />
          
          {/* Children content */}
          <div className="relative">
            {children}
          </div>
        </div>
        
        {/* Tech border indicators */}
        <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-opacity-80" style={{ borderColor: color }} />
        <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-opacity-80" style={{ borderColor: color }} />
        <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-opacity-80" style={{ borderColor: color }} />
        <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-opacity-80" style={{ borderColor: color }} />
        
        {/* Processing indicators */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{ backgroundColor: color }}
          animate={isActive ? {
            opacity: [0, 0.8, 0],
            scaleX: [0, 1, 0],
            x: ['0%', '100%', '0%']
          } : { opacity: 0 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Bottom data strip */}
        <div
          className="absolute bottom-1 left-5 right-5 h-1 opacity-30"
          style={{
            background: `linear-gradient(to right, transparent, ${color}, transparent)`,
          }}
        />
      </motion.div>
    </div>
  );
}