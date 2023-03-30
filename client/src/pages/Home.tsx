import React, { useState, useEffect } from 'react';
import './Home.css';
import AuthLoginBtn from '../auth/AuthLoginBtn';
import About from '../components/HomePage/About';
import Features from '../components/HomePage/Features';
import Pricing from '../components/HomePage/Pricing';
import Navbar from '../components/Navbar/Navbar';
import { Typography } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

function Home() {
  const { isAuthenticated } = useAuth0();

  const handleClickScroll = (text: string) => {
    let element;
    if (text === 'About') {
      element = document.getElementById('About_container');
    } else if (text === 'Features') {
      element = document.getElementById('Features_container');
    } else if (text === 'Pricing') {
      element = document.getElementById('Pricing_container');
    }
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = ['About', 'Features', 'Pricing'];

  return (
    <>
      <Navbar navItems={navItems} />
      {/* <nav className='Home_nav'>
        <div className='logo'>Logo</div>
        <div className='Home_nav_options'>
          <li onClick={(e) => handleClickScroll(e.currentTarget.innerText) }>About</li>
          <li onClick={(e) => handleClickScroll(e.currentTarget.innerText) }>Features</li>
          <li onClick={(e) => handleClickScroll(e.currentTarget.innerText) }>Pricing</li>
        </div>
        <div>
          {/* <button className='signin'>Sign in</button> *}
        </div>
      </nav> */}
      <div className="Home_background">
        <div className="header"></div>
        <div className="details">
          <div className="homepage_title_container">
            <div className="homepage_wrapper">
              <img
                src="/public/assets/logo.gif"
                alt="Udaan logo"
                width="390"
              />
            </div>
          </div>
          <div className="tagline">
            <Typography
              variant="subtitle1"
              gutterBottom
            >
              Old school gameplay for next generation learning
            </Typography>
          </div>
          <div className="signin_button">
            <AuthLoginBtn
              buttonLabel={isAuthenticated ? 'Play' : 'Sign in'}
              type="muiBtn"
            ></AuthLoginBtn>
          </div>
        </div>
      </div>
      <div className="Home_bottom">
        <About />
        <Features />
        <Pricing />
      </div>
      <div></div>
    </>
  );
}

export default Home;
