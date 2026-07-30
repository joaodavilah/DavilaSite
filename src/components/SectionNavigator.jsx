import { useEffect, useState } from 'react';
import './SectionNavigator.css';

const sections = [
  { id: 'hero', label: 'Início' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'contato-intro', label: 'Vamos conversar' },
  { id: 'contato', label: 'Contato' }
];

export default function SectionNavigator() {
  const [activeSection, setActiveSection] = useState('hero');

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

  const navigateTo = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className="section-navigator" aria-label="Navegação entre seções">
      <span className="section-navigator__line" aria-hidden="true" />
      {sections.map(({ id, label }) => {
        const isActive = activeSection === id;

        return (
          <button
            key={id}
            type="button"
            className={`section-navigator__item${isActive ? ' is-active' : ''}`}
            aria-label={`Ir para ${label}`}
            aria-current={isActive ? 'true' : undefined}
            onClick={() => navigateTo(id)}
          >
            <span className="section-navigator__label">{label}</span>
            <span className="section-navigator__dot" aria-hidden="true" />
          </button>
        );
      })}
    </nav>
  );
}
