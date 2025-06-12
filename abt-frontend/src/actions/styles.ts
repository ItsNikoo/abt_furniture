"use server"

import {deleteStyle, patchStyle, postStyle} from "@/lib/api/styles";
import {revalidatePath} from "next/cache";

export async function deleteStyleAction(id: number){
    deleteStyle(id)
    revalidatePath(`/admin/styles`);
}

export async function postStyleAction(style:string){
    postStyle(style)
    revalidatePath(`/admin/styles`);
}

export async function patchStyleAction(id: number, style: string){
    await patchStyle(id, style)
    revalidatePath(`/admin/styles`);
}