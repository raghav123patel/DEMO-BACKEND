const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
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
      success: false,
      message: "Token invalid",
    });
  }
};

exports.authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            if (!allowedRoles.includes(req.user.role)) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden: Insufficient role"
                });
            }
            next();
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Server error"
            });
        }
    };
};


