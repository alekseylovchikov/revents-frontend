import Link from 'next/link';

export default function Pagination({ total, page, perPage }) {
  const lastPage = Math.ceil(total / perPage);

  return (
    <div>
      {page > 1 && (
        <Link href={`/events?page=${page - 1}`}>
          <a className="btn-secondary">Назад</a>
        </Link>
      )}

      {page < lastPage && (
        <Link href={`/events?page=${page + 1}`}>
          <a className="btn-secondary">Вперед</a>
        </Link>
      )}
    </div>
  );
}
