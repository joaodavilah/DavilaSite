import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import './RotatingWord.css';

const CHARACTER_DURATION = 0.2;
const CHARACTER_STAGGER = 0.01;

const AnimatedWord = ({ word }) => {
  const shouldReduceMotion = useReducedMotion();

  return Array.from(word).map((character, index) => (
    <motion.span
      key={`${word}-${index}`}
      aria-hidden="true"
      initial={
        shouldReduceMotion
          ? false
          : { opacity: 0, y: 14, filter: 'blur(5px)' }
      }
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={
        shouldReduceMotion
          ? { opacity: 1 }
          : { opacity: 0, y: -14, filter: 'blur(5px)' }
      }
      transition={{
        duration: shouldReduceMotion ? 0 : CHARACTER_DURATION,
        delay: shouldReduceMotion ? 0 : index * CHARACTER_STAGGER,
        ease: 'easeOut'
      }}
      style={{ display: 'inline-block' }}
    >
      {character}
    </motion.span>
  ));
};

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
          aria-label={`${currentWord}${suffix}`}
        >
          {renderWord
            ? renderWord(
                <AnimatedWord word={`${currentWord}${suffix}`} />
              )
            : <AnimatedWord word={`${currentWord}${suffix}`} />}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
