import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Services } from './pages/Services';
import { Contact } from './pages/Contact';
import { Realisations } from './pages/Realisations';
import { AdminDashboard } from './pages/AdminDashboard';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingContactButton } from './components/FloatingContactButton';
import { ContactModal } from './components/ContactModal';
import { SiteProvider } from './context/SiteContext';

function AppLayout() {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800 bg-slate-50">
      {!isAdmin && <Navbar />}
      {!isAdmin && <FloatingContactButton onClick={() => setContactModalOpen(true)} />}
      <main className={isAdmin ? '' : 'flex-grow'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/realisations" element={<Realisations />} />
          <Route path="/boutique" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}

      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </div>
  );
}

export function App() {
  return (
    <SiteProvider>
      <Router>
        <AppLayout />
      </Router>
    </SiteProvider>
  );
}