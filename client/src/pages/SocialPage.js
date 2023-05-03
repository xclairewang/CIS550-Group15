import * as React from "react";
import { useEffect, useState } from 'react';
import * as React from "react";
import { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Typography
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import SocialUpdates from "../components/SocialUpdates";
import { useEffect, useState } from 'react';

const config = require('../config.json');
const config = require('../config.json');
const drawerWidth = '30%';

//need to change later
export default function SocialPage({username}) {

  // const [data, setData] = useState('');
  
  
  // useEffect(() => {
  //   fetch(`http://${config.server_host}:${config.server_port}/following/${username}`)
  //       .then(res => res.json())
  //       .then(resJson => {
  //         const following_data = resJson.map((user) => ({username: user.following, genres: user.genre_pref_1.concat(' ', user.genre_pref_2, ' ', user.genre_pref_3)}));
  //         setData(following_data);
  //     });
  // }, []);
//R.username, M.title, R.rating, M.imdb_link, M.year, M.imdb_rating, R.comment, R.timestamp
  
  console.log(username)
  const [recUpdate, setRecUpdate] = useState([]);
  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/rec/${username}`)
        .then(res => res.json())
        .then(resJson => {
          console.log(username);
          const recData = resJson.map((d) => ({username: d.user, genres: (d.genre_pref_1 ?? '').concat(' ', ( d.genre_pref_2 ?? ''), ' ', (d.genre_pref_3 ?? ''))}));
      setRecUpdate(recData);
    });

  },[]);

  return (
    <Box sx={{ display: 'flex' }}>
      <List>
        <Toolbar/>
      {userUpdate.map((updates)=>
       <ListItem
        // component="main"
        // sx={{bgcolor: 'background.default', p: 3, display: 'columns'}}
      >

        <SocialUpdates username={updates.username} timestamp={updates.timestamp} comment={updates.comment}
                       rating={updates.rating} title={updates.title} year={updates.year} id={updates.id}></SocialUpdates>
       </ListItem>)}
      </List>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
        variant="permanent"
        anchor="right"
      >
        <Toolbar />
        <Typography variant='button' mt={2} ml={2}>
          Recommend to follow
        </Typography>
        <List>
          {recUpdate.map((rec) =>
          <ListItem
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: '#bf360c' }} >
                {user.username[0]}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={rec.username}
              secondary={rec.genres}
            />
          </ListItem> )}
        </List>
      </Drawer>
      {/*<Grid container alignItems="center" justifyContent="center" spacing={3} sx={{ mx:'auto', mt:5 }}>*/}
      {/*  */}
      {/*</Grid>*/}
    </Box>
  );

};
