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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


