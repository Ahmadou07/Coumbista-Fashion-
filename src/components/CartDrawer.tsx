import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, ShoppingBag } from 'lucide-react';
import { CartItem, Currency } from '../types';
import { formatPrice } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: Currency;
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const rawSubtotalFCFA = items.reduce(
    (sum, item) => sum + item.product.priceFCFA * item.quantity,
    0
  );

  const discountPercent = appliedPromo === 'COUMBISTA10' ? 0.1 : 0;
  const discountFCFA = rawSubtotalFCFA * discountPercent;
  const finalTotalFCFA = rawSubtotalFCFA - discountFCFA;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (promoCode.trim().toUpperCase() === 'COUMBISTA10') {
      setAppliedPromo('COUMBISTA10');
      setPromoCode('');
    } else {
      setPromoError('Code promo invalide. Essayez COUMBISTA10');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#111215] border-l border-[#24262b] text-white flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#d4af37]" />
              <h3 className="font-luxury font-serif text-xl tracking-wider uppercase text-white">
                Votre Panier Coumbista
              </h3>
              <span className="text-xs text-zinc-400">({items.length})</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
              aria-label="Fermer le panier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-400">
                <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4 text-zinc-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-sm font-medium text-zinc-300 mb-1">Votre panier est vide</p>
                <p className="text-xs text-zinc-500 max-w-xs mb-6">
                  Explorez nos collections exclusives de sacs de luxe et de souliers haute couture.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-[#1b1d22] border border-[#c9a349]/40 text-[#d4af37] text-xs font-semibold tracking-wider uppercase rounded-lg hover:bg-[#22242b]"
                >
                  Découvrir les collections
                </button>
              </div>
            ) : (
              items.map((item, index) => (
                <div
                  key={`${item.product.id}-${index}`}
                  className="flex gap-3.5 p-3 rounded-xl bg-[#16171b] border border-zinc-800/80"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-black shrink-0 border border-zinc-800">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[10px] font-semibold text-[#d4af37] uppercase tracking-wider">
                          {item.product.brand}
                        </span>
                        <button
                          onClick={() => onRemoveItem(index)}
                          className="text-zinc-500 hover:text-red-400 p-0.5"
                          aria-label="Supprimer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4 className="text-xs font-medium text-white line-clamp-1 leading-snug">
                        {item.product.name}
                      </h4>

                      <div className="text-[11px] text-zinc-400 mt-0.5 space-x-2">
                        <span>{item.selectedColor}</span>
                        {item.selectedSize && <span>· Pointure {item.selectedSize}</span>}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-800">
                      <div className="flex items-center border border-zinc-700 rounded-md bg-[#101114]">
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                          className="p-1 text-zinc-400 hover:text-white"
                          aria-label="Diminuer la quantité"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                          className="p-1 text-zinc-400 hover:text-white"
                          aria-label="Augmenter la quantité"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-bold text-white">
                        {formatPrice(item.product.priceFCFA * item.quantity, currency)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Summary & Checkout */}
          {items.length > 0 && (
            <div className="p-5 border-t border-zinc-800 bg-[#0d0e11] space-y-4">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Code promo (ex: COUMBISTA10)"
                      className="w-full pl-8 pr-2 py-1.5 bg-[#17181c] border border-zinc-700 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-white rounded-lg transition-colors"
                  >
                    Appliquer
                  </button>
                </div>
                {appliedPromo && (
                  <p className="text-[11px] text-emerald-400">
                    ✓ Code {appliedPromo} appliqué (-10%)
                  </p>
                )}
                {promoError && (
                  <p className="text-[11px] text-red-400">{promoError}</p>
                )}
              </form>

              {/* Price Calculation */}
              <div className="space-y-1.5 text-xs text-zinc-400">
                <div className="flex justify-between">
                  <span>Sous-total :</span>
                  <span className="text-white font-medium">
                    {formatPrice(rawSubtotalFCFA, currency)}
                  </span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Remise privilège (10%) :</span>
                    <span>-{formatPrice(discountFCFA, currency)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Livraison assurée :</span>
                  <span className="text-[#d4af37] font-semibold">Offerte (Monde)</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-zinc-800">
                  <span>Total :</span>
                  <span className="text-base text-gold-gradient">
                    {formatPrice(finalTotalFCFA, currency)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 px-4 bg-gold-gradient text-black font-semibold text-xs tracking-wider uppercase rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-2"
              >
                <span>Passer la Commande Sécurisée</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-500">
                <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Paiement 100% Crypté · Expédition sous 24h</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
