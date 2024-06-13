import User from '../model/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';

export const signup=async(req,res,next)=>{
    
    const {username,email,password}=req.body;
    
    if(!username || !email || !password || username==='' || email==='' || password===''){
       next(errorHandler(400,"All fields required"));
    }

    const hashedPassword=bcryptjs.hashSync(password,10);

    //creating user and save it in DB

    const newUser=new User({
        username,
        email,
        password:hashedPassword,
    })

    try {
        await newUser.save();
        res.json("successfully");
    } catch (error) {
        next(error);
    }
}