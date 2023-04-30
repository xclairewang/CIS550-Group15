import * as React from 'react';
import {Container, Typography} from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FolderIcon from '@mui/icons-material/Folder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import List from '@mui/material/List';


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useEffect, useState} from "react";

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

const config = require('../config.json');


export default function FollowList({ username }) {

  const [data, setData] = useState([]);

  useEffect(() => {
      fetch(`http://${config.server_host}:${config.server_port}/follower/${username}`)
        .then(res => res.json())
        .then(resJson => {
          setData(resJson);
      });
  }, [])

  const addFollow = (target_id) => {
    const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({'username': username, 'follow_id': target_id})
    };
    fetch(`http://${config.server_host}:${config.server_port}/new_follow`, request);
  }

  const deleteFollow = (target_id) => {
    const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({'username': username, 'follow_id': target_id})
    };
    fetch(`http://${config.server_host}:${config.server_port}/delete_follow`, request);
  }

    return(
      <Container>
        {/*<Alert severity="success">This is a success alert — check it out!</Alert>*/}
        <Box sx={{ ...style, width: 500, height: '80%' }}>
          <h2>Followers</h2>
          <List>
          { Object.keys(data).length !== 0 && data.map((person) =>
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="add" onClick={() => {addFollow(person.follower)}}>
                    { person.user_could_follow === 1 && <AddCircleIcon /> }
                  </IconButton>}
              >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: '#bf360c' }} >
                  {person.follower[0]}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={person.follower}
                secondary={(person.genre_pref_1 ?? '').concat(' ', ( person.genre_pref_2 ?? ''), ' ', (person.genre_pref_3 ?? ''))}
              />
            </ListItem>
            )
          }
          </List>
       </Box>
      </Container>
    );

};

