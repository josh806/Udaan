import React from 'react';
import NavBar from '../components/Navbar/NavbarDropdown';
import RegisterProfile from '../features/RegisterProfile';
import AuthRequired from './AuthRequired';

function Profile() {
  return (
    <AuthRequired>
      <>
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
