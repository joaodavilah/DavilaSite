import SpecularButton from './SpecularButton';
import SplitText from './SplitText';
import GradientText from './GradientText';

const pillars = ['Estratégia', 'Design', 'Tecnologia', 'Dados'];

export default function About() {
  return (
    <section className="about" id="sobre" data-section="about">
      <div className="container about-grid">
        <div className="about-head">
          <div className="section-title about-title" role="heading" aria-level="2">
            <SplitText
              text="Ajudamos empresas a alcançar"
              tag="span"
              className="about-title-line"
              splitType="words"
              delay={45}
              duration={0.72}
              threshold={0.12}
              rootMargin="-40px"
              textAlign="left"
              from={{ opacity: 0, y: 34 }}
              to={{ opacity: 1, y: 0 }}
            />

            <GradientText
              colors={['#214d6d', '#51a7a3', '#2e7fa7']}
              animationSpeed={4}
              direction="horizontal"
              showBorder={false}
              className="about-gradient-highlight"
            >
              voos maiores
            </GradientText>

            <SplitText
              text="no mercado digital."
              tag="span"
              className="about-title-line"
              splitType="words"
              delay={45}
              duration={0.72}
              threshold={0.12}
              rootMargin="-40px"
              textAlign="left"
              from={{ opacity: 0, y: 34 }}
              to={{ opacity: 1, y: 0 }}
            />
          </div>
        </div>

        <div className="about-body">
          <SplitText
            text="Transformando ideias em soluções digitais modernas, funcionais e alinhadas às necessidades de cada negócio. Sites e sistemas que fortalecem a presença da empresa e aproximam ela dos seus clientes."
            tag="p"
            className="about-lead"
            splitType="words"
            delay={18}
            duration={0.65}
            threshold={0.12}
            rootMargin="-35px"
            textAlign="left"
            from={{ opacity: 0, y: 24 }}
            to={{ opacity: 1, y: 0 }}
          />

          <SplitText
            text="Acreditamos que a tecnologia deve gerar oportunidades, otimizar processos e apoiar o crescimento. E que dados, quando bem interpretados, transformam o dia a dia em decisões mais estratégicas."
            tag="p"
            className="about-text"
            splitType="words"
            delay={14}
            duration={0.62}
            threshold={0.12}
            rootMargin="-30px"
            textAlign="left"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
          />

          <SplitText
            text="Unimos estratégia, design, tecnologia e inteligência de dados para desenvolver soluções que realmente agreguem valor ao negócio."
            tag="p"
            className="about-text"
            splitType="words"
            delay={14}
            duration={0.62}
            threshold={0.12}
            rootMargin="-30px"
            textAlign="left"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
          />
        </div>

        <div className="pillars" aria-label="Pilares da Davila">
          {pillars.map(name => (
            <SpecularButton
              key={name}
              as="div"
              size="sm"
              radius={14}
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
              className="pillar-card"
            >
              <span className="pillar-name">{name}</span>
            </SpecularButton>
          ))}
        </div>
      </div>
    </section>
  );
}
