import { useRouter } from 'next/router';
import DashboardEvent from '@/components/DashboardEvent';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import { parseCookies } from '@/helpers/index';

import styles from '@/styles/Dashboard.module.css';

export default function DashboardPage({ events, token }) {
  const router = useRouter();

  async function deleteEvent(id) {
    if (confirm('Вы уверены?')) {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: 'delete',
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.reload();
      }
    }
  }

  return (
    <Layout title="Панель управления">
      <div className={styles.dash}>
        <h1>Панель управления</h1>
        <h3>Мои события</h3>

        {events.map((evt) => (
          <DashboardEvent
            handleDelete={deleteEvent}
            key={evt.id}
            evt={evt}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/events/me`, {
    method: 'get',
    headers: { Authorization: `Bearer ${token}` },
  });

  const events = await res.json();

  return {
    props: { events, token },
  };
}
