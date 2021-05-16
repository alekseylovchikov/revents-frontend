import Link from 'next/link';
import { useContext } from 'react';
import {
  FaPlusCircle,
  FaListAlt,
  FaSignInAlt,
  FaSignOutAlt,
  FaCog,
} from 'react-icons/fa';

import AuthContext from '@/context/AuthContext';

import styles from '@/styles/Header.module.css';

import Search from './Search';

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>R:EVENTS</a>
        </Link>
      </div>

      <Search />

      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/events">
              <a>
                Все события <FaListAlt />
              </a>
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link href="/events/add">
                  <a>
                    Добавить событие <FaPlusCircle />
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/account/dashboard">
                  <a>
                    Панель управления <FaCog />
                  </a>
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={logout}
                  className="btn-secondary btn-icon"
                >
                  <FaSignOutAlt /> Выйти
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/account/login">
                  <a className="btn-secondary btn-icon">
                    Войти <FaSignInAlt />
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/account/register">
                  <a className="btn-secondary btn-icon">
                    Регистрация <FaSignInAlt />
                  </a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
