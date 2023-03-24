import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import NotFound from './NotFound';

type Props = {
  children: JSX.Element | undefined;
};

const AuthRequired = ({ children }: Props): JSX.Element => {
  const auth = useAuth0();

  if (auth.isLoading) {
    return <div>Loading ...</div>;
  }
  return auth.isAuthenticated && children ? children : <NotFound />;
};

export default AuthRequired;
