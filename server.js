const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./connectDB");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

connectDB();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(authRoutes);
app.use(productRoutes);

app.listen(process.env.PORT || 3000);
