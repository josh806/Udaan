import React from 'react';
import Lessons from '../components/Lessons/Lessons';
import AuthRequired from './AuthRequired';

function Profile() {
  return (
    <AuthRequired>
      <>
        <section className="_section">
          <div className="_container _container--800px _textCenter">
            <Lessons />
          </div>
        </section>
      </>
    </AuthRequired>
  );
}

export default Profile;
