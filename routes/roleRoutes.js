const express = require("express");
const router = express.Router();
const {getRoles} = require("../controllers/rolesController");
const {auth, admin} = require("../middlewares/authMiddleware");
router.get("/roles", auth, admin, getRoles);


module.exports = router;