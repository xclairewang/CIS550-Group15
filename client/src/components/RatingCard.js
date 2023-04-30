import * as React from 'react';
import {Container, Typography, CardActionArea, Grid} from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import {useEffect, useState} from "react";
import FollowList from "./FollowList";
import Modal from "@mui/material/Modal";
import MovieInfo from "./MovieInfo";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import TextField from '@mui/material/TextField';
import sha256 from "crypto-js/sha256";

const config = require('../config.json');

export default function RatingCard({forRegister, title, year, genre, poster, closeModal, username, id}) {

  const [ratingCand, setRatingCand] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');

  const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 120,
  bgcolor: 'background.paper',
  border: '1px solid',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

  const ratingCandidates = () => {
    fetch(`http://${config.server_host}:${config.server_port}/register_rate?genre1=${genre}&genre2=${genre}&genre3=${genre}`)
      .then(res => res.json())
      .then(resJson => {
        console.log(`http://${config.server_host}:${config.server_port}/register_rate?genre1=${genre}&genre2=${genre}&genre3=${genre}`);
        const candidateData = resJson.map((movie) => ({id: movie.id, ...movie}));
        setRatingCand(candidateData);
      });
  }
  // const handleSignIn = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   // props.onLoggedIn('dummyUser')
  //   const username = data.get('email');
  //   const password = data.get('password')
  //   const pw_hash = sha256(password).toString();
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //     hash: pw_hash
  //   });
  const handleTextChange = (event) => {
    setUserComment(event.target.value);
  }
  const rateMovie = () => {
    const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username: username.username, rating: userRating, comment: userComment})
    };
    console.log(request);
    fetch(`http://${config.server_host}:${config.server_port}/rate_movie/${id}`, request)
      .then(res => res.status)
      .then(status => {
        if (status === 201) {
          closeModal();
        }
      })
  }

  const removeRating = (target_id) => {
    const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({'username': username, 'follow_id': target_id})
    };
    fetch(`http://${config.server_host}:${config.server_port}/new_follow`, request);
  }

  return(
    <Container>
      <Card sx={{ ...style, width: 1000, maxHeight: 530, display: 'flex'}}>
        <Grid container spacing={1} alignItems="center" justifyContent="start" >
        <Grid item xs={8}>
          <CardContent>
            <Typography variant="h5">
              {title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              ({year})
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {genre}
            </Typography>
          </CardContent>
          <CardContent>
            <Typography gutterBottom variant="h6">
              Your Rating for This Movie:
            </Typography>
            <Rating name="size-large" defaultValue={0} precision={0.5} onChange={(event, newValue) => {
              setUserRating(newValue);
            }} size="large" />
          </CardContent>
          <CardContent>
            <TextField
              fullWidth
              id="rate"
              label="Share your thoughts here"
              multiline
              rows={4}
              variant="filled"
              onChange={handleTextChange}
            />
          </CardContent>
          {forRegister === 1 &&
            <CardActions>
              <Button size="small" size="large" variant="outlined" sx={{ pl: 15, pr: 15, ml: 1, mr: 4}}>Skip</Button>
              <Button size="small" size="large" variant="contained" sx={{ pl: 15, pr: 15 }}>Next</Button>
            </CardActions>
          }
          {forRegister === 0 &&
            <CardActions>
              <Button size="small" size="large" variant="outlined" onClick={closeModal} sx={{ pl: 15, pr: 15, ml: 1, mr: 4}}>Cancel</Button>
              <Button size="small" size="large" variant="contained" onClick={rateMovie} sx={{ pl: 15, pr: 15 }}>Submit</Button>
            </CardActions>
          }
        </Grid>
        <Grid item xs={4}>
          <CardMedia
          sx={{ height: 440}}
          image={poster}
          title= "Poster"/>
        </Grid>

      </Grid>
      </Card>
    </Container>
  );
};

