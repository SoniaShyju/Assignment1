const express = require("express");
const router = express.Router();
const {registerUser, loginUser, logoutUser }= require("../controllers/userController");

router.get("/register", (req, res) => res.render("register"));
router.get("/login", (req, res) => res.render("login"));
router.get("/logout", logoutUser);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;