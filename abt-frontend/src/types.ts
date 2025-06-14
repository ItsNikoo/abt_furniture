export interface Photo {
    id: number;
    photo_url: string;
}

export interface Style {
    id: number;
    style: string;
}

export interface Category {
    id: number;
    category_slug: string;
    category: string;
    photo: string;
}

export interface CategoryData {
    category_slug: string;
    category: string;
    photo?: string;
    photo_file: File | null;
}

export interface Material {
    id: number;
    material: string;
}

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    material: string | null;
    style?: string;
    photos?: Photo[];
}

export interface ProductData {
    title: string;
    price: number;
    description: string;
    category: string;
    material: string;
    style?: string;
    photos?: Photo[];
    photo_files?: File[];
    delete_photos?: string[];
}

export interface Sale {
    id: string;
    title: string;
    description: string;
    photo: string | null;
    link: string;
    photo_file: File | null;
}

export interface SaleData {
    title: string;
    description: string;
    photo?: string | null;
    photo_file: File | null;
    link: string;
}