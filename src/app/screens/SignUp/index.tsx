import React, { useRef } from 'react';
import i18next from 'i18next';
import { useForm } from 'react-hook-form';

import User from '../../../typings/user';
import logo from '../../assets/logo-wolox.png';
import Button from '../../components/Button';
import Input from '../../components/Input';

import styles from './styles.module.scss';

function SignUp() {
  const { register, errors, handleSubmit, watch } = useForm<User>({ mode: 'all' });

  const password = useRef('');
  password.current = watch('password', '');

  const requireMessage = i18next.t('SignUp:required_field');
  const passwordDontMatch = i18next.t('SignUp:passwords_dont_match');

  const onSubmit = handleSubmit((data) => {
    console.log({ user: { ...data, locale: 'en' } });
  });

  return (
    <div className={styles.container}>
      <div className="row center middle">
        <div className={styles.containerSignUp}>
          <div className="row middle center">
            <img src={logo} alt="logo" />
          </div>

          <form onSubmit={onSubmit} className={styles.form}>
            <Input
              label={i18next.t('SignUp:first_name')}
              name="first_name"
              inputRef={register({
                required: {
                  value: true,
                  message: requireMessage
                }
              })}
              error={errors.first_name?.message}
            />
            <Input
              label={i18next.t('SignUp:last_name')}
              name="last_Name"
              inputRef={register({
                required: {
                  value: true,
                  message: requireMessage
                }
              })}
              error={errors.last_name?.message}
            />
            <Input
              label={i18next.t('SignUp:email')}
              name="email"
              inputRef={register({
                required: {
                  value: true,
                  message: requireMessage
                }
              })}
              error={errors.email?.message}
            />
            <Input
              label={i18next.t('SignUp:password')}
              type="password"
              name="password"
              inputRef={register({
                required: {
                  value: true,
                  message: requireMessage
                }
              })}
              error={errors.password?.message}
            />
            <Input
              label={i18next.t('SignUp:password_confirmation')}
              type="password"
              name="password_confirmation"
              inputRef={register({
                required: {
                  value: true,
                  message: requireMessage
                },
                validate: (value) => value === password.current || passwordDontMatch
              })}
              error={errors.password_confirmation?.message}
            />

            <Button type="submit">{i18next.t('SignUp:signup')}</Button>
          </form>
          <hr />
          <Button variant="outline">{i18next.t('SignUp:login')}</Button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
