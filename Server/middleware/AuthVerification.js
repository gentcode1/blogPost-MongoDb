import {dataFromToken} from '../Helpers/Token';
import userInfo from '../Model/UserModel'
import Response from '../Helpers/Response'

export const verifyAuth= async (req, res, next)=>
{
    const token= req.header('x-auth-token');

    if(!token){
        return Response.errorMsg(res,'no token provided', 404);
     
    }
    try{
        const user= await dataFromToken(token).payload;

const data = await userInfo.findById(user.id);
if(!data){
    return Response.errorMsg(res, 'you are not a user', 404)

}
if(user.passwordChangedTime!=data.passwordChangedTime){
    return Response.errorMsg(res,' please re-login, password is not match ',404);
}
req.body.userId=user.id;
return next();
    }
    catch(e){
        return res.status(404).json({
            message:"invalid token",
            status:404,
            
        })
    }
}


