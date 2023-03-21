import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import AuthRequired from './AuthRequired';

const Profile = () => {
  const { user } = useAuth0();

  return (
    <AuthRequired>
      {user && (
        <div>
          <img
            src={user.picture}
            alt={user.name}
          />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      )}
    </AuthRequired>
  );
};

export default Profile;
