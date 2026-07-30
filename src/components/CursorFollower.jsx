import { useEffect, useRef } from 'react';
import './CursorFollower.css';

const INTERACTIVE_SELECTOR = 'a, button, input, textarea, select, [role="button"], [role="option"]';

export default function CursorFollower() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!finePointer.matches || reducedMotion.matches) return undefined;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const dot = { ...mouse };
    const ring = { ...mouse };
    let animationFrame;
    let hasMoved = false;

    document.documentElement.classList.add('cursor-follower-enabled');

    const handlePointerMove = event => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;

      if (!hasMoved) {
        dot.x = mouse.x;
        dot.y = mouse.y;
        ring.x = mouse.x;
        ring.y = mouse.y;
        hasMoved = true;
        dotRef.current?.classList.add('is-visible');
        ringRef.current?.classList.add('is-visible');
      }
    };

    const handlePointerOver = event => {
      if (event.target.closest?.(INTERACTIVE_SELECTOR)) {
        ringRef.current?.classList.add('is-hovering');
      }
    };

    const handlePointerOut = event => {
      const nextInteractive = event.relatedTarget?.closest?.(INTERACTIVE_SELECTOR);
      if (!nextInteractive) ringRef.current?.classList.remove('is-hovering');
    };

    const handleWindowLeave = () => {
      dotRef.current?.classList.remove('is-visible');
      ringRef.current?.classList.remove('is-visible');
    };

    const handleWindowEnter = () => {
      if (!hasMoved) return;
      dotRef.current?.classList.add('is-visible');
      ringRef.current?.classList.add('is-visible');
    };

    const animate = () => {
      dot.x += (mouse.x - dot.x) * 0.22;
      dot.y += (mouse.y - dot.y) * 0.22;
      ring.x += (mouse.x - ring.x) * 0.1;
      ring.y += (mouse.y - ring.y) * 0.1;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerover', handlePointerOver);
    document.addEventListener('pointerout', handlePointerOut);
    document.documentElement.addEventListener('mouseleave', handleWindowLeave);
    document.documentElement.addEventListener('mouseenter', handleWindowEnter);
    animationFrame = requestAnimationFrame(animate);

    return () => {
      document.documentElement.classList.remove('cursor-follower-enabled');
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerover', handlePointerOver);
      document.removeEventListener('pointerout', handlePointerOut);
      document.documentElement.removeEventListener('mouseleave', handleWindowLeave);
      document.documentElement.removeEventListener('mouseenter', handleWindowEnter);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="cursor-follower" aria-hidden="true">
      <span ref={dotRef} className="cursor-follower__dot" />
      <span ref={ringRef} className="cursor-follower__ring" />
    </div>
  );
}
