const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());

const data = require('./routes/api/data');

app.use('/api/data', data);

const port = 5000;

app.listen(port, () => console.log(`Server is started on port ${port}`));