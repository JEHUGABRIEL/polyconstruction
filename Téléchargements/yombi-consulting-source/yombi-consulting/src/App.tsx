
import { LandingPage } from './pages/LandingPage';
import { Chatbot } from './components/Chatbot';

// Composant racine : assemble la page d'accueil et le chatbot flottant
// Le chatbot est affiché par-dessus le contenu via un positionnement fixed
export function App() {
  return (
    <>
      <LandingPage />
      <Chatbot />
    </>);

}