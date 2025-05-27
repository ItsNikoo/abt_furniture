import {Style} from "@/types";
import styles from "./StyleCard.module.css"

export default function StyleCard({style}: { style: Style }) {
    return (
        <div className={styles.Container}>
            <h3>{style.style}</h3>
        </div>
    )
}