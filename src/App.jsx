import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Component as CursorFollower } from './components/ui/cursor-follower';
import SectionNavigator from './components/SectionNavigator';
import ImpactStatement from './components/ImpactStatement';
import useNavigationMotions from './hooks/useNavigationMotions';

export default function App() {
  useNavigationMotions();

  return (
    <>
      <CursorFollower />
      <SectionNavigator />
      <Header />
      <main>
        <Hero />
        <About />
        <ImpactStatement />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
