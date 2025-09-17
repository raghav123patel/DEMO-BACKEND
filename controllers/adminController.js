const User = require("../models/userModel");
const {ROLES} = require("../staticfiles/roles");
const bcrypt = require("bcrypt");
exports.createAdmin = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "all fields are required",
      });
    }
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Admin with this email already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createAdmin = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: ROLES.admin,
    });
    console.log("admin creation", createAdmin);
    return res.status(200).json({
      success: true,
      createAdmin,
      message: "admin created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
