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