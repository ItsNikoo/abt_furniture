export async function fetchStyles() {
    const res = await fetch("http://127.0.0.1:8000/api/styles/")
    return res.json();
}