import { MapPin, Mail, Phone, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import logo from '../assets/logo-raw.png';

// Pied de page en 4 colonnes : logo + description, services, liens rapides, coordonnées
// Les données (services, liens, contacts) sont chargées depuis les traductions i18n
export function Footer() {
  const { t } = useTranslation();
  const serviceItems = t('footer.serviceItems', { returnObjects: true }) as string[];

  return (
    <footer className="bg-slate-950 text-slate-300 py-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <img src={logo} alt={t('nav.companyName')} className="h-9 w-9 rounded-full object-cover" />
              <span className="flex flex-col leading-none">
                <span className="text-lg font-bold font-serif text-white">
                  {t('nav.companyName')}
                </span>
                <span className="text-[9px] tracking-widest text-amber-500 font-medium">
                  {t('nav.tagline')}
                </span>
              </span>
            </div>
            <p className="text-slate-400 max-w-sm mb-6">
              {t('footer.description')}
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.services')}</h4>
            <ul className="space-y-2">
              {serviceItems.map((item, i) => (
                <li key={i} className="text-slate-400">{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#accueil" className="hover:text-amber-500 transition-colors">
                  {t('nav.home')}
                </a>
              </li>
              <li>
                <a href="#apropos" className="hover:text-amber-500 transition-colors">
                  {t('nav.about')}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-500 transition-colors">
                  {t('nav.services')}
                </a>
              </li>
              <li>
                <a href="#equipe" className="hover:text-amber-500 transition-colors">
                  {t('nav.team')}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-500 transition-colors">
                  {t('nav.contact')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.contactTitle')}</h4>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <span>{t('contact.office.address')}, {t('contact.office.city')}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="mailto:yombirothence@gmail.com" className="hover:text-amber-500 transition-colors">
                  {t('contact.email.address1')}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="https://wa.me/12344503415" className="hover:text-amber-500 transition-colors">
                  {t('contact.whatsapp.number')}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="tel:+12344503415" className="hover:text-amber-500 transition-colors">
                  {t('contact.phone.number')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center">
          <p>
            &copy; {new Date().getFullYear()} {t('footer.copyright')}
          </p>
          <div className="mt-4 md:mt-0 space-x-4">
            <a href="#" className="hover:text-white transition-colors">
              {t('footer.legal.notice')}
            </a>
            <a href="#" className="hover:text-white transition-colors">
              {t('footer.legal.privacy')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
