import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Mail, MessageCircle, MapPin, ExternalLink } from 'lucide-react';
import { useSiteData } from '../context/SiteContext';
import { Link } from 'react-router-dom';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function WhatsAppIcon({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function ContactModal({ isOpen, onClose }: Props) {
  const { settings } = useSiteData();
  const phone1Clean = settings.contact.phone1.replace(/\s/g, '');
  const phone2Clean = settings.contact.phone2.replace(/\s/g, '');
  const whatsappNumber = phone1Clean.replace('+', '');
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <MessageCircle size={20} className="text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Nous contacter
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 space-y-3">
              {/* Phone 1 */}
              <a
                href={`tel:${phone1Clean}`}
                onClick={onClose}
                className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-red-50 hover:border-red-200 border border-transparent transition-all group"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors">
                  <Phone size={22} className="text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900">
                    {settings.contact.phone1}
                  </p>
                  <p className="text-xs text-slate-500">Appel téléphonique</p>
                </div>
                <ExternalLink size={16} className="text-slate-400 group-hover:text-green-600 transition-colors" />
              </a>

              {/* Phone 2 */}
              <a
                href={`tel:${phone2Clean}`}
                onClick={onClose}
                className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-red-50 hover:border-red-200 border border-transparent transition-all group"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors">
                  <Phone size={22} className="text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900">
                    {settings.contact.phone2}
                  </p>
                  <p className="text-xs text-slate-500">Appel téléphonique</p>
                </div>
                <ExternalLink size={16} className="text-slate-400 group-hover:text-green-600 transition-colors" />
              </a>

              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-green-50 hover:border-green-200 border border-transparent transition-all group"
              >
                <div className="w-12 h-12 bg-[#e8f5e9] rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#c8e6c9] transition-colors">
                  <WhatsAppIcon size={22} className="text-[#25D366]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900">
                    WhatsApp
                  </p>
                  <p className="text-xs text-slate-500">Discussion instantanée</p>
                </div>
                <ExternalLink size={16} className="text-slate-400 group-hover:text-[#25D366] transition-colors" />
              </a>

              {/* Email */}
              <a
                href={`mailto:${settings.contact.email}`}
                onClick={onClose}
                className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-red-50 hover:border-red-200 border border-transparent transition-all group"
              >
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-red-200 transition-colors">
                  <Mail size={22} className="text-red-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">
                    {settings.contact.email}
                  </p>
                  <p className="text-xs text-slate-500">Envoyer un email</p>
                </div>
                <ExternalLink size={16} className="text-slate-400 group-hover:text-red-600 transition-colors" />
              </a>

              {/* Address (display only) */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin size={22} className="text-slate-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900">
                    {settings.contact.address}
                  </p>
                  <p className="text-xs text-slate-500">Adresse</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 pt-0">
              <Link
                to="/contact"
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors"
              >
                <MessageCircle size={18} />
                Page contact complète
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
