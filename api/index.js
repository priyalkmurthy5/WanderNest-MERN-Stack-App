const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
require("dotenv").config()


const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'amnfkjenfkjns3249832u9afnand'

//pbk1O2nTTHtPmMFT

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173",
}));


mongoose.connect(process.env.MONGO_URL)

app.get('/test', (req,res) => {
    res.json('test ok')
});

app.post('/register', async (req, res) => {
    const {name, email, password} = req.body;
    try{
        const userDoc = await User.create({
        name, 
        email,
        password: bcrypt.hashSync(password, bcryptSalt)
    })
        res.json(userDoc)
    } catch (e) {
        res.status(422).json(e);
    }
    
})

app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    try{
        const userDoc = await User.findOne({email})
        if(userDoc) {
            const passOk = bcrypt.compareSync(password, userDoc.password)
            if(passOk) {
                jwt.sign({
                    email: userDoc.email, 
                    id: userDoc._id, 
                    //name:userDoc.name
                }, jwtSecret, {}, (err, token) => {
                    if (err) throw err;
                    
                    res.cookie('token', token).json(userDoc)

                });
                
            } else {
                res.status(422).json('pass not ok')
            }
        } else {
            res.json('not found')
        }
    } catch (e) {
        res.status(422).json(e);
    }   
})

app.get("/profile", (req, res) => {
    const {token} = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if(err) throw err;
            const {name, email, _id} = await User.findById(userData.id)
            res.json({name, email, _id});
        });
    } else {
        res.json(null);
    }
})

app.post("/logout", (req, res) => {
    res.cookie('token', "").json(true)
})

app.listen(4000);