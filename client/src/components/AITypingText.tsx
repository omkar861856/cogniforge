import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AITypingTextProps {
  phrases: string[];
  className?: string;
  typingSpeed?: number;
  pauseDuration?: number;
}

export default function AITypingText({
  phrases,
  className = '',
  typingSpeed = 80,
  pauseDuration = 2000
}: AITypingTextProps) {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const currentPhrase = phrases[currentIndex];
    
    if (isTyping && !isDeleting) {
      if (currentText !== currentPhrase) {
        const timeout = setTimeout(() => {
          setCurrentText(currentPhrase.substring(0, currentText.length + 1));
        }, typingSpeed);
        return () => clearTimeout(timeout);
      } else {
        setIsTyping(false);
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
        return () => clearTimeout(timeout);
      }
    } else if (isDeleting) {
      if (currentText !== '') {
        const timeout = setTimeout(() => {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        }, typingSpeed / 2);
        return () => clearTimeout(timeout);
      } else {
        setIsDeleting(false);
        setIsTyping(true);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length);
      }
    }
  }, [currentText, currentIndex, isTyping, isDeleting, phrases, typingSpeed, pauseDuration]);
  
  return (
    <div className={`inline-flex items-center ${className}`}>
      <span>{currentText}</span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-[2px] h-[1em] bg-orange-500 ml-1"
      />
    </div>
  );
}