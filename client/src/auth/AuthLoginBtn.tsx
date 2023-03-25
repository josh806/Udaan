import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
type prop = {
  buttonLabel:string
}
const AuthLoginBtn = ({buttonLabel = 'Log in'}:prop) => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>{buttonLabel}</button>;
};

export default AuthLoginBtn;
