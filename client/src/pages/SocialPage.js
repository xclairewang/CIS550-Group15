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
import * as React from "react";
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import SocialUpdates from "../components/SocialUpdates";
import { useEffect, useState } from 'react';

const drawerWidth = '30%';

//R.rating, M.imdb_link, M.year, M.imdb_rating, R.comment, R.timestamp
const config = require('../config.json');
//const []
export default function SocialPage({username}) {
  const [userUpdate,setUserUpdate] = useState([]);
  const [recUpdate, setRecUpdate] = useState([]);

  const handleAddFollow = (target_id) => {
    const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({'username': username, 'follow_id': target_id})
    };
    fetch(`http://${config.server_host}:${config.server_port}/new_follow`, request).then(
      res => console.log(res.status)
    )
  }


  useEffect(() => {
    //hardcoded, need to change Test1 to ${username}
    fetch(`http://${config.server_host}:${config.server_port}/update/${username}`)
      .then(res => res.json() )
      .then(resJson =>{
        console.log(`http://${config.server_host}:${config.server_port}/update/${username}`);
        console.log(resJson);
        const allUpdates = resJson.map((update) => ({id: update.id, ...update}));
        setUserUpdate(allUpdates);
    });

    fetch(`http://${config.server_host}:${config.server_port}/rec/${username}`)
        .then(res => res.json())
        .then(resJson => {
          // console.log(`http://${config.server_host}:${config.server_port}/rec/${username}`);
          // console.log(resJson);
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
          {recUpdate.map((user)=>
          <ListItem
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: '#bf360c' }} >
                {user.username[0]}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={user.username}
              secondary={user.genres}
            />
            <IconButton edge="end" onClick={() => {handleAddFollow(user.username)}}>
                <AddCircleIcon />
            </IconButton>
          </ListItem>)}
        </List>
      </Drawer>
      {/*<Grid container alignItems="center" justifyContent="center" spacing={3} sx={{ mx:'auto', mt:5 }}>*/}
      {/*  */}
      {/*</Grid>*/}
    </Box>
  );

};
