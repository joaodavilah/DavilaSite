import SoftAurora from './SoftAurora';
import SpecularButton from './SpecularButton';
import BlurText from './BlurText';

export default function Hero() {
  const scrollToServices = () => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    document.getElementById('servicos')?.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth'
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
          enableMouseInteraction={false}
          mouseInfluence={0}
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

          <p className="hero-subtitle reveal-text" data-animate="fade-up">
            Desenvolvemos websites, sistemas, aplicativos e soluções em dados —
            unindo estratégia, design e engenharia para empresas que querem evoluir.
          </p>

          <div className="hero-actions reveal-text" data-animate="fade-up">
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
          </div>
        </div>
      </div>
    </section>
  );
}
