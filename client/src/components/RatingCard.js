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

export default function RatingCard({forRegister}) {
  const [open, setOpen] = useState(false);
  const handleOpenMovie = () => {
    setOpen(true);
  };
  const handleCloseMovie = () => {
    setOpen(false);
  };
  // from the API
  const [poster, setPoster] = useState('');
  const [country, setCountry] = useState('');
  const [genre, setGenre] = useState('');
  const [director, setDirector] = useState('');
  const [year, setYear] = useState('');
  const [plot, setPlot] = useState('');
  const [runtime, setRuntime] = useState('');
  // from fetch
  const [rating, setRating] = useState(7.5);
  const [link, setLink] = useState('')
  const [watched, setWatched] = useState(1)

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
  return(
    <Container>
      <Card sx={{ ...style, width: 1000, maxHeight: 530, display: 'flex'}}>
        <Grid container spacing={1} alignItems="center" justifyContent="start" >
        <Grid item xs={8}>
          <CardContent>
            <Typography variant="h5">
              Pirates of the Caribbean: The Curse OF THE BLACK PEARL
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              (2001)
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              abwdfnwon
            </Typography>
          </CardContent>
          <CardContent>
            <Typography gutterBottom variant="h6">
              Your Rating for This Movie:
            </Typography>
            <Rating name="size-large" defaultValue={0} precision={0.5} size="large" />
          </CardContent>
          <CardContent>
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Share your thoughts here"
              multiline
              rows={4}
              variant="filled"
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
              <Button size="small" size="large" variant="outlined" sx={{ pl: 15, pr: 15, ml: 1, mr: 4}}>Cancel</Button>
              <Button size="small" size="large" variant="contained" sx={{ pl: 15, pr: 15 }}>Submit</Button>
            </CardActions>
          }
        </Grid>
        <Grid item xs={4}>
          <CardMedia
          sx={{ height: 440}}
          image="https://www.omdbapi.com/src/poster.jpg"
          title= "Poster"/>
        </Grid>

      </Grid>
      </Card>
    </Container>
  );
};

