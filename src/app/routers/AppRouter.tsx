import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import SignUp from '../screens/SignUp';
import Login from '../screens/Login';

import { ROUTES } from './constants';

function AppRouter() {
  return (
    <BrowserRouter>
      <Route path={ROUTES.login} component={Login} exact />
      <Route path={ROUTES.signup} component={SignUp} exact />
      <Route path={ROUTES.home} exact />
    </BrowserRouter>
  );
}

export default AppRouter;
