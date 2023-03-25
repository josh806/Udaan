import React from 'react';
import Button from '@mui/material/Button';
import './Home.css';
import alex from '../assets/reading.gif';
import mark from '../assets/mark_sitting_left.gif';
import adam from '../assets/adam_phone.gif';
function Home() {
  return (
    <>
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
          <div className='play_button'>
            <Button variant='contained'
            >Play </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
