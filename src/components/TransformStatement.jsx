import { useEffect, useState } from 'react';
import GradientText from './GradientText';
import SplitText from './SplitText';
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
          text="Transforme sua empresa"
          tag="p"
          className="transform-statement__lead"
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
          <GradientText
            colors={['#214d6d', '#67d5cf', '#2e7fa7']}
            animationSpeed={4}
            direction="horizontal"
            showBorder={false}
            className="transform-statement__gradient"
          >
            <SplitText
              key={currentWord}
              text={currentWord}
              tag="span"
              className="transform-statement__split-word"
              splitType="chars"
              delay={55}
              duration={0.72}
              ease="power3.out"
              threshold={0.1}
              rootMargin="0px"
              textAlign="center"
              from={{ opacity: 0, y: 44 }}
              to={{ opacity: 1, y: 0 }}
            />
          </GradientText>
        </div>
      </div>
    </section>
  );
}
