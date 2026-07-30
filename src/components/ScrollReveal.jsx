import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollReveal({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0,
  baseRotation = 0,
  blurStrength = 8,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom 62%',
  wordAnimationEnd = 'bottom 68%'
}) {
  const containerRef = useRef(null);
  const isText = typeof children === 'string';

  const content = useMemo(() => {
    if (!isText) return children;

    return children.split(/(\s+)/).map((word, index) => {
      if (/^\s+$/.test(word)) return word;
      return (
        <span className="word" key={`${word}-${index}`}>
          {word}
        </span>
      );
    });
  }, [children, isText]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;

    const scroller = scrollContainerRef?.current || window;
    const targets = isText
      ? Array.from(el.querySelectorAll('.word'))
      : Array.from(el.querySelectorAll('.scroll-reveal-node'));

    const animationTargets = targets.length ? targets : [el];
    const tweens = [];

    // Subtle container reveal: gives the whole block a softer "emergence"
    // while remaining fully reversible when the user scrolls back up.
    const emergenceTween = gsap.fromTo(
      el,
      {
        clipPath: 'inset(0 0 16% 0)',
        scale: 0.985,
        transformOrigin: '50% 100%'
      },
      {
        clipPath: 'inset(0 0 0% 0)',
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top 94%',
          end: 'top 70%',
          scrub: true
        }
      }
    );
    tweens.push(emergenceTween);

    const rotationTween = gsap.fromTo(
      el,
      { transformOrigin: '0% 50%', rotate: baseRotation },
      {
        ease: 'none',
        rotate: 0,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top 92%',
          end: rotationEnd,
          scrub: true
        }
      }
    );
    tweens.push(rotationTween);

    const revealTween = gsap.fromTo(
      animationTargets,
      {
        opacity: baseOpacity,
        y: 34,
        scale: 0.985,
        willChange: 'transform, opacity, filter'
      },
      {
        ease: 'none',
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: isText ? 0.035 : 0,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top 90%',
          end: wordAnimationEnd,
          scrub: true
        }
      }
    );
    tweens.push(revealTween);

    if (enableBlur) {
      const blurTween = gsap.fromTo(
        animationTargets,
        { filter: `blur(${blurStrength}px)` },
        {
          ease: 'none',
          filter: 'blur(0px)',
          stagger: isText ? 0.035 : 0,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top 90%',
            end: wordAnimationEnd,
            scrub: true
          }
        }
      );
      tweens.push(blurTween);
    }

    return () => {
      tweens.forEach(tween => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
    };
  }, [
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    rotationEnd,
    wordAnimationEnd,
    blurStrength,
    isText
  ]);

  return (
    <div ref={containerRef} className={`scroll-reveal ${containerClassName}`.trim()}>
      <div className={`scroll-reveal-text ${textClassName}`.trim()}>
        {isText ? content : <div className="scroll-reveal-node">{content}</div>}
      </div>
    </div>
  );
}
