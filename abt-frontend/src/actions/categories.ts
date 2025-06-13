"use server"

import {deleteCategory, patchCategory, postCategory} from "@/lib/api/categories";
import {revalidatePath} from "next/cache";
import {CategoryData} from "@/types";

export async function deleteCategoryAction(id: number) {
    await deleteCategory(id);
    revalidatePath("admin/categories/");
}

export async function patchCategoryAction(id: number, data: CategoryData) {
    await patchCategory(id, data);
    revalidatePath("admin/categories/");
}

export async function postCategoryAction(data: CategoryData) {
    await postCategory(data);
    revalidatePath("admin/categories/");
}