import { motion } from 'framer-motion';
import AIHolographicDisplay from './AIHolographicDisplay';
import AIRadarScan from './AIRadarScan';
import AICodeVisualization from './AICodeVisualization';
import AIAssistantIndicator from './AIAssistantIndicator';
import { useState, useEffect } from 'react';

interface FuturisticElementsProps {
  className?: string;
}

export default function FuturisticElements({ className = '' }: FuturisticElementsProps) {
  const [currentTime, setCurrentTime] = useState<string>('00:00:00');
  const [stats, setStats] = useState<Array<{label: string, value: number, max: number}>>([
    { label: 'CPU', value: 0, max: 100 },
    { label: 'Memory', value: 0, max: 100 },
    { label: 'Network', value: 0, max: 100 },
    { label: 'AI Models', value: 0, max: 5 }
  ]);
  
  // Update time and random stats
  useEffect(() => {
    const timeInterval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
      
      // Update random stats
      setStats(prevStats => prevStats.map(stat => ({
        ...stat,
        value: Math.min(stat.max, Math.max(0, 
          stat.value + (Math.random() > 0.5 ? 1 : -1) * Math.random() * (stat.max / 10)
        ))
      })));
    }, 1000);
    
    return () => clearInterval(timeInterval);
  }, []);
  
  return (
    <div className={`flex flex-col lg:flex-row gap-8 justify-center ${className}`}>
      <motion.div 
        className="flex-1 max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-2xl font-bold text-orange-500 mb-4">Futuristic AI Interfaces</h3>
        <div className="space-y-6">
          <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow-md">
            <AIHolographicDisplay 
              width="100%" 
              height={120}
              className="mb-4"
            >
              <div className="text-center">
                <div className="text-orange-500 text-xl font-bold mb-1">COGNIFORGE AI</div>
                <div className="text-gray-500 text-sm">Automated Business Solutions</div>
                <div className="text-orange-400 text-xs mt-3">{currentTime}</div>
              </div>
            </AIHolographicDisplay>
            
            <div className="flex justify-between items-center">
              <AIAssistantIndicator size="sm" label="AI Runtime" />
              <div className="flex space-x-2">
                {stats.map((stat, index) => (
                  <div key={`stat-${index}`} className="text-xs">
                    <div className="text-gray-600 mb-1">{stat.label}</div>
                    <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-orange-400"
                        animate={{ width: `${(stat.value / stat.max) * 100}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <div className="text-right text-gray-600 mt-1">{Math.round(stat.value)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="flex-1 max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="text-2xl font-bold text-orange-500 mb-4">Advanced Visualizations</h3>
        <div className="space-y-6">
          <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow-md flex flex-col items-center">
            <div className="flex gap-4 flex-wrap justify-center">
              <AIRadarScan size={150} />
              <AICodeVisualization 
                width={200} 
                height={150} 
                linesCount={7}
                speed="fast"
              />
            </div>
            
            <div className="w-full mt-4 p-2 border border-orange-200 rounded bg-white/70">
              <div className="text-xs text-gray-700 font-mono">
                <div className="flex justify-between border-b border-gray-100 pb-1 mb-1">
                  <span>System Status:</span>
                  <span className="text-green-500">Operational</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-1 mb-1">
                  <span>AI Models:</span>
                  <span className="text-orange-500">4 Active</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing:</span>
                  <span className="text-orange-500">
                    <motion.span
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      •••
                    </motion.span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}