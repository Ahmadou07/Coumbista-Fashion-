import React from 'react';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
import { Product, Currency } from '../types';
import { formatPrice } from '../data/products';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  currency: Currency;
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onOpenQuickView: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  currency,
  onRemoveFromWishlist,
  onAddToCart,
  onOpenQuickView,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#111215] border-l border-[#24262b] text-white flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#d4af37] fill-[#d4af37]" />
              <h3 className="font-luxury font-serif text-xl tracking-wider uppercase text-white">
                Vos Coups de Cœur
              </h3>
              <span className="text-xs text-zinc-400">({wishlist.length})</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
              aria-label="Fermer les favoris"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlist.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-400">
                <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4 text-zinc-600">
                  <Heart className="w-8 h-8" />
                </div>
                <p className="text-sm font-medium text-zinc-300 mb-1">Aucun coup de cœur pour le moment</p>
                <p className="text-xs text-zinc-500 max-w-xs mb-6">
                  Sauvegardez vos sacs à main et escarpins favoris pour les retrouver à tout moment.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-[#1b1d22] border border-[#c9a349]/40 text-[#d4af37] text-xs font-semibold tracking-wider uppercase rounded-lg hover:bg-[#22242b]"
                >
                  Explorer la Collection
                </button>
              </div>
            ) : (
              wishlist.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-3.5 p-3 rounded-xl bg-[#16171b] border border-zinc-800/80"
                >
                  <div
                    onClick={() => {
                      onOpenQuickView(product);
                      onClose();
                    }}
                    className="w-20 h-20 rounded-lg overflow-hidden bg-black shrink-0 border border-zinc-800 cursor-pointer"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[10px] font-semibold text-[#d4af37] uppercase tracking-wider">
                          {product.brand}
                        </span>
                        <button
                          onClick={() => onRemoveFromWishlist(product.id)}
                          className="text-zinc-500 hover:text-red-400 p-0.5"
                          aria-label="Supprimer des favoris"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4
                        onClick={() => {
                          onOpenQuickView(product);
                          onClose();
                        }}
                        className="text-xs font-medium text-white line-clamp-1 leading-snug cursor-pointer hover:text-[#d4af37]"
                      >
                        {product.name}
                      </h4>

                      <span className="text-xs font-bold text-white mt-1 block">
                        {formatPrice(product.priceFCFA, currency)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-zinc-800">
                      <button
                        onClick={() => {
                          onAddToCart(product);
                          onRemoveFromWishlist(product.id);
                        }}
                        className="flex-1 py-1.5 px-2 bg-gold-gradient text-black rounded-lg text-[11px] font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 hover:brightness-110 active:scale-95 transition-all"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Ajouter au panier</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
