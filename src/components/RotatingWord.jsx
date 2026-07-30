import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import './RotatingWord.css';

const CHARACTER_DURATION = 0.24;
const CHARACTER_STAGGER = 0.012;

const AnimatedWord = ({ word }) => {
  const shouldReduceMotion = useReducedMotion();
  const characters = Array.from(word);
  const offset = shouldReduceMotion ? 6 : 16;
  const blur = shouldReduceMotion ? 2 : 5;
  const enterDuration = shouldReduceMotion ? 0.18 : CHARACTER_DURATION;
  const exitDuration = shouldReduceMotion ? 0.16 : 0.2;
  const enterStagger = shouldReduceMotion ? 0.006 : CHARACTER_STAGGER;
  const exitStagger = shouldReduceMotion ? 0.004 : 0.008;

  return characters.map((character, index) => (
    <motion.span
      key={`${word}-${index}`}
      className="rotating-word-character"
      aria-hidden="true"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={{
        initial: {
          opacity: 0,
          y: offset,
          filter: `blur(${blur}px)`
        },
        animate: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: {
            duration: enterDuration,
            delay: index * enterStagger,
            ease: [0.22, 1, 0.36, 1]
          }
        },
        exit: {
          opacity: 0,
          y: -offset,
          filter: `blur(${blur}px)`,
          transition: {
            duration: exitDuration,
            delay: (characters.length - index - 1) * exitStagger,
            ease: [0.4, 0, 1, 1]
          }
        }
      }}
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
