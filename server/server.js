/**
 *  1. Server Run with '/' route
 *  2. config setup & app use (express.urlencoded,morgan,cors) ? kontar kaj ki ? 
 *  3. page not found
 */
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const env = require('dotenv');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const app = express();
env.config({
    path: './config/index.env'
});

// app.use(express.urlencoded({urlencoded:true})); //what is it? 
app.use(bodyParser.json()); //what is it? 
app.use(morgan('dev')); //what is it? 
app.use(cors()); //what is it? 


// Connect with MongoDB
connectDB();

// Routes
app.get('/',(req,res)=>{
    res.send('test route => Home page');
});

app.use('/api/user/',require('./routes/auth.route'));


// Page Not Found
app.use((req,res)=>{
    res.status(404).json({
        msg: "Page Not Fond"
    });
});

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`App listening on port: ${PORT}`);
})