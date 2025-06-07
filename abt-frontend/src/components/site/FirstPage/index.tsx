import RightPartOfFirstPage from "@/components/site/FirstPage/RightPartOfFirstPage";
import LeftPartOfFirstPage from "@/components/site/FirstPage/LeftPartOfFirstPage";
import styles from "./FirstPage.module.css"

export default function FirstPage(){
    return(
        <div className={styles.Container}>
            <LeftPartOfFirstPage />
            <RightPartOfFirstPage />
        </div>
    )
}