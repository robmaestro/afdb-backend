const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bcrpyt = require('bcrypt')
const saltRounds = 10

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
const corsOpts = {
    origin: '*',

    methods: [
        'GET',
        'POST',
        'DELETE',
        'PUT',
    ],

    allowedHeaders: [
        'Content-Type',
    ],
};

app.use(cors(corsOpts));
const router = require('./router/router')
app.use('/', router)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})