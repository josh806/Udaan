import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import AuthLogin from './auth/AuthLoginBtn';
import AuthLogoutBtn from './auth/AuthLogoutBtn';
import * as pages from './pages';
import Profile from './features/Profile';
import BasicModal from './components/BasicModal';
import { Avatar, Menu, MenuItem, ListItemIcon } from '@mui/material';
import { Home, School } from '@mui/icons-material';
import './App.css';

function App() {
  const { isAuthenticated, user } = useAuth0();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openModal, setOpenModal] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      <Routes>
        <Route path='/' element={<pages.Home />} />
        <Route path='/profile' element={<pages.Profile />} />
        <Route path='/school' element={<pages.School />} />
        <Route path='*' element={<pages.NotFound />} />
      </Routes>

      <div className='App'>
        <div className='navbar'>
          <Avatar
            onClick={handleClick}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
            src={user?.picture}
            sx={{ width: 70, height: 70 }}
            className='avatar'
          ></Avatar>
          <Menu
            anchorEl={anchorEl}
            id='account-menu'
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 30,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleModal}>
              <Avatar className='menu-item' src={user?.picture} />
              My Profile
            </MenuItem>
            <MenuItem>
              <Link className='menu-item' to='/'>
                <ListItemIcon className='icon-menu-item'>
                  <Home sx={{ width: 32, height: 32 }} />
                </ListItemIcon>
                Home
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link className='menu-item' to='/school'>
                <ListItemIcon className='icon-menu-item'>
                  <School sx={{ width: 32, height: 32 }} />
                </ListItemIcon>
                School
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              {!isAuthenticated ? <AuthLogin /> : <AuthLogoutBtn />}
            </MenuItem>
          </Menu>
          <BasicModal open={openModal} handleModal={handleModal}>
            <Profile />
          </BasicModal>
        </div>
      </div>
    </>
  );
}

export default App;
