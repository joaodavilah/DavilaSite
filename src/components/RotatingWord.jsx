import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import './RotatingWord.css';

export default function RotatingWord({
  words,
  interval = 5000,
  suffix = '',
  className = '',
  renderWord
}) {
  const rotatingWords = words?.length ? words : [''];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const currentWord = rotatingWords[currentWordIndex];
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex(currentIndex =>
        (currentIndex + 1) % rotatingWords.length
      );
    }, interval);

    return () => clearInterval(intervalId);
  }, [interval, rotatingWords.length]);

  return (
    <span className={`rotating-word${className ? ` ${className}` : ''}`}>
      {rotatingWords.map((word, index) => (
        <span
          className="rotating-word-measure"
          aria-hidden="true"
          key={`${word}-${index}`}
        >
          {word}
          {suffix}
        </span>
      ))}

      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={currentWord}
          className="rotating-word-value"
          initial={
            shouldReduceMotion
              ? false
              : { opacity: 0, y: 15, filter: 'blur(6px)' }
          }
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 0, y: -15, filter: 'blur(6px)' }
          }
          transition={{
            duration: shouldReduceMotion ? 0 : 0.5,
            ease: 'easeInOut'
          }}
        >
          {renderWord
            ? renderWord(`${currentWord}${suffix}`)
            : `${currentWord}${suffix}`}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
