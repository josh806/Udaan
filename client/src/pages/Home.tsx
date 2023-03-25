import React from 'react';
import './Home.css';
import alex from '../assets/reading.gif';
import mark from '../assets/mark_sitting_left.gif';
import adam from '../assets/adam_phone.gif';
import AuthLoginBtn from '../auth/AuthLoginBtn';

function Home() {
  return (
    <>
      <nav className='Home_nav'>
        <div className='logo'>Logo</div>
        <div className='Home_nav_options'>
          <li>About</li>
          <li>Features</li>
          <li>Pricing</li>
        </div>
        <div>
          <button className='signin'>Sign in</button>
        </div>
      </nav>
      <div className='Home_background'>
        <div className='header'></div>
        <div className='details'>
          <div className='homepage_title_container'>
            <div className='homepage_wrapper'>
              <div className='homepage_title'>Udaan</div>
              <img className='mark_anim gif' src={mark}></img>
              <img className='reading_anim gif' src={alex}></img>
              <img className='adam_anim gif' src={adam}></img>
            </div>
          </div>
          <div className='tagline'>Learning the old school way</div>
          <div className='signin_button'>
            <AuthLoginBtn buttonLabel={'Sign in'}></AuthLoginBtn>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
