import './Projects.css';

// Projetos apresentados no portfólio.
const projects = [
  {
    name: 'João Vitor Video Maker',
    description: 'Um site para apresentar trabalhos audiovisuais, contar histórias e conectar novos clientes ao trabalho do profissional.',
    image: '/assets/images/joao-vitor-vm.png',
    imageAlt: 'Página inicial de João Vitor Video Maker com um carro branco e a chamada Audiovisual que comunica e encanta.',
    imageWidth: 1911,
    imageHeight: 917,
    url: 'https://joaovitorvideomaker.com.br'
  },
  {
    name: 'Finia Finance',
    description: 'Uma plataforma de finanças com uma interface direta para acessar a conta e começar a organizar a vida financeira.',
    image: '/assets/images/finia-finance.png',
    imageAlt: 'Tela de acesso do Finia Finance, com fundo escuro, formulário de login e botão amarelo para entrar na conta.',
    imageWidth: 1907,
    imageHeight: 907,
    url: 'https://finiafinance.com.br'
  }
];

export default function Projects() {
  return (
    <section className="projects" id="projetos" aria-labelledby="projects-title">
      <div className="container">
        <div className="projects-heading">
          <h2 id="projects-title">Projetos selecionados<span>.</span></h2>
        </div>
        <div className="projects-list">
          {projects.map(project => (
            <article className="project-card" key={project.name}>
              <div className="project-preview project-preview--screenshot">
                <img src={project.image} alt={project.imageAlt} width={project.imageWidth} height={project.imageHeight} loading="lazy" decoding="async" />
              </div>
              <div className="project-copy">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <a className="project-link" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Visitar site de ${project.name} (abre em nova aba)`}>
                  Visitar site <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
        <a className="projects-contact" href="#contato">Sua ideia pode ser o próximo projeto. <span>Vamos conversar ↗</span></a>
      </div>
    </section>
  );
}
