const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require('./Models/User.js');
const  bcrypt = require('bcryptjs');
require('dotenv').config()
const app = express();
const  bcryptSalt = bcrypt.genSaltSync(10);

app.use(express.json());
app.use(cors({
   credentials: true,
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],

}));
mongoose.connect(process.env.MONGO_URL);
console.log(process.env.MONGO_URL);
app.get ('/test' ,(req,res)=>{
    res.json('test ok');
});

app.post('/register' ,async (req,res) => {
   const {name ,email ,password} = req.body;
   const userDoc  =  await User.create({
    name,
    email,
    password:bcrypt.hashSync(password ,bcryptSalt),
   });
   res.json(userDoc);
});

app.listen(4000);