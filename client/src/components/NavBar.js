import { AppBar, Container, Toolbar, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import * as PropTypes from "prop-types";
import {useState} from "react";
import "@fontsource/poppins";
import logo from "../logo-white.png"

// TODO: add logo, change profile tab to picture and make drop downs
export default function NavBar(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    setAnchorEl(null);
  }




  if (props.loggedIn) {
    return (
      <AppBar position='fixed' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Container maxWidth="xl" >
          <Toolbar disableGutters sx={{justifyContent: 'center'}}>
            <Typography variant='v7' noWrap style={{
              // marginLeft: '%',
              fontWeight: 700,
              letterSpacing: '.1rem',
            }}>
                Hi, {props.username}!
            </Typography>
            <Typography variant='v7' noWrap style={{
              marginLeft: '15%',
              fontWeight: 700,
              letterSpacing: '.1rem',
            }}>
              <NavLink
                to='/'
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                Trending
              </NavLink>
            </Typography>
            <img src={logo} style={{
              marginLeft: '15%', height: 50 }}/>
            <Typography variant='h5' noWrap style={{
              marginLeft: 5,
              fontWeight: 700,
              letterSpacing: '.1rem',
            }}>
                Moowie
            </Typography>
            <Typography variant='v7' noWrap style={{
              marginLeft: '15%',
              fontWeight: 700,
              letterSpacing: '.1rem',
            }}>
              <NavLink
                to='/socials'
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                }}

              >
                Socials
              </NavLink>
            </Typography>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                style={{marginLeft: '15%'}}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfile}>
                  <NavLink
                    to='/profile'
                    style={{
                      color: 'inherit',
                      textDecoration: 'none',
                    }}

                  >
                    Profile
                  </NavLink>
                </MenuItem>
                <MenuItem onClick={props.handleLogout}>
                    Logout
                </MenuItem>
              </Menu>
            {/*<Typography variant='v7' noWrap style={{*/}
            {/*  marginLeft: '18%',*/}
            {/*  fontWeight: 700,*/}
            {/*  letterSpacing: '.1rem',*/}
            {/*}}>*/}
              {/*<NavLink*/}
              {/*  to='/profile'*/}
              {/*  style={{*/}
              {/*    color: 'inherit',*/}
              {/*    textDecoration: 'none',*/}
              {/*  }}*/}
              {/*>*/}
              {/*  Profile*/}
              {/*</NavLink>*/}
            {/*</Typography>*/}
          </Toolbar>
        </Container>
      </AppBar>
    );
  } else {
    return (
    <AppBar position='static'>
      <Container maxWidth="xl" >
        <Toolbar disableGutters sx={{justifyContent: 'center'}}>
          <img src={logo} style={{ height: 50 }}/>
          <Typography variant='h5' noWrap style={{
            marginLeft: 5,
            fontWeight: 700,
            letterSpacing: '.1rem',
          }}>
            Moowie
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
  }

}
