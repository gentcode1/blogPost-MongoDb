import express from  'express';
import UserController from '../Controller/AuthController'
import blogController from '../Controller/blogContoller';


const route=  express.Router();
 route.post('/auth/signup', UserController.UserController.SignUp);
 route.post('/auth/signin', UserController.UserController.SignIn);
 route.post('/auth/register',blogController.Register);

 export default route;