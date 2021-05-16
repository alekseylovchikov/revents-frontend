import { useState } from 'react';
import { useRouter } from 'next/router';

import styles from '@/styles/Search.module.css';

export default function Search() {
  const [term, setTerm] = useState('');
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    const uri = encodeURI(`/events/search?term=${term}`);
    router.push(uri);
    setTerm('');
  }

  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Поиск событий"
          type="text"
          name="search"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </form>
    </div>
  );
}
