import { useState, useEffect, useRef } from 'react';
import './CursorFollower.css';

export default function CursorFollower() {
  const mousePosition = useRef({ x: 0, y: 0 });

  const borderDotPosition = useRef({ x: 0, y: 0 });

  const [renderPos, setRenderPos] = useState({
    border: { x: 0, y: 0 }
  });
  const [isHovering, setIsHovering] = useState(false);

  const BORDER_DOT_SMOOTHNESS = 0.1;

  useEffect(() => {
    const handleMouseMove = e => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

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

      setRenderPos({
        border: {
          x: borderDotPosition.current.x,
          y: borderDotPosition.current.y
        }
      });

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
      <div
        className={`cursor-follower__ring${isHovering ? ' is-hovering' : ''}`}
        style={{
          left: `${renderPos.border.x}px`,
          top: `${renderPos.border.y}px`
        }}
      />
    </div>
  );
}
