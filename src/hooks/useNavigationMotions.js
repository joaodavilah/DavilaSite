import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const REVEAL_EASE = 'power3.out';
const REVEAL_ACTIONS = 'play none none reverse';

export default function useNavigationMotions() {
  useLayoutEffect(() => {
    const media = gsap.matchMedia();

    media.add(
      {
        fullMotion: '(prefers-reduced-motion: no-preference)',
        reducedMotion: '(prefers-reduced-motion: reduce)'
      },
      context => {
        const { fullMotion } = context.conditions;
        const animatedElements = gsap.utils.toArray(
          [
            '.pillars .pillar-card',
            '.service-detail',
            '.contact-card',
            '.contact-cta-panel',
            '.footer-inner',
            '.footer-bottom'
          ].join(', ')
        );

        if (!fullMotion) {
          gsap.set(animatedElements, {
            clearProps: 'opacity,transform,filter,visibility,willChange'
          });
          return undefined;
        }

        const animationContext = gsap.context(() => {
          const createReveal = ({
            targets,
            trigger,
            start = 'top 88%',
            y = 28,
            scale = 0.985,
            blur = 5,
            duration = 0.72,
            stagger = 0
          }) => {
            const elements = gsap.utils.toArray(targets);
            if (!elements.length || !document.querySelector(trigger)) return;

            gsap.fromTo(
              elements,
              {
                autoAlpha: 0,
                y,
                scale,
                filter: `blur(${blur}px)`,
                willChange: 'transform, opacity, filter'
              },
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                filter: 'blur(0px)',
                duration,
                ease: REVEAL_EASE,
                stagger,
                scrollTrigger: {
                  trigger,
                  start,
                  toggleActions: REVEAL_ACTIONS,
                  fastScrollEnd: true,
                  invalidateOnRefresh: true
                }
              }
            );
          };

          const createOpacityReveal = ({
            targets,
            trigger,
            start = 'top 88%',
            blur = 4,
            duration = 0.62,
            stagger = 0.1
          }) => {
            const elements = gsap.utils.toArray(targets);
            if (!elements.length || !document.querySelector(trigger)) return;

            gsap.fromTo(
              elements,
              {
                autoAlpha: 0,
                filter: `blur(${blur}px)`,
                willChange: 'opacity, filter'
              },
              {
                autoAlpha: 1,
                filter: 'blur(0px)',
                duration,
                ease: REVEAL_EASE,
                stagger,
                scrollTrigger: {
                  trigger,
                  start,
                  toggleActions: REVEAL_ACTIONS,
                  fastScrollEnd: true,
                  invalidateOnRefresh: true
                }
              }
            );
          };

          createOpacityReveal({
            targets: '.pillars .pillar-card',
            trigger: '.pillars',
            start: 'top 90%',
            stagger: 0.09
          });

          createReveal({
            targets: '.service-detail',
            trigger: '.services-explorer',
            start: 'top 84%',
            y: 26,
            scale: 0.99
          });

          createOpacityReveal({
            targets: '.contact-card',
            trigger: '.contact-shell',
            start: 'top 86%',
            stagger: 0.1
          });

          createReveal({
            targets: '.contact-cta-panel',
            trigger: '.contact-shell',
            start: 'top 86%',
            y: 28,
            scale: 0.99,
            duration: 0.76
          });

          createReveal({
            targets: '.footer-inner, .footer-bottom',
            trigger: '.site-footer',
            start: 'top 92%',
            y: 20,
            scale: 1,
            blur: 3,
            duration: 0.64,
            stagger: 0.08
          });
        });

        return () => animationContext.revert();
      }
    );

    return () => media.revert();
  }, []);
}
