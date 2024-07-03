const asyncHandler = require('../utils/asyncHandler')
const mongoose = require('mongoose')

const connectDB = asyncHandler(async () => { 
    
        const conn = await mongoose.connect("mongodb://localhost:27017/sentiment-analysis-db");
        console.log(`MongoDB connected: ${conn.connection.host}`);
 
});

module.exports = connectDB;