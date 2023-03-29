import React from 'react';
import avatar1_walking from '../assets/avatar1_walking.gif';
import kyle_walking from '../assets/kyle_walking.gif';
import avatar2_walking from '../assets/avatar3_walking.gif';
const Loading = () => {
  return (
    <>
      <div className='loading_page_background'>
        <div>Loading</div>
        <img src={avatar1_walking} alt='' />
        <img src={kyle_walking} alt='' />
        <img src={avatar2_walking} alt='' />
      </div>
    </>
  );
};
export default Loading;
