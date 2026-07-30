import { motion } from 'motion/react';
import './ContactIntro.css';

export default function ContactIntro() {
  return (
    <section
      className="contact-intro"
      id="contato-intro"
      data-section="contact-intro"
      aria-label="Entre em contato"
    >
      <motion.h2
        className="contact-intro-text"
        initial={{ opacity: 0.45, y: 36, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.42 }}
        transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
      >
        Entre em contato
      </motion.h2>
    </section>
  );
}
