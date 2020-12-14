import React from 'react';

import { useRequest } from '../../../hooks/useRequest';
import { getBooks } from '../../../services/BookService';
import BookList from '../../components/Booklist';
import NavBar from '../../components/NavBar';

import styles from './styles.module.scss';

function Home() {
  const [state] = useRequest({ request: getBooks, payload: {} }, []);

  return (
    <div className={styles.container}>
      <NavBar />
      <BookList items={state?.data?.page} />
    </div>
  );
}

export default Home;
