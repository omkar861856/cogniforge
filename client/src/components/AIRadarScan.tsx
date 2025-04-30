import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface BlipPoint {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  pulse: boolean;
}

interface AIRadarScanProps {
  className?: string;
  size?: number;
  color?: string;
  blipCount?: number;
  rotationDuration?: number;
  showGrid?: boolean;
  isActive?: boolean;
  pulseIntensity?: number;
}

export default function AIRadarScan({
  className = '',
  size = 200,
  color = '#f97316', // Orange
  blipCount = 5,
  rotationDuration = 4,
  showGrid = true,
  isActive = true,
  pulseIntensity = 0.5
}: AIRadarScanProps) {
  const [blips, setBlips] = useState<BlipPoint[]>([]);
  
  useEffect(() => {
    if (!isActive) {
      setBlips([]);
      return;
    }
    
    // Generate initial blips
    const initialBlips: BlipPoint[] = [];
    for (let i = 0; i < blipCount; i++) {
      // Use polar coordinates to position blips away from center
      const distance = Math.random() * 0.8 + 0.15; // 15% to 95% from center
      const angle = Math.random() * Math.PI * 2; // Random angle
      const x = 0.5 + Math.cos(angle) * distance * 0.5; // Convert to x (0-1)
      const y = 0.5 + Math.sin(angle) * distance * 0.5; // Convert to y (0-1)
      
      initialBlips.push({
        id: i,
        x,
        y,
        size: Math.random() * 4 + 2,
        opacity: Math.random() * 0.5 + 0.5,
        pulse: Math.random() > 0.5
      });
    }
    setBlips(initialBlips);
    
    // Occasionally update blips
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        // Add new blip or update existing one
        setBlips(current => {
          const newBlips = [...current];
          
          if (newBlips.length >= blipCount * 1.5) {
            // Remove a random blip if we have too many
            const indexToRemove = Math.floor(Math.random() * newBlips.length);
            newBlips.splice(indexToRemove, 1);
          }
          
          // Add a new blip
          const distance = Math.random() * 0.8 + 0.15;
          const angle = Math.random() * Math.PI * 2;
          const x = 0.5 + Math.cos(angle) * distance * 0.5;
          const y = 0.5 + Math.sin(angle) * distance * 0.5;
          
          newBlips.push({
            id: Date.now(),
            x,
            y,
            size: Math.random() * 4 + 2,
            opacity: Math.random() * 0.5 + 0.5,
            pulse: Math.random() > 0.5
          });
          
          return newBlips;
        });
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, [isActive, blipCount]);
  
  // Hex to RGBA conversion helper
  const hexToRGBA = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  
  return (
    <div 
      className={`relative ${className}`}
      style={{ 
        width: size, 
        height: size,
        opacity: isActive ? 1 : 0.5,
        transition: 'opacity 0.5s ease'
      }}
    >
      {/* Main radar circle */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{ 
          border: `1px solid ${color}`, 
          boxShadow: `0 0 5px ${hexToRGBA(color, 0.3)}, inset 0 0 15px ${hexToRGBA(color, 0.1)}`
        }}
      >
        {/* Grid pattern */}
        {showGrid && (
          <>
            {/* Concentric circles */}
            <div 
              className="absolute inset-0 rounded-full"
              style={{ 
                border: `0.5px solid ${hexToRGBA(color, 0.2)}`,
                transform: 'scale(0.75)',
                transformOrigin: 'center'
              }}
            />
            <div 
              className="absolute inset-0 rounded-full"
              style={{ 
                border: `0.5px solid ${hexToRGBA(color, 0.2)}`,
                transform: 'scale(0.5)',
                transformOrigin: 'center'
              }}
            />
            <div 
              className="absolute inset-0 rounded-full"
              style={{ 
                border: `0.5px solid ${hexToRGBA(color, 0.2)}`,
                transform: 'scale(0.25)',
                transformOrigin: 'center'
              }}
            />
            
            {/* Cross grid lines */}
            <div 
              className="absolute top-0 bottom-0 left-1/2 w-px"
              style={{ backgroundColor: hexToRGBA(color, 0.2) }}
            />
            <div 
              className="absolute left-0 right-0 top-1/2 h-px"
              style={{ backgroundColor: hexToRGBA(color, 0.2) }}
            />
          </>
        )}
        
        {/* Rotating radar beam */}
        {isActive && (
          <motion.div
            className="absolute top-1/2 left-1/2 w-1/2 h-0.5 origin-left"
            style={{ 
              background: `linear-gradient(to right, ${color} 0%, transparent 100%)`,
              filter: `drop-shadow(0 0 2px ${hexToRGBA(color, 0.8)})`,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: rotationDuration, repeat: Infinity, ease: "linear" }}
          >
            {/* Radar pulse effect */}
            <motion.div
              className="absolute top-0 left-0 bottom-0 right-0 rounded-r-full"
              style={{ background: hexToRGBA(color, 0.1) }}
              animate={{
                background: [
                  `${hexToRGBA(color, 0.1)}`,
                  `${hexToRGBA(color, pulseIntensity)}`,
                  `${hexToRGBA(color, 0.1)}`
                ]
              }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>
        )}
        
        {/* Center dot */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ 
            width: 4, 
            height: 4, 
            backgroundColor: color,
            boxShadow: `0 0 5px ${hexToRGBA(color, 0.8)}`
          }}
        />
        
        {/* Radar sweep effect */}
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ 
              background: `radial-gradient(circle, transparent 30%, ${hexToRGBA(color, 0.1)} 70%)`,
              opacity: 0.5
            }}
            animate={{ scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        
        {/* Blips */}
        {blips.map(blip => (
          <motion.div
            key={blip.id}
            className="absolute rounded-full"
            style={{
              left: `${blip.x * 100}%`,
              top: `${blip.y * 100}%`,
              width: blip.size,
              height: blip.size,
              backgroundColor: color,
              boxShadow: `0 0 5px ${hexToRGBA(color, 0.6)}`,
              transform: 'translate(-50%, -50%)'
            }}
            animate={blip.pulse ? {
              scale: [1, 1.5, 1],
              opacity: [blip.opacity, blip.opacity * 1.5, blip.opacity]
            } : {}}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        ))}

        {/* Digital data around edge */}
        <div className="absolute inset-0">
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const x = Math.cos(angle) * (size / 2 - 10) + size / 2;
            const y = Math.sin(angle) * (size / 2 - 10) + size / 2;
            
            return (
              <div
                key={`marker-${i}`}
                className="absolute text-xs"
                style={{
                  left: x,
                  top: y,
                  transform: 'translate(-50%, -50%)',
                  color: hexToRGBA(color, 0.8),
                }}
              >
                {i * 45}°
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}