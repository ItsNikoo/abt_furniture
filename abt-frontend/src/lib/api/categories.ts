import axios from "axios";
import {CategoryData} from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchCategories() {
    const res = await fetch(`${BASE_URL}/categories/`)
    return res.json();
}

export async function postCategory(data: CategoryData) {
    try {
        const formData = new FormData();
        formData.append('categorySlug', data.categorySlug);
        formData.append("category", data.category);
        if (data.photoFile) {
            formData.append('photoFile', data.photoFile);
        }
        const res = await axios.post(`${BASE_URL}/categories/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res.data;
    } catch (err) {
        console.log("Ошибка при добавлении категории" + err);
    }
}

export async function deleteCategory(id: number) {
    const res = await axios.delete(`${BASE_URL}/categories/${id}/`)
    return res.data
}

export async function patchCategory(id: number, data: CategoryData) {
    try {
        const formData = new FormData();
        formData.append('category', data.category);
        formData.append('categorySlug', data.categorySlug);
        if (data.photoFile) {
            formData.append('photoFile', data.photoFile);
        }

        const res = await axios.patch(`${BASE_URL}/categories/${id}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Детали ошибки:', {
                status: error.response?.status,
                data: error.response?.data, // Важно: тут будет сообщение от Django
            });
        }
        throw error;
    }
}