import * as React from 'react';
import {Container, Grid, Typography} from "@mui/material";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';

export default function SocialUpdates() {
  return(
    <Container>
      <Card sx={{ maxHeight: 530, display: 'flex'}}>
        <Grid container spacing={1} alignItems="center" justifyContent="center" >
        <Grid item xs={9}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: '#bf360c' }} >
                R
              </Avatar>
            }
            title="Username"
            subheader="Date-Time: April 10, 2023 10:00 AM"
          />
          <CardContent sx={{ height:150, ml:4.5, borderLeft: 2, borderColor:'#bf360c' }}>
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
          <CardContent>
            <Typography variant="h6">
              Pirates of the Caribbean: The Curse OF THE BLACK PEARL
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              (2001)
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              this is genre
            </Typography>
          </CardContent>
        </Grid>
        <Grid item xs={3}>
          <CardMedia
          sx={{ height: 350}}
          image="https://www.omdbapi.com/src/poster.jpg"
          title= "Poster"/>
        </Grid>

        </Grid>
      </Card>
    </Container>
  );
};

