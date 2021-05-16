import Link from 'next/link';
import Image from 'next/image';

import styles from '@/styles/EventItem.module.css';

export default function EventItem({ evt }) {
  const href = `/events/${evt.slug}`;
  return (
    <div className={styles.event}>
      <Link href={href}>
        <a>
          <div className={styles.img}>
            <Image
              src={
                evt.image
                  ? evt.image.formats.thumbnail.url
                  : '/event-default.png'
              }
              width={170}
              height={100}
            />
          </div>
        </a>
      </Link>

      <div className={styles.info}>
        <Link href={href}>
          <a>
            <h3>{evt.name}</h3>
          </a>
        </Link>
        <span>
          {new Date(evt.date).toLocaleDateString('ru-RU')} в{' '}
          {evt.time}
        </span>
      </div>

      <div className={styles.link}>
        <Link href={href}>
          <a className="btn">Подробнее</a>
        </Link>
      </div>
    </div>
  );
}
