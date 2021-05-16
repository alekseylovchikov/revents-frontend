import { useEffect, useContext, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Link from 'next/link';

import Layout from '@/components/Layout';

import AuthContext from '@/context/AuthContext';

import styles from '@/styles/AuthForm.module.css';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { register, error } = useContext(AuthContext);

  useEffect(() => error && toast.error(error), [error]);

  function handleSubmit(e) {
    e.preventDefault();

    if (passwordConfirm !== password) {
      toast.error('Проверьте пароли, они не совпадают.');
      return;
    }

    register({ username, email, password });
  }

  return (
    <Layout title="Регистрация">
      <div className={styles.auth}>
        <h1>
          <FaUser /> Регистрация
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div>
            <label htmlFor="username">Имя пользователя</label>
            <input
              type="text"
              id="username"
              required
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div>
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div>
            <label htmlFor="passwordConfirm">Повторите пароль</label>
            <input
              type="password"
              id="passwordConfirm"
              required
              onChange={(e) => setPasswordConfirm(e.target.value)}
              value={passwordConfirm}
            />
          </div>

          <input type="submit" value="Регистрация" className="btn" />
        </form>

        <p>
          Есть аккаунт? Вам{' '}
          <Link href="/account/login">
            <a>сюда</a>
          </Link>
        </p>
      </div>
    </Layout>
  );
}
