import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import AuthLogin from './auth/AuthLoginBtn';
import AuthLogoutBtn from './auth/AuthLogoutBtn';
import * as pages from './pages';
import './App.css';
import Phaser from './Phaser/Phaser';

const scene = Phaser;

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      {/* <Routes>
        <Route
          path="/"
          element={<pages.Home />}
        />
        <Route
          path="/profile"
          element={<pages.Profile />}
        />
        <Route
          path="/school"
          element={<pages.School />}
        />
        <Route
          path="*"
          element={<pages.NotFound />}
        />
      </Routes>

      <div className="App">
        <div className="navbar">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/school">School</NavLink>
          {!isAuthenticated ? <AuthLogin /> : <AuthLogoutBtn />}
        </div>
      </div> */}
    </>
  );
}

export default App;
