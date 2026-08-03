import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SpecularButton from './SpecularButton';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const pillars = ['Estratégia', 'Design', 'Tecnologia', 'Dados'];

export default function PillarsMarquee() {
  const stageRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(
    () => {
      const stage = stageRef.current;
      const track = trackRef.current;
      if (!stage || !track) return undefined;

      const media = gsap.matchMedia();

      media.add(
        {
          desktop: '(min-width: 721px)',
          mobile: '(max-width: 720px)',
          fullMotion: '(prefers-reduced-motion: no-preference)',
          reducedMotion: '(prefers-reduced-motion: reduce)'
        },
        context => {
          const { desktop, reducedMotion } = context.conditions;
          const cards = gsap.utils.toArray('.pillar-marquee-item');
          const titles = gsap.utils.toArray('.pillar-name');

          if (reducedMotion) {
            gsap.set([track, cards, titles], { clearProps: 'all' });
            return undefined;
          }

          const leadingSpace = () =>
            desktop ? Math.min(stage.clientWidth * 0.1, 144) : 20;
          const travel = () =>
            Math.max(
              0,
              track.scrollWidth - stage.clientWidth + leadingSpace() * 2
            );

          gsap.set(track, { x: leadingSpace });

          const timeline = gsap.timeline({
            defaults: { force3D: true },
            scrollTrigger: {
              trigger: stage,
              start: desktop ? 'top 22%' : 'top 18%',
              end: () =>
                `+=${Math.max(travel(), desktop ? stage.clientWidth * 0.72 : stage.clientWidth * 1.9)}`,
              pin: true,
              pinSpacing: true,
              scrub: desktop ? 0.8 : 0.55,
              anticipatePin: 1,
              invalidateOnRefresh: true
            }
          });

          timeline
            .fromTo(
              cards,
              {
                autoAlpha: 0,
                y: desktop ? 64 : 38,
                rotateY: desktop ? -12 : -6,
                rotateZ: desktop ? -1.5 : -0.7,
                z: desktop ? -120 : -60,
                scale: 0.94,
                clipPath: 'inset(0 0 100% 0 round 14px)'
              },
              {
                autoAlpha: 1,
                y: 0,
                rotateY: 0,
                rotateZ: 0,
                z: 0,
                scale: 1,
                clipPath: 'inset(0 0 0% 0 round 14px)',
                duration: 0.22,
                stagger: 0.045,
                ease: 'power3.out'
              },
              0
            )
            .fromTo(
              titles,
              { yPercent: 130, rotateX: -18 },
              {
                yPercent: 0,
                rotateX: 0,
                duration: 0.18,
                stagger: 0.045,
                ease: 'power3.out'
              },
              0.035
            )
            .to(
              track,
              {
                x: () => -travel(),
                duration: 0.78,
                ease: 'none'
              },
              0.22
            );

          return () => timeline.kill();
        }
      );

      return () => media.revert();
    },
    { scope: stageRef }
  );

  return (
    <div ref={stageRef} className="pillars-marquee" aria-label="Pilares da Davila">
      <div ref={trackRef} className="pillars-marquee-track" role="list">
        {pillars.map(name => (
          <div className="pillar-marquee-item" role="listitem" key={name}>
            <SpecularButton
              as="div"
              size="sm"
              radius={14}
              tint="#ffffff"
              tintOpacity={0}
              blur={0}
              textColor="#f5f5f5"
              lineColor="#98a1da"
              baseColor="#525252"
              intensity={1}
              shineSize={10}
              shineFade={40}
              thickness={1}
              speed={0.35}
              followMouse
              proximity={250}
              autoAnimate={false}
              className="pillar-card"
            >
              <span className="pillar-name-mask">
                <span className="pillar-name">{name}</span>
              </span>
            </SpecularButton>
          </div>
        ))}
      </div>
      <p className="pillars-marquee-hint" aria-hidden="true">
        Continue rolando
      </p>
    </div>
  );
}
