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

const config = require('../config.json');

export default function MovieCard({id, title, username}) {
  const [open, setOpen] = useState(false);
  const handleOpenMovie = () => {
    setOpen(true);
  };
  const handleCloseMovie = () => {
    setOpen(false);
  };
  // from the API
  const [poster, setPoster] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [plot, setPlot] = useState('');
  const [runtime, setRuntime] = useState('');
  // from fetch
  const [rating, setRating] = useState(null);
  const [link, setLink] = useState('');
  const [watched, setWatched] = useState(0);


  const [fetchData, setFetchData] = useState([]);
  useEffect(() => {

    // Fetch movie data from omdb API
    fetch(`https://www.omdbapi.com/?i=${id}&apikey=81d960fe`)
      .then(res  => res.json())
      .then(resJson => {
        const posterURL = resJson.Poster;
        setGenre(resJson.Genre);
        setYear(resJson.Year);
        setPlot(resJson.Plot);
        setRuntime(resJson.Runtime);

        if (posterURL !== 'N/A') {
          setPoster(posterURL)
        } else {
          setPoster("https://www.omdbapi.com/src/poster.jpg")
        }
      });
    // console.log(username);
    fetch(`http://${config.server_host}:${config.server_port}/movie/${username}/${id}`)
      .then(res => res.json())
      .then(resJson => {
        setFetchData(resJson);
        // console.log(`http://${config.server_host}:${config.server_port}/movie/${username}/${id}`)
        // console.log(resJson);
        // resJson.map((movie) => {
        //   setRating(movie.imdb_rating);
        //   console.log(rating);
        //   setLink('https://'.concat(movie.imdb_link));
        //   setWatched(movie.watched);
        // });
      });
  },[open]);


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
      { Object.keys(fetchData).length !== 0 && fetchData.map((fd) =>
        <Modal
            open={open}
            onClose={handleCloseMovie}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <MovieInfo title={title} poster={poster} rating={fd.imdb_rating} link={'https://'.concat(fd.imdb_link)} watched={fd.watched} closeModal={handleCloseMovie}
                       genre={genre} year={year} plot={plot} runtime={runtime} username={username} id={id}> </MovieInfo>
        </Modal>
        )
      }
    </Container>
  );
};

