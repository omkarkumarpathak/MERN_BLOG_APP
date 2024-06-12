import User from '../model/user.model.js'
import bcryptjs from 'bcryptjs'

export const signup=async(req,res)=>{
    const {username,email,password}=req.body;

    if(username || !email || !password || username==='' || email==='' || password===''){
        res.status(404).json({message:"all fields required"});
    }

    const hashedPassword=bcryptjs.hashSync(password,10);

    const newUser=new User({
        username,
        email,
        password:hashedPassword,
    })

    try {
        await newUser.save();
         res.json("successfully");
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}