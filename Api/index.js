const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors({
   credentials: true,
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],

}));

app.get ('/test' ,(req,res)=>{
    res.json('test ok');
});

app.post('/register' ,async (req,res) => {
   const {name ,email ,password} = req.body;
   res.json({name ,email ,password});
})

app.listen(4000);