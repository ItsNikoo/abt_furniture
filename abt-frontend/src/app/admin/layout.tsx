import styles from "./AdminLayout.module.css";
import Link from "next/link";

export default function AdminLayout({children}: { children: React.ReactNode }) {
    return (
        <div className={styles.MainContainer}>
            <h1 className={styles.Title}>Админ-панель</h1>
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
                    </ul>
                </nav>
                <main className={styles.Content}>
                    {children}
                </main>
            </div>
        </div>
    );
}
