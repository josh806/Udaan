import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@mui/material/Button';
import { Logout } from '@mui/icons-material';

const AuthLogoutBtn = () => {
  const { logout } = useAuth0();

  return (
    <Button
      color='error'
      variant='contained'
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
      startIcon={<Logout />}
    >
      Log Out
    </Button>
  );
};

export default AuthLogoutBtn;
