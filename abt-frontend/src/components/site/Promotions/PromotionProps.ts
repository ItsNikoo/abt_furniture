import {Category, Material, Promotion, Style} from "@/types";

export interface PromotionProps {
  categoriesPromise: Promise<Category[]>
  stylesPromise: Promise<Style[]>
  materialsPromise: Promise<Material[]>
  promotionsPromise: Promise<Promotion[]>
}