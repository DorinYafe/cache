const express = require('express');
const PORT = process.env.PORT || 3001;
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

const router = require('./controllers/userController');

app.use('/users', router);

app.listen(PORT,
    () => console.log(`Server started on port ${PORT} at ${Date()}`)
);