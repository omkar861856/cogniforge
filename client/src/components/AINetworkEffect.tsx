import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Point {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

interface AINetworkEffectProps {
  className?: string;
  nodeColor?: string;
  lineColor?: string;
  nodeCount?: number;
  lineOpacity?: number;
}

export default function AINetworkEffect({
  className = '',
  nodeColor = 'rgba(249, 115, 22, 0.7)',
  lineColor = 'rgba(249, 115, 22, 0.2)',
  nodeCount = 15,
  lineOpacity = 0.15
}: AINetworkEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const animationRef = useRef<number>();
  const [connections, setConnections] = useState<{ from: number; to: number; distance: number }[]>([]);
  
  // Initialize points
  useEffect(() => {
    if (!containerRef.current) return;
    
    const { width, height } = containerRef.current.getBoundingClientRect();
    setDimensions({ width, height });
    
    const newPoints: Point[] = [];
    for (let i = 0; i < nodeCount; i++) {
      newPoints.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 2
      });
    }
    setPoints(newPoints);
    
    // Resize handler
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
  }, [nodeCount]);
  
  // Animation loop
  useEffect(() => {
    if (points.length === 0 || !dimensions.width || !dimensions.height) return;
    
    const animate = () => {
      setPoints(currentPoints => {
        const nextPoints = currentPoints.map(point => {
          let { x, y, vx, vy, size } = point;
          
          // Update position
          x += vx;
          y += vy;
          
          // Bounce off walls
          if (x < 0 || x > dimensions.width) vx = -vx;
          if (y < 0 || y > dimensions.height) vy = -vy;
          
          // Ensure within bounds
          x = Math.max(0, Math.min(x, dimensions.width));
          y = Math.max(0, Math.min(y, dimensions.height));
          
          return { ...point, x, y, vx, vy };
        });
        
        return nextPoints;
      });
      
      // Calculate connections
      const maxDistance = Math.min(dimensions.width, dimensions.height) * 0.2; // 20% of the smaller dimension
      const newConnections: { from: number; to: number; distance: number }[] = [];
      
      points.forEach((pointA, indexA) => {
        points.forEach((pointB, indexB) => {
          if (indexA < indexB) { // Only connect each pair once
            const dx = pointA.x - pointB.x;
            const dy = pointA.y - pointB.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < maxDistance) {
              newConnections.push({ from: indexA, to: indexB, distance });
            }
          }
        });
      });
      
      setConnections(newConnections);
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [points, dimensions]);
  
  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ position: 'absolute' }}
    >
      <svg width="100%" height="100%">
        {/* Connections between nodes */}
        {connections.map(({ from, to, distance }, index) => {
          const fromPoint = points[from];
          const toPoint = points[to];
          if (!fromPoint || !toPoint) return null;
          
          const maxDistance = Math.min(dimensions.width, dimensions.height) * 0.2;
          const opacity = lineOpacity * (1 - distance / maxDistance);
          
          return (
            <line
              key={`line-${index}`}
              x1={fromPoint.x}
              y1={fromPoint.y}
              x2={toPoint.x}
              y2={toPoint.y}
              stroke={lineColor}
              strokeWidth={1}
              opacity={opacity}
            />
          );
        })}
        
        {/* Nodes */}
        {points.map((point) => (
          <g key={`node-${point.id}`}>
            <circle
              cx={point.x}
              cy={point.y}
              r={point.size}
              fill={nodeColor}
            />
            {/* Glowing effect */}
            <circle
              cx={point.x}
              cy={point.y}
              r={point.size * 2}
              fill="none"
              stroke={nodeColor}
              strokeWidth="0.5"
              opacity="0.3"
            />
          </g>
        ))}
        
        {/* Optional decorative elements */}
        <defs>
          <radialGradient id="networkGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor={nodeColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={nodeColor} stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Center glow effect */}
        <motion.circle
          cx={dimensions.width / 2}
          cy={dimensions.height / 2}
          r={Math.min(dimensions.width, dimensions.height) * 0.3}
          fill="url(#networkGlow)"
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </svg>
    </div>
  );
}