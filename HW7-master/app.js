const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

const path = require('path');

dotenv.config();

const {PORT} = require('./config');

const db = require('./database').getInstance();
db.setModels();

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use(morgan('dev'));

const {productRouter, userRouter, authRouter} = require('./routes')

app.use('/auth', authRouter)
app.use('/products', productRouter)
app.use('/users', userRouter)

app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 400)
        .json({
            message: err.message,
            code: err.customCode
        })
})

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Listen ${PORT}...`);
    }
})
