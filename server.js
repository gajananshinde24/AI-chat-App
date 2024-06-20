const express = require('express')

const app = express();

const homeRouter = require('./routes/homeRoutes');
const sentimentRouter = require('./routes/sentimentRoutes');

const errorHandler = require('./middleware/errorHandler')


app.use(express.json());

app.use('/', homeRouter);
app.use('/api/v1/sentiment', sentimentRouter);
app.use(errorHandler);


app.listen('3003','localhost',()=> {
    console.log('server listening on 3003');
})