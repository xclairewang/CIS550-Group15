import { AppBar, Container, Toolbar, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom';
import "@fontsource/poppins";

// TODO: add logo, change profile tab to picture and make drop downs
export default function NavBar({loggedIn}) {
  if (loggedIn) {
    return (
      <AppBar position='static'>
        <Container maxWidth="xl" >
          <Toolbar disableGutters sx={{justifyContent: 'flex-end'}}>
            <Typography variant='h5' noWrap style={{
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
                Moowie
              </NavLink>
            </Typography>
            <Typography variant='v7' noWrap style={{
              marginLeft: '19%',
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
            <Typography variant='v7' noWrap style={{
              marginLeft: '18%',
              fontWeight: 700,
              letterSpacing: '.1rem',
            }}>
              <NavLink
                to='/profile'
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                Profile
              </NavLink>
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    );
  } else {
    return (
    <AppBar position='static'>
      <Container maxWidth="xl" >
        <Toolbar disableGutters sx={{justifyContent: 'center'}}>
          <Typography variant='h5' noWrap style={{
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
