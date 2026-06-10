import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Hero from '../sections/Hero';
import PainPoints from '../sections/PainPoints';
import Method from '../sections/Method';
import Results from '../sections/Results';
import Resources from '../sections/Resources';
import LinkedInCommunity from '../sections/LinkedInCommunity';
import Courses from '../sections/Courses';
import FinalCTA from '../sections/FinalCTA';
import { useSmoothScroll } from '../hooks/useSmoothScroll';
import type Lenis from 'lenis';

export default function Home() {
  const lenisRef = useSmoothScroll();

  return (
    <>
      <Navigation lenisRef={lenisRef as React.RefObject<InstanceType<typeof Lenis>>} />
      <main>
        <Hero />
        <PainPoints />
        <Method />
        <Results />
        <Resources />
        <LinkedInCommunity />
        <Courses />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
