const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit: 10,
    password: "",
    user: "root",
    database: "afdb",
    host: "localhost",
    port: "3306"
})

let mydb = {}


mydb.all = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM movies', (err, results) => {
            if (err) {
                return reject(err);
            }
            else {
                return resolve(results);
            }
        });
    });
};

mydb.watchlist = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM user_watchlist', (err, results) => {
            if (err) {
                return reject(err);
            }
            else {
                return resolve(results);
            }
        });
    })
}

mydb.add = (region_name) => {
    return new Promise((resolve, reject) => {
        pool.query("INSERT INTO region (region_name) VALUES (?)", [region_name], (err, results) => {
            if (err) {
                return reject(err);
            }
            else {
                return resolve(results);
            }
        });
    })
}

mydb.addWatchList = (movieid, poster,title,year,director,plot) => {
    return new Promise((resolve, reject) => {
        pool.query("INSERT INTO user_watchlist (Movie_ID,Poster,Title,Year,Director,Plot) VALUES (?,?,?,?,?,?)",
        [movieid, poster, title, year, director, plot], (err, results) => {
            if (err) {
                return reject(err);
            }
            else {
                return resolve(results);
            }
        });
    })
}

mydb.postTopic = (content, movieid) => {
    return new Promise((resolve, reject) => {
        pool.query("INSERT INTO posts (post_content, movie_ID) VALUES (?,?)",
        [content, movieid], (err, results) => {
            if (err) {
                return reject(err);
            }
            else {
                return resolve(results);
            }
        });
    })
}

mydb.displayTopic = (movieid) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM posts WHERE movie_ID = ?', [movieid], (err, results) => {
            if (err) {
                return reject(err);
            }
            else {
                return resolve(results);
            }
        });
    })
}


mydb.del = (region_id) => {
    return new Promise((resolve, reject) => {
        pool.query("DELETE FROM region WHERE region_id = ?", [region_id], (err, results) => {
            if (err) {
                return reject(err);
            }
            else {
                return resolve(results);
            }
        });
    })
}

mydb.change = (region_name, region_id) => {
    return new Promise((resolve, reject) => {
        pool.query("UPDATE region SET region_name = ? WHERE region_id = ?", [region_name, region_id], (err, results) => {
            if (err) {
                return reject(err);
            }
            else {
                return resolve(results);
            }
        });
    })
}

module.exports = mydb;