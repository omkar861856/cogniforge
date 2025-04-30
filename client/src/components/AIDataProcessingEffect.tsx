import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface DataStreamProps {
  className?: string;
  dataColor?: string;
  streamCount?: number;
  speed?: number;
}

export default function AIDataProcessingEffect({
  className = "",
  dataColor = "rgba(249, 115, 22, 0.7)",
  streamCount = 8,
  speed = 1.5
}: DataStreamProps) {
  const [streams, setStreams] = useState<Array<{ id: number; delay: number; height: string; width: string; left: string }>>([]);

  useEffect(() => {
    const newStreams = [];
    for (let i = 0; i < streamCount; i++) {
      newStreams.push({
        id: i,
        delay: Math.random() * 5,
        height: `${Math.random() * 30 + 10}%`,
        width: `${Math.random() * 2 + 1}px`,
        left: `${Math.random() * 90 + 5}%`
      });
    }
    setStreams(newStreams);
  }, [streamCount]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Vertical data streams */}
      {streams.map((stream) => (
        <motion.div
          key={`stream-${stream.id}`}
          className="absolute top-0 bg-gradient-to-b"
          style={{
            left: stream.left,
            width: stream.width,
            height: stream.height,
            background: `linear-gradient(to bottom, transparent, ${dataColor}, transparent)`
          }}
          animate={{
            y: ["-100%", "200%"]
          }}
          transition={{
            duration: 3 / speed,
            repeat: Infinity,
            ease: "linear",
            delay: stream.delay
          }}
        />
      ))}

      {/* Data processing nodes */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-3/4 h-3/4 max-w-lg">
          {/* Binary code effect */}
          <div className="absolute inset-0 flex flex-wrap overflow-hidden opacity-20">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={`binary-${i}`}
                className="text-xs inline-block text-orange-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: Math.random() * 2 + 1,
                  repeat: Infinity,
                  delay: Math.random() * 5
                }}
                style={{
                  position: "absolute",
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`
                }}
              >
                {Math.random() > 0.5 ? "1" : "0"}
              </motion.div>
            ))}
          </div>

          {/* Central node */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <div className="relative">
              {/* Outer circle */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ 
                  border: `2px solid ${dataColor}`, 
                  width: "80px", 
                  height: "80px" 
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                {/* Connection points */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <motion.div
                    key={`point-${i}`}
                    className="absolute w-2 h-2 rounded-full bg-orange-500"
                    style={{
                      top: "50%",
                      left: "50%",
                      marginLeft: "-4px",
                      marginTop: "-4px",
                      transform: `rotate(${i * 60}deg) translateX(40px)`
                    }}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      delay: i * 0.3
                    }}
                  />
                ))}
              </motion.div>

              {/* Middle circle */}
              <motion.div
                className="absolute rounded-full"
                style={{ 
                  border: `1.5px dashed ${dataColor}`, 
                  width: "50px", 
                  height: "50px",
                  top: "15px",
                  left: "15px"
                }}
                animate={{ rotate: -180 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />

              {/* Inner circle */}
              <motion.div
                className="absolute rounded-full bg-gradient-to-tr from-orange-500 to-amber-400"
                style={{ 
                  width: "25px", 
                  height: "25px",
                  top: "27.5px",
                  left: "27.5px"
                }}
                animate={{ 
                  boxShadow: ["0 0 10px rgba(249, 115, 22, 0.5)", "0 0 20px rgba(249, 115, 22, 0.7)", "0 0 10px rgba(249, 115, 22, 0.5)"]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Processing bars */}
          <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={`bar-${i}`}
                className="h-1 bg-orange-500 rounded-full"
                style={{ width: `${Math.random() * 30 + 20}px` }}
                animate={{
                  height: ["4px", "16px", "4px"],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Data pulses */}
      <div className="absolute inset-0">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={`pulse-${i}`}
            className="absolute rounded-full border border-orange-500/30"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)"
            }}
            initial={{ width: 0, height: 0, opacity: 0.7 }}
            animate={{ 
              width: ["0px", "400px"],
              height: ["0px", "400px"],
              opacity: [0.7, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 1.3,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
    </div>
  );
}