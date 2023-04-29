import * as React from 'react';
import {Container, Grid, Typography} from "@mui/material";
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import {useEffect, useState} from "react";

// TODO: card design???
export default function SocialUpdates() {
  return(
    <Card sx={{ height: 250 }}>
      <Grid container spacing={1} alignItems="start" justifyContent="start" >
        <Grid item xs={6} >
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: 'primary' }} >
                R
              </Avatar>
            }
            title="Username"
            subheader="Date-Time: April 10, 2023 10:00 AM"
          />
          <CardContent>
            <Rating
              value={3.5}
              readOnly
              precision={0.5}
              size="large"
            />
            <Typography paragraph>
              blah blah blah blah
            </Typography>
          </CardContent>
        </Grid>
        <Grid item xs={3}>
          <CardContent>
            <Typography gutterBottom variant="subtitle1" component="div">
              movie title
            </Typography>
            <Typography gutterBottom variant="subtitle1" component="div">
              imdb link?
            </Typography>
          </CardContent>
        </Grid>
        <Grid item xs={3}>
          <CardMedia
          sx={{ height: 250}}
          image="https://www.omdbapi.com/src/poster.jpg"
          title= "Poster"/>
        </Grid>
        {/*<CardContent>*/}
        {/*  <Typography gutterBottom variant="h6" component="div">*/}
        {/*    {title.replace("\\", "")}*/}
        {/*  </Typography>*/}
        {/*</CardContent>*/}
        {/*<CardActions>*/}
        {/*  <Button size="small" href={link} target="_blank">Link</Button>*/}
        {/*</CardActions>*/}
      </Grid>
    </Card>
  );
};

