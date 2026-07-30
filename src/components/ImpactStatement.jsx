import ScrollFloat from './ScrollFloat';
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
          <ScrollFloat
            as="span"
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="top 85%"
            scrollEnd="bottom 45%"
            stagger={0.03}
            containerClassName="impact-statement-line"
            textClassName="impact-statement-line-text"
          >
            Transforme sua empresa.
          </ScrollFloat>
          <ScrollFloat
            as="span"
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="top 85%"
            scrollEnd="bottom 45%"
            stagger={0.03}
            containerClassName="impact-statement-line impact-statement-highlight"
            textClassName="impact-statement-line-text"
          >
            Eleve seus resultados.
          </ScrollFloat>
        </div>
      </div>
    </section>
  );
}
