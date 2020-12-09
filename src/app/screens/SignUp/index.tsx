import React, { useEffect, useRef } from 'react';
import i18next from 'i18next';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';

import { User } from '../../../typings/user';
import logo from '../../assets/logo-wolox.png';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useLazyRequest } from '../../../hooks/useRequest';
import { signup } from '../../../services/UserService';
import Alert from '../../components/Alert';
import { email } from '../../../utils/inputValidations';

import styles from './styles.module.scss';
import { FORM_FIELDS } from './constants';

function SignUp() {
  const { register, errors, handleSubmit, watch, formState, reset } = useForm<User>({ mode: 'all' });

  const password = useRef('');
  password.current = watch('password', '');

  const [state, loading, error, sendRequest] = useLazyRequest({ request: signup });

  const onSubmit = handleSubmit((user) => {
    user.locale = i18next.language;
    sendRequest(user);
  });

  useEffect(() => {
    if (state?.id) {
      reset();
    }
  }, [state, reset]);

  return (
    <div className={clsx([styles.container, 'column middle center'])}>
      <div className={styles.containerSignUp}>
        <div className="row middle center">
          <img src={logo} alt="logo" />
        </div>
        {error && <Alert variant="error" message={error.errorData?.errors.fullMessages.join(', ')} />}
        {loading && <Alert variant="info" message={i18next.t('SignUp:loading')} />}
        {state?.id && <Alert variant="success" message={i18next.t('SignUp:successful')} />}
        <form onSubmit={onSubmit} className={styles.form}>
          <Input
            label={i18next.t('SignUp:firstName')}
            name={FORM_FIELDS.firstName}
            inputRef={register({
              required: {
                value: true,
                message: i18next.t('SignUp:requiredField')
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
                message: i18next.t('SignUp:requiredField')
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
                message: i18next.t('SignUp:requiredField')
              },
              validate: email(i18next.t('SignUp:invalidEmail'))
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
                message: i18next.t('SignUp:requiredField')
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
                message: i18next.t('SignUp:requiredField')
              },
              validate: (value) =>
                value === password.current || (i18next.t('SignUp:passwordsDontMatch') as string)
            })}
            error={errors.passwordConfirmation?.message}
          />
          <Button type="submit" className="full-width" disabled={!formState.isValid || loading}>
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
