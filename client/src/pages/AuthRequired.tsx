import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import NotFound from './NotFound';

type Props = {
  children: JSX.Element | undefined;
};

const AuthRequired = ({ children }: Props): JSX.Element => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return isAuthenticated && children ? children : <NotFound />;
};

export default AuthRequired;
