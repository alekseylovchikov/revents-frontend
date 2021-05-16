import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import Pagination from '@/components/Pagination';

import { API_URL } from '@/config/index';

const PER_PAGE = 5;

export default function EventsPage({ events, total, page }) {
  return (
    <Layout>
      <h1>Все события</h1>
      {events.length === 0 && <h3>No events show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      <Pagination total={total} page={page} perPage={PER_PAGE} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  // fetch total count
  const totalRes = await fetch(`${API_URL}/events/count`);
  const total = await totalRes.json();

  // fetch events
  const eventRes = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );
  const events = await eventRes.json();

  return {
    props: { events, page: +page, total },
  };
}
