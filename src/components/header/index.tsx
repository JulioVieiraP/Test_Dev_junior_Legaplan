import styles from '@/styles/components/_header.module.scss'
import { formatDate } from '@/utils/format';
import Image from 'next/image';
export default function Header() {
    const currentDate = new Date();
    return (
        <header className={styles.header}>
            <div className={styles.header__container}>
                <Image src="/images/logo.png" alt="Logo" width={150} height={36}/>
                <h1 className={styles.header__title}>Bem-vindo de volta, Marcus</h1>
                <p className={styles.header__date}>{formatDate(currentDate)}</p>
            </div>
        </header>
    )
};
