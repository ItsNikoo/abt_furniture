import RightPartOfFirstPage from '@/components/site/FirstPage/RightPartOfFirstPage'
import LeftPartOfFirstPage from '@/components/site/FirstPage/LeftPartOfFirstPage'
import styles from './FirstPage.module.css'
import ClientContainer from '@/components/site/FirstPage/ClientContainer'

export default function FirstPage() {
  return (
    <div className={styles.Container}>
      <div className={styles.TopContent}>
        <LeftPartOfFirstPage/>
        <RightPartOfFirstPage/>
      </div>
      <div className={styles.BottomContent}>
        {/* Новый блок на всю ширину */}
        <ClientContainer/>
      </div>
    </div>
  )
}
