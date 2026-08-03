import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const REVEAL_EASE = 'power3.out';
const REVEAL_ACTIONS = 'play none none reverse';

export default function useNavigationMotions() {
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    let disposed = false;

    media.add(
      {
        fullMotion: '(prefers-reduced-motion: no-preference)',
        reducedMotion: '(prefers-reduced-motion: reduce)'
      },
      context => {
        const reducedMotion = Boolean(context.conditions.reducedMotion);

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
            const revealY = reducedMotion
              ? Math.sign(y) * Math.min(Math.abs(y), 8)
              : y;
            const revealScale = reducedMotion ? 1 : scale;
            const revealBlur = reducedMotion ? Math.min(blur, 1) : blur;

            gsap.fromTo(
              elements,
              {
                autoAlpha: 0,
                y: revealY,
                scale: revealScale,
                filter: `blur(${revealBlur}px)`,
                willChange: 'transform, opacity, filter'
              },
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                filter: 'blur(0px)',
                duration: reducedMotion ? Math.min(duration, 0.3) : duration,
                ease: REVEAL_EASE,
                stagger: reducedMotion ? Math.min(stagger, 0.04) : stagger,
                scrollTrigger: {
                  trigger,
                  start,
                  toggleActions: REVEAL_ACTIONS,
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
            const revealBlur = reducedMotion ? Math.min(blur, 1) : blur;

            gsap.fromTo(
              elements,
              {
                autoAlpha: 0,
                filter: `blur(${revealBlur}px)`,
                willChange: 'opacity, filter'
              },
              {
                autoAlpha: 1,
                filter: 'blur(0px)',
                duration: reducedMotion ? Math.min(duration, 0.28) : duration,
                ease: REVEAL_EASE,
                stagger: reducedMotion ? Math.min(stagger, 0.04) : stagger,
                scrollTrigger: {
                  trigger,
                  start,
                  toggleActions: REVEAL_ACTIONS,
                  invalidateOnRefresh: true
                }
              }
            );
          };

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

    document.fonts?.ready.then(() => {
      if (!disposed) ScrollTrigger.refresh();
    });

    return () => {
      disposed = true;
      media.revert();
    };
  }, []);
}
