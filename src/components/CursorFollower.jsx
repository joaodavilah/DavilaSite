import { useEffect, useRef } from 'react';
import './CursorFollower.css';

export default function CursorFollower() {
  const mousePosition = useRef({ x: 0, y: 0 });

  const ringRef = useRef(null);
  const borderDotPosition = useRef({ x: 0, y: 0 });

  const BORDER_DOT_SMOOTHNESS = 0.1;

  useEffect(() => {
    const ring = ringRef.current;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!ring || !finePointer.matches || reducedMotion.matches) return undefined;

    const handleMouseMove = e => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseEnter = () => ring.classList.add('is-hovering');
    const handleMouseLeave = () => ring.classList.remove('is-hovering');

    document.documentElement.classList.add('cursor-follower-enabled');
    window.addEventListener('mousemove', handleMouseMove);

    const interactiveElements = document.querySelectorAll(
      'a, button, img, input, textarea, select'
    );
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    let animationId;

    const animate = () => {
      const lerp = (start, end, factor) => {
        return start + (end - start) * factor;
      };

      borderDotPosition.current.x = lerp(
        borderDotPosition.current.x,
        mousePosition.current.x,
        BORDER_DOT_SMOOTHNESS
      );
      borderDotPosition.current.y = lerp(
        borderDotPosition.current.y,
        mousePosition.current.y,
        BORDER_DOT_SMOOTHNESS
      );

      ring.style.transform = `translate3d(${borderDotPosition.current.x}px, ${borderDotPosition.current.y}px, 0) translate(-50%, -50%)`;

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      document.documentElement.classList.remove('cursor-follower-enabled');
      window.removeEventListener('mousemove', handleMouseMove);

      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });

      cancelAnimationFrame(animationId);
    };
  }, []);

  if (typeof window === 'undefined') return null;

  return (
    <div className="cursor-follower" aria-hidden="true">
      <div ref={ringRef} className="cursor-follower__ring" />
    </div>
  );
}
