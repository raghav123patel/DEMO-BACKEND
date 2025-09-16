const User = require("../models/userModel");
const  {ROLES}  = require("../staticfiles/roles");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.register = async(req,res) => {
    try{
      const {firstName, lastName, email, password} = req.body;
      if(!firstName || !lastName || !email || !password ){
        return res.status(400).json({
        success: false,
        message: "Please provide the correct details",
      });  
      }
      const alreadyExist = await User.findOne({email});
      if(alreadyExist) {
        return res.status(400).json({
        success: false,
        message: "user already exist",
      });   
      }
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "error in hashing password",
      });
    }
    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role:  ROLES.user,  
    })
    return res.status(200).json({
        success: true,
        user,
        message: "user registered successfully"

    })
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}  


exports.login = async(req,res) => {
    try {
      const {email, password} = req.body;
      if(!email || !password) {
        return res.status(401).json({
            success: false,
            message: "provide all credentials",
        })
      }
      const user = await User.findOne({email});
       if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({
        success: false,
        message: "Password incorrect",
      });
    }
     const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
     return res.status(200).json({
      success: true,
      token,
      user,
      message: "User logged in successfully",
    });
    } catch(error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      })
    }
}