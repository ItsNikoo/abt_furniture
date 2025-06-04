import axios from "axios";
import {ProductData} from "@/types";

export async function fetchProducts() {
    const res = await fetch("http://127.0.0.1:8000/api/products/")
    return res.json();
}

export async function fetchProductById(id: number) {
    const res = await fetch(`http://127.0.0.1:8000/api/products/${id}/`)
    return res.json();
}

export const addProduct = async (formData: FormData) => {
    const response = await axios.post("http://127.0.0.1:8000/api/products/", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export async function patchProduct(data: ProductData, id: number) {
    try {
        const response = await axios.patch(`http://127.0.0.1:8000/api/products/${id}/`, {
            title: data.title,
            price: data.price,
            description: data.description,
            category: data.category,
            material: data.material,
            style: data.style,
            delete_photos: data.delete_photos,
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        })

        console.log('Ответ от сервера:', response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Ошибка при редактировании продукта:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Ошибка при редактировании продукта');
        }
        console.error('Неизвестная ошибка:', error);
        throw new Error('Неизвестная ошибка при редактировании продукта');
    }
}

export async function deleteProduct(id: number) {
    const response = await axios.delete(`http://127.0.0.1:8000/api/products/${id}/`)
    return response.status;
}