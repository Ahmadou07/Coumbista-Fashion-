export type ProductCategory = 'all' | 'bags' | 'shoes';

export type Brand = 'Hermès' | 'Louis Vuitton' | 'Fendi' | 'Christian Louboutin' | 'Manolo Blahnik' | 'Coumbista Atelier';

export type Currency = 'XOF' | 'EUR' | 'USD';

export interface Product {
  id: string;
  name: string;
  brand: Brand;
  category: 'bags' | 'shoes';
  priceFCFA: number;
  originalPriceFCFA?: number;
  description: string;
  details: string[];
  materials: string;
  dimensions?: string;
  heelHeight?: string;
  colors: string[];
  sizes?: string[];
  images: string[];
  badge?: 'Iconique' | 'Édition Limitée' | 'Nouveauté' | 'Coup de Cœur';
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize?: string;
}
