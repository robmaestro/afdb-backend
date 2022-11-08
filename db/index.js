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

//---------------------------------------------------------------------------------

mydb.one = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM movies WHERE Movie_ID = ?',[id], (err, results) => {
            if (err) {
                return reject(err);
            }
            else {
                return resolve(results);
            }
        });
    });
};

mydb.adds = (name) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO namelist (Name) VALUES (?)',[name], (err, results) => {
            if (err) {
                return reject(err);     
            }
            else {
                return resolve(results);
            }
        });
    });
};

mydb.edits = (id,name) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE namelist SET NAME = ? WHERE ID = ?',[name,id], (err, results) => {
            if (err) {
                return reject(err);     
            }
            else {
                return resolve(results);
            }
        });
    });
};

mydb.removes = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM namelist WHERE ID = ?',[id], (err, results) => {
            if (err) {
                return reject(err);     
            }
            else {
                return resolve(results);
            }
        });
    });
};



module.exports = mydb;