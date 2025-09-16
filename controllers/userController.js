const User = require("../models/userModel");

exports.users = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json({
      success: true,
      users,
      message: "all users fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
