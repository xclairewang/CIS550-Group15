import * as React from 'react';
import {Container, Typography} from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

export default function MovieCard({title, year, link, rating}) {
  return(
    <Container>
      <Card sx={{ width: 250 }}>
        <CardMedia
          sx={{ height: 350}}
          image= "https://www.omdbapi.com/src/poster.jpg"
          title= "Poster"/>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            ${title}
          </Typography>
          <Typography variant="h7" color="text.secondary">
            ${year}
          </Typography>
          <Typography variant="h7" align="right">
            ${rating}
          </Typography>

        </CardContent>
        <CardActions>
          <Button size="small" href='${link}'>Link</Button>
          <Button size="small">Rate</Button>
        </CardActions>
      </Card>
    </Container>
  );
};
