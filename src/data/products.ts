import { Product, Currency } from '../types';

export const LOGO_URL = '/src/assets/images/coumbista_fashion_logo_1792428157279.jpg';
export const HERO_BANNER_URL = '/src/assets/images/coumbista_hero_banner_1792428227210.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'hermes-trio-birkin-kelly',
    name: 'Collection Haute Maroquinerie Birkin & Kelly',
    brand: 'Hermès',
    category: 'bags',
    priceFCFA: 95000,
    originalPriceFCFA: 110000,
    description: 'Trio d’exception de la prestigieuse maison Hermès. Inclut le sublime Birkin 30 en cuir Togo Bleu Céleste, le Birkin 35 Camel gold aux surpiqûres sellier blanches et le légendaire Kelly 28 Noir en cuir Box. Pièces rarissimes livrées complètes avec cadenas, clés gainées, clochette et boîte iconique orange.',
    details: [
      'Cuir de veau Togo grainé souple & cuir Box satiné',
      'Bijouterie en métal argenté palladium guilloché',
      'Fermoir à tourniquet iconique Hermès avec cadenas gravé et clochette',
      'Intérieur doublé en cuir de chèvre ton sur ton avec poches plaquées et zippées',
      'Livré avec boîte orange originale, ruban Bolduc, feutrine de protection et dustbag'
    ],
    materials: '100% Cuir de Veau Véritable (Togo & Box)',
    dimensions: 'Birkin 30 (30 x 22 x 16 cm) / Kelly 28 (28 x 22 x 10 cm)',
    colors: ['Bleu Céleste', 'Camel Gold', 'Noir Ébène'],
    images: [
      '/src/assets/images/hermes_trio_bags_1792428223647.jpg',
      '/src/assets/images/birkin_blue_luxury_1792428249705.jpg',
      '/src/assets/images/kelly_noir_luxury_1792428250460.jpg'
    ],
    badge: 'Iconique',
    inStock: true,
    featured: true
  },
  {
    id: 'birkin-30-bleu-celeste',
    name: 'Sac Birkin 30 Cuir Togo Bleu Céleste Palladium',
    brand: 'Hermès',
    category: 'bags',
    priceFCFA: 85000,
    originalPriceFCFA: 95000,
    description: 'Une nuance azur envoûtante pour ce Birkin 30 d’une rareté absolue. Façonné dans un cuir Togo grainé résistant aux rayures, sublimé par la fraîcheur contemporaine de sa bijouterie en palladium poli et son cadenas frappé du sceau Hermès.',
    details: [
      'Cuir Togo Bleu Céleste d’une souplesse et tenue inégalables',
      'Accastillage en palladium argenté poli miroir',
      'Double poignée en cuir roulé fait main',
      'Poche intérieure zippée et poche plaquée pour smartphone et maquillage',
      'Accompagné du cadenas, des 2 clés, du dustbag et de la boîte orange'
    ],
    materials: '100% Cuir de Veau Togo véritable',
    dimensions: '30 x 22 x 16 cm',
    colors: ['Bleu Céleste'],
    images: [
      '/src/assets/images/birkin_blue_luxury_1792428249705.jpg'
    ],
    badge: 'Coup de Cœur',
    inStock: true,
    featured: false
  },
  {
    id: 'kelly-28-noir-box-sellier',
    name: 'Sac Kelly 28 Sellier Cuir Box Noir d’Ébène',
    brand: 'Hermès',
    category: 'bags',
    priceFCFA: 80000,
    originalPriceFCFA: 90000,
    description: 'La perfection de la coupe Sellier et l’incomparable noblesse du cuir Box noir profond. Ce Kelly 28 offre une allure royale, complétée par une bandoulière cuir amovible pour un porté main ou épaule d’une distinction sans égal.',
    details: [
      'Cuir Box noir au lustre satiné emblématique',
      'Coutures Sellier extérieures d’une rigueur géométrique absolue',
      'Poignée simple supérieure ergonomique et bandoulière assortie',
      'Pieds de fond de sac protecteurs en palladium',
      'Boîte Hermès Paris avec ruban et facture d’origine certifiée'
    ],
    materials: 'Cuir de veau Box véritable',
    dimensions: '28 x 22 x 10 cm',
    colors: ['Noir Ébène'],
    images: [
      '/src/assets/images/kelly_noir_luxury_1792428250460.jpg'
    ],
    badge: 'Iconique',
    inStock: true,
    featured: false
  },
  {
    id: 'lv-monogram-trio-collection',
    name: 'Trio Monogram Signature : Speedy, Neverfull & Manhattan',
    brand: 'Louis Vuitton',
    category: 'bags',
    priceFCFA: 75000,
    originalPriceFCFA: 85000,
    description: 'La quintessence du monogramme Louis Vuitton réunie dans un assortiment de pièces maîtresses : le légendaire Speedy Bandoulière aux anses en cuir de vachette patiné, le cabas Neverfull spacieux avec sa pochette zippée détachable, et le rare sac Manhattan à double poche avant et bandoulière cuir bordeaux.',
    details: [
      'Toile enduite Monogram résistante et intemporelle',
      'Finitions luxueuses en cuir de vachette naturel et cuir grenat bordeaux',
      'Pièces métalliques dorées polies estampillées LV',
      'Cadenas doré avec clé gravée et bandoulières amovibles ajustables',
      'Certificat d’authenticité et dustbag d’origine fournis'
    ],
    materials: 'Toile enduite Monogram & Cuir de vachette naturel',
    dimensions: 'Speedy 30 (30 x 21 x 17 cm) / Neverfull MM (31 x 28 x 14 cm)',
    colors: ['Monogram Marron & Bordeaux', 'Monogram Classique'],
    images: [
      '/src/assets/images/lv_monogram_bags_1792428224331.jpg',
      '/src/assets/images/lv_speedy_closeup_1792428251248.jpg'
    ],
    badge: 'Iconique',
    inStock: true,
    featured: true
  },
  {
    id: 'fendi-peekaboo-iseeu-taupe',
    name: 'Sac Peekaboo ISeeU Cuir Taupe & Barre Écaille de Tortue',
    brand: 'Fendi',
    category: 'bags',
    priceFCFA: 70000,
    originalPriceFCFA: 80000,
    description: 'Création emblématique de la Maison romaine Fendi. Ce sac Peekaboo ISeeU en cuir de veau doux couleur taupe tourterelle séduit par sa silhouette structurée en trapèze, sa prestigieuse barre supérieure en acétate façon écaille de tortue et sa pochette plate intérieure ton sur ton amovible.',
    details: [
      'Cuir de veau nappa ultra-souple grainé fin',
      'Fermoir twist lock iconique doré sur les deux faces',
      'Barre supérieure décorative motif écaille de tortue',
      'Compartiment intérieur scindé par une paroi rigide avec pochette zippée amovible',
      'Poignée supérieure rigide et bandoulière amovible réglable'
    ],
    materials: 'Cuir de veau nappa & finitions plexiglas écaille',
    dimensions: '33.5 x 25.5 x 13 cm',
    colors: ['Taupe Tourterelle', 'Beige Poudré'],
    images: [
      '/src/assets/images/fendi_peekaboo_bag_1792428224263.jpg'
    ],
    badge: 'Édition Limitée',
    inStock: true,
    featured: true
  },
  {
    id: 'lv-speedy-30-bandouliere',
    name: 'Sac Speedy Bandoulière 30 Toile Monogram',
    brand: 'Louis Vuitton',
    category: 'bags',
    priceFCFA: 60000,
    originalPriceFCFA: 70000,
    description: 'Créé à l’origine dans les années 1930 pour les voyageuses élégantes, le Speedy 30 demeure l’un des sacs les plus convoités au monde. Sa silhouette polochon en toile Monogram s’orne de poignées en cuir de vachette naturel qui développeront une sublime patine ambrée au fil du temps.',
    details: [
      'Toile enduite souple et poignées Toron en cuir végétal',
      'Fermeture à glissière double curseur sécurisée par un cadenas gravé LV',
      'Doublure textile marron avec poche plaquée intérieure',
      'Bandoulière réglable et amovible en trois parties pour porté croisé',
      'Quincaillerie dorée gravée'
    ],
    materials: 'Toile Monogram & Cuir de vachette naturel',
    dimensions: '30 x 21 x 17 cm',
    colors: ['Monogram Classique'],
    images: [
      '/src/assets/images/lv_speedy_closeup_1792428251248.jpg'
    ],
    badge: 'Nouveauté',
    inStock: true,
    featured: false
  },
  {
    id: 'manolo-blahnik-hangisi-satin-bleu',
    name: 'Escarpins Hangisi 105 Satin Bleu Royal & Boucle Cristaux',
    brand: 'Manolo Blahnik',
    category: 'shoes',
    priceFCFA: 50000,
    originalPriceFCFA: 60000,
    description: 'Chef-d’œuvre intemporel rendu légendaire dans le monde entier, le modèle Hangisi est confectionné en somptueux satin de soie bleu cobalt intense. Il est magnifié par une boucle carrée artisanale sertie de cristaux étincelants taillés avec une précision joaillière.',
    details: [
      'Empeigne en satin de soie bleu saphir brillant',
      'Boucle sculptée joaillerie sertie de cristaux Swarovski argentés',
      'Bout pointu sophistiqué et doublure en cuir de chevreau doux',
      'Talon aiguille fuselé de 105 mm recouvert de satin',
      'Fabriqué à la main dans les ateliers toscans'
    ],
    materials: 'Satin de soie haut de gamme & cristaux Swarovski',
    heelHeight: '105 mm (10.5 cm)',
    colors: ['Bleu Cobalt Saphir'],
    sizes: ['36', '37', '38', '38.5', '39', '40', '41'],
    images: [
      '/src/assets/images/manolo_blue_pumps_1792428227514.jpg'
    ],
    badge: 'Nouveauté',
    inStock: true,
    featured: true
  },
  {
    id: 'louboutin-so-kate-vernis-noir',
    name: 'Escarpins So Kate 120 Vernis Noir Semelle Rouge',
    brand: 'Christian Louboutin',
    category: 'shoes',
    priceFCFA: 45000,
    originalPriceFCFA: 55000,
    description: 'L’escarpin emblématique de la haute séduction parisienne. Le modèle So Kate se distingue par son décolleté plongeant irrésistible, son bout effilé d’une finesse absolue et sa célèbre cambrure vertigineuse rehaussée de la mythique semelle laquée rouge écarlate.',
    details: [
      'Tige en cuir verni de veau haute brillance noir profond',
      'Emblématique semelle rouge signature laquée',
      'Bout pointu classique ultra-féminin',
      'Semelle intérieure et doublure en cuir nude naturel',
      'Fabriqué artisanalement en Italie'
    ],
    materials: 'Cuir verni de veau italien & semelle laquée rouge',
    heelHeight: '120 mm (12 cm)',
    colors: ['Noir Vernis & Rouge'],
    sizes: ['36', '36.5', '37', '37.5', '38', '38.5', '39', '40', '41'],
    images: [
      '/src/assets/images/louboutin_stilettos_1792428225681.jpg'
    ],
    badge: 'Coup de Cœur',
    inStock: true,
    featured: true
  },
  {
    id: 'aurelia-sandales-soiree-or-cristaux',
    name: 'Sandales Aurelia Soirée Or Métallisé & Pavage Cristaux',
    brand: 'Coumbista Atelier',
    category: 'shoes',
    priceFCFA: 35000,
    originalPriceFCFA: 42000,
    description: 'Une création signature de l’Atelier Coumbista. Ces sandales vertigineuses en cuir doré métallisé enlacent le pied de brides asymétriques entièrement pavées de cristaux scintillants. Idéales pour les soirées de gala, mariages prestigieux et réceptions haute couture.',
    details: [
      'Cuir métallisé or champagne miroitant de fabrication italienne',
      'Brides délicates croisées ornées de micro-cristaux brillants',
      'Fermoir à boucle cheville ajustable serti de strass',
      'Semelle de première en cuir cousu avec amorti confort haute densité',
      'Talon stiletto fuselé 100 mm avec embout anti-glisse'
    ],
    materials: 'Cuir d’agneau métallisé & micro-cristaux haute réfraction',
    heelHeight: '100 mm (10 cm)',
    colors: ['Or Champagne', 'Or Rose'],
    sizes: ['36', '37', '38', '39', '40'],
    images: [
      '/src/assets/images/gold_strap_sandals_1792428250918.jpg'
    ],
    badge: 'Coup de Cœur',
    inStock: true,
    featured: true
  },
  {
    id: 'coumbista-clutch-pochette-soiree',
    name: 'Pochette de Soirée & Cérémonie Chaîne Dorée',
    brand: 'Coumbista Atelier',
    category: 'bags',
    priceFCFA: 25000,
    originalPriceFCFA: 32000,
    description: 'Pochette de soirée ultra-chic réalisée en cuir verni soyeux avec fermoir bijou et bandoulière chaîne amovible dorée à l’or fin. Parfaite pour accompagner vos tenues de soirée et cérémonies.',
    details: [
      'Cuir synthétique verni de haute qualité et fermoir aimanté bijou',
      'Chaîne gourmette dorée amovible pour porté épaule ou pochette main',
      'Doublure intérieure en velours noir avec compartiment carte',
      'Format idéal pour smartphone, rouge à lèvres et essentiels'
    ],
    materials: 'Cuir verni finition luxe & chaîne dorée',
    dimensions: '22 x 12 x 5 cm',
    colors: ['Noir Vernis', 'Or Miroir', 'Bordeaux Royal'],
    images: [
      '/src/assets/images/coumbista_fashion_logo_1792428157279.jpg'
    ],
    badge: 'Nouveauté',
    inStock: true,
    featured: false
  }
];

export const CURRENCY_RATES: Record<Currency, { symbol: string; rateFromFCFA: number; label: string }> = {
  XOF: { symbol: 'FCFA', rateFromFCFA: 1, label: 'FCFA (XOF)' },
  EUR: { symbol: '€', rateFromFCFA: 1 / 655.957, label: 'EUR (€)' },
  USD: { symbol: '$', rateFromFCFA: 1.09 / 655.957, label: 'USD ($)' }
};

export function formatPrice(priceFCFA: number, currency: Currency): string {
  const currencyConfig = CURRENCY_RATES[currency] || CURRENCY_RATES.XOF;
  const converted = priceFCFA * currencyConfig.rateFromFCFA;
  
  if (currency === 'XOF') {
    return `${Math.round(converted).toLocaleString('fr-FR')} ${currencyConfig.symbol}`;
  }
  
  return `${converted.toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ${currencyConfig.symbol}`;
}
