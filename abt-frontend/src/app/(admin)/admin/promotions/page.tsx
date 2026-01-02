import {ADMIN_ROUTES} from "@/config/navigation";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import PromotionsGrid from "@/components/admin/promotions/PromotionsGrid";
import {Promotion} from "@/types";
import {fetchPromotions} from "@/lib/api/promotions";

export default function PromotionsPage() {
  const promotionsPromise: Promise<Promotion[]> = fetchPromotions();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Специальные предложения</h1>
      <Link href={`${ADMIN_ROUTES.PROMOTIONS.path}/add`}>
        <Button>
          Добавить предложение
        </Button>
      </Link>
      <PromotionsGrid promise={promotionsPromise}/>
    </div>
  )
}