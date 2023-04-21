const mysql = require('mysql')
const config = require('./config.json')

/******************
 * IN USE *
 ******************/

const connection = mysql.createConnection({
  host: config.rds_host,
  user: config.rds_user,
  password: config.rds_password,
  port: config.rds_port,
  database: config.rds_db
});
connection.connect((err) => err && console.log(err));


// Route 1: GET /trending/:user_id
const trending = async function(req, res) {
  const user_id = req.params.user_id
  
  connection.query (
    `SELECT M.id, M.imdb_link, M.title, M.imdb_rating, M.year, (
      CASE WHEN EXISTS (
      SELECT rating
          FROM MovieRatings R
          WHERE R.username = '${req.params.user_id}'
      ) THEN 1 ELSE 0 END
      ) AS watched, GROUP_CONCAT(G.genre, '') AS genres
      FROM Movies M 
      JOIN MovieGenres G ON M.id = G.movie_id
      GROUP BY M.id, M.imdb_link, M.title, M.imdb_rating, M.year, watched
      ORDER BY M.imdb_rating DESC
      LIMIT 50`
  , (err, data) => {
    if (err || data.length === 0) {
      // if there is an error for some reason, or if the query is empty (this should not be possible)
      // print the error message and return an empty object instead
      console.log(err);
      res.json({});
    } else {
      res.json(data);
    }
  }); 
}

// Route 2: GET /register_rate
const register_rate = async function(req, res) {
  const page = req.query.page;
  const pageSize = req.query.page_size ?? 10;
  
  connection.query (
    `WITH CombGenres AS (
      SELECT G.movie_id, CONCAT(G.genre, ';') AS genres
      FROM MovieGenres G
      GROUP BY G.movie_id
    ) 
    SELECT M.id, M.imdb_link, M.title, M.imdb_rating, M.year, COUNT(username) AS num_ratings
    FROM MovieRatings R 
    JOIN Movies M ON M.id = R.movie_id 
    JOIN CombGenres C ON C.movie_id = R.movie_id
    GROUP BY M.id
    ORDER BY num_ratings` 
    
    //add back offset once connected with frontend
    //LIMIT ${pageSize} OFFSET ${(page-1) * pageSize}
  , (err, data) => {
    if (err || data.length === 0) {
      // if there is an error for some reason, or if the query is empty (this should not be possible)
      // print the error message and return an empty object instead
      console.log(err);
      res.json({});
    } else {
      res.json(data);
    }
  }); 
}

// Route 3: GET /search
const search = async function(req, res) {
  const title = req.query.title ?? '%';
  const genre = req.query.genre ?? '%';
  const yearLow = req.query.year_low ?? 0;
  const yearHigh = req.query.year_high ?? 2200;

  connection.query (
    `WITH AllMovies AS (
      SELECT id, imdb_link, title, imdb_rating, year,  GROUP_CONCAT(genre, '') AS genres
      FROM Movies M JOIN MovieGenres G ON M.id = G.movie_id
      GROUP BY id
    )
    SELECT id, imdb_link, title, imdb_rating, year, genres
    FROM AllMovies A
    WHERE LOWER(title) LIKE '%.strtolower(${title}).%' AND genres LIKE '${genre}' AND year <= '${yearHigh}' AND year >= '${yearLow}' ` 
    
    //add back offset once connected with frontend
    //LIMIT ${pageSize} OFFSET ${(page-1) * pageSize}
  , (err, data) => {
    if (err || data.length === 0) {
      // if there is an error for some reason, or if the query is empty (this should not be possible)
      // print the error message and return an empty object instead
      console.log(err);
      res.json({});
    } else {
      res.json(data);
    }
  }); 

}

// Route 4: GET /login
//not tested yet
const login = async function(req, res) {
  const username = req.params.username;
  const password = req.params.password;
  
  connection.query (
    `SELECT U.username, U.password
    FROM Users U
    WHERE username = '${username}' AND password = '${password}' `, (err, data) => {
      if (err || data.length === 0) {
        // if there is an error for some reason, or if the query is empty (this should not be possible)
        // print the error message and return an empty object instead
        console.log(err);
        res.json({});
      } else {
        res.json(data);
      }
    }    
  )
}

// Route 5: GET /update/:user_id
const update = async function(req, res) {
  const page = req.query.page;
  const pageSize = req.query.page_size ?? 10;

  connection.query(
    `SELECT R.username, M.title, R.rating, M.imdb_link, R.comment
    FROM Following F
    JOIN MovieRatings R ON F.following = R.username
    JOIN Movies M on R.movie_id = M.id
    WHERE F.user = '${req.params.user_id}'
    ORDER BY timestamp DESC
    LIMIT ${pageSize} `, (err, data) => {
      if (err || data.length === 0) {
        // if there is an error for some reason, or if the query is empty (this should not be possible)
        // print the error message and return an empty object instead
        console.log(err);
        res.json({});
      } else {
        res.json(data);
      } 
    });
}


// Route 6: GET /follower/:user_id
const follower = async function(req, res) {
  connection.query(`
    SELECT follower
    FROM Follower
    WHERE user = '${req.params.user_id}'`, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data);
    }
  });
}

// Route 7: GET/top_movies/:user_id
const top_movies =async function(req, res) {
  connection.query(
    `SELECT M.title, M.imdb_link, R.rating
    FROM MovieRatings R
    JOIN Movies M ON R.movie_id = M.id
    WHERE R.username = '${req.params.user_id}'
    ORDER BY R.rating DESC
    LIMIT 5
    `,  (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data);
    } 
  }) 
}

