const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const port = 5000

const app = express();

app.use(express.json());
app.use(cors());

const pool = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "afdb",
});

app.get('/', (req,res) => {
  pool.query('SELECT * FROM movies', (err, results) => {
    if (err) {
      console.log(e);
    }
    else {
      res.send({results:results});
    }
  });
});

app.post("/register",(req,res) => {

      const email = req.body.email;
      const username = req.body.username;
      const password = req.body.password;

      pool.query("INSERT INTO user_info (Email,Username,Password) VALUES (?,?,?)", 
      [email,username,password], 
      (err, result) => {
          console.log(err);
      }
      );
  });


app.post("/login",(req,res) => {
  const email = req.body.email;
  const password = req.body.password;

  pool.query("SELECT * FROM user_info WHERE Email = ? AND Password = ?", 
      [email,password], 
      (err, result) => {
        if(err){
          res.log({err: err});
        }

          if (result.length > 0) {
            res.send(result)
          }
          else{
            res.send({message:"Wrong email or password."})
          }
        
      }
    );
})

app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})


