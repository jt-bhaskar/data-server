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
const {saveToSheet} = require("./data/network/google_sheets_storage");

// Routes
app.use("/api/test",jsonParser, test)

app.use("/api/user",jsonParser, user)

app.post("/api/qc",jsonParser, async (req, res) => {


    try {
        if (req.method === 'POST') {

            console.log(req.body.formattedData)

            await saveToSheet(req.body.formattedData)
            res.status(200).json({ status: "Success" })
        } else {
            res.status(404).json({ error: 'NOT Found' })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Failed to load data' })
    }
});

app.listen(port, () => {
    console.log(`listening on port : ${port}`);
});