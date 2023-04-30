import { BrowserRouter, Routes, Route } from "react-router-dom";
import {CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from "@mui/material/styles";
import "@fontsource/poppins";

import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from "./pages/ProfilePage";
import {useState} from "react";
import SocialPage from "./pages/SocialPage";
const config = require('./config.json');

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

  const handleLogout = () => {
    setCurrentForm('login')
    // setCurrentUser('')
    fetch(`http://${config.server_host}:${config.server_port}/logout/${currentUser}`);
    // setCurrentForm('login')
    setCurrentUser('')
    console.log("logged out");
  }

  if (currentUser === '') {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar loggedIn={false} username={currentUser}/>
        <div>
          {
            currentForm === 'login' ? <LoginPage onFormSwitch={toggleForm} onLoggedIn={toggleStatus} /> : <RegisterPage onFormSwitch={toggleForm} onLoggedIn={toggleStatus}/>
          }
        </div>
      </ThemeProvider>
    )
  } else {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <NavBar loggedIn={true} username={currentUser} handleLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<HomePage username={currentUser}/>} />
            <Route path="/profile" element={<ProfilePage username={currentUser}/>} />
            <Route path="/socials" element={<SocialPage username={currentUser} />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}
