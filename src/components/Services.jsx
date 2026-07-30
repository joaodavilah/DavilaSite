import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import OptionWheel from './OptionWheel';
import SplitText from './SplitText';

const services = [
  {
    title: 'Landing Pages',
    description: 'Criamos páginas modernas, responsivas e direcionadas para objetivos específicos, como apresentar um serviço, divulgar um produto ou transformar visitantes em novos contatos para a empresa.'
  },
  {
    title: 'Sites Institucionais',
    description: 'Desenvolvemos sites completos e personalizados para empresas que desejam fortalecer sua presença digital, apresentar seus serviços, portfólio e canais de contato com clareza, desempenho e credibilidade.'
  },
  {
    title: 'Aplicativos',
    description: 'Desenvolvemos aplicativos personalizados de acordo com as necessidades de cada projeto, criando experiências práticas e novas formas de interação entre empresas, clientes e colaboradores.'
  },
  {
    title: 'Sistemas Personalizados',
    description: 'Criamos sistemas sob medida para os processos de cada empresa, centralizando informações, automatizando rotinas e oferecendo mais controle, eficiência e escalabilidade para a operação.'
  },
  {
    title: 'Dashboards em Power BI',
    description: 'Transformamos dados em informações estratégicas por meio de dashboards interativos, indicadores e visualizações que facilitam o acompanhamento de resultados e apoiam decisões mais assertivas.'
  },
  {
    title: 'Soluções em Python',
    description: 'Desenvolvemos dashboards, automações e soluções em Python para transformar dados em análises visuais, reduzir tarefas manuais e acompanhar indicadores de forma flexível e personalizada.'
  }
];

export default function Services() {
  const [selectedIndex, setSelectedIndex] = useState(2);
  const selectedService = services[selectedIndex];

  return (
    <section className="services" id="servicos" data-section="services">
      <div className="container">
        <header className="services-head">
          <SplitText
            text="Podemos ajudar sua empresa com:"
            tag="h2"
            className="section-title services-title-split"
            splitType="words"
            delay={45}
            duration={0.7}
            threshold={0.12}
            rootMargin="-45px"
            textAlign="left"
            from={{ opacity: 0, y: 28 }}
            to={{ opacity: 1, y: 0 }}
          />
        </header>

        <div className="services-explorer">
          <div className="services-wheel-shell" aria-label="Selecione um serviço">
            <OptionWheel
              items={services.map(service => service.title)}
              defaultSelected={2}
              onChange={index => setSelectedIndex(index)}
              textColor="#696772"
              activeColor="#ffffff"
              side="left"
              fontSize={2.15}
              spacing={1.48}
              curve={1}
              tilt={6}
              blur={1.35}
              fade={0.20}
              minOpacity={0.10}
              smoothing={200}
              inset={44}
              loop={false}
              draggable
              className="services-option-wheel"
            />
          </div>

          <div className="service-detail" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedService.title}
                className="service-detail-inner"
                initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                <SplitText
                  key={`split-${selectedService.title}`}
                  text={selectedService.description}
                  tag="p"
                  className="service-detail-description"
                  splitType="words"
                  delay={10}
                  duration={0.5}
                  threshold={0.05}
                  rootMargin="0px"
                  textAlign="left"
                  from={{ opacity: 0, y: 16 }}
                  to={{ opacity: 1, y: 0 }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
