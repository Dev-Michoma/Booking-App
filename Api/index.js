const express = require("express");
const jwt = require('jsonwebtoken');
const imageDownloader = require('image-downloader');
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require('./Models/User.js');
const cookieParser = require('cookie-parser');
const  bcrypt = require('bcryptjs');
require('dotenv').config()
const app = express();
const  bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "jdjvjndjvnhvksndvjnjv";

app.use(express.json());
app.use(cookieParser());

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
            jwt.sign({email:userDoc.email , id:userDoc._id ,name:userDoc.name},jwtSecret ,{} ,(err,token)=>{
               if(err) throw err;
               res.cookie('token' ,token).json({ userDoc });
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


app.get('/profile', (req, res) => {
    console.log(req.cookies); // Log cookies to verify token presence
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, (err, user) => {
            if (err) {
                console.error(err);
                res.status(401).json({ error: 'Invalid token' });
            } else {
                res.json(user);
            }
        });
    } else {
        res.status(401).json({ error: 'No token provided' });
    }
});


app.post('/logout' ,(req,res)=>{
    res.cookie('token' ,'').json(true);
});


app.post('/upload-by-link' ,async (req,res)=>{
    const {link} = req.body;
    const newName = Date.now() + '.jpg';
    await imageDownloader.image({
        url: link,
        dest:__dirname +'/uploads/' + newName,
    });
    res.json(newName);
})
app.listen(4000);