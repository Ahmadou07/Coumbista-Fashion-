import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { BrandLogoModal } from './components/BrandLogoModal';
import { ConciergeBar } from './components/ConciergeBar';
import { Footer } from './components/Footer';
import { PRODUCTS, LOGO_URL } from './data/products';
import { Product, ProductCategory, Currency, CartItem, Brand } from './types';
import { Sparkles, Filter, SlidersHorizontal, ArrowUpDown, Check, RefreshCw, Tag } from 'lucide-react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<'all' | '25k-45k' | '45k-75k' | '75k-100k'>('all');
  const [currency, setCurrency] = useState<Currency>('XOF');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  // Modals and Drawers
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);

  // Cart & Wishlist state
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: PRODUCTS[0], // Birkin & Kelly (95 000 FCFA)
      quantity: 1,
      selectedColor: 'Bleu Céleste',
    },
    {
      product: PRODUCTS[7], // Louboutin So Kate (45 000 FCFA)
      quantity: 1,
      selectedColor: 'Noir Vernis & Rouge',
      selectedSize: '38',
    }
  ]);

  const [wishlist, setWishlist] = useState<Product[]>([PRODUCTS[6]]); // Manolo Blahnik Hangisi

  // Quick toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Cart actions
  const handleAddToCart = (product: Product, selectedColor?: string, selectedSize?: string) => {
    const color = selectedColor || product.colors[0] || 'Standard';
    const size = selectedSize || (product.sizes ? product.sizes[0] : undefined);

    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === color &&
          item.selectedSize === size
      );

      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += 1;
        return updated;
      } else {
        return [...prevCart, { product, quantity: 1, selectedColor: color, selectedSize: size }];
      }
    });

    showToast(`✓ ${product.name} ajouté au panier`);
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(index);
      return;
    }
    setCart((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, idx) => idx !== index));
    showToast('Article retiré du panier');
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist actions
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast('Retiré des coups de cœur');
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(`♥ ${product.name} ajouté aux coups de cœur`);
        return [...prev, product];
      }
    });
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
  };

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Brand filter
      if (selectedBrand !== 'all' && product.brand !== selectedBrand) {
        return false;
      }
      // Price range filter
      if (selectedPriceRange === '25k-45k') {
        if (product.priceFCFA < 25000 || product.priceFCFA > 45000) return false;
      } else if (selectedPriceRange === '45k-75k') {
        if (product.priceFCFA <= 45000 || product.priceFCFA > 75000) return false;
      } else if (selectedPriceRange === '75k-100k') {
        if (product.priceFCFA <= 75000 || product.priceFCFA > 100000) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesBrand = product.brand.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesMaterials = product.materials.toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesDesc && !matchesMaterials) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceFCFA - b.priceFCFA;
      if (sortBy === 'price-desc') return b.priceFCFA - a.priceFCFA;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, selectedBrand, selectedPriceRange, searchQuery, sortBy]);

  // Brand list for filters
  const brands: string[] = ['all', 'Hermès', 'Louis Vuitton', 'Fendi', 'Christian Louboutin', 'Manolo Blahnik', 'Coumbista Atelier'];

  const totalCartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-[#f4f2ee] flex flex-col selection:bg-[#c9a349] selection:text-black">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 bg-[#16171b] border border-[#d4af37] text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation */}
      <Navbar
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setSelectedBrand('all');
          setSelectedPriceRange('all');
        }}
        currency={currency}
        onChangeCurrency={setCurrency}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={totalCartItemsCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenBrandModal={() => setIsBrandModalOpen(true)}
      />

      {/* Hero Banner with editorial visual */}
      <HeroBanner
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const el = document.getElementById('catalog-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenBrandModal={() => setIsBrandModalOpen(true)}
      />

      {/* Main Catalog Section */}
      <main id="catalog-section" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Price Transparency Banner */}
        <div className="mb-8 p-3.5 rounded-xl bg-gradient-to-r from-[#17181d] via-[#20222a] to-[#17181d] border border-[#c9a349]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#d4af37]/15 text-[#d4af37] flex items-center justify-center shrink-0">
              <Tag className="w-4 h-4" />
            </div>
            <div>
              <span className="font-semibold text-white">Tarifs Coumbista Fashion : </span>
              <span className="text-[#d4af37] font-medium">Prix exclusifs compris entre 25 000 FCFA et 100 000 FCFA</span>
              <span className="text-zinc-400 hidden sm:inline"> selon les modèles et finitions des maisons.</span>
            </div>
          </div>
          <div className="text-[11px] text-zinc-400">
            Paiement Wave & Orange Money acceptés
          </div>
        </div>

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Haute Maroquinerie & Souliers d'Art</span>
            </div>
            <h2 className="font-luxury font-serif text-3xl sm:text-4xl text-white font-bold">
              {selectedCategory === 'all'
                ? 'Nos Collections Signatures'
                : selectedCategory === 'bags'
                ? 'Sacs & Maroquinerie'
                : 'Souliers & Escarpins'}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Des prix accessibles et compétitifs pour des finitions d'exception (25 000 à 100 000 FCFA)
            </p>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-zinc-500 uppercase tracking-wider text-[10px]">Trier par :</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Trier les produits"
                className="bg-[#16171b] border border-zinc-700 hover:border-[#d4af37] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none cursor-pointer"
              >
                <option value="featured">Sélection Coumbista</option>
                <option value="price-asc">Prix : Croissant (25k → 100k)</option>
                <option value="price-desc">Prix : Décroissant (100k → 25k)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Interactive Filter Controls Bar */}
        <div className="space-y-4 pb-6 mb-8 border-b border-zinc-800">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1 p-1 bg-[#141518] rounded-xl border border-zinc-800">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-gold-gradient text-black shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Tous ({PRODUCTS.length})
              </button>
              <button
                onClick={() => setSelectedCategory('bags')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                  selectedCategory === 'bags'
                    ? 'bg-gold-gradient text-black shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Sacs à main ({PRODUCTS.filter((p) => p.category === 'bags').length})
              </button>
              <button
                onClick={() => setSelectedCategory('shoes')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                  selectedCategory === 'shoes'
                    ? 'bg-gold-gradient text-black shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Chaussures & Escarpins ({PRODUCTS.filter((p) => p.category === 'shoes').length})
              </button>
            </div>

            {/* Price Range Filter Pills */}
            <div className="flex items-center gap-1 bg-[#141518] p-1 rounded-xl border border-zinc-800 text-xs">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest px-2 hidden sm:inline">
                Budget :
              </span>
              <button
                onClick={() => setSelectedPriceRange('all')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedPriceRange === 'all'
                    ? 'bg-[#252830] text-[#d4af37] font-semibold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Tous
              </button>
              <button
                onClick={() => setSelectedPriceRange('25k-45k')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedPriceRange === '25k-45k'
                    ? 'bg-[#252830] text-[#d4af37] font-semibold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                25k - 45k
              </button>
              <button
                onClick={() => setSelectedPriceRange('45k-75k')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedPriceRange === '45k-75k'
                    ? 'bg-[#252830] text-[#d4af37] font-semibold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                45k - 75k
              </button>
              <button
                onClick={() => setSelectedPriceRange('75k-100k')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedPriceRange === '75k-100k'
                    ? 'bg-[#252830] text-[#d4af37] font-semibold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                75k - 100k
              </button>
            </div>
          </div>

          {/* Brand Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest mr-1 shrink-0">
              Maison :
            </span>
            {brands.map((b) => (
              <button
                key={b}
                onClick={() => setSelectedBrand(b)}
                className={`px-2.5 py-1 text-xs rounded-lg transition-all shrink-0 ${
                  selectedBrand === b
                    ? 'border border-[#d4af37] bg-[#22242a] text-[#d4af37] font-semibold'
                    : 'border border-zinc-800 bg-[#121316] text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
              >
                {b === 'all' ? 'Toutes les Maisons' : b}
              </button>
            ))}
          </div>
        </div>

        {/* Active Filters Summary if filtered */}
        {(selectedCategory !== 'all' || selectedBrand !== 'all' || selectedPriceRange !== 'all' || searchQuery.trim()) && (
          <div className="flex items-center justify-between mb-6 p-3 rounded-lg bg-[#141519] border border-zinc-800 text-xs">
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="text-[#d4af37] font-medium">{filteredProducts.length}</span>
              <span>modèles correspondent à vos critères</span>
              {selectedPriceRange !== 'all' && (
                <span>dans la tranche {selectedPriceRange === '25k-45k' ? '25 000 - 45 000 FCFA' : selectedPriceRange === '45k-75k' ? '45 000 - 75 000 FCFA' : '75 000 - 100 000 FCFA'}</span>
              )}
              {searchQuery && (
                <span>pour « {searchQuery} »</span>
              )}
            </div>

            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedBrand('all');
                setSelectedPriceRange('all');
                setSearchQuery('');
              }}
              className="text-xs text-[#d4af37] hover:underline flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Réinitialiser les filtres</span>
            </button>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center text-zinc-400">
            <p className="text-base text-zinc-300 font-medium mb-2">Aucune pièce trouvée dans cette sélection</p>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto mb-6">
              Modifiez vos filtres de prix ou contactez notre conciergerie privée pour commander un modèle sur mesure.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedBrand('all');
                setSelectedPriceRange('all');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 bg-[#181a1f] border border-[#c9a349]/40 text-[#d4af37] text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#202228]"
            >
              Afficher toute la collection (25 000 à 100 000 FCFA)
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currency={currency}
                isWishlisted={wishlist.some((w) => w.id === product.id)}
                onToggleWishlist={handleToggleWishlist}
                onOpenQuickView={setActiveProductModal}
                onAddToCart={(prod) => handleAddToCart(prod)}
              />
            ))}
          </div>
        )}

        {/* Haute Couture Lookbook Feature Box: "L'Accord Parfait Coumbista" */}
        <section className="mt-20 p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-[#15161b] via-[#101114] to-[#0a0a0c] border border-[#c9a349]/30 relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#d4af37] mb-3">
              <Sparkles className="w-4 h-4" />
              <span>Stylisme & Duos Emblématiques</span>
            </div>
            <h3 className="font-luxury font-serif text-3xl sm:text-4xl text-white font-bold leading-tight mb-4">
              L'Harmonie du Sac et du Soulier
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
              Chez <strong>Coumbista Fashion</strong>, l'art du port altier repose sur la correspondance subtile entre maroquinerie d'art et cambrure de souliers. Associez le sublime <strong>Birkin Bleu Céleste (85 000 FCFA)</strong> aux scintillants escarpins <strong>Manolo Blahnik Hangisi (50 000 FCFA)</strong> en satin bleu, ou mariez le mythique <strong>Kelly 28 Noir (80 000 FCFA)</strong> à la séduction tranchante des escarpins <strong>Louboutin So Kate (45 000 FCFA)</strong> semelle rouge.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedPriceRange('all');
                  const el = document.getElementById('catalog-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-gold-gradient text-black font-semibold text-xs tracking-wider uppercase rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-lg"
              >
                Explorer Toute la Collection
              </button>
              <button
                onClick={() => setIsBrandModalOpen(true)}
                className="px-5 py-3 text-zinc-300 hover:text-white border border-zinc-700 hover:border-[#d4af37] text-xs font-semibold tracking-wider uppercase rounded-xl transition-all"
              >
                Découvrir l'Atelier Coumbista
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Concierge WhatsApp Widget */}
      <ConciergeBar />

      {/* Footer */}
      <Footer onOpenBrandModal={() => setIsBrandModalOpen(true)} />

      {/* Product Detail Modal */}
      <ProductModal
        product={activeProductModal}
        currency={currency}
        isWishlisted={
          activeProductModal ? wishlist.some((w) => w.id === activeProductModal.id) : false
        }
        onClose={() => setActiveProductModal(null)}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        currency={currency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        currency={currency}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onAddToCart={(prod) => handleAddToCart(prod)}
        onOpenQuickView={setActiveProductModal}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        currency={currency}
        onClearCart={handleClearCart}
      />

      {/* Brand & Logo Kit Modal */}
      <BrandLogoModal
        isOpen={isBrandModalOpen}
        onClose={() => setIsBrandModalOpen(false)}
      />
    </div>
  );
}
