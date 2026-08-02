import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import './SectionNavigator.css';

const sections = [
  { id: 'hero', label: 'Início' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'contato', label: 'Contato' }
];

export default function SectionNavigator() {
  const [activeSection, setActiveSection] = useState('hero');
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let animationFrame;

    const updateActiveSection = () => {
      const marker = window.innerHeight * 0.44;
      let currentSection = sections[0].id;

      sections.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= marker) {
          currentSection = id;
        }
      });

      setActiveSection(currentSection);
      animationFrame = undefined;
    };

    const handleScroll = () => {
      if (animationFrame) return;
      animationFrame = requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  const navigateTo = (event, id) => {
    event.preventDefault();
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    document.getElementById(id)?.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: 'start'
    });
    window.history.pushState(null, '', `#${id}`);
  };

  return (
    <motion.nav
      className="section-navigator"
      aria-label="Navegação entre seções"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: shouldReduceMotion ? 0.16 : 0.38 }}
    >
      <span className="section-navigator__line" aria-hidden="true" />
      {sections.map(({ id, label }) => {
        const isActive = activeSection === id;

        return (
          <a
            key={id}
            href={`#${id}`}
            className={`section-navigator__item${isActive ? ' is-active' : ''}`}
            aria-label={`Ir para ${label}`}
            aria-current={isActive ? 'true' : undefined}
            onClick={event => navigateTo(event, id)}
          >
            <span className="section-navigator__label">{label}</span>
            <motion.span
              className="section-navigator__dot"
              aria-hidden="true"
              animate={
                isActive
                  ? {
                      scale: [
                        1,
                        shouldReduceMotion ? 1.1 : 1.32,
                        1
                      ]
                    }
                  : { scale: 1 }
              }
              transition={{
                duration: shouldReduceMotion ? 0.16 : 0.42,
                ease: [0.22, 1, 0.36, 1]
              }}
            />
          </a>
        );
      })}
    </motion.nav>
  );
}
