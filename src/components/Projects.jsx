import './Projects.css';

// Substitua estes exemplos pelos nomes, descrições e links dos seus projetos.
const projects = [
  {
    name: 'Lume Fotografia',
    category: 'Site institucional',
    description: 'Um espaço para transformar histórias em imagens e aproximar uma fotógrafa dos seus próximos clientes.',
    kind: 'photography',
    details: 'Conceito de um portfólio de fotografia com apresentação dos ensaios, informações sobre o trabalho e um caminho direto para agendar uma sessão.'
  },
  {
    name: 'Nexo Gestão',
    category: 'Painel de dados',
    description: 'Uma visão clara do negócio, com os números que importam reunidos em uma interface simples.',
    kind: 'dashboard',
    details: 'Conceito de um painel de gestão que organiza receitas, pedidos e evolução mensal. Os números da prévia são ilustrativos.'
  }
];

function ProjectPreview({ kind }) {
  return (
    <div className={`project-preview project-preview--${kind}`} aria-hidden="true">
      <div className="project-browser">
        <div className="project-browser-bar"><span /><span /><span /><i>{kind === 'photography' ? 'lume / fotografia' : 'nexo / visão geral'}</i></div>
        {kind === 'photography' ? (
          <div className="lume-preview">
            <div className="lume-nav"><b>lume.</b><span>Histórias que ficam.</span></div>
            <div className="lume-content"><span>FOTOGRAFIA & MEMÓRIA</span><strong>A beleza mora<br />no instante.</strong><small>Um olhar sensível para a sua história.</small><div className="lume-pill">Explore as histórias ↗</div></div>
            <div className="lume-art"><div className="lume-sun" /><div className="lume-hill lume-hill--back" /><div className="lume-hill" /><span>O essencial é sentir.</span></div>
            <div className="lume-bottom">RETRATOS · AFETO · CONEXÕES</div>
          </div>
        ) : (
          <div className="nexo-preview">
            <div className="nexo-sidebar"><b>n.</b><span className="is-selected">◫</span><span>▤</span><span>↗</span><span>⚙</span></div>
            <div className="nexo-main">
              <div className="nexo-heading"><div><small>SEU NEGÓCIO, EM FOCO</small><strong>Visão geral</strong></div><span>Este mês ↗</span></div>
              <div className="nexo-metrics"><div><small>Receita total</small><b>R$ 24.850</b><em>↗ 18,6%</em></div><div><small>Novos pedidos</small><b>148</b><em>↗ 12,4%</em></div></div>
              <div className="nexo-chart"><div><b>Evolução da receita</b><span>Últimos 6 meses</span></div><div className="nexo-bars">{[36, 52, 44, 68, 60, 88].map((height, index) => <div key={index}><i style={{ height: `${height}%` }} /><small>{['Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out'][index]}</small></div>)}</div></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section className="projects" id="projetos" aria-labelledby="projects-title">
      <div className="container">
        <div className="projects-heading">
          <h2 id="projects-title">Projetos selecionados<span>.</span></h2>
        </div>
        <div className="projects-list">
          {projects.map((project, index) => (
            <article className="project-card" key={project.name}>
              <ProjectPreview kind={project.kind} />
              <div className="project-copy">
                <div className="project-meta"><span>0{index + 1} / {project.category}</span><span className="project-example">Exemplo</span></div>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <details className="project-details"><summary>Conhecer o conceito <span aria-hidden="true">↗</span></summary><p>{project.details}</p></details>
              </div>
            </article>
          ))}
        </div>
        <a className="projects-contact" href="#contato">Sua ideia pode ser o próximo projeto. <span>Vamos conversar ↗</span></a>
      </div>
    </section>
  );
}
