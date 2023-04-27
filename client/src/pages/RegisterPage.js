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
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {useState} from "react";
import FormControl from '@mui/material/FormControl';
import ToggleButton from "@mui/material/ToggleButton";


export default function RegisterPage(props) {
  // TODO: add necessary fields to register
  const allGenres = ['Documentary', 'Short', 'Animation', 'Comedy', 'Romance', 'Sport',
       'News', 'Drama', 'Fantasy', 'Horror', 'Biography', 'Music', 'War', 'Crime',
       'Western', 'Family', 'Adventure', 'Action', 'History', 'Mystery', 'Sci-Fi',
       'Musical', 'Thriller', 'Film-Noir', 'Game-Show', 'Talk-Show', 'Reality-TV', 'Adult']
  const [genre, setGenre] = useState('')
  const handleGenre = (event) => {
    setGenre(event.target.value);
  };

  const handleRegister = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  // POST info use json body

  // const register = () => {
  //
  //   fetch(`http://${config.server_host}:${config.server_port}/login?username=${username}&password=${password}`)
  //     .then(res => res.json())
  //     .then(resJson => {
  //       setLoginResult(resJson);
  //     });
  //
  //   if (loginResult.length == 0 ) {
  //     setErrorMsg("Incorrect username or password!");
  //   } else if (sha256(password) != loginResult.password) {
  //     setErrorMsg("Incorrect username or password!");
  //   } else {
  //     props.onLoggedIn('username');
  //   }
  // };

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
          <Avatar sx={{ m: 1, color: 'secondary.main' }}>
            {/*<LockOutlinedIcon />*/}
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" onSubmit={handleRegister} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
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
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel>Genre1</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={genre}
                label="Genre"
                onChange={handleGenre}

              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {allGenres.map((g) =>
                    <MenuItem value={g}>{g}</MenuItem>
                )}
              </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
            <Grid container>
              {/*<Grid item xs>*/}
              {/*  <Link href="#" variant="body2">*/}
              {/*    Forgot password?*/}
              {/*  </Link>*/}
              {/*</Grid>*/}
              <Grid item>
                <Link variant="body2" onClick={() => props.onFormSwitch('login')}>
                  {"Already have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}
