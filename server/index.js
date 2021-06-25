const express = require('express');
const dotenv = require('dotenv').config();
const helmet = require('helmet');
const fileUpload = require('express-fileupload');

const app = express();


app.use(express.static('../dist'));
app.use(helmet());
app.use(fileUpload());

//// Routes
const uploadFile = require('./routes/uploadFile.js');


////Middlewares


app.use('/api/uploadFile', uploadFile);


app.listen(process.env.PORT);


