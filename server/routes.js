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
      SELECT following 
      FROM Following F
      WHERE F.user = '${currUser}'	
    )
    (SELECT DISTINCT F2.following AS potential
    FROM Following F1 
    JOIN Following F2 ON F1.following = F2.user
    WHERE F1.user = '${currUser}' AND F2.following <> '${currUser}' AND F2.following NOT IN (
    SELECT following 
    FROM D0
    ) )
    UNION
    (SELECT DISTINCT F3.following AS potential
    FROM Following F1 
    JOIN Following F2 ON F1.following = F2.user
    JOIN Following F3 ON F2.following = F3.user
    WHERE F1.user = '${currUser}' AND F2.following <> '${currUser}' AND F3.following <> '${currUser}' AND F3.following NOT IN (
    SELECT following 
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

//Route 9.1: POST /rec/:user_id
//need to be tested
const create_views = async function(req, res){
  const currUser = req.params.user_id 
  
  connection.query(
    `CREATE VIEW T1_${currUser} AS(
      WITH AllMovie AS (
          SELECT distinct movie_id
          FROM MovieRatings
      ),
      RatedByUser AS (
          SELECT movie_id, rating
          FROM MovieRatings
          WHERE username = '${currUser}'
      )
      SELECT AM.movie_id,
      CASE
          WHEN rating IS NULL then 0
          ELSE rating
      END AS rating
      FROM AllMovie AM LEFT JOIN RatedByUser RU on RU.movie_id = AM.movie_id
    );

    CREATE VIEW T2_${currUser} AS (
      WITH AllMovie AS (
        SELECT distinct movie_id
        FROM MovieRatings
      ),
      RatedByUser AS (
        (SELECT username, movie_id as id, rating
         FROM MovieRatings
         WHERE username in (SELECT potentials FROM TopFollowed)
         )
         UNION
         (
            SELECT username, movie_id as id, rating
            FROM MovieRatings
            WHERE username in (SELECT potential FROM TwoDegree_${currUser})
        )
      )
    SELECT AM.movie_id as id, username,
    CASE
        WHEN RU.rating IS NULL THEN 0
        ELSE RU.rating
    END AS rating
    FROM AllMovie AM
    LEFT JOIN RatedByUser RU ON AM.movie_id = RU.id);`, (err, data) =>{
      if (err) {
        console.log(err);
        res.status(400).send(`Views cannot be added to the database. Please try again`);
      } else {
        res.status(200).send(`Views Created`);
      }
    }
  )
}

//Route 9: GET /rec/:user_id
//tested
const rec = async function(req, res){
  const currUser = req.params.user_id 

  connection.query(
    `WITH DotProduct AS (
      SELECT T2_${currUser}.username as user,
      SUM(T1_${currUser}.rating * T2_${currUser}.rating) / (SQRT(SUM(T1_${currUser}.rating * T1_${currUser}.rating)) * SQRT(SUM(T2_${currUser}.rating * T2_${currUser}.rating))) as Dot_Product
      FROM T1_${currUser} JOIN T2_${currUser} ON T1_${currUser}.movie_id = T2_${currUser}.id
      GROUP BY T2_${currUser}.username
    )
  SELECT user
  FROM DotProduct
  ORDER BY Dot_Product DESC
  LIMIT 10`, (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json({});
      } else {
        res.json(data);
      }
    } 
  )
} 


// Route 11: POST /register
// not tested
const register = async function(req,res){
  const genre_pref_2 = req.params.genre_pref_2 ?? '';
  const genre_pref_3 = req.params.genre_pref_3 ?? '';
  connection.query(
    `SELECT username FROM Users WHERE username = '${req.params.user_id}'`
    , async(err, data) => {
      if (err) {
        console.log(err);
        res.status(400).send("User Info cannot be added to the database. Please try again");
      } else if (data.length != 0){
        console.log(`Useranme exists`);
        res.status(409).send(`Username already exists`);
      }else {
        connection.query(
        `INSERT INTO Users (username, password, genre_pref_1, genre_pref_2, genre_pref_3)
        VALUES ('${req.params.user_id}', '${req.params.password}','${req.params.genre_pref_1}','${genre_pref_2}','${genre_pref_3}')
        `, async (err, data) => {
          if (err) {
            console.log(err);
            res.status(400).send(`User Info cannot be added to the database. Please try again`);
          } else {
            res.status(200).send(`User Registered`);
          }
        });
      }
    });
}

//Route 12: POST /rate_movie/:movie_id
const rate_movie = async function(req,res){
  const timestamp = new Date();
  const usrComment = req.params.comment ?? '';
  connection.query(
    `INSERT INTO MovieRatings (username, movie_id, rating, comment, timestamp)
    VALUES ('${req.params.user_id}', '${req.params.movie_id}','${req.params.rating}','${usrComment}','${timestamp}')
    `, (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).send(`User cannot add a comment to the database. Please try again`);
      } else {
        res.status(201).send(`User '${req.params.user_id}' created a new comment`)
      }
    });
}

//Route 13: /delete_rating/:movie_id
const delete_rating = async function(req,res){
  const currusr = req.params.user_id;
  const movieid = req.params.movie_id;
  connection.query(
    `DELETE FROM MovieRatings WHERE username ='${currusr}' AND movie_id = '${movieid}'
    `, (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).send(`User cannot delete a comment to the database. Please try again`);
      } else {
        res.status(200).send(`User '${currusr}' deleted rating for '${movieid}'`)
      }
    });
}

//Route 14: /new_follow
const new_follow = async function(req,res){
  const currusr = req.params.user_id;
  const followid = req.params.follow_id;
  connection.query(
    `INSERT INTO Follower
     VALUES ('${currusr}', '${followid}')
    `, async (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).send(`Follow unsuccessful. Please try again`);
      } else {
        connection.query(
          `INSERT INTO Following
          VALUES ('${followid}','${currusr})`, async (err, data) => {
          if (err) {
            console.log(err);
            res.status(400).send(`Follow unsuccessful. Please try again`);
          } else {
            res.status(201).send(`'${followid}' now follows you`)
          }
        });
        
      }
    });
}

//Route 15: /delete_follow
const delete_follow = async function(req,res) {
  const currusr = req.params.user_id;
  const followid = req.params.follow_id;
  connection.query(
    `DELETE FROM Follower WHERE username = '${currusr} AND follower = '${followid}
    `, async (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).send(`Follow unsuccessful. Please try again`);
      } else {
        connection.query(
          `INSERT INTO Following WHERE following = '${followid}' AND username = '${currusr}'
          `, async (err, data) => {
          if (err) {
            console.log(err);
            res.status(400).send(`Unfollow unsuccessful. Please try again`);
          } else {
            res.status(201).send(`You have now unfollowed'${followid}'`)
          }
        });
      }
    });
}

module.exports = {
  trending,
  follower,
  register_rate,
  search,
  update,
  top_movies,
  two_degree,
  top_genre,
  rec,
  create_views,
  register,
  rate_movie,
  delete_rating,
  new_follow,
  delete_follow
}
