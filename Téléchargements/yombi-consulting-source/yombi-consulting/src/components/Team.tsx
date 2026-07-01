import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import founderOfficeLarge from '../assets/founder-office-large.png';
import stellaMarlyse from '../assets/stella-marlyse.png';

interface Member {
  name: string;
  role: string;
  bio: string;
  tags: string[];
}

// Section Équipe : affiche les membres sous forme de cartes en grille 2 colonnes
// Chaque carte contient une photo (avec zoom au survol), le nom, le rôle, la bio et des tags
// La première carte utilise la photo du fondateur, la seconde celle de Stella Marlyse
export function Team() {
  const { t } = useTranslation();
  const members = t('team.members', { returnObjects: true }) as Member[];

  return (
    <section id="equipe" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-blue-900 font-semibold tracking-wide uppercase text-sm mb-3">
            {t('team.badge')}
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 font-serif">
            {t('team.title')}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {members.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-blue-900 rounded-3xl overflow-hidden flex flex-col"
            >
              {index === 0 ? (
                <div className="overflow-hidden">
                  <img
                    src={founderOfficeLarge}
                    alt={member.name}
                    className="w-full h-72 object-cover hover:scale-110 transition-transform duration-500 ease-in-out"
                  />
                </div>
              ) : (
                <div className="overflow-hidden">
                  <img
                    src={stellaMarlyse}
                    alt={member.name}
                    className="w-full h-72 object-cover hover:scale-110 transition-transform duration-500 ease-in-out"
                  />
                </div>
              )}
              <div className="p-8 flex flex-col flex-1">
                <div className="w-10 h-0.5 bg-amber-500 mb-4" />
                <h4 className="text-2xl font-bold text-white mb-1 font-serif">{member.name}</h4>
                <p className="text-amber-400 text-sm font-semibold tracking-wide mb-4">
                  {member.role}
                </p>
                <p className="text-blue-200 leading-relaxed mb-5 flex-1">{member.bio}</p>
                {member.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {member.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-full border border-amber-400/40 text-amber-300 text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
