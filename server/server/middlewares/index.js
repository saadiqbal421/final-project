

const { expressjwt: jwt } = require("express-jwt");
const { User } = require("../models/user");

/* A middleware that checks if the user is signed in. */
const requireSignin = jwt({
  getToken: (req, res) => req.cookies.token,
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

/**
 * If the user is not an instructor, send a 403 status code. Otherwise, continue with the next
 * middleware
 * @param req - The request object.
 * @param res - the response object
 * @param next - This is a function that is called when the middleware is complete.
 * @returns A function that checks if the user is an instructor.
 */

const verifyEmail = async (req, res , next)=>{
  try{
    const user = await User.findOne({email : req.body.email})
    if(user.isVerified){
      next()
    }
    else{
      console.log("Please check your email to verify your account")
    }
  }
  catch(err){
    console.log(err);
  }
}
module.exports = { requireSignin, verifyEmail};
