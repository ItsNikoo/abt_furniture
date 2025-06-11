import {Sale} from "@/types";
import {use} from "react";
import SaleCard from "@/components/admin/sales/SaleCard";
import {deleteSaleAction, patchSaleAction} from "@/actions/sales";

export default function MainPage({promise}: { promise: Promise<Sale[]> }) {
    const sales = use(promise);
    return (
        <div className="grid grid-cols-3 gap-3">
            {sales.map((sale) => (
                <div key={sale.id}>
                    <SaleCard sale={sale} onDeleteAction={deleteSaleAction} onUpdateAction={patchSaleAction}/>
                </div>
            ))}
        </div>
    );
}