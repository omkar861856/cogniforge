import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface AICodeVisualizationProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  linesCount?: number;
  codeColor?: string;
  backgroundColor?: string;
  speed?: 'slow' | 'medium' | 'fast';
  isActive?: boolean;
  darkMode?: boolean;
}

export default function AICodeVisualization({
  className = '',
  width = 300,
  height = 200,
  linesCount = 15,
  codeColor = '#f97316', // Orange
  backgroundColor = 'rgba(15, 23, 42, 0.95)', // Dark slate with transparency
  speed = 'medium',
  isActive = true,
  darkMode = true
}: AICodeVisualizationProps) {
  const [codeLines, setCodeLines] = useState<{ id: number; content: string; indent: number; highlight: boolean }[]>([]);
  const [highlightedLine, setHighlightedLine] = useState<number | null>(null);
  
  // Convert speed setting to milliseconds
  const speedMap = {
    slow: 800,
    medium: 400,
    fast: 200
  };
  
  const animationSpeed = speedMap[speed];
  
  // Generate random code-like characters
  const generateRandomCode = (length: number, indent: number = 0): string => {
    const codeCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_.${}[]<>()=>:;,"`\'';
    const keywords = ['function', 'const', 'let', 'if', 'else', 'return', 'import', 'export', 'async', 'await', 'try', 'catch', 'for', 'while'];
    const types = ['string', 'number', 'boolean', 'object', 'array', 'Promise', 'void', 'any'];
    
    // Randomly select a line type
    const lineType = Math.random();
    
    // Function/method declaration
    if (lineType < 0.2) {
      const functionName = `${generateRandomCode(Math.floor(Math.random() * 8) + 3, 0)}`;
      return `${'  '.repeat(indent)}function ${functionName}() {`;
    } 
    // Variable declaration
    else if (lineType < 0.4) {
      const varName = generateRandomCode(Math.floor(Math.random() * 6) + 2, 0);
      const varType = types[Math.floor(Math.random() * types.length)];
      return `${'  '.repeat(indent)}const ${varName}: ${varType} = ${Math.random() > 0.5 ? '{}' : '[]'};`;
    }
    // Return statement
    else if (lineType < 0.5) {
      return `${'  '.repeat(indent)}return ${Math.random() > 0.5 ? 'true' : 'result'};`;
    }
    // If statement
    else if (lineType < 0.6) {
      return `${'  '.repeat(indent)}if (${generateRandomCode(Math.floor(Math.random() * 5) + 2, 0)}) {`;
    }
    // Comment
    else if (lineType < 0.7) {
      return `${'  '.repeat(indent)}// ${generateRandomCode(Math.floor(Math.random() * 10) + 5, 0)}`;
    }
    // Closing brace
    else if (lineType < 0.8 && indent > 0) {
      return `${'  '.repeat(indent - 1)}}`;
    }
    // Typical variable assignment
    else {
      const keyword = keywords[Math.floor(Math.random() * keywords.length)];
      return `${'  '.repeat(indent)}${keyword} ${generateRandomCode(Math.floor(Math.random() * 5) + 2, 0)};`;
    }
  };
  
  // Initialize code lines
  useEffect(() => {
    if (!isActive) {
      setCodeLines([]);
      return;
    }
    
    // Generate initial code lines with proper indentation
    const initialCodeLines = [];
    let currentIndent = 0;
    
    for (let i = 0; i < linesCount; i++) {
      // Adjust indent based on previous line
      if (i > 0 && Math.random() > 0.7 && currentIndent < 3) {
        currentIndent++;
      } else if (i > 0 && Math.random() > 0.8 && currentIndent > 0) {
        currentIndent--;
      }
      
      initialCodeLines.push({
        id: i,
        content: generateRandomCode(Math.floor(Math.random() * 10) + 5, currentIndent),
        indent: currentIndent,
        highlight: false
      });
    }
    
    setCodeLines(initialCodeLines);
    
    // Randomly update a line every few seconds to simulate code changes
    const interval = setInterval(() => {
      if (!isActive) return;
      
      setCodeLines(prevLines => {
        const newLines = [...prevLines];
        const lineToChangeIndex = Math.floor(Math.random() * newLines.length);
        const lineToChange = newLines[lineToChangeIndex];
        
        // Update the line content
        newLines[lineToChangeIndex] = {
          ...lineToChange,
          content: generateRandomCode(Math.floor(Math.random() * 10) + 5, lineToChange.indent),
          highlight: true
        };
        
        // Set highlighted line and reset previous highlight
        setHighlightedLine(lineToChangeIndex);
        
        return newLines;
      });
    }, animationSpeed * 4); // Update less frequently than the animation speed
    
    // Reset highlight after a delay
    const highlightResetInterval = setInterval(() => {
      if (highlightedLine !== null) {
        setCodeLines(prevLines => {
          const newLines = [...prevLines];
          if (highlightedLine < newLines.length) {
            newLines[highlightedLine] = {
              ...newLines[highlightedLine],
              highlight: false
            };
          }
          return newLines;
        });
        setHighlightedLine(null);
      }
    }, animationSpeed * 2);
    
    return () => {
      clearInterval(interval);
      clearInterval(highlightResetInterval);
    };
  }, [isActive, linesCount, animationSpeed]);
  
  // Base styles
  const containerStyle = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    backgroundColor: darkMode ? backgroundColor : 'rgba(240, 240, 240, 0.95)',
    color: darkMode ? '#e2e8f0' : '#334155',
    fontFamily: 'monospace',
  };
  
  return (
    <div 
      className={`relative rounded-md overflow-hidden shadow-xl ${className}`}
      style={containerStyle}
    >
      {/* Title bar */}
      <div 
        className="flex items-center px-3 py-2 text-sm"
        style={{ 
          backgroundColor: darkMode ? 'rgba(30, 41, 59, 0.8)' : 'rgba(226, 232, 240, 0.8)',
          borderBottom: `1px solid ${darkMode ? 'rgba(71, 85, 105, 0.5)' : 'rgba(203, 213, 225, 0.8)'}`
        }}
      >
        <div className="flex space-x-2 mr-2">
          <div className="w-3 h-3 rounded-full bg-red-500 opacity-80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80" />
          <div className="w-3 h-3 rounded-full bg-green-500 opacity-80" />
        </div>
        <div className="flex-1 text-center text-xs opacity-70">code.tsx</div>
      </div>
      
      {/* Code content */}
      <div 
        className="p-3 overflow-y-auto h-full text-xs"
        style={{ height: 'calc(100% - 35px)' }}
      >
        {codeLines.map((line, index) => (
          <motion.div
            key={`${line.id}-${index}`}
            className="font-mono whitespace-nowrap mb-1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              backgroundColor: line.highlight ? 
                darkMode ? 'rgba(249, 115, 22, 0.1)' : 'rgba(249, 115, 22, 0.1)' 
                : 'transparent'
            }}
            transition={{ 
              duration: 0.3,
              backgroundColor: { duration: 1 }
            }}
            style={{ paddingLeft: 10 }}
          >
            {/* Line number */}
            <span className="inline-block w-5 mr-3 opacity-50 text-right">
              {index + 1}
            </span>
            
            {/* Actual code content with syntax highlighting */}
            <span dangerouslySetInnerHTML={{ 
              __html: syntaxHighlight(line.content, codeColor, darkMode) 
            }} />
          </motion.div>
        ))}
        
        {/* Empty state */}
        {codeLines.length === 0 && (
          <div className="h-full flex items-center justify-center opacity-40">
            {isActive ? 'Loading code...' : 'Code visualization inactive'}
          </div>
        )}
      </div>
      
      {/* Active cursor simulation */}
      {isActive && highlightedLine !== null && (
        <motion.div
          className="absolute w-2 h-5"
          style={{ 
            left: (Math.random() * 200) + 50,
            top: (highlightedLine * 20) + 50,
            backgroundColor: codeColor,
          }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
    </div>
  );
}

// Simple syntax highlighting function
function syntaxHighlight(code: string, primaryColor: string, isDark: boolean): string {
  // Replace keywords with highlighted versions
  const keywords = ['function', 'const', 'let', 'var', 'if', 'else', 'return', 'import', 'export', 'async', 'await', 'try', 'catch', 'for', 'while'];
  const types = ['string', 'number', 'boolean', 'object', 'array', 'Promise', 'void', 'any'];
  
  // Base colors for syntax highlighting
  const keywordColor = primaryColor;
  const stringColor = isDark ? '#a5d6ff' : '#0550ae';
  const numberColor = isDark ? '#79c0ff' : '#0550ae';
  const commentColor = isDark ? '#8b949e' : '#6e7781';
  const punctuationColor = isDark ? '#c9d1d9' : '#24292f';
  const typeColor = isDark ? '#ff7b72' : '#cf222e';
  
  // Replace comments
  let highlighted = code.replace(/(\/\/.*)$/g, `<span style="color: ${commentColor}">$1</span>`);
  
  // Replace keywords
  keywords.forEach(keyword => {
    const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
    highlighted = highlighted.replace(regex, `<span style="color: ${keywordColor}">$1</span>`);
  });
  
  // Replace types
  types.forEach(type => {
    const regex = new RegExp(`\\b(${type})\\b`, 'g');
    highlighted = highlighted.replace(regex, `<span style="color: ${typeColor}">$1</span>`);
  });
  
  // Replace strings
  highlighted = highlighted.replace(/(['"])(.*?)(['"])/g, `<span style="color: ${stringColor}">$1$2$3</span>`);
  
  // Replace numbers
  highlighted = highlighted.replace(/\b(\d+)\b/g, `<span style="color: ${numberColor}">$1</span>`);
  
  // Replace punctuation
  highlighted = highlighted.replace(/([{}[\]()<>:;,])/g, `<span style="color: ${punctuationColor}">$1</span>`);
  
  return highlighted;
}