import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {getPosts,createPost} from '../controller/post.controller.js'

const router=express.Router();

router.post('/create-post',verifyToken,createPost);
router.get('/getPosts',getPosts);

export default router;