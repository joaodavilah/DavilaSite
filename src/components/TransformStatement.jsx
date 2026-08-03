import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import SplitText from './SplitText';
import TechCarousel from './TechCarousel';
import './TransformStatement.css';

const rotatingWords = [
  'Tecnologia',
  'Inteligência',
  'Dados',
  'Visibilidade',
  'Modernidade'
];

export default function TransformStatement() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setWordIndex(currentIndex => (currentIndex + 1) % rotatingWords.length);
    }, 3200);

    return () => window.clearInterval(intervalId);
  }, []);

  const currentWord = rotatingWords[wordIndex];

  return (
    <section
      className="transform-statement"
      id="transformacao"
      data-section="transform"
      aria-labelledby="transform-statement-title"
    >
      <div className="container transform-statement__inner">
        <h2 id="transform-statement-title" className="sr-only">
          Transforme sua empresa com tecnologia, inteligência, dados,
          visibilidade e modernidade.
        </h2>

        <SplitText
          text="Transforme sua empresa com"
          tag="p"
          className="transform-statement__lead"
          reveal="editorial"
          splitType="words"
          delay={70}
          duration={0.8}
          ease="power3.out"
          threshold={0.15}
          rootMargin="-80px"
          textAlign="center"
          from={{ opacity: 0, y: 42 }}
          to={{ opacity: 1, y: 0 }}
        />

        <div className="transform-statement__word" aria-hidden="true">
          <div className="transform-statement__gradient">
            <AnimatePresence mode="wait" initial>
              <motion.span
                key={currentWord}
                className="transform-statement__split-word"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.055
                    }
                  },
                  exit: {
                    transition: {
                      staggerChildren: 0.025,
                      staggerDirection: -1
                    }
                  }
                }}
              >
                {Array.from(currentWord).map((character, index) => (
                  <motion.span
                    className="transform-statement__char"
                    key={`${character}-${index}`}
                    variants={{
                      hidden: { opacity: 0, y: 44 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.72,
                          ease: [0.22, 1, 0.36, 1]
                        }
                      },
                      exit: {
                        opacity: 0,
                        y: -24,
                        transition: {
                          duration: 0.28,
                          ease: [0.4, 0, 1, 1]
                        }
                      }
                    }}
                  >
                    {character}
                  </motion.span>
                ))}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        <TechCarousel />
      </div>
    </section>
  );
}
