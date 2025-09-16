const express = require("express");
const router = express.Router();
const { auth, superAdmin } = require("../middlewares/authMiddleware");
const { createAdmin } = require("../controllers/adminController");

router.post("/create", auth, superAdmin, createAdmin);    

module.exports = router;
