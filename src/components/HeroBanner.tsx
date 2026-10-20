import React from 'react';
import { ArrowRight, Sparkles, Shield, Truck, Award } from 'lucide-react';
import { HERO_BANNER_URL, LOGO_URL } from '../data/products';
import { ProductCategory } from '../types';

interface HeroBannerProps {
  onSelectCategory: (category: ProductCategory) => void;
  onOpenBrandModal: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onSelectCategory, onOpenBrandModal }) => {
  return (
    <div className="relative w-full overflow-hidden border-b border-[#24262b] bg-[#0a0a0c]">
      {/* Background Hero Image with Deep Gradient Masks */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_BANNER_URL}
          alt="Coumbista Fashion Salon Haute Couture"
          className="w-full h-full object-cover object-center brightness-60 scale-105 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d0e] via-[#0c0d0e]/60 to-[#0c0d0e]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0d0e] via-[#0c0d0e]/70 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="max-w-2xl">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e2026]/80 border border-[#c9a349]/40 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
            <span className="text-xs font-semibold tracking-widest uppercase text-[#d4af37]">
              Maison de Luxe · Nouvelle Saison
            </span>
          </div>

          <h1 className="font-luxury font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6">
            L'Élégance <span className="text-gold-gradient italic font-normal">Souveraine</span> à vos Pieds & à vos Mains.
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed mb-8 max-w-xl">
            Bienvenue chez <strong>Coumbista Fashion</strong>. Découvrez nos pièces iconiques de maroquinerie de prestige (Birkin, Kelly, Monogram, Peekaboo) et nos souliers haute couture, à des tarifs d’exception compris entre <strong>25 000 FCFA et 100 000 FCFA</strong>.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onSelectCategory('bags')}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-gold-gradient text-black font-semibold text-xs tracking-wider uppercase rounded-xl shadow-xl hover:brightness-110 active:scale-95 transition-all"
            >
              <span>Collection Sacs</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onSelectCategory('shoes')}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#17181d]/90 hover:bg-[#22242a] text-white border border-[#c9a349]/40 hover:border-[#c9a349] font-semibold text-xs tracking-wider uppercase rounded-xl backdrop-blur-md transition-all active:scale-95"
            >
              <span>Escarpins & Souliers</span>
            </button>

            <button
              onClick={onOpenBrandModal}
              className="inline-flex items-center gap-2 px-4 py-3.5 text-zinc-300 hover:text-[#d4af37] text-xs font-medium tracking-wide transition-colors"
            >
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              <span>Découvrir le Logo</span>
            </button>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-zinc-800/80 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#16171b] border border-[#c9a349]/30 flex items-center justify-center shrink-0 text-[#d4af37]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-white">
                Authenticité 100% Garantie
              </h2>
              <p className="text-xs text-zinc-400 mt-1 leading-normal">
                Double certification experte et certificat officiel délivré pour chaque sac et paire.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#16171b] border border-[#c9a349]/30 flex items-center justify-center shrink-0 text-[#d4af37]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-white">
                Livraison Express Monde
              </h2>
              <p className="text-xs text-zinc-400 mt-1 leading-normal">
                Envois sécurisés avec assurance intégrée vers Dakar, Abidjan, Paris, Dubaï et New York.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#16171b] border border-[#c9a349]/30 flex items-center justify-center shrink-0 text-[#d4af37]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-white">
                Service Conciergerie VIP
              </h2>
              <p className="text-xs text-zinc-400 mt-1 leading-normal">
                Assistance privée personnalisée par WhatsApp pour vos commandes et réservations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
