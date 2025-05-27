export async function fetchCategories() {
    const res = await fetch("http://127.0.0.1:8000/api/categories/")
    return res.json();
}