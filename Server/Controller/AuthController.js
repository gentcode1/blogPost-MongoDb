import bcrypt from 'bcrypt'
import  {generateAuthToken}  from '../Helpers/token';
import UserData from '../Model/UserModel'
import EmailHelper from '../Helpers/emailTemplate'
import Response from '../Helpers/Response'

class UserController {

static changPassword= async(req,res)=>{
    let{
         oldPassword,
         newPassword,
         confirmPassword
    }=req.body
    const userId=req.body.userId;
    const userDetails= await  UserData.findById(userId);

    console.log(userDetails);
    if (bcrypt.compareSync(oldPassword, userDetails.password)){
        if (newPassword===confirmPassword){
            const password= bcrypt.hashSync(newPassword,10);
            
            const passwordChangedTime=Date.now();
            const userUpdated= await UserData.findByIdAndUpdate(userId,{
                password:password,
                passwordChangedTime:passwordChangedTime
            });
            return Response.successMsg(res,'your password has changed successfully',userUpdated,200);
        }
        return Response.errorMsg(res,'new password and confirm password is not match',417) ;
    }
    return Response.errorMsg(res, 'old password provided in invalid',417);
}

    static SignUp = async(req, res) => {
       
        let {
            firstname,
            lastname,
            email,
            password,
            gender,
            role,
            department,
            adress
        } = req.body;
        password=bcrypt.hashSync(password,10)
        const isEmailExist = await UserData.findOne({email:email});
        if (isEmailExist) {
           return Response.errorMsg(res,'email is duplicated', 409)
            }
        req.body.password=password;
        const data = await UserData.create(req.body);
        
        if (!data) {
          return  Response.errorMsg(res, 'account creation failed', 417)
           }
        else{
            let  { password, ...dataWithOutPassword}=data._doc
         await  EmailHelper.userWelcomeEmail(dataWithOutPassword);

        return Response.successMsg(res, 'account created successfully', dataWithOutPassword,201 )
       
        }
    }

    static SignIn = async (req, res) => {
        let {
            email,
            password } = req.body;
       // const User = await UserData(email, password);
        //Users.push(User);//adding information in array
        //const data = Users.find((User) => User.email === email);
        const isUserExist = await UserData.findOne({email: email});
        const is_passwordExist=bcrypt.compareSync(password,isUserExist.password)
        if (isUserExist && is_passwordExist) {
            const data= isUserExist;
            const token = generateAuthToken({
                id:data.id,
                email:data.email,
                role:data.role,
                passwordChangedTime: data.passwordChangedTime
            });
            return Response.successMsg(res, 'log in successfully', {token}, 200)
        }
    
            return  Response.errorMsg(res, 'log in failed', 401)

        }
            
           
            
              

            
        }


export default {UserController};






