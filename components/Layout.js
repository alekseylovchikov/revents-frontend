import Head from 'next/head';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from '@/styles/Layout.module.css';

import Footer from './Footer';
import Header from './Header';
import Showcase from './Showcase';

export default function Layout({
  title,
  keywords,
  description,
  children,
}) {
  const router = useRouter();

  return (
    <div>
      <ToastContainer />
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </Head>

      <Header />

      {router.pathname === '/' && <Showcase />}

      <div className={styles.container}>{children}</div>

      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: 'Events',
  description: 'Find the latest events.',
  keywords: 'events',
};
