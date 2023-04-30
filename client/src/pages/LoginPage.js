import {
  Avatar,
  Box,
  Button, Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid, Link,
  TextField,
  Typography
} from "@mui/material";
import {useState} from "react";
import App from "../App.js";
import * as PropTypes from "prop-types";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
// var sha256 = require('js-sha256');
import sha256 from 'crypto-js/sha256';

function Topography(props) {
  return null;
}
Topography.propTypes = {children: PropTypes.node};
export default function LoginPage(props) {

  // TODO: create usestate for all fields, check inputs, connect to db

  // const [loginResult, setLoginResult] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  // const bcrypt = require("bcrypt")

  const config = require('../config.json');

  const handleSignIn = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // props.onLoggedIn('dummyUser')
    const username = data.get('email');
    const password = data.get('password')
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    // setUsername(data.get('email'));
    // setPassword(data.get('password'));

    if (username === "" | password === "") {
      setErrorMsg("Incorrect username or password!");
    }

    console.log(`http://${config.server_host}:${config.server_port}/login?username=${username}&password=${password}`);

    fetch(`http://${config.server_host}:${config.server_port}/login?username=${username}&password=${password}`)
      .then(res => res.json())
      .then(resJson => {
        console.log(resJson);
        if (Object.keys(resJson).length === 0) {
          setErrorMsg("Incorrect username or password!");
        } else {
          props.onLoggedIn(username);
        }
      });

  };

  const handleViewCreation = () => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'React POST Request Example' })
    };
  }


  // Function to check username and password, and turn to homepage if match success
  const login = () => {
    // if (username == null | password == null) {
    //   setErrorMsg("Incorrect username or password!");
    // }
    // fetch(`http://${config.server_host}:${config.server_port}/login?username=${username}&password=${password}`)
    //   .then(res => res.json())
    //   .then(resJson => {
    //     setLoginResult(resJson);
    //   });
    //
    // if (loginResult.length == 0 ) {
    //   setErrorMsg("Incorrect username or password!");
    // } else if (sha256(password) != loginResult.password) {
    //   setErrorMsg("Incorrect username or password!");
    // } else {
    //   props.onLoggedIn('username');
    // }
  };

  return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          { errorMsg && (<Stack sx={{ width: '100%', margin:3}}>
            <Alert severity="error">{errorMsg}</Alert>
          </Stack>)}
          <Avatar sx={{ m: 1, color: 'secondary.main' }}>
            {/*<LockOutlinedIcon />*/}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSignIn} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              {/*<Grid item xs>*/}
              {/*  <Link href="#" variant="body2">*/}
              {/*    Forgot password?*/}
              {/*  </Link>*/}
              {/*</Grid>*/}
              <Grid item>
                <Link variant="body2" onClick={() => props.onFormSwitch('register')}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}
