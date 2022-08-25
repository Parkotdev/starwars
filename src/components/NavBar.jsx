import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import navbarImg from '../img/starwars.svg';

const pages = [
  { name: 'Inicio', url: '/' },
  { name: 'Favoritos', url: '/favorites' },
];

export default function NavBar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (url, nav) => {
    setAnchorElNav(null);
    if (nav) navigate(url);
  };

  return (
    <AppBar position='sticky' sx={{ backgroundColor: 'rgb(27, 26, 23);' }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box sx={{ mr: 1, display: { xs: 'none', sm: 'flex' } }}>
            <img src={navbarImg} height={50} />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }} />

          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => handleCloseNavMenu(page.url, true)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id='menu-appbar'
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
              onClose={() => handleCloseNavMenu('', false)}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={() => handleCloseNavMenu(page.url, true)}
                >
                  <Typography textAlign='center'>{page.name}</Typography>
                  <Link to={page.url} />
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }} />

          <Box sx={{ mr: 1, display: { xs: 'flex', sm: 'none' } }}>
            <img src={navbarImg} height={50} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
