import { check, validationResult } from "express-validator";

class Validator {

  static newAccountRules = () => {
    return [
      check("email", "invalid email").isEmail(),
      check("firstName", "invalid FirstName").isAlpha(),
      check("lastName","invalid Lastname").isAlpha(),
      check("password","password must be Strong").isStrongPassword(),
      check("gender"," gender must be male r female").isIn(["male","female"]),
      check("adress"," adress must be in Rwanda").isIn(["Rwanda"])
    ];
  };
  static loginRules=()=>{
    check("email", "invalid email").isEmail(),
    check("password","password must be Strong").isStrongPassword()
  }
  static validateInput = (req, res, next) => {
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

export default Validator;
