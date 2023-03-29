import React from 'react';
import { Route, Routes } from 'react-router-dom';
import * as pages from './pages';
import routes from './utils/routes';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path={routes.home} element={<pages.Home />} />
        <Route path={routes.profile} element={<pages.Profile />} />
        <Route path={routes.school} element={<pages.School />} />
        {/* <Route path={routes.lessons} element={<pages.Lessons />} /> */}
        <Route path='*' element={<pages.NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
