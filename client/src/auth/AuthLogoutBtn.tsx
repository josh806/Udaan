import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@mui/material/Button';

const AuthLogoutBtn = () => {
  const { logout } = useAuth0();

  return (
    <Button
      color='info'
      variant='contained'
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Log Out
    </Button>
  );
};

export default AuthLogoutBtn;
