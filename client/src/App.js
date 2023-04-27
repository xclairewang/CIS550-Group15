import { BrowserRouter, Routes, Route } from "react-router-dom";
import {CssBaseline, ThemeProvider, Typography} from '@mui/material'
import { createTheme } from "@mui/material/styles";
import "@fontsource/poppins";

import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AlbumsPage from './pages/AlbumsPage';
import SongsPage from './pages/SongsPage';
import AlbumInfoPage from './pages/AlbumInfoPage'
import {useState} from "react";

/******************
 * IN USE *
 ******************/

export const theme = createTheme({
  typography: {
    fontFamily: 'poppins',
  },
  palette: {
    primary: {
      main: '#bf360c',
    },
    secondary: {
      main: '#ffccbc',
    },
  },
});

// App is the root component of our application and as children contain all our pages
// We use React Router's BrowserRouter and Routes components to define the pages for
// our application, with each Route component representing a page and the common
// NavBar component allowing us to navigate between pages (with hyperlinks)
export default function App() {
  const [currentForm, setCurrentForm] = useState('login')
  const [currentUser, setCurrentUser] = useState('')
  const toggleForm = (formName) => {
    setCurrentForm(formName)
  }
  const toggleStatus = (userName) => {
    setCurrentUser(userName)
  }
  if (currentUser === '') {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar loggedIn={false} username={currentUser}/>
        <div>
          {
            currentForm === 'login' ? <LoginPage onFormSwitch={toggleForm} onLoggedIn={toggleStatus}/> : <RegisterPage onFormSwitch={toggleForm} onLoggedIn={toggleStatus}/>
          }
        </div>
      </ThemeProvider>
    )
  } else {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <NavBar loggedIn={true} username={currentUser}/>
          <Routes>
            <Route path="/" element={<HomePage username={currentUser}/>} />
            {/*<Route path="/" element={<LoginPage />} />*/}
            {/*<Route path="/albums" element={<AlbumsPage />} />*/}
            {/*<Route path="/albums/:album_id" element={<AlbumInfoPage />} />*/}
            {/*<Route path="/songs" element={<SongsPage />} />*/}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}
