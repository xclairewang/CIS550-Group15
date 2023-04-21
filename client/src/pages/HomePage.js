import { useEffect, useState } from 'react';
import {Box, Button, Container, Divider, Grid, Link, Slider, TextField, Typography} from '@mui/material';
import Stack from '@mui/joy/Stack';
import { NavLink } from 'react-router-dom';

import LazyTable from '../components/LazyTable';
import MovieCard from '../components/MovieCard';
import * as PropTypes from "prop-types";

const config = require('../config.json');

function Item(props) {
  return null;
}

Item.propTypes = {children: PropTypes.node};
export default function HomePage() {
  // We use the setState hook to persist information across renders (such as the result of our API calls)
  const [songOfTheDay, setSongOfTheDay] = useState({});
  // (TASK 13): add a state variable to store the app author (default to '')
  const [appAuthor, setAppAuthor] = useState('');

  const [selectedSongId, setSelectedSongId] = useState(null);

  const [year, setYear] = useState([1874, 2023]);

  const default_username = "1000079";
  // const changeYear = (event, newValue) => {
  //   setYear(newValue);
  // };
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState({});

  // The useEffect hook by default runs the provided callback after every render
  // The second (optional) argument, [], is the dependency array which signals
  // to the hook to only run the provided callback if the value of the dependency array
  // changes from the previous render. In this case, an empty array means the callback
  // will only run on the very first render.


  // Runs when rendered for first time. Loads trending movies customized for user.
  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/trending/${default_username}`)
      .then(res => console.log(res.json()))
      .then(resJson => {
        const trendingData = resJson.map((movie) => ({id: movie.id, ...movie}));
        setTrendingMovies(trendingData)
        console.log("trendingMovies")
      }, []);

  })


  // Search function for movies
  const search = () => {
    // fetch(`http://${config.server_host}:${config.server_port}/search?title=`${title}` +
    //   `&duration_low=${duration[0]}&duration_high=${duration[1]}`)
    //   .then(res => res.json())
    //   .then(resJson => {
    //     const searchData = resJson.map((movie) => ({id: movie.id, ...movie}));
    //     setSearchedMovies(searchData)
    //   });
  }


  const songColumns = [
    {
      field: 'title',
      headerName: 'Song Title',
      renderCell: (row) => <Link onClick={() => setSelectedSongId(row.song_id)}>{row.title}</Link> // A Link component is used just for formatting purposes
    },
    {
      field: 'album',
      headerName: 'Album',
      renderCell: (row) => <NavLink to={`/albums/${row.album_id}`}>{row.album}</NavLink> // A NavLink component is used to create a link to the album page
    },
    {
      field: 'plays',
      headerName: 'Plays'
    },
  ];

  // (TASK 15): define the columns for the top albums (schema is Album Title, Plays), where Album Title is a link to the album page
  // Hint: this should be very similar to songColumns defined above, but has 2 columns instead of 3
  const albumColumns = [
    {
      field: 'title',
      headerName: 'Album Title',
      renderCell: (row) => <NavLink to={`/albums/${row.album_id}`}>{row.title}</NavLink> // A NavLink component is used to create a link to the album page
    },
    {
      field: 'plays',
      headerName: 'Plays'
    },
  ];

  return (
    <Container disableGutters maxWidth={false}>
      <Grid container spacing={3} alignItems="center" justifyContent="center"  sx={{ width:'50%', mx:'auto' }}>
        <Grid item xs={12}>
          <TextField fullWidth label="Enter a movie title..." id="fullWidth" margin="normal"/>
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
        <Grid item xs={1}>
          <Typography>
            Genre:
          </Typography>
        </Grid>
        <Grid item xs={11}>
            <Stack>
              <Typography>
                Horror
              </Typography>
            </Stack>
        </Grid>
        <Grid item xs={4}>
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
      </Grid>
      <Grid container alignItems="center" spacing={3} sx={{ mx:'auto' }}>
        <Grid item>
          <MovieCard></MovieCard>
        </Grid>
        <Grid item>
          <MovieCard></MovieCard>
        </Grid>
        <Grid item>
          <MovieCard></MovieCard>
        </Grid>
        <Grid item>
          <MovieCard></MovieCard>
        </Grid>
        <Grid item>
          <MovieCard></MovieCard>
        </Grid>
      </Grid>
      {trendingMovies.map((movie) =>
        <Grid item>
          <MovieCard title={movie.title} year={movie.year} rating={movie.imdb_rating}
                     link={movie.imdb_link} />
        </Grid>
      )}
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
