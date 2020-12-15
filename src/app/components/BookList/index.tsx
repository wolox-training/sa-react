import React from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router';

import { Book } from '../../../typings/book';
import { ROUTES } from '../../routers/constants';

import styles from './styles.module.scss';

interface Props {
  items?: Book[];
}

function BookList({ items = [] }: Props) {
  const history = useHistory();

  const handleClick = (id: number) => {
    history.push(ROUTES.bookDetail.replace(':id', `${id}`));
  };

  return (
    <div className={styles.list} role="list">
      {items.map((item) => (
        <div className={styles.item} key={item.id} onClick={() => handleClick(item.id)} role="listitem">
          <img src={item.imageUrl} className={styles.image} />
          <span className={clsx([styles.title, 'm-bottom-1'])}>{item.title}</span>
          <span className={styles.helpText}>{item.author}</span>
        </div>
      ))}
    </div>
  );
}

export default BookList;
