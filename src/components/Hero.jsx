import { motion, useReducedMotion } from 'motion/react';
import SoftAurora from './SoftAurora';
import SpecularButton from './SpecularButton';
import BlurText from './BlurText';

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const revealProps = delay => ({
    initial: {
      opacity: 0,
      y: shouldReduceMotion ? 8 : 22,
      filter: `blur(${shouldReduceMotion ? 1 : 4}px)`
    },
    whileInView: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)'
    },
    viewport: { once: false, amount: 0.4 },
    transition: {
      duration: shouldReduceMotion ? 0.26 : 0.62,
      delay: shouldReduceMotion ? Math.min(delay, 0.08) : delay,
      ease: [0.22, 1, 0.36, 1]
    }
  });

  const scrollToServices = () => {
    document.getElementById('servicos')?.scrollIntoView({
      behavior: shouldReduceMotion ? 'auto' : 'smooth'
    });
  };

  return (
    <section className="hero" id="hero" data-section="hero">
      <div className="hero-background" aria-hidden="true">
        <SoftAurora
          speed={0.6}
          scale={1.5}
          brightness={1.0}
          color1="#196a67"
          color2="#030930"
          noiseFrequency={2.5}
          noiseAmplitude={1.0}
          bandHeight={0.5}
          bandSpread={1.0}
          octaveDecay={0.1}
          layerOffset={0}
          colorSpeed={1.0}
          enableMouseInteraction
          mouseInfluence={0.25}
        />
      </div>

      <div className="hero-overlay" aria-hidden="true" />

      <div className="hero-inner">
        <div className="hero-content">
          <BlurText
            as="h1"
            text="Tecnologia para levar negócios mais longe."
            delay={140}
            animateBy="words"
            direction="top"
            stepDuration={0.35}
            className="hero-title hero-blur-title"
          />

          <motion.p
            className="hero-subtitle reveal-text"
            data-animate="fade-up"
            {...revealProps(0.7)}
          >
            Desenvolvemos websites, sistemas, aplicativos e soluções em dados —
            unindo estratégia, design e engenharia para empresas que querem evoluir.
          </motion.p>

          <motion.div
            className="hero-actions reveal-text"
            data-animate="fade-up"
            {...revealProps(0.92)}
          >
            <SpecularButton
              size="lg"
              radius={18}
              tint="#ffffff"
              tintOpacity={0}
              blur={0}
              textColor="#f5f5f5"
              lineColor="#98a1da"
              baseColor="#525252"
              intensity={1}
              shineSize={10}
              shineFade={40}
              thickness={1}
              speed={0.35}
              followMouse
              proximity={250}
              autoAnimate={false}
              onClick={scrollToServices}
              className="hero-specular-button"
            >
              Ver soluções
            </SpecularButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
