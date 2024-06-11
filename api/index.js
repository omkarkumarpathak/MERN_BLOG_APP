import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRoutes from './router/user.route.js'

dotenv.config();

const app=express();

mongoose.connect(process.env.MONGO)
    .then(()=>{
        console.log("MongoDb connected Successfully")
    })
    .catch((err)=>{
        console.log(err);
    })

app.listen(4000,()=>{
    console.log("hello")
})

app.use('/api/user',userRoutes)
