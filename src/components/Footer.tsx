import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  Instagram } from
'lucide-react';
export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/channels4_profile.jpg"
                alt="Poly Construction Services Logo"
                className="w-[60px] sm:w-[120px] aspect-square rounded-[50%] object-cover border-2 border-slate-700 flex-shrink-0" />
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                  Poly Construction<br />Services
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">BTP &amp; Ingénierie</p>
              </div>
            </div>
            <p className="text-sm mt-4 text-slate-400">
              Poly Construction Services est votre partenaire de confiance pour
              tous vos projets de BTP en République Centrafricaine. Expertise,
              qualité et respect des délais.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors">
                
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors">
                
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors">
                
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors">
                
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:pl-10">
            <h3 className="text-lg font-semibold text-white mb-4">
              Liens Rapides
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-red-400 transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-red-400 transition-colors">
                  
                  Nos Services
                </Link>
              </li>
              <li>
                <Link
                  to="/boutique"
                  className="hover:text-red-400 transition-colors">
                  
                  Boutique
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-red-400 transition-colors">
                  
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Nos Services
            </h3>
            <ul className="space-y-2">
              <li className="text-slate-400">Architecture & Ingénierie</li>
              <li className="text-slate-400">Assainissement</li>
              <li className="text-slate-400">Permis de bâtir</li>
              <li className="text-slate-400">Climatisation</li>
              <li className="text-slate-400">Suivi et évaluation</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Contactez-nous
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-red-500 mt-1 flex-shrink-0" size={20} />
                <span>Bangui, République Centrafricaine</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="text-red-500 mt-1 flex-shrink-0" size={20} />
                <div className="flex flex-col">
                  <a
                    href="tel:+23674212289"
                    className="hover:text-white transition-colors">
                    
                    +236 74 21 22 89
                  </a>
                  <a
                    href="tel:+23675726244"
                    className="hover:text-white transition-colors">
                    
                    +236 75 72 62 44
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="text-red-500 mt-1 flex-shrink-0" size={20} />
                <a
                  href="mailto:contact@polyconstructionservices.cf"
                  className="hover:text-white transition-colors">
                  
                  contact@polyconstructionservices.cf
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Poly Construction Services. Tous
            droits réservés.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0 text-sm text-slate-500">
            <a href="#" className="hover:text-white transition-colors">
              Mentions légales
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Politique de confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>);

}