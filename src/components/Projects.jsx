import './Projects.css';

// Projetos apresentados no portfólio.
const projects = [
  {
    name: 'João Vitor VM',
    description: 'Um site para apresentar trabalhos audiovisuais, contar histórias e conectar novos clientes ao trabalho do profissional.',
    image: '/assets/images/joao-vitor-vm.png',
    imageAlt: 'Página inicial de João Vitor VM com um carro branco e a chamada Audiovisual que comunica e encanta.',
    imageWidth: 1911,
    imageHeight: 917,
    details: 'Apresentação digital de um profissional do audiovisual, com destaque para a identidade visual e os trabalhos realizados.'
  },
  {
    name: 'Finia Finance',
    description: 'Uma plataforma de finanças com uma interface direta para acessar a conta e começar a organizar a vida financeira.',
    image: '/assets/images/finia-finance.png',
    imageAlt: 'Tela de acesso do Finia Finance, com fundo escuro, formulário de login e botão amarelo para entrar na conta.',
    imageWidth: 1907,
    imageHeight: 907,
    details: 'A tela de entrada reúne acesso à conta, recuperação de senha e cadastro em uma apresentação simples, com destaque para as ações principais.'
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
