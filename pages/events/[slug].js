import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Layout from '@/components/Layout';
import EventMap from '@/components/EventMap';
import styles from '@/styles/Event.module.css';
import { API_URL } from '@/config/index';

export default function EventPage({ evt }) {
  const router = useRouter();

  if (!evt) router.push('/events');

  return (
    <Layout>
      <div className={styles.event}>
        <span>
          {new Date(evt.date).toLocaleDateString('ru-RU')} at{' '}
          {evt.time}
        </span>
        <h1>{evt.name}</h1>
        {evt.image && (
          <div className={styles.image}>
            <Image src={evt.image.url} width={960} height={300} />
          </div>
        )}
        <h3>Выступающие:</h3>
        <p>{evt.performers}</p>
        <h3>Описание:</h3>
        <p>{evt.description}</p>
        <h3>Место проведения: {evt.venue}</h3>
        <p>{evt.address}</p>
      </div>

      <EventMap evt={evt} />

      <Link href={`/events`}>
        <a className={styles.back}>{'<'} К списку</a>
      </Link>
    </Layout>
  );
}

// export async function getStaticPaths() {
//   const res = await fetch(`${API_URL}/events`);
//   const events = await res.json();

//   return {
//     paths: events.map((evt) => ({ params: { slug: evt.slug } })),
//     fallback: false,
//   };
// }

// export async function getStaticProps({ params: { slug }, req }) {
//   const res = await fetch(`${API_URL}/events?slug=${slug}`);
//   const events = await res.json();

//   return {
//     props: {
//       evt: events.length > 0 ? events[0] : undefined,
//     },
//     revalidate: 1,
//   };
// }

export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(`${API_URL}/events?slug=${slug}`);
  const events = await res.json();

  return {
    props: {
      evt: events.length > 0 ? events[0] : undefined,
    },
  };
}
