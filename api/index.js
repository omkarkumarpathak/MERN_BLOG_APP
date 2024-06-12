import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRoute from './router/user.route.js'
import authRoute from './router/auth.route.js'

dotenv.config();

const app=express();

app.use(express.json());

mongoose.connect(process.env.MONGO)
    .then(()=>{
        console.log("MongoDb connected Successfully")
    })
    .catch((err)=>{
        console.log(err);
    })

app.listen(4000,()=>{
    console.log("listening")
})

app.use('/api/user',userRoute)
app.use('/api/auth',authRoute)
