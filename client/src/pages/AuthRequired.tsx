import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import NotFound from './NotFound';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import routes from '../utils/routes';
import * as userService from '../services/user.service';
import * as reduxUser from '../redux/user';

type Props = {
  children: JSX.Element | undefined;
};

const AuthRequired = ({ children }: Props): JSX.Element => {
  const auth = useAuth0();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (auth.user && auth.user.sub) {
        const response = await userService.getUser(auth.user.sub);

        if ('error' in response) {
          // New user => redirect to profile
          navigate(routes.profile, {
            state: {
              authUser: auth.user,
              message: 'Please fill out your details',
            },
          });
        } else {
          // Registered user
          dispatch(reduxUser.updateUser(response));
        }
      }
      setLoading(false);
    })();
  }, [auth.user]);

  if (auth.isLoading || loading) {
    return <div>Loading...</div>;
  }

  return auth.isAuthenticated && children ? children : <NotFound />;
};

export default AuthRequired;
