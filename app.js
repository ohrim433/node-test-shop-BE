const express = require('express');
const {authRouter, productRouter, userRouter} = require('./routes');

const app = express();

const db = require('./db').getInstance();
db.setModels();

// Create server
app.use(express.json());
app.use(express.urlencoded());

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
app.listen(5600, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Server is running on port 5600');
    }
});

// unhandledRejection error handler
process.on('unhandledRejection', reason => {
    console.log(reason);
    process.exit(0);
})
