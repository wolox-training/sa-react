import React, { useRef } from 'react';
import i18next from 'i18next';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';

import User from '../../../typings/user';
import logo from '../../assets/logo-wolox.png';
import Button from '../../components/Button';
import Input from '../../components/Input';

import styles from './styles.module.scss';
import { FORM_FIELDS, ERROR_MESSAGES } from './constants';

function SignUp() {
  const { register, errors, handleSubmit, watch } = useForm<User>({ mode: 'all' });

  const password = useRef('');
  password.current = watch('password', '');

  const onSubmit = handleSubmit((data) => {
    console.log({ user: { ...data, locale: 'en' } });
  });

  return (
    <div className={clsx([styles.container, 'column middle center'])}>
      <div className={styles.containerSignUp}>
        <div className="row middle center">
          <img src={logo} alt="logo" />
        </div>
        <form onSubmit={onSubmit} className={styles.form}>
          <Input
            label={i18next.t('SignUp:firstName')}
            name={FORM_FIELDS.firstName}
            inputRef={register({
              required: {
                value: true,
                message: ERROR_MESSAGES.requireMessage
              }
            })}
            error={errors.firstName?.message}
          />
          <Input
            label={i18next.t('SignUp:lastName')}
            name={FORM_FIELDS.lastName}
            inputRef={register({
              required: {
                value: true,
                message: ERROR_MESSAGES.requireMessage
              }
            })}
            error={errors.lastName?.message}
          />
          <Input
            label={i18next.t('SignUp:email')}
            name={FORM_FIELDS.email}
            inputRef={register({
              required: {
                value: true,
                message: ERROR_MESSAGES.requireMessage
              }
            })}
            error={errors.email?.message}
          />
          <Input
            label={i18next.t('SignUp:password')}
            type="password"
            name={FORM_FIELDS.password}
            inputRef={register({
              required: {
                value: true,
                message: ERROR_MESSAGES.requireMessage
              }
            })}
            error={errors.password?.message}
          />
          <Input
            label={i18next.t('SignUp:passwordConfirmation')}
            type="password"
            name={FORM_FIELDS.passwordConfirmation}
            inputRef={register({
              required: {
                value: true,
                message: ERROR_MESSAGES.requireMessage
              },
              validate: (value) => value === password.current || ERROR_MESSAGES.passwordDontMatch
            })}
            error={errors.passwordConfirmation?.message}
          />
          <Button type="submit" className="full-width">
            {i18next.t('SignUp:signup')}
          </Button>
        </form>
        <Button variant="outline" className="full-width">
          {i18next.t('SignUp:login')}
        </Button>
      </div>
    </div>
  );
}

export default SignUp;
