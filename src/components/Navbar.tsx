import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navLinks = [
  {
    name: 'Accueil',
    path: '/'
  },
  {
    name: 'Nos Services',
    path: '/services'
  },
  {
    name: 'Boutique',
    path: '/boutique'
  },
  {
    name: 'Contact',
    path: '/contact'
  }];

  const isActive = (path: string) => location.pathname === path;
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/channels4_profile.jpg"
                alt="Poly Construction Services Logo"
                className="h-16 w-auto object-contain" />
              
              <div className="hidden sm:block">
                <span className="block text-xl font-bold text-slate-900 leading-tight">
                  Poly Construction
                </span>
                <span className="block text-sm font-semibold text-red-600 leading-tight">
                  Services
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) =>
            <Link
              key={link.path}
              to={link.path}
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${isActive(link.path) ? 'border-red-600 text-red-600' : 'border-transparent text-slate-600 hover:text-red-600 hover:border-red-300'}`}>
              
                {link.name}
              </Link>
            )}
          </nav>

          {/* Contact CTA */}
          <div className="hidden md:flex items-center">
            <a
              href="tel:+23674212289"
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md font-medium hover:bg-red-700 transition-colors">
              
              <Phone size={18} />
              <span>Nous consulter</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500">
              
              <span className="sr-only">Ouvrir le menu principal</span>
              {isOpen ?
              <X className="block h-6 w-6" /> :

              <Menu className="block h-6 w-6" />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen &&
      <div className="md:hidden bg-white border-t border-slate-100">
          <div className="pt-2 pb-3 space-y-1">
            {navLinks.map((link) =>
          <Link
            key={link.path}
            to={link.path}
            onClick={() => setIsOpen(false)}
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${isActive(link.path) ? 'bg-red-50 border-red-600 text-red-700' : 'border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-800'}`}>
            
                {link.name}
              </Link>
          )}
            <div className="pl-3 pr-4 py-4">
              <a
              href="tel:+23674212289"
              className="flex items-center justify-center gap-2 w-full bg-red-600 text-white px-4 py-3 rounded-md font-medium">
              
                <Phone size={18} />
                <span>Nous consulter</span>
              </a>
            </div>
          </div>
        </div>
      }
    </header>);

}