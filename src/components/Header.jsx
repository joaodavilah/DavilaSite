import { motion, useReducedMotion } from 'motion/react';
import SpecularButton from './SpecularButton';

export default function Header() {
  const shouldReduceMotion = useReducedMotion();

  const scrollToContact = () => {
    document.getElementById('contato')?.scrollIntoView({
      behavior: shouldReduceMotion ? 'auto' : 'smooth'
    });
  };

  return (
    <header className="site-header" id="topo">
      <div className="header-inner">
        <motion.a
          href="#topo"
          className="logo"
          aria-label="DAVILA — página inicial"
          initial={shouldReduceMotion ? false : { scale: 0.82, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={
            shouldReduceMotion ? undefined : { rotate: 8, scale: 1.05 }
          }
          transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
        >
          <img src="/assets/images/Vector.png" alt="" className="logo-vector" />
        </motion.a>

        <motion.div
          className="header-cta-motion"
          initial={shouldReduceMotion ? false : { opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.3,
            delay: shouldReduceMotion ? 0 : 0.2
          }}
        >
          <SpecularButton
            size="sm"
            radius={24}
            tint="#ffffff"
            tintOpacity={0}
            blur={0}
            textColor="#f5f5f5"
            lineColor="#ffffff"
            baseColor="#525252"
            intensity={1}
            shineSize={10}
            shineFade={40}
            thickness={1}
            speed={0.35}
            followMouse
            proximity={250}
            autoAnimate={false}
            onClick={scrollToContact}
            className="header-specular-button"
          >
            Fale conosco
          </SpecularButton>
        </motion.div>
      </div>
    </header>
  );
}
