const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000

app.use(cors())
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

const NameListRouter = require('./routes/MovieList');
app.use('/', NameListRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})