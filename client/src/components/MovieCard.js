import * as React from 'react';
import {Container, Typography, CardActionArea} from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import {useEffect, useState} from "react";
import FollowList from "./FollowList";
import Modal from "@mui/material/Modal";
import MovieInfo from "./MovieInfo";

export default function MovieCard({id, title}) {
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
  useEffect(() => {
    fetch(`https://www.omdbapi.com/?i=${id}&apikey=81d960fe`)
      .then(res  => res.json())
      .then(resJson => {
        const posterURL = resJson.Poster;
        setCountry(resJson.Country);
        setGenre(resJson.Genre);
        setYear(resJson.Year);
        setDirector(resJson.Director)
        setPlot(resJson.Plot)
        setRuntime(resJson.Runtime)

        if (posterURL !== 'N/A') {
          setPoster(posterURL)
        } else {
          setPoster("https://www.omdbapi.com/src/poster.jpg")
        }
        console.log(resJson)
        // setPoster(resJson.posters[0])
      })
  },[]);

  return(
    <Container>
      <CardActionArea onClick={handleOpenMovie}>
      <Card sx={{ width: 300, height: 480 }}>
        <CardMedia
          sx={{ height: 350}}
          image= {poster}//"https://www.omdbapi.com/src/poster.jpg"
          title= "Poster"/>
        <CardContent>
          <Typography variant="h6" >
            {title.replace("\\", "")}
          </Typography>
          {/*<Typography variant="h7" color="text.secondary">*/}
          {/*  {year}*/}
          {/*</Typography>*/}
          {/*<Typography variant="h5" color="red">*/}
          {/*  {"      " +rating.toFixed(1)}*/}
          {/*</Typography>*/}

        </CardContent>
        <CardActions>
          {/*<Button size="small" href={link} target="_blank">Link</Button>*/}
          {/*{watched === 0 && <Button size="small">Rate</Button>}*/}
        </CardActions>
      </Card>
      </CardActionArea>
      <Modal
          open={open}
          onClose={handleCloseMovie}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <MovieInfo title={title} poster={poster} rating={rating} link={link} watched={watched}
                     country={country} genre={genre} director={director} year={year} plot={plot} runtime={runtime}> </MovieInfo>
      </Modal>
    </Container>
  );
};

