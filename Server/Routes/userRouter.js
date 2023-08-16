const express = require("express");
const {
  register,
  signin,
  updateUser,
  getUser,
  updatePicture,
  UserById,
} = require("../Controllers/userController");
const { upload, requireSignin } = require("../Middlewares");

const router = express.Router();

router.post("/register", register);
router.post("/login", signin);
router.get("/c/user", requireSignin, getUser);
router.put("/c/update", requireSignin, updateUser);
router.put(
  "/c/picture",
  requireSignin,
  upload.single("picture"),
  updatePicture
);
router.get("/u/:userId", requireSignin, UserById);

module.exports = router;
