import React from 'react';
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router';

import { ROUTES } from './constants';

interface Props extends RouteProps {
  authenticated?: boolean;
  component: React.ComponentType<RouteComponentProps>;
  protect?: boolean;
}

function HandleRoute({ component: Component, protect, authenticated, ...props }: Props) {
  return (
    <Route
      {...props}
      render={(componentProps) => {
        if (!protect && authenticated) {
          return <Redirect to={ROUTES.home} />;
        }

        if (protect && !authenticated) {
          return <Redirect to={ROUTES.login} />;
        }

        return <Component {...componentProps} />;
      }}
    />
  );
}

export default HandleRoute;
