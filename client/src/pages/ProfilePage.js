import {
  Avatar,
  Box,
  Checkbox,
  Container,
  CssBaseline, Divider,
  FormControlLabel,
  Grid, Link, SpeedDialIcon,
  TextField, Toolbar,
  Typography
} from "@mui/material";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ToggleButton from "@mui/material/ToggleButton";
import MovieCard from "../components/MovieCard";
import FollowList from "../components/FollowList";
import FollowerList from "../components/FollowerList";
import { useEffect, useState } from 'react';
import * as React from "react";
const config = require('../config.json');

export default function ProfilePage({ username }) {
  const [openFollowing, setOpenFollowing] = useState(false);
  const [openFollower, setOpenFollower] = useState(false);
  // const handleOpenList = () => {
  //   setOpen(true);
  // };
  // const handleCloseList = () => {
  //   setOpen(false);
  // };

  const [topMovies, setTopMovies] = useState([])
  const [userInfo, setUserInfo] = useState([])
  const [followingNum, setFollowingNum] = useState(0)
  const [followerNum, setFollowerNum] = useState(0)

  useEffect(() => {
      fetch(`http://${config.server_host}:${config.server_port}/top_movies/${username}`)
        .then(res => res.json())
        .then(resJson => {
          // console.log(`http://${config.server_host}:${config.server_port}/top_movies/${username}`);
          // console.log(resJson);
          if (Object.keys(resJson).length === 0) {
            return;
          }
          const moviesData = resJson.map((movie) => ({id: movie.id, ...movie}));
          setTopMovies(moviesData);
          // console.log(topMovies);
      });

      fetch(`http://${config.server_host}:${config.server_port}/userinfo/${username}`)
        .then(res => res.json())
        .then(resJson => {
          console.log(`http://${config.server_host}:${config.server_port}/userinfo/${username}`);
          console.log(resJson);
          const userData = resJson.map((user) => ({...user}));
          setUserInfo(userData)
        });
  }, [])


  return (
    <Container disableGutters maxWidth={false}>
      <Toolbar />
      { Object.keys(userInfo).length !== 0 && userInfo.map((u) =>
      <Grid container spacing={3} alignItems="center" justifyContent="start"  sx={{ width:'70%', mx:'auto' }}>
        <Grid item xs={3}>
          <Avatar sx={{ m: 6, width: 120, height: 120, bgcolor: '#bf360c'}}>
            {username[0]}
          </Avatar>
        </Grid>
        <Grid item xs={5}>
          <Stack direction="column" spacing={2}>
            <Typography variant="h4">
              {username}
            </Typography>
            <Stack direction="row" spacing={2}>
              <Chip label={u.genre_pref_1} color="primary" />
              {u.genre_pref_2 !== '' && <Chip label={u.genre_pref_2} color="primary" />}
              {u.genre_pref_3 !== '' && <Chip label={u.genre_pref_2} color="primary" />}
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6">
            Following
          </Typography>
          <Link variant="h4" onClick={() => setOpenFollowing(true)}>
            {u.followingCount ?? 0}
          </Link>
          <Modal
            open={openFollowing}
            onClose={() => setOpenFollowing(false)}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <FollowList username={username}> </FollowList>
          </Modal>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6">
            Followers
          </Typography>
          <Link variant="h4" onClick={() => setOpenFollower(true)}>
            {u.followerCount ?? 0}
          </Link>
          <Modal
            open={openFollower}
            onClose={() => setOpenFollower(false)}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <FollowerList username={username}> </FollowerList>
          </Modal>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">
            Top Rated:
          </Typography>
        </Grid>
        {topMovies.map((movie) =>
          <Grid item>
            <MovieCard key={movie.id}  id={movie.id} title={movie.title} username={username} />
          </Grid>
        )}
      </Grid>
      )}
    </Container>
  );
}
