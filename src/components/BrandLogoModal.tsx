import React from 'react';
import { X, Download, Sparkles, Check, ShieldCheck, Palette } from 'lucide-react';
import { LOGO_URL } from '../data/products';

interface BrandLogoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandLogoModal: React.FC<BrandLogoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = LOGO_URL;
    link.download = 'Coumbista-Fashion-Official-Logo.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div 
        className="relative w-full max-w-2xl bg-[#121316] border border-[#c9a349]/30 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="brand-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#24262b]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
            <h3 id="brand-modal-title" className="text-base font-medium tracking-wider uppercase text-[#f4f2ee]">
              Identité de Marque & Logo Officiel
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/80 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-6">
          {/* Logo Showcase Banner */}
          <div className="relative group rounded-xl overflow-hidden border border-[#c9a349]/40 bg-[#0a0a0c] p-6 flex flex-col items-center text-center">
            <div className="w-56 h-56 rounded-xl overflow-hidden shadow-2xl border border-[#c9a349]/50 mb-4 bg-black">
              <img 
                src={LOGO_URL} 
                alt="Logo Officiel Coumbista Fashion" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <h4 className="font-luxury text-3xl font-serif text-gold-gradient tracking-widest uppercase">
              COUMBISTA FASHION
            </h4>
            <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37]/80 mt-1">
              Paris · Dakar · Abidjan · Milan
            </p>
            <p className="text-xs text-zinc-400 max-w-md mt-3 leading-relaxed">
              Monogramme joaillier entrelacé <strong>« CF »</strong> forgé en or pur brossé, sculpté sur cuir grainé pleine fleur noir onyx. Symbole de souveraineté, de grâce et d’artisanat d’art.
            </p>

            <button
              onClick={handleDownload}
              className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-gold-gradient text-black font-semibold text-xs tracking-wider uppercase rounded-lg shadow-lg hover:brightness-110 active:scale-95 transition-all"
            >
              <Download className="w-4 h-4" />
              Télécharger le Logo HD
            </button>
          </div>

          {/* Brand Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-[#181a1f] border border-zinc-800">
              <div className="flex items-center gap-2 text-[#d4af37] mb-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Authenticité</span>
              </div>
              <p className="text-xs text-zinc-400 leading-normal">
                Chaque sac et soulier fait l’objet d’un contrôle d’authenticité rigoureux en 12 points par nos maîtres maroquiniers.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#181a1f] border border-zinc-800">
              <div className="flex items-center gap-2 text-[#d4af37] mb-1.5">
                <Palette className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Charte Graphique</span>
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <div className="w-5 h-5 rounded-full bg-[#d4af37] border border-white/20" title="Or Impérial #D4AF37" />
                <div className="w-5 h-5 rounded-full bg-[#0c0d0e] border border-zinc-700" title="Noir Onyx #0C0D0E" />
                <div className="w-5 h-5 rounded-full bg-[#f4f2ee] border border-zinc-400" title="Blanc Soie #F4F2EE" />
                <div className="w-5 h-5 rounded-full bg-[#ff5200] border border-white/20" title="Orange Signature #FF5200" />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#181a1f] border border-zinc-800">
              <div className="flex items-center gap-2 text-[#d4af37] mb-1.5">
                <Check className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Maroquinerie & Souliers</span>
              </div>
              <p className="text-xs text-zinc-400 leading-normal">
                Sélection triée sur le volet des plus grandes maisons de luxe et créations exclusives Coumbista Atelier.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-4 bg-[#0d0e11] border-t border-zinc-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-zinc-300 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
