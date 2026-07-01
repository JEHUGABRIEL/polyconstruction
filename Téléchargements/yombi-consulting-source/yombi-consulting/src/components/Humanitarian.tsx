import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Smile, Building2, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Cause {
  title: string;
  description: string;
}

const amounts = [10, 25, 50, 100, 250];
const causeIcons = [Smile, Building2];

export function Humanitarian() {
  const { t } = useTranslation();
  const causes = t('humanitarian.causes', { returnObjects: true }) as Cause[];
  const [selected, setSelected] = useState(25);
  const [custom, setCustom] = useState('');

  const amountToShow = custom ? custom : selected;

  return (
    <section className="py-24 bg-blue-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-amber-400 font-semibold tracking-wide uppercase text-sm mb-3">
          {t('humanitarian.badge')}
        </h2>
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 font-serif">
          {t('humanitarian.title')}
        </h3>
        <p className="text-slate-300 italic max-w-2xl mx-auto mb-12 leading-relaxed">
          &ldquo;{t('humanitarian.quote')}&rdquo;
        </p>

        <div className="grid sm:grid-cols-2 gap-6 mb-12 text-left">
          {causes.map((cause, i) => {
            const Icon = causeIcons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-blue-900/60 border border-white/10 rounded-2xl p-6 flex items-start gap-4"
              >
                <div className="w-11 h-11 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">{cause.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{cause.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="bg-blue-900/60 border border-white/10 rounded-2xl p-8 max-w-lg mx-auto">
          <h4 className="text-white font-semibold text-lg mb-1">{t('humanitarian.amountLabel')}</h4>
          <p className="text-slate-400 text-sm mb-6">{t('humanitarian.amountSub')}</p>

          <div className="grid grid-cols-5 gap-2 mb-4">
            {amounts.map((amount) => (
              <button
                key={amount}
                onClick={() => {
                  setSelected(amount);
                  setCustom('');
                }}
                className={`py-2.5 rounded-lg text-sm font-semibold border transition-colors ${
                  selected === amount && !custom
                    ? 'bg-amber-500 border-amber-500 text-blue-950'
                    : 'border-white/20 text-white hover:border-amber-400'
                }`}
              >
                ${amount}
              </button>
            ))}
          </div>

          <div className="relative mb-5">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
            <input
              type="number"
              min={10}
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder={t('humanitarian.customPlaceholder')}
              className="w-full pl-8 pr-4 py-3 rounded-lg bg-blue-950/60 border border-white/20 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-blue-950 font-semibold transition-colors">
            <Heart className="w-4 h-4 fill-blue-950" />
            {t('humanitarian.donateButton')} ${amountToShow || 0}
          </button>

          <p className="flex items-center justify-center gap-1.5 text-slate-500 text-xs mt-4">
            <Lock className="w-3 h-3" />
            {t('humanitarian.secure')}
          </p>
        </div>
      </div>
    </section>
  );
}
