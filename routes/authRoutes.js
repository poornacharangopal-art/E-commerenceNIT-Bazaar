const express = require("express");

const router = express.Router();

const auth = require("../controllers/authController");

router.post("/sendotp", auth.sendOtp);

router.post("/verify", auth.verifyOtp);

router.post("/login", auth.signup);

router.post("/signin", auth.signin);

router.get("/logout", auth.logout);

router.get("/", (req, res) => {

    res.render("Home");

});

router.get("/otp", (req, res) => {

    res.render("otp");

});

router.get("/loginpage", (req, res) => {

    res.render("login1", {

        email: req.query.email

    });

});

module.exports = router;
