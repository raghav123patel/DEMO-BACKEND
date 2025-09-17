const express = require("express");
const router = express.Router();
const { auth, authorizeRoles } = require("../middlewares/authMiddleware");
const { createAdmin } = require("../controllers/adminController");

router.post("/create", auth, authorizeRoles('superAdmin'), createAdmin);    

module.exports = router;
