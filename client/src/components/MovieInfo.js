import * as React from 'react';
import { useEffect, useState } from 'react';
import {Container, Typography, Grid} from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import RatingCard from "./RatingCard";

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

export default function MovieInfo({ title, poster, rating, link, watched, closeModal, genre, year, plot, runtime, username, id }) {
  const [ratingWindow, setRatingWindow] = useState(false);
  if (ratingWindow === false) {
    return(
      <Container>
        <Card sx={{ ...style, width: 750, height: 400, display: 'flex'}}>
          <Box sx={{ maxWidth:450 , alignContent: 'space-around', flexWrap: 'wrap', overflowY: "scroll"}}>
            <CardContent>
                <Typography variant="h6" >
                  {title.replace("\\", "")}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  ({year})
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {genre}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {runtime}
                </Typography>
              {rating !== null &&
                <Typography variant="h5" color="primary">
                  {rating.toFixed(1)}
                </Typography>}
              </CardContent>
              <CardContent>
                <Typography variant="button" >
                  Description:
                </Typography>
                <Typography variant="subtitle2" >
                  {plot}
                </Typography>
              </CardContent>
            <CardActions>
              <Button size="small" href={link} target="_blank">Link</Button>
              {watched === 0 && <Button size="small" onClick={() => setRatingWindow(true)}>Rate</Button>}
              {watched === 1 && <Typography variant="caption" color="text.secondary">You have watched this movie!</Typography>}
            </CardActions>
          </Box>
          <CardMedia
            sx={{ height: 360, width: 250}}
            image= {poster}//"https://www.omdbapi.com/src/poster.jpg"
            title= "Poster"/>
        </Card>
      </Container>
    );
  } else {
    return (
      <RatingCard forRegister={0} title={title.replace("\\", "")} year={year} genre={genre}
                  poster={poster} closeModal={closeModal} username={username} id={id}></RatingCard>
    );

  }

};

