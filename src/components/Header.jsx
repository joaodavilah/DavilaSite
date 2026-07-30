import { useState } from 'react';
import { motion } from 'motion/react';
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
        <motion.a
          href="#topo"
          className="logo"
          aria-label="DAVILA — página inicial"
          onClick={closeMenu}
          initial={{ scale: 0.82, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ rotate: 8, scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <img src="/assets/images/Vector.png" alt="" className="logo-vector" />
        </motion.a>

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

        <motion.a
          href="#contato"
          className="header-cta"
          onClick={closeMenu}
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          Fale conosco
        </motion.a>

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

          <a href="#contato" className="mobile-nav-cta" onClick={closeMenu}>
            Fale conosco
          </a>
        </div>
      </div>
    </header>
  );
}
