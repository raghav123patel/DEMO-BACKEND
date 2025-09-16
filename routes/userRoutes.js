const express = require("express");
const router = express.Router();
const { users } = require("../controllers/userController");
const { auth } = require("../middlewares/authMiddleware");
router.get("/users", auth, users);

module.exports = router;
