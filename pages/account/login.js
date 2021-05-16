import { useEffect, useContext, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Link from 'next/link';

import Layout from '@/components/Layout';

import AuthContext from '@/context/AuthContext';

import styles from '@/styles/AuthForm.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, error } = useContext(AuthContext);

  useEffect(() => error && toast.error(error), [error]);

  function handleSubmit(e) {
    e.preventDefault();

    login({ email, password });
  }

  return (
    <Layout title="Войти">
      <div className={styles.auth}>
        <h1>
          <FaUser /> Войти
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div>
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <input type="submit" value="Войти" className="btn" />
        </form>

        <p>
          Нет аккаунта? Вам{' '}
          <Link href="/account/register">
            <a>сюда</a>
          </Link>
        </p>
      </div>
    </Layout>
  );
}
