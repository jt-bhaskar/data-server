require("dotenv").config();
const express = require('express');
const cors = require('cors');
const {json} = require("body-parser");
const database = require('./data/local/db.config')

const app = express()

// Server Basic Configuration
const port = 3005;
app.use(cors());
process.on('uncaughtException', function (err) {
    console.log(err);
});
const jsonParser = json({limit: '50mb'})

// Database initialization
database.initDatabase()

// Routers
const test = require('./routes/test')
const user = require('./routes/user')

// Routes
app.use("/api/test",jsonParser, test)

app.use("/api/user",jsonParser, user)

app.listen(port, () => {
    console.log(`listening on port : ${port}`);
});