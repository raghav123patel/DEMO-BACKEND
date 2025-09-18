const express = require("express");
const router = express.Router();

const {createComponent, getAllComponents, updateComponent} = require("../controllers/componentController");
const { auth, authorizeRoles } = require("../middlewares/authMiddleware");
router.post("/create", auth, authorizeRoles("admin", "superAdmin"), createComponent);
router.get("/components", auth, authorizeRoles("admin", "superAdmin"), getAllComponents);
router.put("/update/:id", auth, authorizeRoles("admin", "superAdmin"), updateComponent);
module.exports = router;
