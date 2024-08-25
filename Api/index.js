const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({
   credentials: true,
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],

}));

app.get ('/test' ,(req,res)=>{
    res.json('test ok');
});

app.listen(4000);