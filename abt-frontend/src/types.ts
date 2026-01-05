export interface Photo {
  id: number;
  photoUrl: string;
}

export interface Style {
  id: number;
  style: string;
}

export interface Material {
  id: number;
  material: string;
}

export interface Category {
  id: number;
  categorySlug: string;
  category: string;
  photo: string;
}

export interface CategoryData {
  categorySlug: string;
  category: string;
  photo?: string;
  photoFile: File | null;
}


export interface Product {
  id: number;
  title: string;
  productSlug: string;
  price: number;
  description: string;
  category: string;
  material: string | null;
  style?: string;
  photos?: Photo[];
}

export interface ProductData {
  title: string;
  productSlug: string;
  price: number;
  description: string;
  category: string;
  material: string;
  style?: string;
  photos?: Photo[];
  photoFiles?: File[];
  deletePhotos?: string[];
}

export interface Sale {
  id: string;
  description: string;
  photo: string | null;
  mobilePhoto: string | null;
  link: string;
  photoFile: File | null;
  mobilePhotoFile: File | null;
}

export interface SaleData {
  description: string;
  photo?: string | null;
  mobilePhoto?: string | null;
  photoFile: File | null;
  mobilePhotoFile: File | null;
  link: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  link?: string;
  image?: string;
}

export interface Contact {
  phone: string;
  comment: string;
  consent: boolean;
  product?: string;
}

export interface Promotion {
  id: number;
  title: string;
  productSlug: string;
  price: number;
  description: string;
  size: string;
  category: string;
  material?: string;
  style?: string;
  photos?: Photo[];
}

export interface PromotionData {
  title: string;
  productSlug: string;
  price: number;
  description: string;
  size: string;
  category: string;
  material?: string;
  style?: string;
  photos?: Photo[];
  photoFiles?: File[];
  deletePhotos?: string[];
}