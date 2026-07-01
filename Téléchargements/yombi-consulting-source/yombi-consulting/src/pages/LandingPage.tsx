
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Services } from '../components/Services';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { Team } from '../components/Team';
import { Publications } from '../components/Publications';
import { Testimonials } from '../components/Testimonials';
import { Humanitarian } from '../components/Humanitarian';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

// Page d'accueil unique orchestrant toutes les sections
// L'ordre des sections suit un parcours narratif : présentation, services,
// preuve sociale (équipe, publications, témoignages), puis appel à l'action (contact)
export function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyChooseUs />
        <Team />
        <Publications />
        <Testimonials />
        <Humanitarian />
        <Contact />
      </main>
      <Footer />
    </div>);

}