import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface AIAssistantIndicatorProps {
  className?: string;
  isActive?: boolean;
  pulseColor?: string; 
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  showLabel?: boolean;
}

export default function AIAssistantIndicator({
  className = '',
  isActive = true,
  pulseColor = '#f97316', // Orange
  size = 'md',
  label = 'AI Assistant Active',
  showLabel = true
}: AIAssistantIndicatorProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [dots, setDots] = useState<number[]>([]);
  
  // Determine sizes based on the size prop
  const dimensions = {
    sm: { container: 'w-6 h-6', center: 'w-2 h-2', rings: ['w-4 h-4', 'w-5 h-5'] },
    md: { container: 'w-10 h-10', center: 'w-3 h-3', rings: ['w-6 h-6', 'w-8 h-8'] },
    lg: { container: 'w-16 h-16', center: 'w-4 h-4', rings: ['w-10 h-10', 'w-12 h-12'] }
  }[size];
  
  // Simulate random AI processing activities
  useEffect(() => {
    if (!isActive) return;
    
    const processingInterval = setInterval(() => {
      // Randomly start/stop processing animation
      setIsProcessing(Math.random() > 0.3); // 70% chance of processing
      
      // Generate random dots for data visualization
      const newDots = Array.from({ length: 8 }).map((_, i) => Math.random() * 100);
      setDots(newDots);
    }, 3000); // Change state every 3 seconds
    
    return () => clearInterval(processingInterval);
  }, [isActive]);
  
  return (
    <div className={`relative flex items-center ${showLabel ? 'gap-3' : ''} ${className}`}>
      {/* Main indicator */}
      <div className={`relative ${dimensions.container}`}>
        {/* Pulsing rings */}
        {isActive && (
          <>
            <motion.div
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full ${dimensions.rings[0]}`}
              style={{ borderColor: pulseColor, borderWidth: '1px' }}
              animate={{
                opacity: [0.7, 0.2, 0.7],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full ${dimensions.rings[1]}`}
              style={{ borderColor: pulseColor, borderWidth: '1px' }}
              animate={{
                opacity: [0.5, 0.1, 0.5],
                scale: [0.9, 1.1, 0.9]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3
              }}
            />
          </>
        )}
        
        {/* Center dot */}
        <motion.div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${dimensions.center} rounded-full`}
          style={{ background: pulseColor }}
          animate={isActive ? {
            scale: isProcessing ? [1, 1.3, 1] : 1,
            opacity: isActive ? 1 : 0.3
          } : {}}
          transition={{
            scale: {
              duration: 0.5,
              repeat: isProcessing ? Infinity : 0,
              repeatType: "reverse"
            }
          }}
        />
        
        {/* Data processing indicators */}
        {isActive && isProcessing && (
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
          >
            <g transform="translate(50, 50)">
              {dots.map((dot, i) => {
                const angle = (i / dots.length) * 2 * Math.PI;
                const distance = 40;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;
                const size = (dot / 100) * 3 + 1;
                
                return (
                  <motion.circle
                    key={`dot-${i}`}
                    cx={x}
                    cy={y}
                    r={size}
                    fill={pulseColor}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: dot / 100 }}
                    transition={{ duration: 0.5 }}
                  />
                );
              })}
            </g>
            
            {/* Processing waves */}
            <motion.circle
              cx="50"
              cy="50"
              r="20"
              fill="none"
              stroke={pulseColor}
              strokeWidth="0.5"
              strokeDasharray="2,3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5, rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
          </svg>
        )}
      </div>
      
      {/* Label */}
      {showLabel && (
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-sm font-medium text-gray-700">{label}</div>
          {isActive && (
            <div className="text-xs text-gray-500 flex items-center">
              {isProcessing ? (
                <>
                  <span>Processing</span>
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="ml-1"
                  >
                    ...
                  </motion.span>
                </>
              ) : (
                <span>Ready</span>
              )}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}