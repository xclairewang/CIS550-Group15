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
      fetch(`http://${config.server_host}:${config.server_port}/following/${username}`)
        .then(res => res.json())
        .then(resJson => {
          // console.log(`http://${config.server_host}:${config.server_port}/following/${username}`);
          // const following_data = resJson.map((user) => ({following: user.following, ...user}));
          setData(resJson);

      });
  }, [])

    return(
      <Container>
        <Box sx={{ ...style, width: 500, height: '80%', overflowY: "scroll"}}>
          <h2>Following</h2>
          <List>
          { Object.keys(data).length !== 0 && data.map((person) =>
              <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: '#bf360c' }} >
                  {person.following[0]}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={person.following}
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

