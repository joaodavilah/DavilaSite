import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import './ImpactStatement.css';

const rotatingWords = ['estratégica', 'eficiente', 'digital', 'inteligente'];

export default function ImpactStatement() {
  const [wordIndex, setWordIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const currentWord = rotatingWords[wordIndex];

  useEffect(() => {
    if (shouldReduceMotion) {
      setWordIndex(0);
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setWordIndex(currentIndex => (currentIndex + 1) % rotatingWords.length);
    }, 2800);

    return () => window.clearInterval(intervalId);
  }, [shouldReduceMotion]);

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
          aria-label="Transforme sua empresa. Torne-a mais estratégica."
        >
          <motion.span
            className="impact-statement-line"
            aria-hidden="true"
            initial={{ opacity: 0.45, y: 36, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
          >
            Transforme sua empresa.
          </motion.span>
          <motion.span
            className="impact-statement-line impact-statement-highlight"
            aria-hidden="true"
            initial={{ opacity: 0.45, y: 36, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.78, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="impact-statement-line-content">
              <span>Torne-a mais</span>
              <span className="impact-rotating-word">
                <span className="impact-rotating-word-measure">inteligente.</span>
                <AnimatePresence initial={false}>
                  <motion.span
                    key={currentWord}
                    className="impact-rotating-word-value"
                    initial={shouldReduceMotion ? false : { opacity: 0, y: '45%' }}
                    animate={{ opacity: 1, y: '0%' }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, y: '-45%' }}
                    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {currentWord}.
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>
          </motion.span>
        </div>
      </div>
    </section>
  );
}
