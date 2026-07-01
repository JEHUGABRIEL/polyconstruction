import { motion } from 'framer-motion';
import {
  Scale,
  Building2,
  FileText,
  Globe2,
  Handshake,
  Search,
  Briefcase,
  BarChart3,
  GraduationCap,
  ShieldCheck,
  Users,
  Landmark,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Associe chaque service à une icône Lucide et à un jeu de couleurs distinct
// Les tableaux sont cyclés via l'index % length pour supporter plus de 12 services
const icons = [
  Scale,
  Building2,
  FileText,
  Globe2,
  Handshake,
  Search,
  Briefcase,
  BarChart3,
  GraduationCap,
  ShieldCheck,
  Users,
  Landmark,
];

const colors = [
  'bg-blue-100 text-blue-700',
  'bg-amber-100 text-amber-700',
  'bg-emerald-100 text-emerald-700',
  'bg-sky-100 text-sky-700',
  'bg-rose-100 text-rose-700',
  'bg-purple-100 text-purple-700',
  'bg-orange-100 text-orange-700',
  'bg-indigo-100 text-indigo-700',
  'bg-teal-100 text-teal-700',
  'bg-cyan-100 text-cyan-700',
  'bg-fuchsia-100 text-fuchsia-700',
  'bg-lime-100 text-lime-700',
];

export function Services() {
  const { t } = useTranslation();
  const services = t('services.items', { returnObjects: true }) as Array<{
    title: string;
    description: string;
  }>;

  return (
    <section id="services" className="py-24 bg-blue-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-amber-400 font-semibold tracking-wide uppercase text-sm mb-3">
            {t('services.badge')}
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 font-serif">
            {t('services.title')}
          </h3>
          <p className="text-lg text-slate-300">
            {t('services.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = icons[index % icons.length];
            const color = colors[index % colors.length];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
                className="bg-blue-900/60 border border-white/10 rounded-2xl p-6 hover:bg-blue-900 hover:border-amber-500/30 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white mb-3">
                  {service.title}
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
