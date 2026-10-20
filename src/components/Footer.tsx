import React, { useState } from 'react';
import { Mail, CheckCircle, ShieldCheck, Award, MapPin, Sparkles } from 'lucide-react';
import { LOGO_URL } from '../data/products';

interface FooterProps {
  onOpenBrandModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBrandModal }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="w-full bg-[#08090a] border-t border-[#1e2025] text-zinc-400 text-xs">
      {/* Newsletter / Cercle Privé Section */}
      <div className="border-b border-zinc-800/80 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 text-[#d4af37] text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="w-4 h-4" />
            <span>Le Cercle Privé Coumbista</span>
          </div>
          <h3 className="font-luxury font-serif text-2xl sm:text-3xl text-white font-bold">
            Accédez en avant-première aux arrivages de pièces rares
          </h3>
          <p className="text-zinc-400 max-w-lg mx-auto text-xs sm:text-sm">
            Inscrivez-vous pour recevoir nos invitations privées, les nouveautés Birkin, Kelly, monogrammes et souliers haute couture en édition limitée.
          </p>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex gap-2 pt-2">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse email personnelle"
                className="w-full pl-9 pr-3 py-2.5 bg-[#121316] border border-zinc-700 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-gold-gradient text-black font-semibold text-xs tracking-wider uppercase rounded-xl hover:brightness-110 transition-all shrink-0 active:scale-95 shadow-md"
            >
              Rejoindre
            </button>
          </form>

          {subscribed && (
            <p className="text-emerald-400 text-xs flex items-center justify-center gap-1.5 pt-1">
              <CheckCircle className="w-4 h-4" />
              Bienvenue dans le Cercle Privé Coumbista Fashion. Votre invitation a été expédiée.
            </p>
          )}
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand presentation */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#c9a349]/50 shadow-md bg-black">
              <img
                src={LOGO_URL}
                alt="Logo Coumbista Fashion"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-luxury font-serif text-xl tracking-[0.15em] uppercase text-gold-gradient font-bold">
              COUMBISTA FASHION
            </span>
          </div>

          <p className="text-zinc-400 leading-relaxed text-xs">
            Maison dédiée à la célébration de l’élégance féminine. Sélection des plus illustres maisons de maroquinerie et souliers de prestige au confluent des capitales de la mode.
          </p>

          <button
            onClick={onOpenBrandModal}
            className="text-[11px] font-semibold text-[#d4af37] hover:underline flex items-center gap-1"
          >
            Consulter le Logo & l'Identité de Marque →
          </button>
        </div>

        {/* Salons & Boutiques */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Nos Salons & Boutiques</span>
          </h4>
          <ul className="space-y-2.5 text-xs text-zinc-400">
            <li>
              <strong className="text-zinc-200">Dakar :</strong> Les Almadies, Route des Ambassades
            </li>
            <li>
              <strong className="text-zinc-200">Paris :</strong> 14 Rue de la Paix, Place Vendôme
            </li>
            <li>
              <strong className="text-zinc-200">Abidjan :</strong> Boulevard de Marseille, Zone 4
            </li>
            <li>
              <strong className="text-zinc-200">Milan :</strong> Via Montenapoleone 8
            </li>
          </ul>
        </div>

        {/* Services Conciergerie */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
            Services & Engagements
          </h4>
          <ul className="space-y-2 text-xs text-zinc-400">
            <li className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Certificat d’Authenticité Physique & NFT</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Contrôle Expert en 12 Points d’Or</span>
            </li>
            <li>Expédition sous scellé sécurisé</li>
            <li>Essayage privé sur rendez-vous</li>
            <li>Conseil stylisme & recherche de modèles rares</li>
          </ul>
        </div>

        {/* Legal & Security */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
            Moyens de Paiement Sécurisés
          </h4>
          <div className="flex flex-wrap gap-2 text-[10px] text-zinc-300 mb-4">
            <span className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded">Wave Mobile</span>
            <span className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded">Orange Money</span>
            <span className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded">Visa / Mastercard</span>
            <span className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded">Apple Pay</span>
            <span className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded">Virement VIP</span>
          </div>
          <p className="text-[11px] text-zinc-500 leading-normal">
            Transactions chiffrées SSL 256 bits. Les marques citées appartiennent à leurs maisons respectives.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-900 py-6 px-4 sm:px-6 lg:px-8 text-center text-[11px] text-zinc-500">
        <p>© 2026 Coumbista Fashion Paris. Tous droits réservés. Haute Maroquinerie & Souliers d'Exception.</p>
      </div>
    </footer>
  );
};
