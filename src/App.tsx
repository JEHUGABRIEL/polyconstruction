import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Services } from './pages/Services';
import { Contact } from './pages/Contact';
import { Realisations } from './pages/Realisations';
import { AdminDashboard } from './pages/AdminDashboard';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SiteProvider } from './context/SiteContext';
export function App() {
  return (
    <SiteProvider>
      <Router>
        <div className="min-h-screen flex flex-col font-sans text-slate-800 bg-slate-50">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/realisations" element={<Realisations />} />
              <Route path="/boutique" element={<Shop />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </SiteProvider>);

}