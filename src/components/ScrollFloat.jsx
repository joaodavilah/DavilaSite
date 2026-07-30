import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollFloat.css';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollFloat({
  children,
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'center bottom+=50%',
  scrollEnd = 'bottom bottom-=40%',
  stagger = 0.03,
  as: Tag = 'h2',
  ...props
}) {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';

    return text.split('').map((char, index) => (
      <span className="scroll-float-char" key={`${char}-${index}`}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return undefined;

    const scroller = scrollContainerRef?.current || window;
    const characters = element.querySelectorAll('.scroll-float-char');

    const tween = gsap.fromTo(
      characters,
      {
        willChange: 'opacity, transform',
        opacity: 0,
        yPercent: 120,
        scaleY: 2.3,
        scaleX: 0.7,
        transformOrigin: '50% 0%'
      },
      {
        duration: animationDuration,
        ease,
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        stagger,
        scrollTrigger: {
          trigger: element,
          scroller,
          start: scrollStart,
          end: scrollEnd,
          scrub: true,
          invalidateOnRefresh: true
        }
      }
    );

    const refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(refreshFrame);
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [
    scrollContainerRef,
    animationDuration,
    ease,
    scrollStart,
    scrollEnd,
    stagger
  ]);

  return (
    <Tag
      {...props}
      ref={containerRef}
      className={`scroll-float${containerClassName ? ` ${containerClassName}` : ''}`}
      aria-label={typeof children === 'string' ? children : undefined}
    >
      <span
        className={`scroll-float-text${textClassName ? ` ${textClassName}` : ''}`}
        aria-hidden="true"
      >
        {splitText}
      </span>
    </Tag>
  );
}
