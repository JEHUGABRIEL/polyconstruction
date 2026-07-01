import { motion } from 'framer-motion';
import { Laptop2, Building } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import founderRobe from '../assets/founder-robe.png';
import founderOfficeSmall from '../assets/founder-office-small.png';

// Section À propos : mise en page en deux colonnes (photo à gauche, texte à droite)
// La colonne image contient un effet de superposition : photo principale + vignette incrustée + badge statistique
export function About() {
  const { t } = useTranslation();

  return (
    <section id="apropos" className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 w-full"
          >
            <div className="relative">
              <div className="relative h-[500px] w-full overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={founderRobe}
                  alt={t('about.founder.name')}
                  className="w-full h-full object-cover"
                />
                <img
                  src={founderOfficeSmall}
                  alt={t('about.founder.name')}
                  className="hidden md:block absolute bottom-6 right-6 w-40 h-52 object-cover rounded-xl border-4 border-white shadow-xl"
                />
              </div>

              <div className="absolute -bottom-6 -left-6 bg-blue-900 text-white p-6 rounded-2xl shadow-xl z-10">
                <div className="text-3xl font-bold font-serif mb-1 text-amber-500">
                  {t('about.photoBadge.value')}
                </div>
                <div className="text-xs font-medium tracking-wide">
                  {t('about.photoBadge.label')}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2"
          >
            <h2 className="text-blue-900 font-semibold tracking-wide uppercase text-sm mb-3">
              {t('about.badge')}
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 font-serif">
              {t('about.title')}
            </h3>
            <p className="text-lg text-slate-600 mb-4 leading-relaxed">
              {t('about.description')}
            </p>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              {t('about.description2')}
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8 border-y border-slate-200 py-6">
              <div>
                <div className="text-2xl font-bold text-blue-900 font-serif">15+</div>
                <div className="text-sm text-slate-500">{t('about.stats.experience')}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-900 font-serif">500+</div>
                <div className="text-sm text-slate-500">{t('about.stats.clients')}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-900 font-serif">10+</div>
                <div className="text-sm text-slate-500">{t('about.stats.countries')}</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-sm text-slate-700">
                <Laptop2 className="w-4 h-4 text-emerald-500" />
                {t('about.modes.online')}
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-sm text-slate-700">
                <Building className="w-4 h-4 text-amber-500" />
                {t('about.modes.inPerson')}
              </span>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 mb-8">
              <img
                src={founderOfficeSmall}
                alt={t('about.founder.name')}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-slate-900">{t('about.founder.name')}</p>
                <p className="text-xs text-amber-600 tracking-wide">{t('about.founder.role')}</p>
              </div>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-900 hover:bg-blue-800 transition-colors"
            >
              {t('about.cta')}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
