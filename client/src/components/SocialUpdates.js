import * as React from 'react';
import {Container, Grid, Typography} from "@mui/material";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';
import {useEffect, useState} from "react";
import config from "../config.json";

export default function SocialUpdates({ username, timestamp, id, comment, title, year, rating}) {
  const [poster, setPoster] = useState('');
  const [genre, setGenre] = useState('');
  useEffect(() => {
    // Fetch movie data from omdb API
    fetch(`https://www.omdbapi.com/?i=${id}&apikey=81d960fe`)
      .then(res  => res.json())
      .then(resJson => {
        const posterURL = resJson.Poster;
        setGenre(resJson.Genre);
        if (posterURL !== 'N/A') {
          setPoster(posterURL)
        } else {
          setPoster("https://www.omdbapi.com/src/poster.jpg")
        }
      });
  },[]);
  return(
    <Container>
      <Card sx={{ maxHeight: 530}}>
        <Grid container spacing={1} alignItems="center" justifyContent="center" >
        <Grid item xs={9}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: '#bf360c' }} >
                {username[0]}
              </Avatar>
            }
            title={username}
            subheader={timestamp}
          />
          <CardContent sx={{ height:150, ml:4.5, borderLeft: 2, borderColor:'#bf360c', width:900 }}>
             <Rating
               value={rating}
               readOnly
               precision={0.5}
               size="large"
             />
            {({comment} === null || {comment} === '') ? (<Typography paragraph>Comment not available</Typography>) : (<Typography paragraph>{comment}</Typography>)}
          </CardContent>
          <CardContent>
            <Typography variant="h6">
              {title}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              ({year})
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {genre}
            </Typography>
          </CardContent>
        </Grid>
        <Grid item xs={3}>
          <CardMedia
          sx={{ height: 350}}
          image={poster}
          title= "Poster"/>
        </Grid>

        </Grid>
      </Card>
    </Container>
  );
};

