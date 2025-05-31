import axios from "axios";

interface CategoryData {
    id?: number;
    category: string;
    category_slug: string;
    photo?: string | null;
    photo_file?: File | null;
}

interface ErrorResponse {
    error?: string;
    detail?: string;
    photo_file?: string;
    category_slug?: string;
}

export async function fetchCategories() {
    const res = await fetch("http://127.0.0.1:8000/api/categories/")
    return res.json();
}

export const addCategory = async (formData: FormData): Promise<CategoryData> => {
    try {
        const response = await axios.post("http://127.0.0.1:8000/api/categories/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        let errorMessage = "Не удалось выполнить запрос к серверу";
        if (axios.isAxiosError(error) && error.response) {
            const errorData: ErrorResponse = error.response.data;
            console.error("Ошибка сервера:", {
                status: error.response.status,
                statusText: error.response.statusText,
                errorData,
            });
            errorMessage =
                errorData.photo_file ||
                errorData.category_slug ||
                errorData.error ||
                errorData.detail ||
                `Ошибка HTTP: ${error.response.status}`;
        } else {
            console.error("Ошибка в addCategory:", error);
        }
        throw new Error(errorMessage);
    }
};

export async function deleteCategory(category_slug: string) {
    const res = await axios.delete(`http://127.0.0.1:8000/api/categories/${category_slug}/`)
    return res.data
}

export async function updateCategory(category: string, updated_data: { category: string, category_slug: string }) {
    const res = await axios.patch(`http://127.0.0.1:8000/api/categories/${category}/`, updated_data);
    return res.data
}
