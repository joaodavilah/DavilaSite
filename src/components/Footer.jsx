import SplitText from './SplitText';

const footerSplit = {
  tag: 'span',
  splitType: 'words',
  delay: 18,
  duration: 0.5,
  threshold: 0.08,
  rootMargin: '-20px',
  from: { opacity: 0, y: 12 },
  to: { opacity: 1, y: 0 }
};

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <a href="#topo" className="footer-logo" aria-label="DAVILA — voltar ao início">
            <img src="/assets/images/Vector.png" alt="" className="footer-logo-vector" />
          </a>
          <SplitText text="Soluções digitais, desenvolvimento e dados." tag="p" className="footer-tagline" splitType="words" delay={16} duration={0.5} threshold={0.08} rootMargin="-20px" textAlign="left" from={{ opacity: 0, y: 12 }} to={{ opacity: 1, y: 0 }} />
        </div>

        <nav className="footer-nav" aria-label="Links rápidos">
          {['Início', 'Sobre', 'Serviços', 'Contato'].map((label, index) => (
            <a key={label} href={['#topo', '#sobre', '#servicos', '#contato'][index]} className="footer-link">
              <SplitText text={label} className="footer-link-split" textAlign="left" {...footerSplit} />
            </a>
          ))}
        </nav>

        <div className="footer-meta">
          <a href="mailto:guidavilah@outlook.com" className="footer-link">
            <SplitText text="guidavilah@outlook.com" className="footer-link-split" textAlign="left" {...footerSplit} />
          </a>
          <a href="tel:+5547999559197" className="footer-link">
            <SplitText text="(47) 99955-9197" className="footer-link-split" textAlign="left" {...footerSplit} />
          </a>
        </div>
      </div>

      <div className="container footer-bottom">
        <SplitText text="© 2026 Davila. Todos os direitos reservados." tag="p" className="footer-copyright" splitType="words" delay={12} duration={0.45} threshold={0.05} rootMargin="-10px" textAlign="left" from={{ opacity: 0, y: 10 }} to={{ opacity: 1, y: 0 }} />
      </div>
    </footer>
  );
}
