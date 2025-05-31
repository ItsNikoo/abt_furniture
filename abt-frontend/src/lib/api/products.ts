import axios from "axios";
import {ProductData} from "@/types";

export async function fetchProducts() {
    const res = await fetch("http://127.0.0.1:8000/api/products/")
    return res.json();
}

export async function addProduct(data: ProductData) {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/products/', {
            title: data.title,
            price: parseFloat(data.price),
            description: data.description,
            category: data.category,
            material: data.material,
            style: data.style,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('Ответ от сервера:', response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Ошибка при добавлении продукта:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Ошибка при добавлении продукта');
        }
        console.error('Неизвестная ошибка:', error);
        throw new Error('Неизвестная ошибка при добавлении продукта');
    }
}