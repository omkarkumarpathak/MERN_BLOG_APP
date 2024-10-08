import { errorHandler } from "../utils/error.js"
import Post from '../model/post.model.js';

export const createPost = async (req, res, next) => {

    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not Admin'));
    }
    if (!req.body.title || !req.body.content) {
        return next(errorHandler(400, 'Please provide all required fields'));
    }

    const new_slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g,'');

    const newPost = new Post({
        ...req.body,
        slug:new_slug,
        userId: req.user.id,
    });

    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        next(error);
    }
}

export const getPosts = async (req, res, next)=>{
    try {
        const startIndex = 0;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;
        const posts = await Post.find({
            ...(req.query.userId && { userId: req.query.userId }),
            ...(req.query.category && { category: req.query.category }),
            ...(req.query.slug && { slug: req.query.slug }),
            ...(req.query.postId && { _id: req.query.postId }),
        }).sort({ updatedAt: sortDirection }).skip(startIndex);

        const totalPosts=await Post.countDocuments();

        const now=new Date();
        const oneMonthAgo=new Date(
            now.getFullYear(),
            now.getMonth()-1,
            now.getDate()
        );

        const lastMonthPosts=await Post.countDocuments({
            createdAt:{$gte:oneMonthAgo},
        });

        res.status(200).json({
            posts,
            totalPosts,
            lastMonthPosts
        })

    } catch (error) {
        next(error);
    }
}


export const deletePost=async(req,res,next)=>{

    if(!req.user.isAdmin || req.user._id!=req.params.userId){
        return next(errorHandler(401,"You are not allowed to delete this"))
    }

    try {
        await Post.findByIdAndDelete(req.params.postId);
        res.status(200).json('The post has been deleted successfully');
    } catch (error) {
        next(error);
    }

}

export const updatePosts=async(req,res,next)=>{

    try {
       
        const updatedPost=await Post.findByIdAndUpdate(
            req.params.postId,
            {
                $set:{
                    title:req.body.title,
                    image:req.body.image,
                    content:req.body.content,
                    category:req.body.category,
                }
            },
            {new:true},
        );

        res.status(200).json(updatedPost);

    } catch (error) {
        next(error);
    }

}