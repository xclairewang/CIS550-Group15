import * as React from 'react';
import {Container, Typography} from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import {useEffect, useState} from "react";

export default function MovieCard({id, title, year, link, rating, watched}) {
  // const rateButton = getRateButton(watched);
  // get posters but none works
  const [poster, setPoster] = useState("https://www.omdbapi.com/src/poster.jpg");
  // useEffect(() => {
  //   fetch(`https://www.myapifilms.com/imdb/image/${id}?token=2725b008-c9a8-40f5-b0cc-280a0ad2ac40`)
  //     .then(res  => res.json())
  //     .then(resJson => {
  //       console.log(resJson)
  //       // setPoster(resJson.posters[0])
  //     })
  // },[]);

  return(
    <Container>
      <Card sx={{ width: 300, height: 500 }}>
        <CardMedia
          sx={{ height: 350}}
          image= {poster}//"https://www.omdbapi.com/src/poster.jpg"
          title= "Poster"/>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
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
          <Button size="small" href={link} target="_blank">Link</Button>
          {/*{watched === 0 && <Button size="small">Rate</Button>}*/}
        </CardActions>
      </Card>
    </Container>
  );
};

