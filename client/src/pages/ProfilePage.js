import {
  Avatar,
  Box,
  Checkbox,
  Container,
  CssBaseline, Divider,
  FormControlLabel,
  Grid, Link, SpeedDialIcon,
  TextField, Toolbar,
  Typography
} from "@mui/material";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {useState} from "react";
import FormControl from '@mui/material/FormControl';
import ToggleButton from "@mui/material/ToggleButton";
import MovieCard from "../components/MovieCard";
import FollowList from "../components/FollowList";


export default function ProfilePage() {
  const [open, setOpen] = useState(false);
  const handleOpenList = () => {
    setOpen(true);
  };
  const handleCloseList = () => {
    setOpen(false);
  };
  return (
    <Container disableGutters maxWidth={false}>
      <Toolbar />
      <Grid container spacing={3} alignItems="center" justifyContent="start"  sx={{ width:'70%', mx:'auto' }}>
        <Grid item xs={3}>
          <Avatar sx={{ m: 6, width: 120, height: 120 }}>
            H
          </Avatar>
        </Grid>
        <Grid item xs={5}>
          <Stack direction="column" spacing={2}>
            <Typography variant="h4">
              Username
            </Typography>
            <Stack direction="row" spacing={2}>
              <Chip label="Genre-1" color="primary" />
              <Chip label="Genre-2" color="primary" />
              <Chip label="Genre-3" color="primary" />
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6">
            Following
          </Typography>
          <Link variant="h4" onClick={handleOpenList}>
            178
          </Link>
          <Modal
            open={open}
            onClose={handleCloseList}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <FollowList> </FollowList>
          </Modal>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6">
            Followers
          </Typography>
          <Link variant="h4" onClick={handleOpenList}>
            50
          </Link>
          <Modal
            open={open}
            onClose={handleCloseList}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <FollowList> </FollowList>
          </Modal>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">
            Top Rated:
          </Typography>
        </Grid>
        {/*{trendingMovies.map((movie) =>*/}
          <Grid item>
            <MovieCard key={"movie.id"}  id={"movie.id"} title={"movie.title"} link={'https://'.concat("movie.imdb_link")} />
          </Grid>
        {/*)}*/}
      </Grid>
    </Container>
  );
}