// Route 8: GET /two_degree/:user_id
const two_degree = async function(req, res) {
  const currUser= req.params.user_id

  connection.query(
    `WITH D0 AS (
      SELECT curr_following 
      FROM Following F
      WHERE F.user = '${currUser}'	
    )
    (SELECT DISTINCT F2.following AS potential
    FROM Following F1 
    JOIN Following F2 ON F1.following = F2.user
    WHERE F1.user = '${currUser}' AND F2.following <> '${currUser}' AND F2.following NOT IN (
    SELECT curr_following 
    FROM D0
    ) )
    UNION
    (SELECT DISTINCT F3.following AS potential
    FROM Following F1 
    JOIN Following F2 ON F1.following = F2.user
    JOIN Following F3 ON F2.following = F3.user
    WHERE F1.user = '${currUser}' AND F2.following <> '${currUser}' AND F3.following <> '${currUser}' AND F3.following NOT IN (
    SELECT curr_following 
    FROM D0
    ) )`, (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json({});
      } else {
        res.json(data);
      }  
    }
  )
}


// Route 10: GET /top_genre/:user_id
const top_genre = async function(req, res){
  connection.query(
    `SELECT genre, COUNT(genre) AS count
    FROM Following F 
    JOIN MovieRatings R ON F.following = R.username OR  '${req.params.user_id}' = R.username
    JOIN MovieGenres G ON R.movie_id = G.movie_id
    WHERE F.user = '${req.params.user_id}'
    GROUP BY genre 
    ORDER BY count DESC
    LIMIT 1`, (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json({});
      } else {
        res.json(data);
      }
    });
}


//Route 9: GET /rec/:user_id
//not tested
// const rec = async function(req, res){
//   const currUser = req.params.user_id 

//   connection.query(
//     `
//     CREATE VIEW TwoDegree AS (
//       WITH D0 AS (
//         SELECT curr_following 
//         FROM Following F
//         WHERE F.user = '${currUser}'	
//       )
//       (SELECT DISTINCT F2.following AS potential
//       FROM Following F1 
//       JOIN Following F2 ON F1.following = F2.user
//       WHERE F1.user = '${currUser}' AND F2.following <> '${currUser}' AND F2.following NOT IN (
//       SELECT curr_following 
//       FROM D0
//       ) )
//       UNION
//       (SELECT DISTINCT F3.following AS potential
//       FROM Following F1 
//       JOIN Following F2 ON F1.following = F2.user
//       JOIN Following F3 ON F2.following = F3.user
//       WHERE F1.user = '${currUser}' AND F2.following <> '${currUser}' AND F3.following <> '${currUser}' AND F3.following NOT IN (
//       SELECT curr_following 
//       FROM D0
//       ) ) 
//     )

//     CREATE VIEW T1 AS(
//       WITH AllMovie AS (
//           SELECT distinct id
//           FROM Movies
//       ),
//       RatedByUser AS (
//           SELECT movie_id, rating
//           FROM MovieRatings
//           WHERE username = '${currUser}'
//   )
//       SELECT id,
//       CASE
//           WHEN rating IS NULL then 0
//           ELSE rating
//       END AS rating
//       FROM AllMovie AM LEFT JOIN RatedByUser RU on RU.movie_id = AM.id
//     )

//     CREATE VIEW TopFollowed As (
//       SELECT DISTINCT user as potentials, COUNT(follower) as count
//       FROM Follower
//       GROUP BY user
//       ORDER BY count DESC
//       LIMIT 20
//     )
  
//     CREATE VIEW T2 AS (
//       WITH AllMovie AS (
//           SELECT distinct id
//           FROM Movies
//       ),
//       RatedByUser AS (
//           SELECT username, movie_id as id, rating
//           FROM MovieRatings
//           WHERE username in (SELECT potentials FROM TwoDegree, TopFollowed)
//       )
//       SELECT AM.id as id, username,
//       CASE
//           WHEN (AM.id, username) not in (SELECT id, username FROM RatedByUser) THEN 0
//           ELSE rating
//       END AS rating
//       FROM AllMovie AM, RatedByUser RU
//     )
  
//     WITH DotProduct AS (
//     SELECT T2.username as user,
//     SUM(T1.rating * T2.rating) / (SQRT(SUM(T1.rating * T1.rating)) * SQRT(SUM(T2.rating * T2.rating))) as Dot_Product
//     FROM T1, T2
//     GROUP BY T2.username
//     )
//     SELECT user
//     FROM DotProduct
//     ORDER BY Dot_Product DESC
//     LIMIT 20

//     DROP VIEW T1
//     DROP VIEW TopFollowed
//     DROP VIEW T2
//     `, (err, data) => {
//       if (err || data.length === 0) {
//         console.log(err);
//         res.json({});
//       } else {
//         res.json(data);
//       }
//     } 
//   )
// } 


// // Route 11: POST /register
// // not tested
// const register = async function(req,res){
//   const genre_pref_2 = req.params.genre_pref_1 ?? '%';
//   const genre_pref_3 = req.params.genre_pref_3 ?? '%';
//   connection.query(
//     `INSERT INTO Users (username, password, genre_pref_1, genre_pref_2, genre_pref_3)
//     VALUES ('${req.params.user_id}', '${req.params.password}','${req.params.genre_pref_1}','${genre_pref_2}','${genre_pref_3}')
//     `, (err, data) => {
//       if (err || data.length === 0) {
//         console.log(err);
//         res.json({});
//       } else {
//         res.json(data);
//       }
//     });
// }





module.exports = {
  trending,
  follower,
  register_rate,
  search,
  update,
  top_movies,
  two_degree,
  top_genre
}
