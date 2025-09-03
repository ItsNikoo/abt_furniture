import styles from './AdminLayout.module.css'
import Link from 'next/link'
import LogoutButton from '@/components/admin/authenticationLogic/LogoutButton'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.MainContainer}>
      <div className={styles.Header}>
        <h1 className={styles.Title}>Админ-панель</h1>
        <LogoutButton/>
      </div>
      <div className={styles.Container}>
        <nav className={styles.Sidebar}>
          <ul className={styles.MenuList}>
            <li className={styles.MenuItem}>
              <Link href={'/admin'}>
                Главная
              </Link>
            </li>
            <li className={styles.MenuItem}>
              <Link href={'/admin/products'}>
                Продукты
              </Link>
            </li>
            <li className={styles.MenuItem}>
              <Link href={'/admin/categories'}>
                Категории
              </Link>
            </li>
            <li className={styles.MenuItem}>
              <Link href={'/admin/styles'}>
                Стили
              </Link>
            </li>
            <li className={styles.MenuItem}>
              <Link href={'/admin/materials'}>
                Материалы
              </Link>
            </li>
            <li className={styles.MenuItem}>
              <Link href={'/admin/sales'}>
                Акции
              </Link>
            </li>
          </ul>
        </nav>
        <main className={styles.Content}>
          {children}
        </main>
      </div>
    </div>
  )
}
