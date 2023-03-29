import React from 'react';
import NavBar from '../components/NavBar';
import RegisterProfile from '../features/RegisterProfile';
import AuthRequired from './AuthRequired';

function Profile() {
  return (
    <AuthRequired>
      <>
        <NavBar />
        <section className="_section">
          <div className="_container _container--800px _textCenter">
            <RegisterProfile />
          </div>
        </section>
      </>
    </AuthRequired>
  );
}

export default Profile;
