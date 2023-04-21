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


export default function LoginPage(props) {
  // const [email, setEmail] = useState('')
  // TODO: create usestate for all fields, check inputs, connect to db
  const handleSignIn = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    props.onLoggedIn('dummyUser')
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
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
            {/*<FormControlLabel*/}
            {/*  control={<Checkbox value="remember" color="primary" />}*/}
            {/*  label="Remember me"*/}
            {/*/>*/}
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
