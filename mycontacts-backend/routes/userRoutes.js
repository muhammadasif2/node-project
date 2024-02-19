const express = require("express");
const {
  loginUser,
  registerUser,
  currentUser,
  userList,
  userUpdate,
} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/login", loginUser);

router.post("/register", registerUser);

router.get("/current", validateToken,currentUser);

router.route("/").get(userList);

router.route("/:id").put(userUpdate);

module.exports = router;
