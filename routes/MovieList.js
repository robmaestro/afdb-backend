const express = require('express')

const app = express.Router();

const db = require('../db/index.js');

app.get('/', getMovies);


//app.get('/', searchName);
//app.post('/', addName);
app.put('/', editName);
app.delete('/', removeName);

app.post("/register",(req,res) => {
    db.query("INSERT INTO user_info (Email,Username,Password) VALUES (?,?,?)", [email,username,password], (err, result) => {
        console.log(err);
    })
})
async function getMovies(req, res) {
    try{
        let results = await db.all();
        res.send({results:results});
    }
    catch(e){
        console.log(e);
    }
}   


//---------------------------------------------------------

async function searchName(req, res) {
    try {
        let results = await db.one(req.body.id)

        if (results.length === 0) {
            res.sendStatus(404);
        }
        else {
            res.json({results:results});
        }
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}
async function addName(req, res) {
    try {
        let results = await db.adds(req.body.name)
        if (results.affectedRows) {
            let all = await db.all();
            res.json({results:all});
        }
        else {
            res.sendStatus(404);
        }
    }
    catch(e){
        console.log(e);
    }
}

async function editName(req, res) {
    try {
        let results = await db.edits(req.body.id,req.body.name)
        if (results.affectedRows) {
            let all = await db.all();
            res.json({results:all});
        }
        else {
            res.sendStatus(404);
        }
    }
    catch(e){
        console.log(e);
    }
}   

async function removeName(req, res) {
    try {
        let results = await db.removes(req.body.id)
        if (results.affectedRows) {
            let all = await db.all();
            res.json({results:all});
        }
        else {
            res.sendStatus(404);
        }
    }
    catch(e){
        console.log(e);
    }
}

module.exports = app;


