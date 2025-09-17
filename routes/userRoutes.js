const express = require("express");
const router = express.Router();
const { users, updateUser, getUserDetails, deleteUser } = require("../controllers/userController");
const { auth, authorizeRoles } = require("../middlewares/authMiddleware");
router.get("/users", auth, users);
router.put("/update/:id", auth, authorizeRoles("admin", "superAdmin"), updateUser);
router.get("/details/:id", auth, authorizeRoles("admin", "superAdmin"), getUserDetails);
router.delete("/delete/:id", auth, authorizeRoles("admin", "superAdmin"), deleteUser);
module.exports = router;
