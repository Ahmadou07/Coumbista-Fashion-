import React from 'react';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { Product, Currency } from '../types';
import { formatPrice } from '../data/products';

interface ProductCardProps {
  product: Product;
  currency: Currency;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onOpenQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  isWishlisted,
  onToggleWishlist,
  onOpenQuickView,
  onAddToCart,
}) => {
  return (
    <div className="group flex flex-col bg-[#121316] border border-[#22242a] hover:border-[#c9a349]/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/50">
      {/* Product Image Stage */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#0a0a0c]">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
        />

        {/* Subtle Badge as clean corner label (not candy pill) */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-[#0a0a0c]/85 border border-[#c9a349]/40 text-[#d4af37] text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-sm backdrop-blur-md">
            {product.badge}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
            isWishlisted
              ? 'bg-[#d4af37] text-black shadow-md'
              : 'bg-black/60 text-white hover:text-[#d4af37] hover:bg-black/80'
          }`}
          aria-label={isWishlisted ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-black' : ''}`} />
        </button>

        {/* Quick View & Actions Overlay on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
          <button
            onClick={() => onOpenQuickView(product)}
            className="flex-1 py-2.5 px-3 bg-[#0c0d0e]/95 hover:bg-black text-white text-xs font-medium uppercase tracking-wider rounded-lg border border-zinc-700 hover:border-[#d4af37] flex items-center justify-center gap-1.5 backdrop-blur-md transition-all shadow-lg"
          >
            <Eye className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Aperçu</span>
          </button>

          <button
            onClick={() => onAddToCart(product)}
            className="p-2.5 bg-gold-gradient text-black rounded-lg hover:brightness-110 transition-all shadow-lg active:scale-95"
            title="Ajouter au Panier"
            aria-label="Ajouter au panier"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Info */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Brand & Category Kicker (Quiet clean text, no pills per constitution) */}
          <div className="flex items-center gap-2 text-[11px] text-zinc-400 uppercase tracking-widest mb-1.5">
            <span className="font-semibold text-[#d4af37]">{product.brand}</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>{product.category === 'bags' ? 'Haute Maroquinerie' : 'Souliers'}</span>
          </div>

          {/* Product Title */}
          <h2
            onClick={() => onOpenQuickView(product)}
            className="font-luxury font-serif text-base text-zinc-100 hover:text-[#d4af37] transition-colors cursor-pointer line-clamp-1 font-semibold leading-snug mb-1"
          >
            {product.name}
          </h2>

          {/* Spec details teaser */}
          <p className="text-xs text-zinc-400 line-clamp-1 mb-3">
            {product.dimensions || (product.heelHeight ? `Talon ${product.heelHeight}` : product.materials)}
          </p>
        </div>

        {/* Pricing & Availability */}
        <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-semibold text-white tracking-wide">
                {formatPrice(product.priceFCFA, currency)}
              </span>
              {product.originalPriceFCFA && (
                <span className="text-xs text-zinc-500 line-through">
                  {formatPrice(product.originalPriceFCFA, currency)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-zinc-400">TVA & Authenticité Incluses</span>
          </div>

          <button
            onClick={() => onOpenQuickView(product)}
            className="text-[11px] font-medium text-[#d4af37] hover:underline flex items-center gap-1"
          >
            Détails
          </button>
        </div>
      </div>
    </div>
  );
};
