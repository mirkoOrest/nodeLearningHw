const express = require('express');


const app = express();

app.use(express.json());
app.use(express.urlencoded());

const {productRouter} = require('./routes')

app.use('/products', productRouter)



app.listen(5000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Listen 5000...');
    }
})



