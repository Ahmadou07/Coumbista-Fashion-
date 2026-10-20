import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, CreditCard, Smartphone, Building, Lock } from 'lucide-react';
import { CartItem, Currency } from '../types';
import { formatPrice } from '../data/products';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: Currency;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onClearCart,
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'mobile_money' | 'wire'>('card');
  const [formData, setFormData] = useState({
    name: 'Amina Diop',
    email: 'amina.diop@example.com',
    phone: '+221 77 123 45 67',
    address: 'Les Almadies, Villa 42',
    city: 'Dakar',
    country: 'Sénégal',
    notes: 'Livraison en mains propres avec signature s’il vous plaît.'
  });
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const totalFCFA = items.reduce((sum, item) => sum + item.product.priceFCFA * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `CBF-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setStep('success');
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div 
        className="relative w-full max-w-2xl bg-[#121316] border border-[#c9a349]/40 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#d4af37]" />
            <h3 className="font-luxury font-serif text-lg tracking-wider uppercase text-white">
              {step === 'form' ? 'Finaliser votre Commande Coumbista' : 'Confirmation de Commande'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="p-6 max-h-[80vh] overflow-y-auto space-y-5">
            {/* Order Recap Banner */}
            <div className="p-3.5 rounded-xl bg-[#17181c] border border-zinc-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-zinc-400">Total de votre commande ({items.length} articles) :</span>
                <p className="text-base font-bold text-gold-gradient">{formatPrice(totalFCFA, currency)}</p>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-[#d4af37] font-medium">Livraison Haute Sécurité Offerte</span>
              </div>
            </div>

            {/* Delivery Details */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                1. Coordonnées de Livraison
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-zinc-400 block mb-1">Nom complet</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-[#18191e] border border-zinc-700 rounded-lg text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-zinc-400 block mb-1">Email pour confirmation</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-[#18191e] border border-zinc-700 rounded-lg text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-zinc-400 block mb-1">Numéro Téléphone / WhatsApp</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-[#18191e] border border-zinc-700 rounded-lg text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-zinc-400 block mb-1">Pays de livraison</label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3 py-2 bg-[#18191e] border border-zinc-700 rounded-lg text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="Sénégal">Sénégal (Dakar & Régions)</option>
                    <option value="Côte d'Ivoire">Côte d'Ivoire (Abidjan)</option>
                    <option value="France">France (Paris & International)</option>
                    <option value="Mali">Mali (Bamako)</option>
                    <option value="Gabon">Gabon (Libreville)</option>
                    <option value="Cameroun">Cameroun (Douala / Yaoundé)</option>
                    <option value="États-Unis">États-Unis (USA)</option>
                    <option value="Émirats Arabes Unis">Émirats Arabes Unis (Dubaï)</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[11px] text-zinc-400 block mb-1">Adresse de livraison & Ville</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 bg-[#18191e] border border-zinc-700 rounded-lg text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-3 pt-3 border-t border-zinc-800">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                2. Mode de Règlement Sécurisé
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    paymentMethod === 'card'
                      ? 'border-[#d4af37] bg-[#22242a] text-white shadow-md'
                      : 'border-zinc-800 bg-[#16171b] text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-[#d4af37] mb-2" />
                  <span className="text-xs font-semibold">Carte Bancaire</span>
                  <span className="text-[10px] text-zinc-500">Visa, Mastercard, Amex</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('mobile_money')}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    paymentMethod === 'mobile_money'
                      ? 'border-[#d4af37] bg-[#22242a] text-white shadow-md'
                      : 'border-zinc-800 bg-[#16171b] text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-[#d4af37] mb-2" />
                  <span className="text-xs font-semibold">Wave / Orange Money</span>
                  <span className="text-[10px] text-zinc-500">Paiement Mobile Immédiat</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('wire')}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    paymentMethod === 'wire'
                      ? 'border-[#d4af37] bg-[#22242a] text-white shadow-md'
                      : 'border-zinc-800 bg-[#16171b] text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <Building className="w-5 h-5 text-[#d4af37] mb-2" />
                  <span className="text-xs font-semibold">Virement Bancaire VIP</span>
                  <span className="text-[10px] text-zinc-500">Facture & RIB Proforma</span>
                </button>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs text-zinc-400 hover:text-white"
              >
                Retour au panier
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gold-gradient text-black font-semibold text-xs tracking-wider uppercase rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-lg flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-black" />
                <span>Confirmer & Payer {formatPrice(totalFCFA, currency)}</span>
              </button>
            </div>
          </form>
        ) : (
          /* Order Confirmation View */
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle className="w-9 h-9" />
            </div>

            <div>
              <h4 className="font-luxury font-serif text-2xl text-white font-bold mb-1">
                Félicitations, votre commande est validée !
              </h4>
              <p className="text-xs text-zinc-400">
                Numéro de commande privée : <strong className="text-[#d4af37] tracking-wider">{orderId}</strong>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#17181c] border border-zinc-800 text-left max-w-md mx-auto text-xs text-zinc-300 space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-500">Destinataire :</span>
                <span className="font-medium text-white">{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Destination :</span>
                <span className="font-medium text-white">{formData.city}, {formData.country}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Mode de paiement :</span>
                <span className="font-medium text-[#d4af37]">
                  {paymentMethod === 'card' ? 'Carte Bancaire Sécurisée' : paymentMethod === 'mobile_money' ? 'Wave / Orange Money' : 'Virement Bancaire VIP'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Notification :</span>
                <span className="text-emerald-400">Dossier transmis au Concierge VIP</span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              Un e-mail de confirmation ainsi qu'un message WhatsApp de suivi personnalisé vous ont été envoyés avec le certificat d'authenticité Coumbista Fashion.
            </p>

            <button
              onClick={onClose}
              className="mt-2 px-8 py-3 bg-gold-gradient text-black font-semibold text-xs tracking-wider uppercase rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-lg"
            >
              Retourner à la Boutique
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
