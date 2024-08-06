import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {getPosts,createPost,deletePost,updatePosts} from '../controller/post.controller.js'

const router=express.Router();

router.post('/create-post',verifyToken,createPost);
router.get('/getPosts',getPosts);
router.put('/updatePost/:postId/:userId',updatePosts);
router.delete('/deletePost/:PostId/:userID',verifyToken,deletePost);


export default router;