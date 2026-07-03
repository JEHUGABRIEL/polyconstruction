import React from 'react';
import {
  PenTool,
  Droplets,
  HardHat,
  FileText,
  Wind,
  Activity,
  Package,
  CheckCircle2 } from
'lucide-react';
import { motion } from 'framer-motion';
import { useSiteData } from '../context/SiteContext';
import { HeroSlider } from '../components/HeroSlider';
export function Services() {
  const { settings, services } = useSiteData();
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'PenTool':
        return <PenTool size={40} className="text-red-600" />;
      case 'FileText':
        return <FileText size={40} className="text-red-600" />;
      case 'Droplets':
        return <Droplets size={40} className="text-red-600" />;
      case 'CheckCircle2':
        return <CheckCircle2 size={40} className="text-red-600" />;
      case 'Wind':
        return <Wind size={40} className="text-red-600" />;
      case 'Activity':
        return <Activity size={40} className="text-red-600" />;
      case 'Package':
        return <Package size={40} className="text-red-600" />;
      default:
        return <HardHat size={40} className="text-red-600" />;
    }
  };
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <HeroSlider
        slides={settings.heroSlides.services}
        bgImage="https://images.unsplash.com/photo-1504307651254-35680f356f58?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" />
      

      {/* Services List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) =>
          <motion.div
            key={service.id}
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              delay: index * 0.1
            }}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
            
              <div className="p-8 flex-grow">
                <div className="w-16 h-16 bg-red-50 rounded-xl flex items-center justify-center mb-6">
                  {getIcon(service.iconName)}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-slate-600 mb-6">{service.description}</p>

                <div className="space-y-2">
                  <h4 className="font-semibold text-slate-900 text-sm uppercase tracking-wider">
                    Inclus :
                  </h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) =>
                  <li
                    key={idx}
                    className="flex items-center text-slate-600 text-sm">
                    
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></div>
                        {feature}
                      </li>
                  )}
                  </ul>
                </div>
              </div>
              <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 mt-auto">
                <a
                href="/contact"
                className="text-red-600 font-medium hover:text-red-700 flex items-center justify-center w-full">
                
                  Demander un devis
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Process Section */}
      <div className="bg-white py-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Notre Méthodologie
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -z-10 -translate-y-1/2"></div>

            {[
            {
              step: '01',
              title: 'Consultation',
              desc: 'Écoute de vos besoins et visite du site.'
            },
            {
              step: '02',
              title: 'Conception',
              desc: 'Élaboration des plans et du budget détaillé.'
            },
            {
              step: '03',
              title: 'Exécution',
              desc: 'Réalisation des travaux selon les normes.'
            },
            {
              step: '04',
              title: 'Livraison',
              desc: 'Remise des clés et garantie de parfait achèvement.'
            }].
            map((item, idx) =>
            <motion.div
              key={idx}
              initial={{
                opacity: 0,
                scale: 0.8
              }}
              whileInView={{
                opacity: 1,
                scale: 1
              }}
              viewport={{
                once: true
              }}
              transition={{
                delay: idx * 0.1
              }}
              className="bg-white text-center relative z-10 p-4">
              
                <div className="w-16 h-16 mx-auto bg-slate-900 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 border-4 border-white shadow-md">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600">{item.desc}</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>);

}