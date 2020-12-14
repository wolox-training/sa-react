import React from 'react';
import clsx from 'clsx';

import styles from './styles.module.scss';

interface Props extends React.HTMLProps<HTMLButtonElement> {
  type?: 'button' | 'reset' | 'submit';
  variant?: 'outline' | 'solid' | 'text-only';
}

function Button({ className, variant = 'solid', ...props }: Props) {
  return <button type="button" className={clsx([className, styles.button, styles[variant]])} {...props} />;
}

export default Button;
