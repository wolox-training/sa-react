import React from 'react';
import clsx from 'clsx';

import styles from './styles.module.scss';

interface Props extends React.HTMLProps<HTMLInputElement> {
  error?: string;
  inputRef?: (ref: HTMLInputElement) => void;
  label?: string;
}

function Input({ inputRef, label, error, className, ...props }: Props) {
  return (
    <label className={clsx([styles.label, 'm-bottom-3 full-width'])}>
      {label}
      <input ref={inputRef} {...props} className={clsx([className, styles.input])} role="textbox" />
      {error && (
        <span className="text-error" role="alert">
          {error}
        </span>
      )}
    </label>
  );
}

export default Input;
