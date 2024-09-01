const express = require("express");
const jwt = require('jsonwebtoken');
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require('./Models/User.js');
const  bcrypt = require('bcryptjs');
require('dotenv').config()
const app = express();
const  bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "jdjvjndjvnhvksndvjnjv";

app.use(express.json());
app.use(cors({
   credentials: true,
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],

}));
//addition of mongodb  connection string to .env
mongoose.connect(process.env.MONGO_URL);
console.log(process.env.MONGO_URL);
app.get ('/test' ,(req,res)=>{
    res.json('test ok');
 });

app.post('/register' ,async (req,res) => {
   const {name ,email ,password} = req.body;
  try{
   const userDoc  =  await User.create({
      name,
      email,
      password:bcrypt.hashSync(password ,bcryptSalt),
     });
     res.json(userDoc);
  } catch (e){
   res.status(422).json(e);
  }
   
});



app.post('/login', async (req, res) => {
   try {
       const { email, password } = req.body;
       const userDoc = await User.findOne({ email });
       if (userDoc) {
           const passOk = bcrypt.compareSync(password, userDoc.password);
           if (passOk) {
            jwt.sign({email:userDoc.email , id:userDoc._id},jwtSecret ,{} ,(err,token)=>{
               if(err) throw err;
               res.cookie('token' ,token).json({ message: 'Login successful' });
            });
               
           } else {
               res.status(422).json({ error: 'Invalid credentials' });
           }
       } else {
           res.status(404).json({ error: 'User not found' });
       }
   } catch (error) {
       res.status(500).json({ error: 'An error occurred during login' });
   }
});

app.listen(4000);