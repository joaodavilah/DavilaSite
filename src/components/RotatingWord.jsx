import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  usePresence,
  useReducedMotion
} from 'motion/react';
import { gsap } from 'gsap';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import './RotatingWord.css';

gsap.registerPlugin(GSAPSplitText);

const AnimatedWord = ({ word, renderWord, animateIn }) => {
  const rootRef = useRef(null);
  const splitRef = useRef(null);
  const enterTweenRef = useRef(null);
  const exitTweenRef = useRef(null);
  const [isPresent, safeToRemove] = usePresence();
  const shouldReduceMotion = useReducedMotion();

  const offset = shouldReduceMotion ? 8 : 24;
  const enterDuration = shouldReduceMotion ? 0.22 : 0.42;
  const exitDuration = shouldReduceMotion ? 0.16 : 0.2;
  const enterStagger = shouldReduceMotion ? 0.01 : 0.028;
  const exitStagger = shouldReduceMotion ? 0.005 : 0.01;

  useLayoutEffect(() => {
    const root = rootRef.current;
    const textElement = root?.querySelector('.text-content') || root;
    if (!textElement) return undefined;

    const split = new GSAPSplitText(textElement, {
      type: 'chars',
      charsClass: 'rotating-word-character',
      reduceWhiteSpace: false
    });
    splitRef.current = split;

    if (animateIn) {
      enterTweenRef.current = gsap.fromTo(
        split.chars,
        {
          opacity: 0,
          top: offset
        },
        {
          opacity: 1,
          top: 0,
          duration: enterDuration,
          ease: 'power3.out',
          stagger: enterStagger,
          clearProps: 'opacity,top'
        }
      );
    }

    return () => {
      enterTweenRef.current?.kill();
      exitTweenRef.current?.kill();
      split.revert();
      splitRef.current = null;
    };
  }, [
    animateIn,
    enterDuration,
    enterStagger,
    offset,
    word
  ]);

  useEffect(() => {
    if (isPresent) return undefined;

    const characters = splitRef.current?.chars;
    enterTweenRef.current?.kill();

    if (!characters?.length) {
      safeToRemove?.();
      return undefined;
    }

    exitTweenRef.current = gsap.to(characters, {
      opacity: 0,
      top: -offset,
      duration: exitDuration,
      ease: 'power2.in',
      stagger: {
        each: exitStagger,
        from: 'end'
      },
      onComplete: safeToRemove
    });

    return () => exitTweenRef.current?.kill();
  }, [
    exitDuration,
    exitStagger,
    isPresent,
    offset,
    safeToRemove
  ]);

  return (
    <span
      ref={rootRef}
      className="rotating-word-value"
      aria-label={word}
    >
      {renderWord ? renderWord(word) : word}
    </span>
  );
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
  const hasMountedRef = useRef(false);
  const currentWord = rotatingWords[currentWordIndex];

  useEffect(() => {
    hasMountedRef.current = true;
  }, []);

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
        <AnimatedWord
          key={currentWord}
          word={`${currentWord}${suffix}`}
          renderWord={renderWord}
          animateIn={hasMountedRef.current}
        />
      </AnimatePresence>
    </span>
  );
}
