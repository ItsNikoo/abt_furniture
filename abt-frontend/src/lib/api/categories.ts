import axios from "axios";

export async function fetchCategories() {
    const res = await fetch("http://127.0.0.1:8000/api/categories/")
    return res.json();
}

export async function addCategory({category, category_slug}: { category: string, category_slug: string }) {
    const res = await axios.post("http://127.0.0.1:8000/api/categories/",
        {category: category, category_slug: category_slug},
    );
    return res.data
}

export async function deleteCategory(category_slug: string) {
    const res = await axios.delete(`http://127.0.0.1:8000/api/categories/${category_slug}/`)
    return res.data
}

export async function updateCategory(category: string, updated_data: { category: string, category_slug: string }) {
    const res = await axios.patch(`http://127.0.0.1:8000/api/categories/${category}/`, updated_data);
    return res.data
}