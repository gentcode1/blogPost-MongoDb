import express from  'express';
import blogController from '../Controller/blogContoller';
import {verifyAuth} from '../middleware/AuthVerification'


const blogRoute=  express.Router();
blogRoute.post('/auth/blog/create',verifyAuth,blogController.Register);
blogRoute.get('/auth/blog/post',blogController.getAllBlog);
blogRoute.get('/auth/blog/One/:id',blogController.getOneBlog);
blogRoute.delete('/auth/blog/del/:id',blogController.deleteOneBlog);
blogRoute.put('/auth/blog/update/:id',blogController.updateBlog);
//blogRoute.post(verifyAuth, blogController  );

export default blogRoute;