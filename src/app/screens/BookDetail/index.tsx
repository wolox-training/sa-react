import React from 'react';
import i18next from 'i18next';
import { Link, useParams } from 'react-router-dom';
import clsx from 'clsx';

import badge from '../../assets/badge.png';
import backArrow from '../../assets/back-arrow.png';
import { ROUTES } from '../../routers/constants';
import { useRequest } from '../../../hooks/useRequest';
import { getBook } from '../../../services/BookService';

import styles from './styles.module.scss';

interface Params {
  id: string;
}

function BookDetail() {
  const { id } = useParams<Params>();

  const [state] = useRequest({ request: getBook, payload: id }, []);

  return (
    <div className={clsx('column center space-around', styles.container)}>
      <div className={styles.backContainer}>
        <Link to={ROUTES.home} className={clsx(['row middle space-between', styles.link])}>
          <img src={backArrow} alt="back-icon" />
          {i18next.t('BookDetail:goBack')}
        </Link>
      </div>
      {state?.data && (
        <div className={styles.card} role="article">
          <div className={styles.coverContainer}>
            <img src={badge} className={styles.badge} alt="badge" />
            <img src={state?.data?.imageUrl} alt="cover" className={styles.cover} />
          </div>
          <section>
            <h2 className={styles.title}>
              {state?.data?.title} <span className={styles.subTitle}>({state?.data?.genre})</span>
            </h2>
            <h3 className={styles.detailField}>
              {i18next.t('BookDetail:author')} <span className={styles.data}>{state?.data?.author}</span>
            </h3>
            <h3 className={styles.detailField}>
              {i18next.t('BookDetail:editor')} <span className={styles.data}>{state?.data?.editor}</span>
            </h3>
            <h3 className={styles.detailField}>
              {i18next.t('BookDetail:year')} <span className={styles.data}>{state?.data?.year}</span>
            </h3>
          </section>
        </div>
      )}
    </div>
  );
}

export default BookDetail;
