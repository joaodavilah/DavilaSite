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

      const media = gsap.matchMedia();

      media.add(
        {
          desktop: '(min-width: 721px)',
          reducedMotion: '(prefers-reduced-motion: reduce)'
        },
        context => {
          const { desktop, reducedMotion } = context.conditions;

          if (reducedMotion) {
            gsap.set(track, { clearProps: 'transform' });
            return undefined;
          }

          const horizontalTween = gsap.fromTo(
            track,
            {
              x: () => Math.min(window.innerWidth * 0.08, desktop ? 120 : 28)
            },
            {
              x: () =>
                -Math.max(0, track.scrollWidth - window.innerWidth),
              ease: 'none',
              force3D: true,
              scrollTrigger: {
                trigger: document.documentElement,
                start: 'top top',
                end: 'bottom bottom',
                scrub: desktop ? 0.32 : 0.22,
                fastScrollEnd: false,
                invalidateOnRefresh: true
              }
            }
          );

          const revealTween = gsap.fromTo(
            band,
            { clipPath: 'inset(0 100% 0 0)' },
            {
              clipPath: 'inset(0 0% 0 0)',
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: band,
                start: 'top 88%',
                toggleActions: 'play none none reverse'
              }
            }
          );

          return () => {
            horizontalTween.kill();
            revealTween.kill();
          };
        }
      );

      return () => media.revert();
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
