import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
}

export default function AIAnimationBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleCount = 50;
  
  useEffect(() => {
    // Generate initial particles
    const initialParticles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      initialParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 5 + 2,
        opacity: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 0.5 + 0.2
      });
    }
    setParticles(initialParticles);
    
    // Animation loop
    const interval = setInterval(() => {
      setParticles(prevParticles => prevParticles.map(particle => {
        let newY = particle.y - particle.speed;
        if (newY < -5) {
          newY = 105;
          return {
            ...particle,
            y: newY,
            x: Math.random() * 100,
            opacity: Math.random() * 0.5 + 0.1
          };
        }
        return { ...particle, y: newY };
      }));
    }, 50);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute bg-gradient-to-r from-orange-400 to-amber-300 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity
          }}
          initial={{ scale: 0 }}
          animate={{ 
            scale: [0, 1, 1, 0],
            opacity: [0, particle.opacity, particle.opacity, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
        />
      ))}
      
      {/* Glowing network lines */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,147,26,0.1)_0%,rgba(255,255,255,0)_60%)]"></div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgMjAgMTAgTSAxMCAwIEwgMTAgMjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDE2NSwgMCwgMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
    </div>
  );
}