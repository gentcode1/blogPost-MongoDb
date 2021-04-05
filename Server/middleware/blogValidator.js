import {check, validationResult} from 'express-validator'
import blogData from '../Model/blogModel'
import {dataFromToken} from '../Helpers/Token';

class blogValidator{
  static verifyAccess= async (req,res, next)=>{

    const token= req.header('x-auth-token');
    const user= dataFromToken(token).payload;
    const userIdFromToken=user.id;
    const blogIdFromParams=req.params.id;
   
    const blog= await blogData.findById(blogIdFromParams)
    if (!blog){
      return res.status(404).json({
        status:404,
        message:"blog not exist"
  });
    }
     else if (userIdFromToken==blog.userId._id){
       return next();
     }
     return res.status(401).json({
       status:401,
       message:"you are unauthorised"
     })
  
    }
    static newBlogRules=()=>{
  return   [
            check("title", "title must not be greater than 50 character").isLength({max:50})
            
        ]
    }
    static blogValidateInput = (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          const errorMessage = errors.errors.map((e) => e.msg);
          return res.status(400).json({
            error: errorMessage,
            status: 400,
          });
        }
        return next();
      };
}
export default blogValidator;