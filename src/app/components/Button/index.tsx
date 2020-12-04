import React from 'react';
import clsx from 'clsx';

import styles from './styles.module.scss';

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  type?: 'button' | 'reset' | 'submit';
  variant?: 'outline' | 'solid';
}

function Button({ className, variant = 'solid', ...props }: ButtonProps) {
  return <button type="button" className={clsx([className, styles.button, styles[variant]])} {...props} />;
}

export default Button;
