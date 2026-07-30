import { useState } from 'react';
import SplitText from './SplitText';

const links = [
  ['Início', '#topo'],
  ['Sobre', '#sobre'],
  ['Serviços', '#servicos'],
  ['Contato', '#contato']
];

const navSplitProps = {
  tag: 'span',
  splitType: 'chars',
  delay: 18,
  duration: 0.5,
  ease: 'power3.out',
  threshold: 0,
  rootMargin: '0px',
  textAlign: 'center',
  from: { opacity: 0, y: 10 },
  to: { opacity: 1, y: 0 }
};

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header" id="topo">
      <div className="header-inner">
        <a href="#topo" className="logo" aria-label="DAVILA — página inicial" onClick={closeMenu}>
          <img src="/assets/images/Vector.png" alt="" className="logo-vector" />
        </a>

        <nav className="main-nav" aria-label="Navegação principal">
          <ul className="nav-list">
            {links.map(([label, href]) => (
              <li key={href}>
                <a href={href} className="nav-link">
                  <SplitText text={label} className="nav-split-text" {...navSplitProps} />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className={`menu-toggle${menuOpen ? ' is-open' : ''}`}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen(open => !open)}
        >
          <span className="menu-toggle-bar" />
          <span className="menu-toggle-bar" />
        </button>

        <div id="mobile-navigation" className={`mobile-nav${menuOpen ? ' is-open' : ''}`}>
          <ul className="mobile-nav-list">
            {links.map(([label, href]) => (
              <li key={href}>
                <a href={href} className="mobile-nav-link" onClick={closeMenu}>
                  <SplitText
                    text={label}
                    tag="span"
                    className="mobile-nav-split-text"
                    splitType="chars"
                    delay={22}
                    duration={0.5}
                    threshold={0}
                    rootMargin="0px"
                    textAlign="left"
                    from={{ opacity: 0, y: 14 }}
                    to={{ opacity: 1, y: 0 }}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
