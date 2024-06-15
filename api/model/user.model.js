import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    profilePicture:{
        type:String,
        default:"https://www.bing.com/images/search?view=detailV2&ccid=RN2LVNKq&id=4D178D99628B13F658D14854472B224771B5AF71&thid=OIP.RN2LVNKqOc1UcNGE92T4gwAAAA&mediaurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.44dd8b54d2aa39cd5470d184f764f883%3frik%3dca%252b1cUciK0dUSA%26riu%3dhttp%253a%252f%252fgreenwings.co%252fwp-content%252fuploads%252f2018%252f09%252fblank-head-profile-pic-for-a-man.jpg%26ehk%3dI86InIDvEsFKDcXIBtI%252bR9UxYpQNTMeSR2SBRLkb%252f9Y%253d%26risl%3d%26pid%3dImgRaw%26r%3d0%26sres%3d1%26sresct%3d1%26srh%3d799%26srw%3d845&exph=408&expw=431&q=Blank+Face+Profile+Picture&simid=608028934504807263&FORM=IRPRST&ck=8D71262169E08F78AD0BE85ED0441584&selectedIndex=0&itb=0&ajaxhist=0&ajaxserp=0"
    }

}, {timestamps:true}
);

const User=mongoose.model('User',userSchema);

export default User;
