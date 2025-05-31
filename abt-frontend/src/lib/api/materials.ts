import axios from "axios";
import {Material} from "@/types";

export async function fetchMaterials(): Promise<Material[]> {
    const response = await fetch("http://127.0.0.1:8000/api/materials/");
    if (!response.ok) {
        throw new Error('Ошибка при загрузке материалов');
    }
    return response.json();
}

export async function deleteMaterial(id: number) {
    const res = await axios.delete(`http://127.0.0.1:8000/api/materials/${id}/`);
    return res.status
}

export async function addMaterial(material: string) {
    const res = await axios.post(`http://127.0.0.1:8000/api/materials/`, {material: material});
    return res.status
}

export async function updateMaterial(id: number, updatedData: { material: string }) {
    const res = await axios.patch(`http://127.0.0.1:8000/api/materials/${id}/`, updatedData);
    return res.status
}