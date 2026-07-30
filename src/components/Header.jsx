import { motion } from 'motion/react';

export default function Header() {
  return (
    <header className="site-header" id="topo">
      <div className="header-inner">
        <motion.a
          href="#topo"
          className="logo"
          aria-label="DAVILA — página inicial"
          initial={{ scale: 0.82, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ rotate: 8, scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <img src="/assets/images/Vector.png" alt="" className="logo-vector" />
        </motion.a>

        <motion.a
          href="#contato"
          className="header-cta"
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          Fale conosco
        </motion.a>
      </div>
    </header>
  );
}
