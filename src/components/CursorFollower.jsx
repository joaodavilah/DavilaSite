import { useEffect, useRef, useState } from 'react';
import './CursorFollower.css';

const INTERACTIVE_SELECTOR =
  'a, button, img, input, textarea, select, [role="button"], [role="option"]';

const lerp = (start, end, factor) => start + (end - start) * factor;

export default function CursorFollower() {
  const mousePosition = useRef({ x: 0, y: 0 });
  const dotPosition = useRef({ x: 0, y: 0 });
  const borderPosition = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);

  const [renderPosition, setRenderPosition] = useState({
    dot: { x: 0, y: 0 },
    border: { x: 0, y: 0 }
  });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let animationId;

    const handleMouseMove = event => {
      const nextPosition = { x: event.clientX, y: event.clientY };
      mousePosition.current = nextPosition;

      if (!hasMoved.current) {
        hasMoved.current = true;
        dotPosition.current = { ...nextPosition };
        borderPosition.current = { ...nextPosition };
        setRenderPosition({ dot: { ...nextPosition }, border: { ...nextPosition } });
        setIsVisible(true);
        document.documentElement.classList.add('cursor-follower-enabled');
      }
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);
    const hideCursor = () => setIsVisible(false);
    const showCursor = () => {
      if (hasMoved.current) setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', hideCursor);
    document.documentElement.addEventListener('mouseenter', showCursor);

    const interactiveElements = document.querySelectorAll(INTERACTIVE_SELECTOR);
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    const animate = () => {
      dotPosition.current.x = lerp(
        dotPosition.current.x,
        mousePosition.current.x,
        0.2
      );
      dotPosition.current.y = lerp(
        dotPosition.current.y,
        mousePosition.current.y,
        0.2
      );
      borderPosition.current.x = lerp(
        borderPosition.current.x,
        mousePosition.current.x,
        0.1
      );
      borderPosition.current.y = lerp(
        borderPosition.current.y,
        mousePosition.current.y,
        0.1
      );

      if (hasMoved.current) {
        setRenderPosition({
          dot: { ...dotPosition.current },
          border: { ...borderPosition.current }
        });
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      document.documentElement.classList.remove('cursor-follower-enabled');
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', hideCursor);
      document.documentElement.removeEventListener('mouseenter', showCursor);
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      className={`cursor-follower${isVisible ? ' is-visible' : ''}`}
      aria-hidden="true"
    >
      <span
        className="cursor-follower__dot"
        style={{
          left: `${renderPosition.dot.x}px`,
          top: `${renderPosition.dot.y}px`
        }}
      />
      <span
        className={`cursor-follower__ring${isHovering ? ' is-hovering' : ''}`}
        style={{
          left: `${renderPosition.border.x}px`,
          top: `${renderPosition.border.y}px`
        }}
      />
    </div>
  );
}
