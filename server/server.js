/**
 *  1.Server Run
 */
const express = require('express');

const app = express();
const PORT = 5000;

app.get('/',(req,res)=>{
    res.send('test route => Home page');
});

app.listen(PORT,()=>{
    console.log(`App listening on port: ${PORT}`);
})