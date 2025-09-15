const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: true,
        message: "Token missing",
      });
    }
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: true,
      message: "Token invalid",
    });
  }
};

exports.admin = (req,res,next) => {
    try{
      if(req.user.role== !"admin"){
        return res.status(401).json({
            success: "true",
            message: "protected route admin role can access the page"
        })
      }
    } catch(error){
        console.log(error);
        return res.status(403).json({
            success: "false",
            message: "user is not authorized to access the page",
        })
    }
}