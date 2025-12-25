import React from 'react';

interface ModernRevealTextProps {
  text: string;
  subtitle?: string;
  className?: string;
  delay?: number;
}

const ModernRevealText: React.FC<ModernRevealTextProps> = ({ 
  text, 
  subtitle, 
  className = '', 
  delay = 0 
}) => {
  return (
    <div className={`relative overflow-hidden flex flex-col items-center ${className}`}>
      <h1 
        className="text-6xl md:text-8xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 animate-reveal"
        style={{ animationDelay: `${delay}ms` }}
      >
        {text}
      </h1>
      {subtitle && (
        <p 
          className="mt-6 text-xl md:text-2xl text-cyan-400 font-light tracking-wide uppercase opacity-0 animate-reveal"
          style={{ animationDelay: `${delay + 300}ms`, animationFillMode: 'forwards' }}
        >
          {subtitle}
        </p>
      )}
      <div 
        className="mt-2 w-24 h-1 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full opacity-0 animate-reveal"
        style={{ animationDelay: `${delay + 600}ms`, animationFillMode: 'forwards' }}
      />
    </div>
  );
};

export default ModernRevealText;
