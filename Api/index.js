const express = require("express");
const jwt = require('jsonwebtoken');
const imageDownloader = require('image-downloader');
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require('./Models/User.js');
const Booking = require  ('./Models/Booking.js')
const cookieParser = require('cookie-parser');
const  bcrypt = require('bcryptjs');
const Place = require('./Models/Place.js')
const multer = require('multer');
const fs = require('fs');
require('dotenv').config()
const app = express();
const  bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "jdjvjndjvnhvksndvjnjv";
const ws = require('ws');

app.use(express.json());
app.use(cookieParser());
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

console.log(__dirname);
app.use(cors({
   credentials: true,
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],

}));

//addition of mongodb  connection string to .env
mongoose.connect(process.env.MONGO_URL);
console.log(process.env.MONGO_URL);
app.get ('/test/' ,(req,res)=>{
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
    const newName = 'photo'  + Date.now() + '.png';
    await imageDownloader.image({
        url: link,
        dest:__dirname +'/uploads/' + newName,
    });
    res.json(newName);
});


const photosMiddleware = multer ({dest: 'uploads'});
app.post('/upload',photosMiddleware.array('photos' ,100 ), (req,res) =>{

    const uploadedFiles =[]; //An empty array is initialized  to store the path of renamed files
    for (let i= 0; i < req.files.length ;i++){ ///A loop to iterate through  the uploaded files
        const {path ,originalname} = req.files[i];
        const parts = originalname.split('.'); //orifginal name is split to extract the file extension
        const ext = parts[parts.length -1 ];
        const newPath = path + '.' + ext;
         fs.renameSync(path , newPath); //function is used to rename the file from its temporary path to the new path
         uploadedFiles.push(newPath.replace('uploads/',''));
    }

  res.json(uploadedFiles);
});


app.post('/places' ,(req,res)=>{
  const {token} = req.cookies;
  const {title ,address ,photos:addedPhotos,
   description ,perks ,extraInfo ,checkIn ,checkOut ,maxGuests,price,
  } = req.body
  jwt.verify(token ,jwtSecret ,{} ,async (err ,userData)=>{
   if (err) throw err;
     const placeDoc = await Place.create({
    owner: userData.id,
     title ,address ,addedPhotos,
     description ,perks ,extraInfo ,checkIn ,checkOut ,maxGuests,price,
   } );
   res.json(placeDoc);
  });  
});


app.get('/listplaces' ,(req,res) =>{
 const {token} = req.cookies;
 jwt.verify(token ,jwtSecret ,{} ,async (err ,userData)=>{
   const {id} = userData;
   res.json(await Place.find({owner:id}));
 });
});


app.get('/places/:id',async (req,res) =>{
 const {id} =req.params;
  res.json(await Place.findById(id))
});


app.put ('/places' , async (req,res)=>{
    const {token} = req.cookies;
    const {
        id , title ,address ,addedPhotos,
        description ,perks ,extraInfo ,checkIn ,checkOut ,maxGuests,price,
    } = req.body;

   
    jwt.verify(token ,jwtSecret ,{} ,async (err ,userData)=>{
        const placeDoc = await Place.findById(id);
            if (userData.id === placeDoc.owner.toString()){
                console.log({price})
                placeDoc.set({
                    title ,address ,photos:addedPhotos,
                    description ,perks ,extraInfo ,checkIn ,checkOut ,maxGuests, price,
                }); 

              await   placeDoc.save();
                res.json('ok');
            }
      });
})


app.get('/landingpages' ,async(req,res)=>{
    res.json(await Place.find());
});

app.post('/bookings', async (req, res) => {
    const { place, checkIn, checkOut, numberOfGuests, name, phone, price } = req.body;

    try {
        const doc = await Booking.create({ place, checkIn, checkOut, numberOfGuests, name, phone, price });
        res.json(doc);
    } catch (err) {
        console.error(err); // Log the error
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
});


const server = app.listen(4000);
// console.log(server)

const wss = new ws.WebSocketServer({server});
wss.on ('connection' , (connection ,req)=> {
    // console.log('connected');
    // connection.send('Hello Welcome to Our Chat Application');
    // console.log(req.headers);

    const cookies = req.headers.cookie;
    if(cookies){
     const tokenCookieString =  cookies.split(';').find(str => str.startsWith('token='))
    //  console.log(tokenCookieString);
    const token = tokenCookieString.split('=')[1];
    if(token){
        jwt.verify(token, jwtSecret ,{} ,(err,userData) =>{
           if(err ) throw err;
        //    console.log(userData);
        const {userId ,username} = userData;
        connection.userId =  userId;
        connection.username = username;

        });
    }
    }
    
})