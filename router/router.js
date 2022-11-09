const express = require('express')
const db = require('../db/index.js')
const app = express.Router()

app.put('/', editRegion)
app.post('/', insertRegion)
app.delete('/', delRegion)
app.get('/', getFilms)
app.get('/mywatchlist', getWatchlist)
app.post('/watchlist', addToWatchList)
app.post('/post', postTopic)
app.post('toks/:movieid', displayTopic)

async function getFilms(req, res, next) {
    try {
        let results = await db.all();
        res.json({ results: results })
    }
    catch (e) {
        console.log(e);
    }
}

async function getWatchlist(req, res, next) {
    try {
        let results = await db.watchlist();
        res.json({ results: results })
    }
    catch (e) {
        console.log(e);
    }
}

async function addToWatchList(req, res, next) {
    try {
        let results = await db.addWatchList(req.body.movieid, req.body.poster, req.body.title, req.body.year, req.body.director, req.body.plot)

        if (results.affectedRows) {
            let newResults = await db.all()
            res.send({ results: newResults });
        }
        else {
            res.sendStatus(404)
        }
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

async function postTopic(req, res, next) {
    try {
        let results = await db.postTopic(req.body.content, req.params.movieid)

        if (results.affectedRows) {
            let newResults = await db.displayTopic()
            res.send({ results: newResults });
        }
        else {
            res.sendStatus(404)
        }
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

async function displayTopic(req, res, next) {
    try {
        let results = await db.displayTopic(req.params.movieid)

        if (results.affectedRows) {
            let results = await db.displayTopic(req.params.movieid)
            res.send({ results: results });
        }
        else {
            res.sendStatus(404)
        }
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}


async function insertRegion(req, res, next) {
    try {
        let results = await db.add(req.body.region_name)

        if (results.affectedRows) {
            let newResults = await db.all()
            res.send({ results: newResults });
        }
        else {
            res.sendStatus(404)
        }
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

async function delRegion(req, res, next) {
    try {
        let results = await db.del(req.body.region_id)
        if (results.affectedRows) {
            let newResults = await db.all()
            res.send({ results: newResults });
        }
        else {
            res.sendStatus(404)
        }
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

async function editRegion(req, res, next) {
    try {
        let results = await db.change(req.body.region_name, req.body.region_id)
        if (results.affectedRows) {
            let newResults = await db.all()
            res.send({ results: newResults });
        }
        else {
            res.sendStatus(404)
        }
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

// async function findRegion(req, res, next) {
//     try {
//         let results = await db.one(req.params.region_id)

//         if(results.length === 0){
//             res.sendStatus(404)
//         }
//         else{
//             res.send(results);
//         }
//     }
//     catch (e) {
//         console.log(e);
//         res.sendStatus(500);
//     }
// }

module.exports = app



