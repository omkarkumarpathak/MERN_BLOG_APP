import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
//add ("type":"module") in package.json

import userRoutes from './router/user.route.js'
import authRoutes from './router/auth.route.js'
import postRoutes from './router/post.route.js'

import cookieParser from 'cookie-parser';

dotenv.config(); //for using env

const app=express(); 

//connecting mongoDB server
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

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);



app.use((err, req, res, next) => {
    console.log('Hey');
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });


app.listen(3000,()=>{
    console.log("listening")
})