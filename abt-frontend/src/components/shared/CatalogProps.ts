import {Category, Material, Style} from "@/types"

export interface CatalogProps {
  categoriesPromise: Promise<Category[]>
  stylesPromise: Promise<Style[]>
  materialsPromise: Promise<Material[]>
  selectedCategory?: string
}