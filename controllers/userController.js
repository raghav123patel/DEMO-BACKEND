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

exports.updateUser = async(req,res) => {
  try{
    const{firstName, lastName} = req.body;
    const {id} = req.params;
    if(!id) {
       return res.status(500).json({
      success: false,
      message: "please provide the id for updating user",
    })
    }
    const updateUser = await User.findByIdAndUpdate({_id: id}, {firstName, lastName},{new: true});
    return res.status(200).json({
      success: true,
      updateUser,
      message: "user updated successfully",
    })
  } catch(error){
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "cannot update the user",
    })
  }
}

exports.getUserDetails = async(req,res) => {
  try{
    const {id} = req.params;
    if(!id) {
       return res.status(500).json({
      success: false,
      message: "please provide the id for fetching the details of user",
    })
    }
    const getDetails = await User.findById({_id: id});
    return res.status(200).json({
      success: true,
      getDetails,
      message: "user details fetched successfully",
    })
  } catch(error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "cannot update the user",
    })
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide the user ID",
      });
    }
    const userToDelete = await User.findById(id);

    if (!userToDelete) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (userToDelete.role === "superAdmin") {
      return res.status(403).json({
        success: false,
        message: "SuperAdmin account cannot be deleted",
      });
    }
    if (userToDelete.role === "admin" && req.user.role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin cannot delete other admins",
      });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      deletedUser,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Cannot delete the user",
    });
  }
};
