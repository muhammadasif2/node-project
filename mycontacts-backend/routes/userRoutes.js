const express = require("express");
const {
  loginUser,
  registerUser,
  currentUser,
  userList,
  userUpdate,
} = require("../controllers/userController");
// const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/login", loginUser);

router.post("/register", registerUser);

router.get("/current",currentUser);

router.route("/").get();

router.route("/:id").put();

module.exports = router;
