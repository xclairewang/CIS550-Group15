import {
  Avatar,
  Box,
  Typography
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from '@mui/material/List';
import * as React from "react";
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import SocialUpdates from "../components/SocialUpdates";

const drawerWidth = '30%';
export default function SocialPage() {
  return (
    <Box sx={{ display: 'flex' }}>
       <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
         <Toolbar/>
        <SocialUpdates></SocialUpdates>
      </Box>
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
          <ListItem
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <AddCircleIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <AccountCircleIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Username"
              secondary="genre preferences"
            />
          </ListItem>
        </List>
      </Drawer>
      {/*<Grid container alignItems="center" justifyContent="center" spacing={3} sx={{ mx:'auto', mt:5 }}>*/}
      {/*  */}
      {/*</Grid>*/}
    </Box>
  );
}
