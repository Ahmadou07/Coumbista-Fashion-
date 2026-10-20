import React, { useState } from 'react';
import { X, Heart, ShoppingBag, ShieldCheck, Truck, Sparkles, MessageCircle, Ruler, Check } from 'lucide-react';
import { Product, Currency } from '../types';
import { formatPrice } from '../data/products';

interface ProductModalProps {
  product: Product | null;
  currency: Currency;
  isWishlisted: boolean;
  onClose: () => void;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, selectedColor: string, selectedSize?: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  currency,
  isWishlisted,
  onClose,
  onToggleWishlist,
  onAddToCart,
}) => {
  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || 'Original');
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes ? product.sizes[0] : ''
  );
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedColor, selectedSize || undefined);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1800);
  };

  const handleWhatsAppOrder = () => {
    const formattedPrice = formatPrice(product.priceFCFA, currency);
    const message = encodeURIComponent(
      `Bonjour Coumbista Fashion Paris,\nJe souhaite commander la pièce suivante :\n- Modèle : ${product.name}\n- Maison : ${product.brand}\n- Couleur : ${selectedColor}\n${selectedSize ? `- Pointure / Format : ${selectedSize}\n` : ''}- Prix : ${formattedPrice}\n\nMerci de me contacter pour finaliser ma commande VIP.`
    );
    // WhatsApp direct conciergerie link
    window.open(`https://wa.me/33700000000?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
      <div
        className="relative w-full max-w-4xl bg-[#121316] border border-[#c9a349]/35 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-zinc-400 hover:text-white rounded-full bg-black/60 hover:bg-black/90 transition-colors"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[85vh] overflow-y-auto">
          {/* Left: Gallery */}
          <div className="p-4 sm:p-6 bg-[#0a0a0c] flex flex-col justify-between">
            {/* Active Image */}
            <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-zinc-800 bg-black flex items-center justify-center">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />

              {product.badge && (
                <div className="absolute top-3 left-3 bg-black/80 border border-[#c9a349]/40 text-[#d4af37] text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-sm">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Thumbnails if multiple images */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden border shrink-0 transition-all ${
                      activeImageIndex === idx
                        ? 'border-[#d4af37] ring-1 ring-[#d4af37]'
                        : 'border-zinc-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} angle ${idx + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Authenticity Guarantee Note */}
            <div className="mt-4 p-3 rounded-lg bg-[#141519] border border-zinc-800 flex items-center gap-2.5 text-xs text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-[#d4af37] shrink-0" />
              <span>Garantie Authenticité & Écrin d'origine certifié par Coumbista</span>
            </div>
          </div>

          {/* Right: Details & Buying Flow */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Brand and category kicker */}
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-2">
                <span>{product.brand}</span>
                <span className="text-zinc-600">·</span>
                <span className="text-zinc-400">
                  {product.category === 'bags' ? 'Haute Maroquinerie' : 'Souliers Féminins'}
                </span>
              </div>

              {/* Title */}
              <h2 className="font-luxury font-serif text-2xl sm:text-3xl text-white font-bold leading-tight mb-3">
                {product.name}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-5">
                <span className="text-2xl font-bold text-white tracking-wide">
                  {formatPrice(product.priceFCFA, currency)}
                </span>
                {product.originalPriceFCFA && (
                  <span className="text-sm text-zinc-500 line-through">
                    {formatPrice(product.originalPriceFCFA, currency)}
                  </span>
                )}
                <span className="text-[11px] text-zinc-400 bg-zinc-800/60 px-2 py-0.5 rounded">
                  Stock disponible
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-5">
                {product.description}
              </p>

              {/* Color Options */}
              {product.colors.length > 0 && (
                <div className="mb-5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2 block">
                    Finitions & Teinte : <span className="text-[#d4af37] font-normal">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedColor(c)}
                        className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                          selectedColor === c
                            ? 'border-[#d4af37] bg-[#22242a] text-white font-medium shadow'
                            : 'border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Shoe Size Options */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                      Pointure Italienne (EU)
                    </label>
                    <span className="text-[11px] text-[#d4af37] flex items-center gap-1">
                      <Ruler className="w-3 h-3" />
                      Guide des pointures
                    </span>
                  </div>
                  <div className="grid grid-cols-5 gap-1.5">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`py-2 text-xs font-medium rounded-lg border transition-all ${
                          selectedSize === sz
                            ? 'border-[#d4af37] bg-[#d4af37] text-black font-bold'
                            : 'border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Specifications List */}
              <div className="space-y-2 py-4 border-t border-zinc-800 text-xs text-zinc-400">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Matières :</span>
                  <span className="text-zinc-200 font-medium">{product.materials}</span>
                </div>
                {product.dimensions && (
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Dimensions :</span>
                    <span className="text-zinc-200 font-medium">{product.dimensions}</span>
                  </div>
                )}
                {product.heelHeight && (
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Hauteur de talon :</span>
                    <span className="text-zinc-200 font-medium">{product.heelHeight}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-zinc-800 space-y-2.5">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAdd}
                  disabled={addedAnimation}
                  className="flex-1 py-3 px-4 bg-gold-gradient text-black font-semibold text-xs tracking-wider uppercase rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4 text-black" />
                      <span>Ajouté au Panier !</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Ajouter au Panier</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3 rounded-xl border transition-colors ${
                    isWishlisted
                      ? 'border-[#d4af37] bg-[#d4af37] text-black'
                      : 'border-zinc-800 bg-[#16171a] text-zinc-300 hover:text-white'
                  }`}
                  aria-label="Ajouter aux favoris"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-black' : ''}`} />
                </button>
              </div>

              {/* WhatsApp VIP Concierge Order */}
              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-2.5 px-4 bg-[#1e2d24] hover:bg-[#25392d] text-[#4ade80] border border-[#4ade80]/30 rounded-xl text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Commander directement via Concierge WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
