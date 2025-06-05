import axios from "axios";
import {ProductData} from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchProducts() {
    const res = await fetch(`${BASE_URL}/products/`);
    return res.json();
}

export async function fetchProductById(id: number) {
    const res = await fetch(`${BASE_URL}/products/${id}/`)
    return res.json();
}

export async function addProduct(data: ProductData) {
    try {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("price", data.price.toString());
        formData.append("description", data.description);
        formData.append("category", data.category);
        formData.append("material", data.material);
        if (data.style) {
            formData.append("style", data.style);
        }

        if (data.photo_files && data.photo_files.length > 0) {
            data.photo_files.forEach((file) => {
                formData.append(`photo_files`, file);
            });
        }

        const response = await axios.post(`${BASE_URL}/products/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log('Ответ от сервера:', response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Ошибка при создании продукта:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Ошибка при создании продукта');
        }
        console.error('Неизвестная ошибка:', error);
        throw new Error('Неизвестная ошибка при создании продукта');
    }
};

export async function patchProduct(data: ProductData, id: number) {
    try {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("price", data.price.toString());
        formData.append("description", data.description);
        formData.append("category", data.category);
        formData.append("material", data.material);
        if (data.style) {
            formData.append("style", data.style);
        }

        if (data.delete_photos && data.delete_photos.length > 0) {
            data.delete_photos.forEach((url) => {
                formData.append("delete_photos", url); // Добавляем каждый URL отдельно
            });
        }

        if (data.photo_files && data.photo_files.length > 0) {
            data.photo_files.forEach((file) => {
                formData.append(`photo_files`, file);
            });
        }

        const response = await axios.patch(`${BASE_URL}/products/${id}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

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
    const response = await axios.delete(`${BASE_URL}/products/${id}/`)
    return response.status;
}