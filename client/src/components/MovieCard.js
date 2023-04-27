import * as React from 'react';
import {Container, Typography} from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

// function getRateButton({watched}) {
//   console.log(watched);
//   if (watched == "1") {
//     return <Button size="small">Rate</Button>;
//   }
//   return;
// // }

export default function MovieCard({title, year, link, rating, watched}) {
  // const rateButton = getRateButton(watched);
  return(
    <Container>
      <Card sx={{ width: 300 }}>
        <CardMedia
          sx={{ height: 350}}
          image= "https://www.omdbapi.com/src/poster.jpg"
          title= "Poster"/>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {title.replace("\\", "")}
          </Typography>
          <Typography variant="h7" color="text.secondary">
            {year}
          </Typography>
          <Typography variant="h5" color="red">
            {"      " +rating.toFixed(1)}
          </Typography>

        </CardContent>
        <CardActions>
          <Button size="small" href={link} target="_blank">Link</Button>
          {/*if (watched == 0)  {*/}
          {watched === 0 && <Button size="small">Rate</Button>}
          {/*}*/}
          {/*{rateButton}*/}
        </CardActions>
      </Card>
    </Container>
  );
};

