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
        <h2 id="impact-statement-title" className="impact-statement-title">
          <span>Transforme sua empresa.</span>
          <span className="impact-statement-highlight">Eleve seus resultados.</span>
        </h2>
      </div>
    </section>
  );
}
