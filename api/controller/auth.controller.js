import User from '../model/user.model.js'
export const signup=async(req,res)=>{
    const {username,email,password}=req.body;

    if(username || !email || !password || username==='' || email==='' || password===''){
        res.status(404).json({message:"all fields required"});
    }

    const newUser=new User({
        username,
        email,
        password,
    })

    try {
        await newUser.save();
         res.json("successfully");
    } catch (error) {
        console.log(error);
    }
}