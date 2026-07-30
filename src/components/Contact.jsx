import { useState } from 'react';
import SplitText from './SplitText';

const phoneDisplay = '(47) 99955-9197';
const phoneHref = '+5547999559197';
const email = 'guidavilah@outlook.com';
const whatsappUrl = 'https://wa.me/5547999559197';

const IconPhone = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6.6 2.8 9.1 7a1.7 1.7 0 0 1-.2 1.9l-1.4 1.6a15.2 15.2 0 0 0 6 6l1.6-1.4a1.7 1.7 0 0 1 1.9-.2l4.2 2.5a1.7 1.7 0 0 1 .8 1.8l-.4 2a2.4 2.4 0 0 1-2.4 1.9C9.2 23.1.9 14.8.9 4.8a2.4 2.4 0 0 1 1.9-2.4l2-.4a1.7 1.7 0 0 1 1.8.8Z" />
  </svg>
);

const IconMail = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M3 5.5h18a1.5 1.5 0 0 1 1.5 1.5v10A1.5 1.5 0 0 1 21 18.5H3A1.5 1.5 0 0 1 1.5 17V7A1.5 1.5 0 0 1 3 5.5Zm0 1.8 9 6.1 9-6.1" />
  </svg>
);

const IconCopy = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="8" y="8" width="10" height="10" rx="2" />
    <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
  </svg>
);

const IconWhatsapp = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.6 3.4A11.8 11.8 0 0 0 2.1 17.6L.5 23.5l6-1.6A11.8 11.8 0 0 0 20.6 3.4Z" />
    <path d="M8.1 6.8c.3-.7.6-.7 1-.7h.8c.2 0 .5.1.6.5l1.1 2.7c.1.4.1.6-.1.9l-.8 1c-.2.2-.3.4-.1.7.8 1.5 1.9 2.7 3.4 3.5.3.2.5.2.7-.1l1-1.2c.2-.3.5-.3.8-.2l2.6 1.2c.4.2.6.3.6.6 0 .3-.2 1.7-1.1 2.4-.9.8-2 1.1-3.3.8-1.2-.3-2.8-.9-4.8-2.6-2.4-2-4-4.4-4.5-5.6-.5-1.2-.1-2.9.5-3.9Z" />
  </svg>
);

export default function Contact() {
  const [copied, setCopied] = useState('');

  const copyValue = async (value, key) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      window.setTimeout(() => setCopied(''), 1600);
    } catch {
      setCopied('');
    }
  };

  return (
    <section className="contact" id="contato" data-section="contact">
      <div className="container">
        <div className="contact-shell">
          <div className="contact-list">
            <article className="contact-card">
              <div className="contact-icon"><IconPhone /></div>
              <div className="contact-card-copy">
                <SplitText text="Telefone / WhatsApp" tag="span" className="contact-card-label" splitType="chars" delay={20} duration={0.5} threshold={0.1} rootMargin="-30px" textAlign="left" from={{ opacity: 0, y: 10 }} to={{ opacity: 1, y: 0 }} />
                <a href={`tel:${phoneHref}`} className="contact-card-value">
                  <SplitText text={phoneDisplay} tag="span" className="contact-value-split" splitType="chars" delay={18} duration={0.52} threshold={0.1} rootMargin="-30px" textAlign="left" from={{ opacity: 0, y: 12 }} to={{ opacity: 1, y: 0 }} />
                </a>
                <SplitText text="Clique no ícone para copiar" tag="span" className="contact-card-hint" splitType="words" delay={14} duration={0.45} threshold={0.1} rootMargin="-30px" textAlign="left" from={{ opacity: 0, y: 8 }} to={{ opacity: 1, y: 0 }} />
              </div>
              <button className={`contact-copy-btn${copied === 'phone' ? ' is-copied' : ''}`} type="button" onClick={() => copyValue(phoneDisplay, 'phone')} aria-label="Copiar telefone">
                <IconCopy />
              </button>
            </article>

            <article className="contact-card">
              <div className="contact-icon"><IconMail /></div>
              <div className="contact-card-copy">
                <SplitText text="E-mail" tag="span" className="contact-card-label" splitType="chars" delay={20} duration={0.5} threshold={0.1} rootMargin="-30px" textAlign="left" from={{ opacity: 0, y: 10 }} to={{ opacity: 1, y: 0 }} />
                <a href={`mailto:${email}`} className="contact-card-value">
                  <SplitText text={email} tag="span" className="contact-value-split" splitType="chars" delay={12} duration={0.5} threshold={0.1} rootMargin="-30px" textAlign="left" from={{ opacity: 0, y: 12 }} to={{ opacity: 1, y: 0 }} />
                </a>
                <SplitText text="Clique no ícone para copiar" tag="span" className="contact-card-hint" splitType="words" delay={14} duration={0.45} threshold={0.1} rootMargin="-30px" textAlign="left" from={{ opacity: 0, y: 8 }} to={{ opacity: 1, y: 0 }} />
              </div>
              <button className={`contact-copy-btn${copied === 'email' ? ' is-copied' : ''}`} type="button" onClick={() => copyValue(email, 'email')} aria-label="Copiar e-mail">
                <IconCopy />
              </button>
            </article>
          </div>

          <aside className="contact-cta-panel">
            <div className="contact-whatsapp-icon"><IconWhatsapp /></div>
            <SplitText text="Atendimento direto" tag="span" className="contact-cta-eyebrow" splitType="chars" delay={22} duration={0.5} threshold={0.1} rootMargin="-30px" textAlign="left" from={{ opacity: 0, y: 10 }} to={{ opacity: 1, y: 0 }} />
            <SplitText text="Vamos conversar sobre o seu próximo projeto?" tag="h2" className="contact-cta-title" splitType="words" delay={42} duration={0.7} threshold={0.1} rootMargin="-30px" textAlign="left" from={{ opacity: 0, y: 28 }} to={{ opacity: 1, y: 0 }} />
            <SplitText text="Conte o que sua empresa precisa. Vamos entender o cenário e avaliar a melhor solução em desenvolvimento ou dados." tag="p" className="contact-cta-text" splitType="words" delay={14} duration={0.55} threshold={0.1} rootMargin="-30px" textAlign="left" from={{ opacity: 0, y: 16 }} to={{ opacity: 1, y: 0 }} />
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="contact-whatsapp-btn">
              <SplitText text="Conversar pelo WhatsApp" tag="span" className="contact-whatsapp-btn-text" splitType="words" delay={22} duration={0.5} threshold={0.1} rootMargin="-20px" textAlign="center" from={{ opacity: 0, y: 10 }} to={{ opacity: 1, y: 0 }} />
              <span className="contact-whatsapp-arrow" aria-hidden="true">→</span>
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
