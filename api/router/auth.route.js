import express from 'express'
import {signup,signIn,google} from '../controller/auth.controller.js';

const router=express.Router();

router.post('/signup',signup);
router.post('/signin',signIn);
router.post('/google',google);

export default router;
