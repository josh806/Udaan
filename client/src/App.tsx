import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import * as pages from './pages';

import './App.css';

function App() {
  return (
    <>
      <div className='App'>
        <Routes>
          <Route path='/' element={<pages.Home />} />
          <Route path='/profile' element={<pages.Profile />} />
          <Route path='/school' element={<pages.School />} />
          <Route path='/lessons' element={<pages.Lessons />} />
          <Route path='*' element={<pages.NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
