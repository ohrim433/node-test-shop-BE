const express = require('express');
const {productRouter, userRouter} = require('./routes');

const app = express();

const db = require('./db').getInstance();
db.setModels();

// Create server
app.use(express.json());
app.use(express.urlencoded());

app.use('/product', productRouter);
app.use('/user', userRouter);

// Run server
app.listen(5600, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Server is running on port 5600');
    }
});
