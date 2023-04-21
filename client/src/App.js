import { BrowserRouter, Routes, Route } from "react-router-dom";
import {CssBaseline, ThemeProvider, Typography} from '@mui/material'
import { createTheme } from "@mui/material/styles";
import "@fontsource/poppins";

import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AlbumsPage from './pages/AlbumsPage';
import SongsPage from './pages/SongsPage';
import AlbumInfoPage from './pages/AlbumInfoPage'

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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/*<Route path="/" element={<LoginPage />} />*/}
          {/*<Route path="/albums" element={<AlbumsPage />} />*/}
          {/*<Route path="/albums/:album_id" element={<AlbumInfoPage />} />*/}
          {/*<Route path="/songs" element={<SongsPage />} />*/}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
