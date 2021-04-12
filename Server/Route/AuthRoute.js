import express from  'express';
import UserController from '../Controller/AuthController'
import blogController from '../Controller/blogContoller';
import Validator from '../middleware/Validator'
import {verifyAuth} from '../middleware/AuthVerification'

const route=  express.Router();
 route.post('/auth/signup',Validator.newAccountRules(),Validator.validateInput, UserController.UserController.SignUp);
 route.post('/auth/signin', UserController.UserController.SignIn);
 route.post('/auth/register',blogController.Register);
 route.post('/auth/change-password',verifyAuth,UserController.UserController.changPassword);

 export default route; 