const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const {authRouter, productRouter, userRouter} = require('./routes');

const app = express();

const {PORT} = require('./config/index');

const db = require('./db').getInstance();
db.setModels();

// Create server
app.use(express.json());
app.use(express.urlencoded());

app.use(morgan('short'));

app.use('/product', productRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);

app.use('*', (err, req, res, next) => {
    let message = err.message;

    if (err.parent) {
        message = err.parent.sqlMessage;
    }

    res
        .status(err.status || 400)
        .json({
            message,
            code: err.customCode
        })
})

// Run server
app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server is running on port ${PORT}`);
    }
});

// unhandledRejection error handler
process.on('unhandledRejection', reason => {
    console.log(reason);
    process.exit(0);
})
