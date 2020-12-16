import React, { useEffect } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import SignUp from '../screens/SignUp';
import Login from '../screens/Login';
import Home from '../screens/Home';
import { useDispatch, useSelector } from '../contexts/UserContext';
import { actionCreators } from '../contexts/UserContext/reducer';
import BookDetail from '../screens/BookDetail';

import { ROUTES } from './constants';
import HandleRoute from './HandleRoute';

function AppRouter() {
  const dispatch = useDispatch();

  const authenticated = useSelector((state) => Boolean(state.session));

  useEffect(() => {
    dispatch(actionCreators.evaluateSession());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Switch>
        <HandleRoute authenticated={authenticated} component={Login} path={ROUTES.login} exact />
        <HandleRoute authenticated={authenticated} component={SignUp} path={ROUTES.signup} exact />
        <HandleRoute
          authenticated={authenticated}
          component={BookDetail}
          path={ROUTES.bookDetail}
          exact
          protect
        />
        <HandleRoute authenticated={authenticated} component={Home} path={ROUTES.home} exact protect />
      </Switch>
    </BrowserRouter>
  );
}

export default AppRouter;
