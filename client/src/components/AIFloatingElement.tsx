import { motion } from 'framer-motion';

interface AIFloatingElementProps {
  className?: string;
  delay?: number;
}

export default function AIFloatingElement({ className = '', delay = 0 }: AIFloatingElementProps) {
  return (
    <motion.div
      className={`absolute rounded-full border border-orange-300/30 backdrop-blur-sm ${className}`}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: [0, 0.7, 0.5],
        scale: [0.8, 1, 0.9],
        y: [0, -10, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        delay: delay,
      }}
    >
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {/* Pulse effect */}
        <motion.div 
          className="absolute w-full h-full rounded-full bg-orange-500/5"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        />
        
        {/* Inner circle */}
        <motion.div 
          className="absolute w-3/4 h-3/4 rounded-full border border-orange-400/20"
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {/* Nodes */}
          <motion.div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-orange-400 rounded-full"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div 
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-orange-400 rounded-full"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div 
            className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-orange-400 rounded-full"
            animate={{ opacity: [0.7, 0.3, 0.7] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div 
            className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-orange-400 rounded-full"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </motion.div>
        
        {/* Center dot */}
        <motion.div 
          className="w-1/3 h-1/3 rounded-full bg-gradient-to-r from-orange-400 to-amber-300 flex items-center justify-center shadow-lg shadow-orange-500/20"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
            boxShadow: [
              "0 0 0 0 rgba(255, 165, 0, 0.5)",
              "0 0 0 10px rgba(255, 165, 0, 0)",
              "0 0 0 0 rgba(255, 165, 0, 0.5)"
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="text-xs text-white font-bold opacity-90">AI</div>
        </motion.div>
      </div>
    </motion.div>
  );
}