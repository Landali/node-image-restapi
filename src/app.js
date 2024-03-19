const express = require('express');
const cors = require('cors');

const { DB, PORT } = require('../settings');
const database = require('./databases/index');
const routes = require('./routes/index')

const app = express();
app.use(express.json());

app.use(cors());

app.use(routes)

database(DB);

app.listen(PORT,
    () => console.log('Listening at port:', PORT))