import StarBorder from './StarBorder';
import SplitText from './SplitText';

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

            <SplitText
              text="voos maiores"
              tag="span"
              className="about-gradient-split"
              splitType="chars"
              delay={38}
              duration={0.7}
              threshold={0.12}
              rootMargin="-40px"
              textAlign="left"
              from={{ opacity: 0, y: 28 }}
              to={{ opacity: 1, y: 0 }}
            />

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
            text="Transformamos ideias em soluções digitais modernas, funcionais e alinhadas às necessidades de cada negócio — sites e sistemas que fortalecem a presença da empresa e aproximam ela dos seus clientes."
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
          {pillars.map((name, index) => (
            <StarBorder
              key={name}
              as="div"
              className="pillar-card"
              color="#4f8db8"
              speed={`${4.4 + index * 0.35}s`}
              thickness={1}
            >
              <SplitText
                text={name}
                tag="span"
                className="pillar-name pillar-shiny-split"
                splitType="chars"
                delay={28}
                duration={0.55}
                threshold={0.1}
                rootMargin="-30px"
                textAlign="center"
                from={{ opacity: 0, y: 12 }}
                to={{ opacity: 1, y: 0 }}
              />
            </StarBorder>
          ))}
        </div>
      </div>
    </section>
  );
}
