const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const port = 5000

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const bcrpyt = require('bcrypt')
const saltRounds = 10
const app = express();

app.use(express.json());
app.use(cors())
// {
//   origin: ["http://localhost:5000/"],
//   method: ["GET" ,"POST"],
//   credentials: true
// }));

// app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true}));

// app.use(session({
//   key: "CookieID",
//   secret: "Secret",
//   resave: false,
//   saveUninitialized:  false,
//   cookie: {
//     expires: 60 * 60 * 24,
//   }
// }))

const pool = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "afdb",
});

app.get('/', (req, res) => {
  pool.query('SELECT * FROM movies', (err, results) => {
    if (err) {
      console.log(e);
    }
    else {
      res.send({ results: results });
    }
  });
});

app.get('/mywatchlist', (req, res) => {
  pool.query('SELECT * FROM user_watchlist', (err, results) => {
    if (err) {
      console.log(e);
    }
    else {
      res.send({ results: results });
    }
  });
});

app.get('/genre', (req, res) => {
  const genre = req.body.genre;

  pool.query('SELECT * FROM movies WHERE genre = ?;', genre, (err, results) => {
    if (err) {
      console.log(e);
    }
    else {
      res.send({ results: results });
    }
  });
});

app.post("/register", (req, res) => {

  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;


  bcrpyt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      res.send({ err: err });
    }

    pool.query("INSERT INTO user_info (Email,Username,Password) VALUES (?,?,?)",
      [email, username, hash],
      (err, result) => {
        console.log(err);
      }
    );
  })

});

app.post("/watchlist", (req, res) => {

  const movieid = req.body.movieid;
  const poster = req.body.poster;
  const title = req.body.title;
  const year = req.body.year;
  const director = req.body.director;
  const plot = req.body.plot;

  pool.query("INSERT INTO user_watchlist (Movie_ID,Poster,Title,Year,Director,Plot) VALUES (?,?,?,?,?,?)",
      [movieid,poster, title, year, director, plot],
      (err, result) => {
        console.log(err);
      }
    );
  })



app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  pool.query("SELECT * FROM user_info WHERE Email = ?;",
    email,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrpyt.compare(password, result[0].Password, (error, response) => {
          if (response) {
            res.send(result);
          } else {
            res.send({ message: "Wrong email or password." });
          }
        });
      }
      else {
        res.send({ message: "Email doesn't exist." });
      }

    }
  );
})

app.post("/post", (req, res) => {
  const post_content = req.body.content;
  const movie_id = req.body.movieid;

  pool.query("INSERT INTO posts (post_content, movie_ID) VALUES (?,?)",
    [post_content, movie_id],
    (err, result) => {
      console.log(err);
    }
  );

});

app.post("/review", (req, res) => {
  const review_content = req.body.content;
  const movie_id = req.body.movieid;

  pool.query("INSERT INTO review (review_content, movie_ID) VALUES (?,?)",
    [review_content, movie_id],
    (err, result) => {
      console.log(err);
    }
  );
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


