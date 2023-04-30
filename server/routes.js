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
    `SELECT *
    FROM TrendingMovie`
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

// Route 1: GET /movie/:user_id
const movie = async function(req, res) {
  const user_id = req.params.user_id
  const movie_id = req.params.movie_id

  connection.query (
    `SELECT M.id, M.imdb_link, M.imdb_rating,
      (CASE WHEN R.username = '${user_id}' THEN 1 ELSE 0 END) AS watched
    FROM Movies M JOIN MovieRatings R ON M.id = R.movie_id
    WHERE id = '${movie_id}'
    GROUP BY M.id, M.imdb_link, M.title, M.imdb_rating, M.year, watched
    ORDER BY M.imdb_rating DESC
    LIMIT 50`, (err, data) => {
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

// Route 2: GET /register_rate
const register_rate = async function(req, res) {

  const genre1 = '%' + req.query.genre1 + '%'?? '';
  const genre2 = '%' + req.query.genre2 + '%' ?? '';
  const genre3 = '%' + req.query.genre3 + '%' ?? '';
  console.log(genre1)
  
  connection.query (
    `SELECT *
    FROM MostRatedMovies
    WHERE genres LIKE '${genre1}' OR genres LIKE '${genre2}' OR genres LIKE '${genre3}'` 
    
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

// Route 3: GET /search/:user_id
const search = async function(req, res) {
  const user_id = req.params.user_id
  const title = req.query.title ?? '';
  const genre = req.query.genre ?? '';
  const yearLow = req.query.yearLow ?? 0;
  const yearHigh = req.query.yearHigh ?? 2200;
  const watchedByFriends = req.query.watchedByFriends ?? 0 

  if(watchedByFriends !=  1) {

    connection.query (
      `SELECT distinct id, imdb_link, title, imdb_rating, year, GROUP_CONCAT(genre, '') AS genres
      FROM Movies M
        LEFT JOIN MovieGenres MG ON M.id = MG.movie_id
      WHERE M.title LIKE '%${title}%' 
        AND year <= ${yearHigh}
        AND year >= ${yearLow}
      GROUP BY id
      HAVING genres LIKE '%${genre}%'
      LIMIT 10` 
      
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
  } else {

    connection.query (
      `With AM as (
        SELECT distinct id, imdb_link, title, imdb_rating, year
        FROM Movies M 
          JOIN MovieRatings MR ON M.id = MR.movie_id
        WHERE MR.username 
          in (SELECT following FROM Following_${user_id})
          AND M.title LIKE '%${title}%'
            AND year <= ${yearHigh}
            AND year >= ${yearLow}
        GROUP BY id
      )
      SELECT id, imdb_link, title, imdb_rating, year, 
        GROUP_CONCAT(genre, '') AS genres
      FROM AM JOIN MovieGenres MG ON AM.id = MG.movie_id
      GROUP BY id
      HAVING genres LIKE '%${genre}%'
      LIMIT 10` 
      
      //add back offset once connected with frontends
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

}

// Route 4: GET /login
//not tested yet
const login = async function(req, res) {
  const username = req.query.username;
  const password = req.query.password;
  
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
        console.log(data);
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
    `SELECT R.username, M.title, R.rating, M.imdb_link, M.year, M.imdb_rating, R.comment, R.timestamp
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


// Route 6: GET /following/:user_id
// need to update considering view
const following = async function(req, res) {
  connection.query(`
  SELECT following, genre_pref_1, genre_pref_2, genre_pref_3
  FROM Following JOIN Users U on Following.following = U.username
  WHERE user = '${req.params.user_id}'`, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data);
    }
  });
}

//Route 6.1: GET/following/:user_id
const follower = async function(req, res) {
  connection.query(`
    WITH UserFollower AS (
      SELECT Follower.follower as follower, genre_pref_1, genre_pref_2, genre_pref_3
      FROM Follower JOIN Users ON Follower.user = Users.username
      WHERE user = '${req.params.user_id}'
    )
    SELECT distinct UF.follower as follower, genre_pref_1, genre_pref_2, genre_pref_3,
       (CASE WHEN UF.follower in (SELECT following FROM Following WHERE user = '${req.params.user_id}') THEN 1 ELSE 0 END) AS watched
    FROM UserFollower UF JOIN Follower F ON UF.follower = F.user`, (err, data) => {
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
    WHERE R.username = '${req.params.username}'
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
  const currUser= req.params.username

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
    WHERE F1.user = '${currUser}' AND F2.following <> '${currUser}' 
      AND F3.following <> '${currUser}' 
      AND F3.following NOT IN (
    SELECT following 
    FROM D0
    ) )`
    
    , (err, data) => {
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
    JOIN MovieRatings R ON F.following = R.username OR  '${req.params.username}' = R.username
    JOIN MovieGenres G ON R.movie_id = G.movie_id
    WHERE F.user = '${req.params.username}'
    GROUP BY genre 
    ORDER BY count DESC
    LIMIT 10`, (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json({});
      } else {
        res.json(data);
      }
    });
}

//Route 9.1: POST /create_views/:user_id
// need genre preference, whether we are following this follower or not
// following get genre preference
//need to be tested
const create_views = async function(req, res){
  const currUser = req.body.user_id 
  
  connection.query(
    `CREATE VIEW TwoDegree_${currUser} AS (
      WITH D0 AS (
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
        WHERE F1.user = '${currUser}9' AND F2.following <> '${currUser}' AND F3.following <> '${currUser}' AND F3.following NOT IN (
        SELECT following
        FROM D0
      ) )
      LIMIT 20
    );
    
    CREATE VIEW T1_${currUser} AS(
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
    LEFT JOIN RatedByUser RU ON AM.movie_id = RU.id);
    
    CREATE VIEW Following_${currUser} AS (
      SELECT following, genre_pref_1, genre_pref_2, genre_pref_3
      FROM Following JOIN Users U on Following.following = U.username
      WHERE user = '${currUser}'
    );


    
    `, (err, data) =>{
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
//get user's username genre preference
//tested
const rec = async function(req, res){
  const currUser = req.params.user_id

  connection.query(
    `WITH DotProduct AS (
      SELECT T2_${currUser}.username as user,
      SUM(T1_${currUser}.rating * T2_${currUser}.rating) / (SQRT(SUM(T1_${currUser}.rating * T1_${currUser}.rating)) * SQRT(SUM(T2_${currUser}.rating * T2_${currUser}.rating))) as Dot_Product
      FROM T1_${currUser} JOIN T2_${currUser} ON T1_${currUser}.movie_id = T2_${currUser}.id
      GROUP BY T2_${currUser}.username )
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
  const username = req.body.username;
  const password = req.body.password;
  const genre_pref_1 = req.body.genre_pref_1;
  const genre_pref_2 = req.body.genre_pref_2 ?? '';
  const genre_pref_3 = req.body.genre_pref_3 ?? '';
  connection.query(
    `SELECT username FROM Users WHERE username = '${username}'`
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
        VALUES ('${username}', '${password}','${genre_pref_1}','${genre_pref_2}','${genre_pref_3}')
        `, async (err, data) => {
          if (err) {
            console.log(err);
            res.status(400).send(`User Info cannot be added to the database. Please try again`);
          } else {
            console.log(`This is User ID '${username}'`);
            res.status(200).send(`User Registered`);
          }
        });
      }
    });
}

//Route 12: POST /rate_movie/:movie_id
const rate_movie = async function(req,res){
  const username = req.body.username;
  const movie_id = req.params.movie_id;
  const rating = req.body.rating;
  const timestamp = new Date();
  console.log(timestamp);
  const usrComment = req.body.comment ?? '';
  connection.query(
    `INSERT INTO MovieRatings (username, movie_id, rating, comment, timestamp)
    VALUES ('${username}', '${movie_id}',${rating},'${usrComment}','${timestamp}')
    `, (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).send(`Rate Unsuccessful. Please try again`);
      } else {
        console.log(data);
        res.status(201).send(`User '${username}' created a new rating`)
      }
    });
}

//Route 13: /delete_rating/:movie_id
const delete_rating = async function(req,res){
  const currusr = req.body.username;
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
  const currusr = req.body.username;
  const followid = req.body.follow_id;
  connection.query(
    `INSERT INTO Following
     VALUES ('${currusr}', '${followid}')
    `, async (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).send(`Follow unsuccessful. Please try again`);
      } else {
        connection.query(
          `INSERT INTO Follower
          VALUES ('${followid}','${currusr}')`, async (err, data) => {
          if (err) {
            console.log(err);
            res.status(400).send(`Follow unsuccessful. Please try again`);
          } else {
            res.status(201).send(`you now follow '${followid}'`)
          }
        });
        
      }
    });
}

//Route 15: /delete_follow
const delete_follow = async function(req,res) {
  const currusr = req.body.username;
  const followid = req.body.follow_id;
  connection.query(
    `DELETE FROM Following WHERE username = '${currusr}' AND follower = '${followid}'
    `, async (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).send(`Follow unsuccessful. Please try again`);
      } else {
        connection.query(
          `DELET FROM Follower WHERE following = '${followid}' AND username = '${currusr}'
          `, async (err, data) => {
          if (err) {
            console.log(err);
            res.status(400).send(`Unfollow unsuccessful. Please try again`);
          } else {
            res.status(201).send(`You have now unfollowed '${followid}'`)
          }
        });
      }
    });
}

module.exports = {
  trending,
  movie,
  follower,
  following,
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
  delete_follow,
  login
}
