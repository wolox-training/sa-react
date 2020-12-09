import React from 'react';
import clsx from 'clsx';

import styles from './styles.module.scss';

interface Props {
  variant: 'error' | 'success' | 'info';
  message?: string;
}

function Alert({ variant, message }: Props) {
  return <span className={clsx([styles.alert, styles[variant], 'full-width'])}>{message}</span>;
}

export default Alert;
