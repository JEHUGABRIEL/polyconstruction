import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSiteData } from '../context/SiteContext';
import { HeroSlider } from '../components/HeroSlider';
export function Contact() {
  const { settings } = useSiteData();
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <HeroSlider
        slides={settings.heroSlides.contact}
        bgImage="https://images.unsplash.com/photo-1541888081622-15cb2a061487?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" />
      

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            className="lg:col-span-1 space-y-6">
            
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-6">
                Coordonnées
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0 text-red-600">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Téléphone</h4>
                    <p className="text-slate-600 mt-1">
                      <a
                        href={`tel:${settings.contact.phone1.replace(/\s/g, '')}`}
                        className="hover:text-red-600 block">
                        
                        {settings.contact.phone1}
                      </a>
                      <a
                        href={`tel:${settings.contact.phone2.replace(/\s/g, '')}`}
                        className="hover:text-red-600 block">
                        
                        {settings.contact.phone2}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0 text-red-600">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Adresse</h4>
                    <p className="text-slate-600 mt-1 whitespace-pre-line">
                      {settings.contact.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0 text-red-600">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Email</h4>
                    <p className="text-slate-600 mt-1">
                      <a
                        href={`mailto:${settings.contact.email}`}
                        className="hover:text-red-600">
                        
                        {settings.contact.email}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0 text-red-600">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      Heures d'ouverture
                    </h4>
                    <p className="text-slate-600 mt-1">
                      Lundi - Vendredi : 08h00 - 17h00
                      <br />
                      Samedi : 08h00 - 13h00
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: 0.2
            }}
            className="lg:col-span-2">
            
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Envoyez-nous un message
              </h3>
              <p className="text-slate-600 mb-8">
                Remplissez le formulaire ci-dessous, nous vous répondrons dans
                les plus brefs délais.
              </p>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-slate-700 mb-2">
                      
                      Prénom
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
                      placeholder="Votre prénom" />
                    
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-slate-700 mb-2">
                      
                      Nom
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
                      placeholder="Votre nom" />
                    
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-700 mb-2">
                      
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
                      placeholder="votre@email.com" />
                    
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-slate-700 mb-2">
                      
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
                      placeholder="+236 XX XX XX XX" />
                    
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-slate-700 mb-2">
                    
                    Sujet
                  </label>
                  <select
                    id="subject"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors bg-white">
                    
                    <option>Demande de devis</option>
                    <option>Information sur un service</option>
                    <option>Commande boutique</option>
                    <option>Candidature</option>
                    <option>Autre</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-slate-700 mb-2">
                    
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors resize-none"
                    placeholder="Décrivez votre projet ou votre demande...">
                  </textarea>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors focus:ring-4 focus:ring-red-200">
                  
                  <Send size={20} />
                  Envoyer le message
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>);

}