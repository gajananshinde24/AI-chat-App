const express = require('express')
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors')
const session = require('express-session');
const passport = require('passport');
require('./config/passportConfig');

const homeRouter = require('./routes/homeRoutes');
const sentimentRouter = require('./routes/sentimentRoutes');
const userRouter = require('./routes/userRoutes')

const authRouter = require('./routes/authRoutes');

const connectDB = require('./db/connectDB')

const errorHandler = require('./middlewares/errorHandler')




connectDB();
app.use(cors({
    origin: 'http://localhost:3000', // Your frontend origin
    credentials: true,
  }));

app.use(express.json());


app.use(session({
    secret: 'Gajanan@123',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);

app.use('/home', homeRouter);
app.use('/api/v1/sentiment', sentimentRouter);
app.use('/api/v1/users', userRouter);
app.use(errorHandler);


app.listen('3003','localhost',()=> {
    console.log('server listening on 3003');
})