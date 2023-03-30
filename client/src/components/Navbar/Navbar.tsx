import * as React from 'react';
import routes from '../../utils/routes';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

import NavbarDropdown from './NavbarDropdown';
import { Link, useLocation } from 'react-router-dom';

const pages = ['home', 'profile', 'school', 'lessons'];

type Props = {
  navItems?: [];
};

function Navbar({ navItems }: Props) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const location = useLocation();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const renderMenu = () => {
    console.log(navItems);
    if (navItems) {
      return navItems.map((item, key) => (
        <Box
          key={key}
          sx={{ my: 2, color: 'white', display: 'block' }}
        >
          <Link to={'#'}>{item}</Link>
        </Box>
      ));
    }

    return pages.map((pageId) => {
      const url = routes[pageId].url;

      let boxClass = '';
      if (location.pathname === url) {
        boxClass = 'menu__item--active';
      }

      return (
        <Box
          className={`menu__item ${boxClass}`}
          key={pageId}
          onClick={handleCloseNavMenu}
          sx={{ my: 2, color: 'white', display: 'block' }}
        >
          <Link to={routes[pageId].url}>{routes[pageId].label}</Link>
        </Box>
      );
    });
  };

  return (
    <AppBar
      className="navMain"
      position="static"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            className="logo"
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
          >
            <img
              src="/public/assets/logo-white.png"
              alt="Udaan"
            />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              className="menu"
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((pageId) => (
                <MenuItem
                  key={pageId}
                  onClick={handleCloseNavMenu}
                >
                  <Link to={routes[pageId].url}>{routes[pageId].label}</Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            className="logo logo--center"
            sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
          >
            <img
              src="/public/assets/logo-white.png"
              alt="Udaan"
            />
          </Box>

          <Box
            className="menu menu--center"
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
          >
            {renderMenu()}
          </Box>

          {!navItems ? (
            <Box sx={{ flexGrow: 0 }}>
              <NavbarDropdown />
            </Box>
          ) : (
            ''
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
