import axios from "axios";

export async function fetchStyles() {
    const res = await fetch("http://127.0.0.1:8000/api/styles/")
    return res.json();
}

export async function deleteStyle(id: number) {
    const res = await axios.delete(`http://127.0.0.1:8000/api/styles/${id}/`)
    return res.data
}

export async function addStyle(style: string) {
    const res = await axios.post("http://127.0.0.1:8000/api/styles/", {style: style});
    return res.data
}

export async function updateStyle(id: number, updatedData: { style: string }) {
    const res = await axios.patch(`http://127.0.0.1:8000/api/styles/${id}/`, updatedData);
    return res.data;
}