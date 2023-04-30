const { expect } = require('@jest/globals');
const supertest = require('supertest');
const app = require('../server');


test('POST /register', async () => {
  const userinfo = {
    username: "Test3",
    password: "unhashed1",
    genre_pref_1: "Horror",
  };
  const response = await supertest(app).post('/register').send(userinfo);
  expect(response.status).toEqual(200);
  });

test('POST /registerSame', async () => {
  const userinfo = {
    username: "Test1",
    password: "unhashed2",
    genre_pref_1: "Horror",
  };
  const response = await supertest(app).post('/register').send(userinfo);
  expect(response.status).toEqual(409);
  });

test('GET /login', async () => {
  await supertest(app).get('/login?username=Test1&password=unhashed1')
    .expect(200)
    .then((res) => {
      expect(res.body.length).toStrictEqual(1)
    });
});


  test('GET /trending/:user_id', async () => {
    await supertest(app).get('/trending/Test1')
      .expect(200)
      .then((res) => {
        expect(res.body.length).toStrictEqual(50)
      });
  });

  test('POST /rate_movie/:movie_id', async () => {
    const rateinfo = {
      username: "Test1",
      rating: 3.5,
    };
    const response = await supertest(app).post('/rate_movie/tt0046435').send(rateinfo);
    expect(response.status).toEqual(201);
    });
  
  test('POST /rate_movie/invalid', async () => {
    const rateinfo = {
      username: "Test1",
      rating: 4.0,
    };
    const response = await supertest(app).post('/rate_movie/tt0046435').send(rateinfo);
    expect(response.status).toEqual(400);
    });
  
    test('POST /rate_movie/user2', async () => {
      const rateinfo = {
        username: "Test2",
        rating: 4.0,
      };
      const response = await supertest(app).post('/rate_movie/tt0046435').send(rateinfo);
      expect(response.status).toEqual(201);
      });

  test(`POST /create_views/:user_id`, async() => {
    const info = {
      user_id: "Test1"
    }
    const response = await supertest(app).post('/create_views/Test1').send(info);
    console.log("response");
    expect(response.status).toEqual(200);
  })
  
  test('GET /movie/:user_id/:movie_id', async () => {
    await supertest(app).get('/movie/Test1/tt0046435')
      .expect(200)
      .then((res) => {
        expect(res.body[0].watched).toEqual(1);
      });
  });

  test('POST /new_follow', async() => {
    const new_follow = {
      username: "Test1",
      follow_id:"Test2",
    }
    const response = await supertest(app).post('/new_follow').send(new_follow);
    expect(response.status).toEqual(201);
  });

  test('POST /new_follow/repeated', async() => {
    const new_follow = {
      username: "Test1",
      follow_id:"Test2",
    }
    const response = await supertest(app).post('/new_follow').send(new_follow);
    expect(response.status).toEqual(400);
  });

  test('GET /search/:user_id', async() => {
    await supertest(app).get('/search/Test1?title=matrix&genre=Action&yearLow=1950&watchedByFriends=0')
      .expect(200)
      .then((res) => {
        expect(res.body.length).toBeGreaterThanOrEqual(1);
      });
  });

  test('GET /search/:user_id/watched', async() => {
    await supertest(app).get('/search/2056022?title=matrix&watchedByFriends=1')
      .expect(200)
      .then((res) => {
        expect(res.body.length).toBeGreaterThanOrEqual(0);
      });
  });

  test('GET /search/:user_id', async() => {
    await supertest(app).get('/search/Test1?title=matrix&genre=Action&yearLow=1950&watchedByFriends=0')
      .expect(200)
      .then((res) => {
        expect(res.body.length).toBeGreaterThanOrEqual(1);
      });
  });
  
test('GET /update/:user_id', async () => {
  await supertest(app).get('/update/Test1')
    .expect(200)
    .then((res) => {
      console.log(res.body.length)
      expect(res.body.length).toBeGreaterThanOrEqual(1);
    });
});

test('GET /update/:user_idnotexists', async () => {
  await supertest(app).get('/update/NotExist')
    .expect(200)
    .then((res) => {
      console.log(res.body.length)
      expect(res.body.length).toEqual(0);
    });
});

//test following no params, someone with follower 
test('GET /following/:user_id', async () => {
  await supertest(app).get('/following/Test1')
    .expect(200)
    .then((res) => {
      expect(res.body.length).toEqual(16);
    });
});

test('GET /following/:diffuser', async () => {
  await supertest(app).get('/following/NotExist')
  .expect(200)
  .then((res) => {
    expect(res.body.length).toEqual(0);
  });
});

test('GET /follower/:user_idnofollower', async () => {
  await supertest(app).get('/follower/NotExists')
    .expect(200)
    .then((res) => {
      expect(res.body.length).toEqual(0);
    });
});

test('GET /follower/:user_id', async () => {
  await supertest(app).get('/follower/1028463')
    .expect(200)
    .then((res) => {
      expect(res.body.length).toEqual(13);
    });
});

test('GET /top_movies/:user_id', async () => {
  await supertest(app).get('/top_movies/Test1')
    .expect(200)
    .then((res) => {
      expect(res.body[0].title).toStrictEqual('Titanic');
    });
});

test(`GET /register_rate`, async () => {
  await supertest(app).get('/register_rate?genre1=Comedy')
    .expect(200)
    .then((res) => {
      console.log(res);
      expect(res.body.length).toBeGreaterThanOrEqual(1);
    });
});

test('GET /two_degree/:user_id', async () => {
  await supertest(app).get('/two_degree/1028463')
    .expect(200)
    .then((res) => {
      expect(res.body.length).toBeGreaterThanOrEqual(1);
    });
});

test('GET /userinfo/:user_id', async () => {
  await supertest(app).get('/userinfo/Test1')
    .expect(200)
    .then((res) => {
      expect(res.body[0]).toStrictEqual({
        "genre_pref_1":"Horror",
        "genre_pref_2":"",
        "genre_pref_3":"",
        "followerCount":1,
        "followingCount":16
      });
    });
});

test('GET /rec/:user_id', async () => {
  await supertest(app).get('/rec/Test1')
    .expect(200)
    .then((res) => {
      expect(res.body.length).toBeGreaterThanOrEqual(1);
    });
});

test('POST /delete_rating/:movie_id', async() => {
  const rateinfo = {
    username: "Test1"
  };
  const response = await supertest(app).post('/delete_rating/tt0046435').send(rateinfo);
  expect(response.status).toEqual(200);
});

test('POST /delete_rating2/:movie_id', async() => {
  const rateinfo = {
    username: "Test2"
  };
  const response = await supertest(app).post('/delete_rating/tt0046435').send(rateinfo);
  expect(response.status).toEqual(200);
});

test('POST /delete_follow', async() => {
  const new_follow = {
    username: "Test1",
    follow_id:"Test2",
  }
  const response = await supertest(app).post('/delete_follow').send(new_follow);
  expect(response.status).toEqual(201);
});

test('GET /logout/user', async() => {
  await supertest(app).get('/logout/Test1')
    .expect(200)
    .then((res) => {
      console.log(res.body)
    });
});

