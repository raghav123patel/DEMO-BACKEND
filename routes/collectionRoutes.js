const express = require("express");
const router = express.Router();
const {createCollection, getAllCollections, updateCollection, deleteCollection} = require("../controllers/collectionController");
const { auth, authorizeRoles } = require("../middlewares/authMiddleware");

router.post("/create", auth, authorizeRoles("admin", "superAdmin"), createCollection);
router.get("/collections", auth, authorizeRoles("admin", "superAdmin"), getAllCollections);
router.put("/update/:id", auth, authorizeRoles("admin", "superAdmin"), updateCollection);
router.delete("/delete/:id", auth, authorizeRoles("admin", "superAdmin"), deleteCollection);
module.exports = router;