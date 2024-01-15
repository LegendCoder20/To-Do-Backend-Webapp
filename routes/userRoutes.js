const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");
const {protect} = require("../middleware/authMiddleware");

router.post("/", registerUser); // So Basically when we make a Post Request to /  [ That's to Add a Resources ]
router.post("/login", loginUser);
router.get("/me", protect, getMe);

module.exports = router;
