import React from 'react';
import clsx from 'clsx';
import i18next from 'i18next';

import logo from '../../assets/logo-wolox.png';
import Button from '../Button';
import { useDispatch } from '../../contexts/UserContext';
import { actionCreators } from '../../contexts/UserContext/reducer';

import styles from './styles.module.scss';

function NavBar() {
  const dispatch = useDispatch();

  const handleClick = () => dispatch(actionCreators.logout());

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
