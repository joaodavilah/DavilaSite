import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CursorFollower from './components/CursorFollower';
import SectionNavigator from './components/SectionNavigator';
import ContactIntro from './components/ContactIntro';
import ImpactStatement from './components/ImpactStatement';

export default function App() {
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
        <ContactIntro />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
