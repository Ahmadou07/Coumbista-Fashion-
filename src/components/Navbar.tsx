import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, Sparkles, Menu, X } from 'lucide-react';
import { LOGO_URL } from '../data/products';
import { Currency, ProductCategory } from '../types';

interface NavbarProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  currency: Currency;
  onChangeCurrency: (currency: Currency) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenBrandModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedCategory,
  onSelectCategory,
  currency,
  onChangeCurrency,
  searchQuery,
  onSearchChange,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenBrandModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0c0d0e]/95 backdrop-blur-md border-b border-[#24262b]">
      {/* Top Bar Announcement */}
      <div className="bg-[#151619] border-b border-[#24262b] text-[11px] text-zinc-400 py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[#d4af37] font-medium tracking-wide">COUMBISTA FASHION EXCLUSIF</span>
            <span className="hidden sm:inline text-zinc-500">·</span>
            <span className="hidden sm:inline">Livraison Express Sécurisée Monde & Certificat d'Authenticité</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Currency Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase text-zinc-500">Devise:</span>
              <div className="flex items-center bg-[#090a0c] border border-zinc-800 rounded px-1 py-0.5">
                {(['XOF', 'EUR', 'USD'] as Currency[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => onChangeCurrency(c)}
                    className={`px-1.5 py-0.5 text-[10px] font-semibold transition-colors rounded-xs ${
                      currency === c
                        ? 'text-[#d4af37] bg-[#22242a]'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {c === 'XOF' ? 'FCFA' : c}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Logo & Kit Modal Trigger */}
            <button
              onClick={onOpenBrandModal}
              className="flex items-center gap-1 text-[11px] text-[#d4af37] hover:text-[#e4c45b] font-medium transition-colors"
              title="Voir le logo et l'identité de marque"
            >
              <Sparkles className="w-3 h-3" />
              <span>Logo & Identité</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => onSelectCategory('all')}>
            <div className="relative group w-12 h-12 rounded-xl overflow-hidden border border-[#c9a349]/50 shadow-md bg-black shrink-0">
              <img
                src={LOGO_URL}
                alt="Logo Coumbista Fashion"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-luxury text-2xl sm:text-2xl font-serif tracking-[0.18em] uppercase text-gold-gradient font-bold leading-tight">
                COUMBISTA
              </span>
              <span className="text-[10px] tracking-[0.35em] uppercase text-zinc-400 font-sans font-medium">
                FASHION · PARIS
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button
              onClick={() => onSelectCategory('all')}
              className={`transition-colors py-1 relative ${
                selectedCategory === 'all'
                  ? 'text-[#d4af37]'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              Collection Complète
              {selectedCategory === 'all' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#d4af37]" />
              )}
            </button>

            <button
              onClick={() => onSelectCategory('bags')}
              className={`transition-colors py-1 relative ${
                selectedCategory === 'bags'
                  ? 'text-[#d4af37]'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              Sacs & Maroquinerie
              {selectedCategory === 'bags' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#d4af37]" />
              )}
            </button>

            <button
              onClick={() => onSelectCategory('shoes')}
              className={`transition-colors py-1 relative ${
                selectedCategory === 'shoes'
                  ? 'text-[#d4af37]'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              Souliers & Escarpins
              {selectedCategory === 'shoes' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#d4af37]" />
              )}
            </button>
          </nav>

          {/* Actions: Search, Wishlist, Cart */}
          <div className="flex items-center gap-3">
            {/* Search Bar / Toggle */}
            <div className="relative">
              {searchOpen ? (
                <div className="flex items-center bg-[#151619] border border-[#c9a349]/40 rounded-lg px-2.5 py-1.5 w-48 sm:w-64 transition-all">
                  <Search className="w-4 h-4 text-zinc-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Chercher sac, soulier, marque..."
                    className="w-full bg-transparent text-xs text-white placeholder-zinc-500 focus:outline-none"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      setSearchOpen(false);
                      onSearchChange('');
                    }}
                    className="text-zinc-400 hover:text-white ml-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-zinc-300 hover:text-[#d4af37] rounded-lg hover:bg-[#1a1b20] transition-colors"
                  aria-label="Rechercher"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 text-zinc-300 hover:text-[#d4af37] rounded-lg hover:bg-[#1a1b20] transition-colors"
              aria-label="Favoris"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#c9a349] text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-[#1c1d22] to-[#26282e] border border-[#c9a349]/40 hover:border-[#c9a349] text-white rounded-lg transition-all active:scale-95"
              aria-label="Panier"
            >
              <ShoppingBag className="w-5 h-5 text-[#d4af37]" />
              <span className="hidden sm:inline text-xs font-semibold tracking-wider uppercase">
                Panier
              </span>
              <span className="w-5 h-5 bg-[#d4af37] text-black text-xs font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden text-zinc-300 hover:text-white rounded-lg hover:bg-[#1a1b20]"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-[#0e0f12] px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-medium">
            <button
              onClick={() => {
                onSelectCategory('all');
                setMobileMenuOpen(false);
              }}
              className={`text-left px-3 py-2 rounded-lg ${
                selectedCategory === 'all' ? 'bg-[#1e2026] text-[#d4af37]' : 'text-zinc-300'
              }`}
            >
              Collection Complète
            </button>

            <button
              onClick={() => {
                onSelectCategory('bags');
                setMobileMenuOpen(false);
              }}
              className={`text-left px-3 py-2 rounded-lg ${
                selectedCategory === 'bags' ? 'bg-[#1e2026] text-[#d4af37]' : 'text-zinc-300'
              }`}
            >
              Sacs & Maroquinerie de Luxe
            </button>

            <button
              onClick={() => {
                onSelectCategory('shoes');
                setMobileMenuOpen(false);
              }}
              className={`text-left px-3 py-2 rounded-lg ${
                selectedCategory === 'shoes' ? 'bg-[#1e2026] text-[#d4af37]' : 'text-zinc-300'
              }`}
            >
              Souliers & Escarpins d'Exception
            </button>

            <button
              onClick={() => {
                onOpenBrandModal();
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded-lg text-[#d4af37] bg-[#1a1811] border border-[#d4af37]/20 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Voir le Logo Officiel & Kit de Marque</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
