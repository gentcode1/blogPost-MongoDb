import express from 'express'
import commentController from '../Controller/commentControlle'
import { verifyAuth } from "../middleware/AuthVerification";


const commentRoute= express.Router();
commentRoute.post('/create/:id',verifyAuth, commentController.createComment);
commentRoute.delete('/delete/:id',verifyAuth, commentController.deleteComment);
commentRoute.get('/one/:id',verifyAuth,commentController.getOneComment );
commentRoute.get('/all/comment',verifyAuth,commentController.getAllComment );
commentRoute.patch('/update/:id',verifyAuth,commentController.updateComment);

export default commentRoute;