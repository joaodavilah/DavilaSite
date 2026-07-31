import './TechCarousel.css';

const tools = [
  { name: 'Figma', type: 'figma' },
  { name: 'HTML5', type: 'html' },
  { name: 'React', type: 'react' },
  { name: 'JavaScript', type: 'javascript' },
  { name: 'Python', type: 'python' },
  { name: 'SQL', type: 'sql' },
  { name: 'Power BI', type: 'powerbi' },
  { name: 'Vercel', type: 'vercel' }
];

function ToolIcon({ type }) {
  if (type === 'figma') {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="11" cy="6" r="5" fill="#f24e1e" />
        <circle cx="21" cy="6" r="5" fill="#ff7262" />
        <circle cx="11" cy="16" r="5" fill="#a259ff" />
        <circle cx="21" cy="16" r="5" fill="#1abcfe" />
        <circle cx="11" cy="26" r="5" fill="#0acf83" />
      </svg>
    );
  }

  if (type === 'html') {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M4 2h24l-2.2 25L16 30 6.2 27 4 2Z" fill="#e44d26" />
        <path d="M16 27.4V4.6h9.4l-1.8 20.5L16 27.4Z" fill="#f16529" />
        <path d="M8.3 8h15.5l-.3 3.2H11.8l.3 3.1h11.1l-.9 9-6.3 1.8-6.3-1.8-.4-4.7h3.1l.2 2.3 3.4.9 3.4-.9.4-3.5H9L8.3 8Z" fill="#fff" />
      </svg>
    );
  }

  if (type === 'react') {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="2.6" fill="#61dafb" />
        <g fill="none" stroke="#61dafb" strokeWidth="1.5">
          <ellipse cx="16" cy="16" rx="13" ry="5.2" />
          <ellipse cx="16" cy="16" rx="13" ry="5.2" transform="rotate(60 16 16)" />
          <ellipse cx="16" cy="16" rx="13" ry="5.2" transform="rotate(120 16 16)" />
        </g>
      </svg>
    );
  }

  if (type === 'javascript') {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <rect x="3" y="3" width="26" height="26" rx="3" fill="#f7df1e" />
        <path d="M17 24.7c.7 1.2 1.6 2 3.2 2 1.3 0 2.1-.6 2.1-1.5 0-1.1-.8-1.4-2.3-2l-.8-.3c-2.3-1-3.8-2.2-3.8-4.8 0-2.4 1.8-4.2 4.7-4.2 2 0 3.5.7 4.6 2.6l-2.5 1.6c-.6-1-1.2-1.4-2.1-1.4-1 0-1.6.6-1.6 1.4 0 1 .6 1.3 2.1 1.9l.8.3c2.7 1.2 4.2 2.3 4.2 4.9 0 2.8-2.2 4.4-5.2 4.4-2.9 0-4.8-1.4-5.7-3.4L17 24.7Zm-10.9.3 2.8-1.7c.5.9 1 1.7 2.1 1.7 1.1 0 1.7-.4 1.7-2.1V14h3.2v9c0 3.3-1.9 4.8-4.7 4.8-2.5 0-4-1.3-5.1-2.8Z" fill="#111" transform="scale(.82) translate(3.4 1.5)" />
      </svg>
    );
  }

  if (type === 'python') {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M15.8 2C9.2 2 9.6 4.9 9.6 4.9v3h6.3v1H7.1S3 8.4 3 15s3.6 6.4 3.6 6.4h2.2v-3.1s-.1-3.6 3.5-3.6h6.1s3.4.1 3.4-3.3V5.5S22.3 2 15.8 2Zm-3.5 2.2a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z" fill="#3776ab" />
        <path d="M16.2 30c6.6 0 6.2-2.9 6.2-2.9v-3h-6.3v-1h8.8s4.1.5 4.1-6.1-3.6-6.4-3.6-6.4h-2.2v3.1s.1 3.6-3.5 3.6h-6.1s-3.4-.1-3.4 3.3v5.9S9.7 30 16.2 30Zm3.5-2.2a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Z" fill="#ffd343" />
      </svg>
    );
  }

  if (type === 'sql') {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <ellipse cx="16" cy="7" rx="11" ry="4.5" fill="#2e7fa7" />
        <path d="M5 7v8c0 2.5 4.9 4.5 11 4.5s11-2 11-4.5V7c0 2.5-4.9 4.5-11 4.5S5 9.5 5 7Z" fill="#246683" />
        <path d="M5 15v8c0 2.5 4.9 4.5 11 4.5s11-2 11-4.5v-8c0 2.5-4.9 4.5-11 4.5S5 17.5 5 15Z" fill="#1b536d" />
        <path d="M7 13c1.9 1.5 5.2 2.4 9 2.4s7.1-.9 9-2.4" fill="none" stroke="#67d5cf" />
      </svg>
    );
  }

  if (type === 'powerbi') {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <rect x="4" y="18" width="6" height="11" rx="1.5" fill="#f2c811" />
        <rect x="10" y="12" width="7" height="17" rx="1.5" fill="#f2c811" opacity=".85" />
        <rect x="17" y="6" width="7" height="23" rx="1.5" fill="#f2c811" opacity=".7" />
        <rect x="24" y="2" width="5" height="27" rx="1.5" fill="#f2c811" opacity=".5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 4 30 28H2L16 4Z" fill="#fff" />
    </svg>
  );
}

function ToolGroup({ hidden = false }) {
  return (
    <div className="tech-carousel__group" aria-hidden={hidden || undefined}>
      {tools.map(tool => (
        <div className="tech-carousel__item" key={tool.name} title={tool.name}>
          <span className="tech-carousel__icon">
            <ToolIcon type={tool.type} />
          </span>
          <span className="tech-carousel__label">{tool.name}</span>
        </div>
      ))}
    </div>
  );
}

export default function TechCarousel() {
  return (
    <div className="tech-carousel" aria-label="Tecnologias e ferramentas utilizadas">
      <div className="tech-carousel__track">
        <ToolGroup />
        <ToolGroup hidden />
      </div>
    </div>
  );
}
