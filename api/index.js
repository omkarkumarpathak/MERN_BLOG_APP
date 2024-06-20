import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRoute from './router/user.route.js'
import authRoute from './router/auth.route.js'

import cookieParser from 'cookie-parser';

dotenv.config();

const app=express(); 



mongoose.connect(process.env.MONGO)
    .then(()=>{
        console.log("MongoDB connected Successfully")
    })
    .catch((err)=>{
        console.log(err);
    }
)

app.use(express.json());
app.use(cookieParser());

app.listen(3000,()=>{
    console.log("listening")
})

app.use('/api/user',userRoute)
app.use('/api/auth',authRoute)

//middleware
app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500;
    const message=err.message || "Internal Server Error";
    res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    });

});