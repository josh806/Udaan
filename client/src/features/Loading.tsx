import React from 'react';
import avatar1_walking from '../assets/gifs/loading/avatar1_walking.gif';
import avatar2_walking from '../assets/gifs/loading/avatar2_walking.gif';
import avatar3_walking from '../assets/gifs/loading/avatar3_walking.gif';
import bus_right from '../assets/gifs/loading/bus_right.gif';
import './Loading.css';
const Loading = () => {
  return (
    <>
      <div className='loading_page_background'>
        <div className='loading_details'>
          <img
            className='loading_avatar avatar1'
            src={avatar1_walking}
            alt=''
          />
          <img
            className='loading_avatar avatar2'
            src={avatar2_walking}
            alt=''
          />
          <img
            className='loading_avatar avatar3'
            src={avatar3_walking}
            alt=''
          />
          <img
            className='loading_avatar bus'
            src={bus_right}
            alt=''
          />
        </div>
      </div>
    </>
  );
};
export default Loading;
