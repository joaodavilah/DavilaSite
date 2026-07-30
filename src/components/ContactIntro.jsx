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
        scrollStart="top 88%"
        scrollEnd="center 52%"
        stagger={0}
        containerClassName="contact-intro-float"
        textClassName="contact-intro-text"
      >
        Entre em contato
      </ScrollFloat>
    </section>
  );
}
