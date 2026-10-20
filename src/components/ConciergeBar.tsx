import React, { useState } from 'react';
import { MessageCircle, X, Shield, Sparkles } from 'lucide-react';

export const ConciergeBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenWhatsApp = (message: string) => {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/33700000000?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isOpen ? (
        <div className="w-80 sm:w-96 bg-[#121316] border border-[#c9a349]/40 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#17181c] to-[#21232a] border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#1b2f23] border border-[#4ade80]/40 flex items-center justify-center text-[#4ade80]">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#121316]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Conciergerie Coumbista VIP
                </h4>
                <p className="text-[10px] text-emerald-400 font-medium">Conseillère en ligne · Réponse immédiate</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
              aria-label="Fermer la conciergerie"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3 bg-[#0d0e11] text-xs text-zinc-300">
            <p className="leading-relaxed text-zinc-300">
              Besoin d'une vidéo personnalisée d'un sac Birkin ou Kelly, d'un conseil de pointure Louboutin ou d'une réservation privée ?
            </p>

            <div className="space-y-2">
              <button
                onClick={() =>
                  handleOpenWhatsApp(
                    'Bonjour Coumbista Fashion, j’aimerais recevoir une vidéo en gros plan et vérifier la disponibilité d’une pièce.'
                  )
                }
                className="w-full text-left p-2.5 rounded-xl bg-[#17181c] hover:bg-[#202227] border border-zinc-800 text-[11px] text-zinc-200 transition-colors flex items-center justify-between"
              >
                <span>📹 Demander une vidéo en direct d'un sac</span>
                <span className="text-[#d4af37]">→</span>
              </button>

              <button
                onClick={() =>
                  handleOpenWhatsApp(
                    'Bonjour, j’ai une question concernant le guide des pointures et le confort des escarpins.'
                  )
                }
                className="w-full text-left p-2.5 rounded-xl bg-[#17181c] hover:bg-[#202227] border border-zinc-800 text-[11px] text-zinc-200 transition-colors flex items-center justify-between"
              >
                <span>👠 Conseils pointures & cambrure</span>
                <span className="text-[#d4af37]">→</span>
              </button>

              <button
                onClick={() =>
                  handleOpenWhatsApp(
                    'Bonjour Coumbista Fashion, je souhaite organiser une livraison express par coursier privé.'
                  )
                }
                className="w-full text-left p-2.5 rounded-xl bg-[#17181c] hover:bg-[#202227] border border-zinc-800 text-[11px] text-zinc-200 transition-colors flex items-center justify-between"
              >
                <span>🚀 Livraison coursier VIP Dakar / Paris / Abidjan</span>
                <span className="text-[#d4af37]">→</span>
              </button>
            </div>

            <div className="pt-2 flex items-center gap-2 text-[10px] text-zinc-500">
              <Shield className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Service confidentiel réservé aux clientes Coumbista</span>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 bg-[#132318] hover:bg-[#183120] border border-[#4ade80]/40 text-[#4ade80] rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all backdrop-blur-md"
          aria-label="Contacter la Conciergerie VIP"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 fill-[#4ade80]/20" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full" />
          </div>
          <span className="text-xs font-bold tracking-wider uppercase text-white group-hover:text-[#4ade80] transition-colors">
            Concierge WhatsApp VIP
          </span>
        </button>
      )}
    </div>
  );
};
