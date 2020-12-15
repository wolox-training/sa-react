import React, { useEffect } from 'react';
import clsx from 'clsx';
import i18next from 'i18next';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';

import { AuthCredentials } from '../../../typings/user';
import { email } from '../../../utils/inputValidations';
import { login } from '../../../services/UserService';
import { ROUTES } from '../../routers/constants';
import { useLazyRequest } from '../../../hooks/useRequest';
import Alert from '../../components/Alert';
import Button from '../../components/Button';
import Input from '../../components/Input';
import logo from '../../assets/logo-wolox.png';
import { useDispatch } from '../../contexts/UserContext';
import { actionCreators } from '../../contexts/UserContext/reducer';

import styles from './styles.module.scss';
import { FORM_FIELDS } from './constants';

function Login() {
  const dispatch = useDispatch();

  const history = useHistory();

  const { register, errors, handleSubmit } = useForm<AuthCredentials>();

  const [state, loading, error, sendRequest] = useLazyRequest({ request: login });

  const toSignUp = () => {
    history.push(ROUTES.signup);
  };

  const onSubmit = handleSubmit((data) => sendRequest(data));

  useEffect(() => {
    if (state?.headers?.['access-token']) {
      dispatch(
        actionCreators.login({
          client: state.headers.client,
          uid: state.headers.uid,
          token: state.headers['access-token']
        })
      );

      history.replace(ROUTES.home);
    }
  }, [dispatch, history, state]);

  return (
    <div className={clsx([styles.container, 'column middle center'])}>
      <div className={styles.containerLogin}>
        <div className="row middle center">
          <img src={logo} alt="logo" />
        </div>
        {error && <Alert variant="error" message={error.errorData?.errors.join(', ')} />}
        {loading && <Alert variant="info" message={i18next.t('Login:loading')} />}
        <form onSubmit={onSubmit} className={styles.form}>
          <Input
            label={i18next.t('Login:email')}
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
            label={i18next.t('Login:password')}
            name={FORM_FIELDS.password}
            type="password"
            inputRef={register({
              required: {
                value: true,
                message: i18next.t('SignUp:requiredField')
              }
            })}
            error={errors.password?.message}
          />
          <Button type="submit" className="full-width" disabled={loading}>
            {i18next.t('Login:login')}
          </Button>
        </form>
        <Button variant="outline" className="full-width" onClick={toSignUp}>
          {i18next.t('Login:signup')}
        </Button>
      </div>
    </div>
  );
}

export default Login;
