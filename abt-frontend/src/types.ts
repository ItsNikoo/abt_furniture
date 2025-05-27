export interface Photo{
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
}

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: Category;
    styles?: Style[];
    photos?: Photo[];
}