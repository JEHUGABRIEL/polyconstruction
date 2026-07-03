import React from 'react';
import { motion } from 'framer-motion';
import { useSiteData } from '../context/SiteContext';
import { HeroSlider } from '../components/HeroSlider';
import { Calendar, MapPin } from 'lucide-react';
export function Realisations() {
  const { settings, projects } = useSiteData();
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <HeroSlider
        slides={settings.heroSlides.realisations}
        bgImage="https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" />
      

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Tous nos projets
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Découvrez l'étendue de notre expertise à travers nos réalisations en
            République Centrafricaine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) =>
          <motion.div
            key={project.id}
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
            className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-xl transition-all duration-300">
            
              <div className="relative h-64 overflow-hidden">
                <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              
                <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                  {project.category}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-red-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-600 mb-6 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex items-center justify-between text-sm text-slate-500 border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={16} />
                    <span>{project.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={16} />
                    <span>RCA</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>);

}