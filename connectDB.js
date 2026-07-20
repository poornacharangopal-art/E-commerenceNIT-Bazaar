require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected");
        console.log("Ready State:", mongoose.connection.readyState);

    } catch (err) {
        console.error("MongoDB Connection Error:", err);
        throw err;
    }
};

module.exports = connectDB;
