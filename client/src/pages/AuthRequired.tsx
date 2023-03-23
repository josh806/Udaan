import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import NotFound from './NotFound';
import { useDispatch } from 'react-redux';
import { updateName } from '../redux/user';

type Props = {
  children: JSX.Element | undefined;
};

const AuthRequired = ({ children }: Props): JSX.Element => {
  const dispatch = useDispatch();
  const auth = useAuth0();

  if (auth.isLoading) {
    return <div>Loading ...</div>;
  }
  if (auth.user?.nickname) {
    dispatch(updateName(auth.user.nickname));
  }
  return auth.isAuthenticated && children ? children : <NotFound />;
};

export default AuthRequired;
