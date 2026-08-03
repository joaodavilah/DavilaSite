import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const pillars = ['Estratégia', 'Design', 'Tecnologia', 'Dados'];
const repeatedPillars = Array.from({ length: 4 }, (_, groupIndex) => ({
  groupIndex,
  items: pillars
}));

export default function PillarsMarquee() {
  const bandRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(
    () => {
      const band = bandRef.current;
      const track = trackRef.current;
      if (!band || !track) return undefined;

      const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      const travel = () =>
        Math.min(
          Math.max(0, track.scrollWidth - window.innerWidth),
          window.innerWidth * (reducedMotion ? 0.85 : 1.8)
        );

      const horizontalTween = gsap.fromTo(
        track,
        { x: () => window.innerWidth * 0.28 },
        {
          x: () => -travel(),
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: band,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true
          }
        }
      );

      const revealTween = gsap.fromTo(
        band,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: reducedMotion ? 0.25 : 0.72,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: band,
            start: 'top 92%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      return () => {
        horizontalTween.kill();
        revealTween.kill();
      };
    },
    { scope: bandRef }
  );

  return (
    <div ref={bandRef} className="pillars-band" aria-label="Pilares da Davila">
      <div ref={trackRef} className="pillars-band-track">
        {repeatedPillars.map(({ groupIndex, items }) => (
          <div
            className="pillars-band-group"
            aria-hidden={groupIndex === 0 ? undefined : 'true'}
            key={groupIndex}
          >
            {items.map(name => (
              <span className="pillars-band-item" key={`${groupIndex}-${name}`}>
                {name}
                <span className="pillars-band-separator" aria-hidden="true">
                  •
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
