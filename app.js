const express = require('express');

const app = express();

const {productRouter} = require('./routes');

// Create server
app.use(express.json());
app.use(express.urlencoded());

app.use('/product', productRouter);

// Run server
app.listen(5500, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Server is running on port 5500');
    }
});
