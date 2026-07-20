const User = require("../models/User");
const Otp = require("../models/Otp");
const transporter = require("../config/mail");
exports.sendOtp = async (req, res) => {
    try {

        const email = req.body.email;

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        await Otp.deleteMany({ email });

        await Otp.create({
            email,
            otp,
            expiry: new Date(Date.now() + 5 * 60 * 1000)
        });

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "OTP for NIT Bazaar",
            text: `Your OTP is ${otp}\nIt is valid for 5 minutes.`
        });

        res.render("EnterOTP", { email });

    } catch (err) {

        console.log(err);

        res.send("Unable to send OTP");

    }
};
exports.verifyOtp = async (req, res) => {

    const email = req.body.email;

    const enteredOtp = req.body.otp;

    const data = await Otp.findOne({ email });

    if (!data) {

        return res.send("OTP not found");

    }

    if (data.expiry < Date.now()) {

        await Otp.deleteOne({ email });

        return res.render("ResendOtp", { email });

    }

    if (enteredOtp === data.otp) {

        await Otp.deleteOne({ email });

        return res.redirect(`/loginpage?email=${email}`);

    }

    res.send("Incorrect OTP");

};
exports.signup = async (req, res) => {

    const {

        name,
        email,
        college,
        password

    } = req.body;

    const existing = await User.findOne({

        EmailId: email

    });

    if (existing) {

        return res.send("Email already registered");

    }

    const user = new User({

        UserId: name,
        UserName: name,
        EmailId: email,
        College: college,
        password: password

    });

    await user.save();

    req.session.user = user.UserName;

    req.session.email = user.EmailId;

    res.redirect("/dashboard");

};
exports.signin = async (req, res) => {

    const email = req.body.email;

    const password = req.body.password;

    const user = await User.findOne({

        EmailId: email

    });

    if (!user) {

        return res.send("User not found");

    }

    if (user.password !== password) {

        return res.send("Incorrect Password");

    }

    req.session.user = user.UserName;

    req.session.email = user.EmailId;

    res.redirect("/dashboard");

};
exports.logout = (req, res) => {

    req.session.destroy(() => {

        res.redirect("/");

    });

};
