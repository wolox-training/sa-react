import React from 'react';
import clsx from 'clsx';
import i18next from 'i18next';
import { useHistory } from 'react-router';

import logo from '../../assets/logo-wolox.png';
import Button from '../Button';
import { ROUTES } from '../../routers/constants';

import styles from './styles.module.scss';

function NavBar() {
  const history = useHistory();

  const handleClick = () => {
    localStorage.clear();
    history.replace(ROUTES.login);
  };

  return (
    <nav className={clsx(['row middle space-around', styles.navbar])}>
      <img src={logo} alt="logo" className={styles.logo} />
      <Button variant="text-only" onClick={handleClick}>
        {i18next.t('NavBar:logout')}
      </Button>
    </nav>
  );
}

export default NavBar;
