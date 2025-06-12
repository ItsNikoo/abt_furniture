import {Style} from "@/types"
import {use} from "react";
import StyleCard from "@/components/admin/styles/StyleCard";
import {deleteStyleAction} from "@/actions/styles";

export default function StylesBar({promise}: {promise: Promise<Style[]>}) {
    const styles = use(promise)
    return(
        <div className='grid grid-cols-5 gap-2.5'>
            {styles?.map((style) => (
                <div key={style.id}>
                    <StyleCard style={style} onDeleteAction={deleteStyleAction} />
                </div>
            ))}
        </div>
    )
}