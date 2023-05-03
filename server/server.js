
const express = require('express');
const cors = require('cors');
const config = require('./config');
const routes = require('./routes');
const bodyParser = require('body-parser');

/******************
 * IN USE *
 ******************/

const app = express();
app.use(cors({
  origin: '*',
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// We use express to define our various API endpoints and
// provide their handlers that we implemented in routes.js
app.get('/trending/:user_id', routes.trending);
app.get('/movie/:user_id/:movie_id', routes.movie)
app.get('/follower/:user_id', routes.follower);
app.get('/following/:user_id', routes.following);
app.get('/register_rate', routes.register_rate);
app.get('/search/:user_id', routes.search);
app.get('/update/:user_id', routes.update);
app.get('/top_movies/:user_id', routes.top_movies);
app.get('/two_degree/:user_id', routes.two_degree);
app.get('/userinfo/:user_id',routes.userinfo);
app.get('/rec/:user_id',routes.rec);
app.get('/login', routes.login);
app.get('/logout/:user_id',routes.logout);

app.post('/create_views/:user_id',routes.create_views);
app.post('/register', routes.register);
app.post('/rate_movie/:movie_id', routes.rate_movie);
app.post('/delete_rating/:movie_id',routes.delete_rating);
app.post('/new_follow',routes.new_follow);
app.post('/delete_follow',routes.delete_follow);

app.listen(config.server_port, () => {
  console.log(`Server running at http://${config.server_host}:${config.server_port}/`)
});

module.exports = app;
