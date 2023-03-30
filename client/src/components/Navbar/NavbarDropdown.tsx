import React from 'react';
import AuthLogin from '../../auth/AuthLoginBtn';
import AuthLogoutBtn from '../../auth/AuthLogoutBtn';
import RegisterProfile from '../../features/RegisterProfile';
import BasicModal from '../BasicModal';
import { Avatar, Menu, MenuItem, ListItemIcon } from '@mui/material';
import { Home, MenuBook } from '@mui/icons-material';
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { Lessons } from '../../pages';
import { useLocation } from 'react-router-dom';
import routes from '../../utils/routes';

const NavbarDropdown = () => {
  const { isAuthenticated, user } = useAuth0();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [openLessonsModal, setOpenLessonsModal] = useState(false);
  const location = useLocation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModal = (event) => {
    const clicked = event.currentTarget.dataset;
    if (clicked.menuItem === 'profile') {
      setOpenProfileModal(!openProfileModal);
    } else if (clicked.menuItem === 'lessons') {
      setOpenLessonsModal(!openLessonsModal);
    } else {
      setOpenProfileModal(false);
      setOpenLessonsModal(false);
    }
  };

  const renderModals = () => {
    if (location.pathname === routes.school.url) {
      return (
        <>
          <MenuItem
            onClick={handleModal}
            data-menu-item="profile"
          >
            <Avatar
              className="menu-item"
              src={user?.picture}
            />
            My Profile
          </MenuItem>
          <MenuItem>
            <Link
              className="menu-item"
              to="/"
            >
              <ListItemIcon className="icon-menu-item">
                <Home sx={{ width: 32, height: 32 }} />
              </ListItemIcon>
              Home
            </Link>
          </MenuItem>
          <MenuItem
            onClick={handleModal}
            data-menu-item="lessons"
          >
            <ListItemIcon className="icon-menu-item">
              <MenuBook sx={{ width: 32, height: 32 }} />
            </ListItemIcon>
            Lessons
          </MenuItem>
        </>
      );
    }

    return null;
  };

  return (
    <>
      <div className="navbar">
        <Avatar
          onClick={handleClick}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          src={user?.picture}
          sx={{ width: 45, height: 45 }}
          className="avatar"
        ></Avatar>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
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
          {renderModals()}
          <MenuItem onClick={handleClose}>
            {!isAuthenticated ? (
              <AuthLogin buttonLabel={'Log in'} />
            ) : (
              <AuthLogoutBtn />
            )}
          </MenuItem>
        </Menu>
        <BasicModal
          open={openProfileModal}
          handleModal={handleModal}
        >
          <RegisterProfile />
        </BasicModal>
        <BasicModal
          open={openLessonsModal}
          handleModal={handleModal}
          padding={0}
        >
          <Lessons />
        </BasicModal>
      </div>
    </>
  );
};
export default NavbarDropdown;
