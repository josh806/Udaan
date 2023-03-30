import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';

type prop = {
  buttonLabel: string;
  type: string;
};

const AuthLoginBtn = ({ buttonLabel = 'Log in', type = 'button' }: prop) => {
  const { loginWithRedirect } = useAuth0();

  if (type === 'muiBtn') {
    return (
      <Button
        className="_btnCustom"
        size="large"
        variant="contained"
        onClick={() => loginWithRedirect()}
      >
        {buttonLabel}
      </Button>
    );
  }

  return <button onClick={() => loginWithRedirect()}>{buttonLabel}</button>;
};

export default AuthLoginBtn;
