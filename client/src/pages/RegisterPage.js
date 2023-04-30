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
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import ToggleButton from "@mui/material/ToggleButton";
import RatingCard from "../components/RatingCard";

//TODO: set max genres to 3; implement ratings
export default function RegisterPage(props) {
  const allGenres = ['Documentary', 'Short', 'Animation', 'Comedy', 'Romance', 'Sport',
       'News', 'Drama', 'Fantasy', 'Horror', 'Biography', 'Music', 'War', 'Crime',
       'Western', 'Family', 'Adventure', 'Action', 'History', 'Mystery', 'Sci-Fi',
       'Musical', 'Thriller', 'Film-Noir', 'Game-Show', 'Talk-Show', 'Reality-TV', 'Adult']
  const [genre, setGenre] = useState([])
  const [frame, setFrame] = useState(0)
  const handleGenre = (event) => {
    const {
      target: { value },
    } = event;
    setGenre(
      typeof value === 'string' ? value.split(',') : value,
    );
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
  if (frame === 0) {
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
            <FormControl sx={{ marginTop:3, minWidth: 400 }}>
              <InputLabel id="select-label">Genre Preference</InputLabel>
              <Select
                id="demo-simple-select"
                multiple
                required
                value={genre}
                onChange={handleGenre}
                input={<OutlinedInput id="select-multiple-chip" label="Genre Preference" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {/*<MenuItem value="">*/}
                {/*  <em>None</em>*/}
                {/*</MenuItem>*/}
                {allGenres.map((g) =>
                    <MenuItem key={g} value={g}>{g}</MenuItem>
                )}
              </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => setFrame(1)}
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
  } else if (frame <= 3) {
    return(
      <Container component="main">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography gutterBottom variant="h6">
            Please rate 3 movies to let us know your preference:
          </Typography>
          <Typography gutterBottom variant="h6">
            1/3
          </Typography>
          <RatingCard forRegister={1}></RatingCard>
        </Box>
      </Container>
    );
  }


}
