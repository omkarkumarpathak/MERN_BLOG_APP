import User from "../model/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs'

export const test=(req,res)=>{
    res.json({message:"Test API is working"});
}

export const updateUser=async(req,res,next)=>{

    if(req.user.id!==req.params.userId){
        return next(errorHandler(403,'You are not allowed to update this'));
    }

    if(req.body.password){
        if(req.body.password.length<5){
            return next(errorHandler(400,'Password length should be more than 5'))
        }
    }
    req.body.password=bcryptjs.hashSync(req.body.password,10);
    
    if(req.body.username){
        if(req.body.username.length<5 ||req.body.username.length>15 ){
            return next(errorHandler(400,'Username should be between 6 to 14 chars'));
        }
        if(req.body.username.include(' ')){
            return next(errorHandler(400, 'Username cannot have spaces'))
        }
        if(req.body.username!==req.body.username.toLowerCase()){
            return next(errorHandler(400,'Username must be lower case'));
        }
        if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
            return next(errorHandler(400,'Username can only contain letters and numbers'))

        }
//updating user
        try {
            const updatedUser=await User.findByIdAndUpdate(req.params.userId,{
                $set:{
                    username:req.body.username,
                    email:req.body.email,
                    profilePicture:req.body.profilePicture,
                    password:req.body.password,
                },
            },
            {new:true}
    );

    const {password,...rest}=updatedUser._doc;
    res.status(200).json(rest);
    
            
        } catch (error) {
            
        }
    }



}