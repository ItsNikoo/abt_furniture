import UpdateProductContainer from "@/components/admin/products/UpdateProductContainer";
import {fetchCategories} from "@/lib/api/categories";
import {Category, Material, Product, Style} from "@/types";
import {fetchStyles} from "@/lib/api/styles";
import {fetchMaterials} from "@/lib/api/materials";
import {fetchProductById} from "@/lib/api/products";

export default async function ProductPage({params}: { params: { id: string } }) {
    const categories: Category[] = await fetchCategories();
    const styles: Style[] = await fetchStyles();
    const materials: Material[] = await fetchMaterials();
    const product: Product = await fetchProductById(Number(params.id));
    return (
        <UpdateProductContainer categories={categories} styles={styles} materials={materials} data={product} />
    )
}