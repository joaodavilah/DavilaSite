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
  const availableWords = words?.length ? words : [''];
  const [wordIndex, setWordIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const currentWord = availableWords[wordIndex % availableWords.length];

  useEffect(() => {
    if (shouldReduceMotion || availableWords.length < 2) {
      setWordIndex(0);
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setWordIndex(currentIndex => (currentIndex + 1) % availableWords.length);
    }, interval);

    return () => window.clearInterval(intervalId);
  }, [availableWords.length, interval, shouldReduceMotion]);

  return (
    <span className={`rotating-word${className ? ` ${className}` : ''}`}>
      {availableWords.map((word, index) => (
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
              ? undefined
              : { opacity: 0, y: -15, filter: 'blur(6px)' }
          }
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        >
          {renderWord
            ? renderWord(`${currentWord}${suffix}`)
            : `${currentWord}${suffix}`}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
