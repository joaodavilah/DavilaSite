import { motion, useReducedMotion } from 'motion/react';
import { Fragment, useEffect, useRef, useState, useMemo } from 'react';

const buildKeyframes = (from, steps) => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);

  const keyframes = {};
  keys.forEach(k => {
    keyframes[k] = [from[k], ...steps.map(s => s[k])];
  });
  return keyframes;
};

const BlurText = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = t => t,
  onAnimationComplete,
  stepDuration = 0.35,
  as: Tag = 'p'
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(
    () =>
      direction === 'top'
        ? { filter: 'blur(10px)', opacity: 0, y: -50 }
        : { filter: 'blur(10px)', opacity: 0, y: 50 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      {
        filter: 'blur(5px)',
        opacity: 0.5,
        y: direction === 'top' ? 5 : -5
      },
      { filter: 'blur(0px)', opacity: 1, y: 0 }
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;
  const motionFrom = shouldReduceMotion
    ? {
        filter: 'blur(2px)',
        opacity: 0,
        y: direction === 'top' ? -10 : 10
      }
    : fromSnapshot;
  const motionTo = shouldReduceMotion
    ? [
        {
          filter: 'blur(0px)',
          opacity: 1,
          y: 0
        }
      ]
    : toSnapshots;

  const stepCount = motionTo.length + 1;
  const totalDuration = shouldReduceMotion
    ? 0.24
    : stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1)
  );

  return (
    <Tag ref={ref} className={className}>
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(motionFrom, motionTo);

        const spanTransition = {
          duration: totalDuration,
          times,
          delay: shouldReduceMotion
            ? index * 0.035
            : (index * delay) / 1000
        };
        spanTransition.ease = easing;

        return (
          <Fragment key={index}>
            <motion.span
              className="blur-text-segment"
              initial={motionFrom}
              animate={inView ? animateKeyframes : motionFrom}
              transition={spanTransition}
              onAnimationComplete={
                index === elements.length - 1 ? onAnimationComplete : undefined
              }
            >
              {segment}
            </motion.span>
            {animateBy === 'words' && index < elements.length - 1 ? ' ' : null}
          </Fragment>
        );
      })}
    </Tag>
  );
};

export default BlurText;
