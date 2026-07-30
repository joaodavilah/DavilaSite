import ScrollFloat from './ScrollFloat';
import './ContactIntro.css';

export default function ContactIntro() {
  return (
    <section
      className="contact-intro"
      id="contato-intro"
      data-section="contact-intro"
      aria-label="Entre em contato"
    >
      <ScrollFloat
        animationDuration={1}
        ease="back.inOut(2)"
        scrollStart="top 85%"
        scrollEnd="bottom 45%"
        stagger={0.03}
        containerClassName="contact-intro-text"
        textClassName="contact-intro-text-inner"
      >
        Entre em contato
      </ScrollFloat>
    </section>
  );
}
