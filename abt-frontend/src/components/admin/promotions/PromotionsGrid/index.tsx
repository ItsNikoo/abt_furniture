import {Promotion} from "@/types";
import {use} from "react";
import PromotionCard from "@/components/admin/promotions/PromotionCard";

interface Props {
  promise: Promise<Promotion[]>
}

export default function PromotionsGrid({promise}: Props) {
  const data = use(promise)

  return (
    <div>
      <div className='grid grid-cols-2 gap-4'>
        {data?.map((promotion: Promotion) => (
          <div key={promotion.id} className="mt-3">
            <PromotionCard promotion={promotion} />
          </div>
        ))}
      </div>
    </div>
  )
}