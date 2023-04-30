import { useEffect, useState } from 'react';
import {
  Box,
  Button, Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  Link,
  Slider,
  TextField, Toolbar,
  Typography
} from '@mui/material';
import Stack from '@mui/joy/Stack';
import { NavLink } from 'react-router-dom';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import MovieCard from '../components/MovieCard';
import * as PropTypes from "prop-types";

const config = require('../config.json');

// TODO: fix movie cards; add modal view for each movie; fix some weird titles; movie posters; search
export default function HomePage(username) {

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState({});

  const [searchText, setSearchText] = useState('')
  const [year, setYear] = useState([1874, 2023]);
  const [genre, setGenre] = useState('');
  const [watchedByFriend, setWatchedByFriend] = useState(false);
  const default_username = "1000079"

  const allGenres = ['Documentary', 'Short', 'Animation', 'Comedy', 'Romance', 'Sport',
       'News', 'Drama', 'Fantasy', 'Horror', 'Biography', 'Music', 'War', 'Crime',
       'Western', 'Family', 'Adventure', 'Action', 'History', 'Mystery', 'Sci-Fi',
       'Musical', 'Thriller', 'Film-Noir', 'Game-Show', 'Talk-Show', 'Reality-TV', 'Adult']


  const handleChangeGenre = (event, newGenre) => {
    setGenre(newGenre);
  }
  const handleClear = () => {
    setGenre('')
    setYear([1874, 2023])
    setSearchText('')
    setWatchedByFriend(false)
  }
  const handleChangeSearchText = (event) => {
    setSearchText(event.target.value)
  }
  const handleChangeWatchedByFriend = (event) => {
    setWatchedByFriend(event.target.checked)
  }


  // Runs when rendered for first time. Loads trending movies customized for user.
  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/trending/${default_username}`)
      .then(res => res.json())
      .then(resJson => {
        const trendingData = resJson.map((movie) => ({id: movie.id, ...movie}));
        setTrendingMovies(trendingData);
         console.log(trendingData);
      });
  }, []);


  // Search function for movies
  const search = () => {
    // fetch(`http://${config.server_host}:${config.server_port}/search?title=${searchText}
    //   &genre=${genre}&yearLow=${year[0]}&yearHigh=${year[1]}&watchedByFriends=${watchedByFriend}`)
    //   .then(res => res.json())
    //   .then(resJson => {
    //     const searchedData = resJson.map((movie) => ({id: movie.id, ...movie}));
    //     setTrendingMovies(searchedData);
    //   });
  }


  return (
    <Container disableGutters maxWidth={false}>
      <Toolbar />
      <Grid container spacing={3} alignItems="center" justifyContent="center"  sx={{ width:'70%', mx:'auto' }}>
        <Grid item xs={12}>
          <TextField fullWidth label="Enter a movie title..." id="fullWidth" margin="normal"
                     value={searchText} onChange={handleChangeSearchText}/>
        </Grid>
        <Grid item xs={1}>
          <Typography>
            Year:
          </Typography>
        </Grid>
        <Grid item xs={11}>
          <Slider
            value={year}
            min={1874}
            max={2023}
            step={1}
            onChange={(e, newValue) => setYear(newValue)}
            valueLabelDisplay='auto'
          />
        </Grid>
        <Grid item xs={1} >
          <Typography>
            Genre:
          </Typography>
        </Grid>
        <Grid item xs={11}>
            <Stack direction="row" spacing={2}>
              <ToggleButtonGroup
                color="primary"
                value={genre}
                exclusive
                onChange={handleChangeGenre}
                sx={{flexWrap:"wrap", justifyContent: "center"}}
              >
                {allGenres.map((g) =>
                  <ToggleButton value={g} sx={{
                    border:0,
                    textTransform: "lowercase"
                  }}>
                    {g}
                  </ToggleButton>
                )}
              </ToggleButtonGroup>
            </Stack>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
              control={<Checkbox value="remember" color="primary" checked={watchedByFriend} onChange={handleChangeWatchedByFriend}/>}
              label="Watched by my friends"
            />
        </Grid>
        <Grid item xs={5}>
          <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => search() }
            >
              Search
            </Button>
        </Grid>
        <Grid item xs={1}>
          <Link variant="body2" onClick={handleClear}>
            Clear
          </Link>
        </Grid>
      </Grid>
      <Grid container alignItems="center" justifyContent="center" spacing={2} sx={{ mt:5 }}>
        {trendingMovies.map((movie) =>
          <Grid item>
            {/*<MovieCard key={movie.id}  id={movie.id} title={movie.title} year={movie.year} rating={movie.imdb_rating}*/}
            {/*           link={'https://'.concat(movie.imdb_link)} watched={movie.watched}/>*/}
            <MovieCard key={movie.id}  id={movie.id} title={movie.title} />
          </Grid>
        )}
      </Grid>

    </Container>

    // <Container>
    //   {/* SongCard is a custom component that we made. selectedSongId && <SongCard .../> makes use of short-circuit logic to only render the SongCard if a non-null song is selected */}
    //   {selectedSongId && <SongCard songId={selectedSongId} handleClose={() => setSelectedSongId(null)} />}
    //   <h2>Check out your song of the day:&nbsp;
    //     <Link onClick={() => setSelectedSongId(songOfTheDay.song_id)}>{songOfTheDay.title}</Link>
    //   </h2>
    //   <Divider />
    //   <h2>Top Songs</h2>
    //   <LazyTable route={`http://${config.server_host}:${config.server_port}/top_songs`} columns={songColumns} />
    //   <Divider />
    //   {/* (TASK 16): add a h2 heading, LazyTable, and divider for top albums. Set the LazyTable's props for defaultPageSize to 5 and rowsPerPageOptions to [5, 10] */}
    //   <h2>Top Albums</h2>
    //   <LazyTable route={`http://${config.server_host}:${config.server_port}/top_albums`} columns={albumColumns} defaultPageSize={5} rowsPerPageOptions={[5, 10]}/>
    //   <Divider />
    //   {/* (TASK 17): add a paragraph (<p>text</p>) that displays the value of your author state variable from TASK 13 */}
    //   <p> {appAuthor} </p>
    // </Container>
  );
};
