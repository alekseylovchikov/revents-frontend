import Link from 'next/link';

import styles from '@/styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; R:EVENTS {new Date().getFullYear()}</p>
      <p>
        <Link href="/about">
          <a>Об этом проекте</a>
        </Link>
      </p>
    </footer>
  );
}
