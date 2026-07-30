import { motion, useReducedMotion } from 'motion/react';
import GradientText from './GradientText';
import RotatingWord from './RotatingWord';
import './ImpactStatement.css';

const rotatingWords = [
  'estratégica',
  'moderna',
  'eficiente',
  'competitiva',
  'inteligente',
  'conectada',
  'relevante'
];

export default function ImpactStatement() {
  const shouldReduceMotion = useReducedMotion();
  const revealInitial = shouldReduceMotion
    ? { opacity: 0.78, y: 8, scale: 1 }
    : { opacity: 0.45, y: 36, scale: 0.98 };
  const revealDuration = shouldReduceMotion ? 0.28 : 0.78;

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
          aria-label="Transforme sua empresa. Torne-a mais, com uma palavra final alternada."
        >
          <motion.span
            className="impact-statement-line"
            aria-hidden="true"
            initial={revealInitial}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{
              duration: revealDuration,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            Transforme sua empresa.
          </motion.span>

          <motion.span
            className="impact-statement-line"
            aria-hidden="true"
            initial={revealInitial}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{
              duration: revealDuration,
              delay: shouldReduceMotion ? 0.04 : 0.1,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            <span className="impact-statement-line-content">
              <GradientText
                colors={['#214d6d', '#67d5cf', '#2e7fa7']}
                animationSpeed={4}
                direction="horizontal"
                showBorder={false}
                className="impact-statement-gradient-fragment"
              >
                <span>Torne-a mais</span>
              </GradientText>

              <RotatingWord
                words={rotatingWords}
                interval={5000}
                suffix="."
                renderWord={word => (
                  <GradientText
                    colors={['#214d6d', '#67d5cf', '#2e7fa7']}
                    animationSpeed={4}
                    direction="horizontal"
                    showBorder={false}
                    className="impact-statement-gradient-fragment"
                  >
                    {word}
                  </GradientText>
                )}
              />
            </span>
          </motion.span>
        </div>
      </div>
    </section>
  );
}
