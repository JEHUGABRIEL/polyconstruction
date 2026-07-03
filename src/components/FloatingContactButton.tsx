import { MessageCircle } from 'lucide-react';

type Props = {
  onClick: () => void;
};

export function FloatingContactButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-red-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-red-700 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 group animate-entry cursor-pointer"
      title="Nous contacter"
    >
      <MessageCircle size={22} />
      <span className="hidden sm:inline font-medium text-sm">Nous consulter</span>

      {/* Ripple effect ring */}
      <span className="absolute inset-0 rounded-full bg-red-600 animate-ping opacity-20 group-hover:opacity-30" style={{ animationDuration: '2s' }} />
    </button>
  );
}
