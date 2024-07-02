import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';
import dotenv from 'dotenv';
dotenv.config();

export const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_token;
   
    if(!token){
        console.log("bhai");
        return next(errorHandler(401,'UnAuthorize'));
    }
    
    console.log(process.env.JWT_SECRET);

    jwt.verify(token, process.env.JWT_SECRET,(err,user)=>{
        if(err){
            console.log('hello bai');
            return next(errorHandler(401,'UnAuthorized'));
        }
        req.user=user;
        next();
    });

};