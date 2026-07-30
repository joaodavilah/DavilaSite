import { motion } from 'motion/react';
import './ImpactStatement.css';

export default function ImpactStatement() {
  return (
    <section
      className="impact-statement"
      id="impacto"
      data-section="impact"
      aria-labelledby="impact-statement-title"
    >
      <div className="container impact-statement-inner">
        <div
          id="impact-statement-title"
          className="impact-statement-title"
          role="heading"
          aria-level="2"
        >
          <motion.span
            className="impact-statement-line"
            initial={{ opacity: 0.45, y: 36, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
          >
            Transforme sua empresa.
          </motion.span>
          <motion.span
            className="impact-statement-line impact-statement-highlight"
            initial={{ opacity: 0.45, y: 36, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.78, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Eleve seus resultados.
          </motion.span>
        </div>
      </div>
    </section>
  );
}
