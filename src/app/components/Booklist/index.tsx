import React from 'react';

import { Book } from '../../../typings/book';

import styles from './styles.module.scss';

interface Props {
  items?: Book[];
}

function BookList({ items = [] }: Props) {
  return (
    <div className={styles.bookList}>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
