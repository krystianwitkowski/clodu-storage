const express = require('express');
const dotenv = require('dotenv').config();
const helmet = require('helmet');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('../dist'));
app.use(bodyParser.json())
app.use(helmet());
app.use(fileUpload());

/* Routes */
const uploadFile = require('./routes/uploadFile.js');
const users = require('./routes/users.js');
const authentication = require('./routes/authentication.js');

/* Middlewares */
const rateLimiter = require('./middlewares/rateLimiter.js');

app.use('/api/uploadFile', uploadFile);
app.use('/api/users', users);
app.use('/api/authentication', rateLimiter, authentication);

app.listen(process.env.PORT);


