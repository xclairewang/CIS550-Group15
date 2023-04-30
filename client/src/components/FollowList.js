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

export default function FollowList() {
  return(
    <Container>
      <Box sx={{ ...style, width: 500, height: '80%' }}>
        <h2>Following</h2>
        <List>
          <ListItem
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <AddCircleIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: '#bf360c' }} >
                R
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Username"
              secondary="genre preferences"
            />
          </ListItem>
      </List>
        {/*<Button onClick={handleClose}>Close Child Modal</Button>*/}
     </Box>
    </Container>
  );
};

