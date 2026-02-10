import { useState, useEffect } from 'react';

export default function AnimatedText({ words, interval = 3000, className = '' }) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState('enter');

  useEffect(() => {
    const timer = setInterval(() => {
      setPhase('exit');
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setPhase('enter');
      }, 300);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <span className="inline-block overflow-hidden h-[1.2em] align-bottom">
      <span
        className={`block whitespace-nowrap leading-tight ${className} ${
          phase === 'exit' ? 'animate-text-exit' : 'animate-text-enter'
        }`}
      >
        {words[index]}
      </span>
    </span>
  );
}
