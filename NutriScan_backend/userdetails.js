const mongoose = require("mongoose");

const UserDetailSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    mobile: String,
    password: String,
    height: Number,
    weight: Number,
    dob: Date,
    gender: String,
    activityLevel: String,
    dailyCalorieIntake: Number,
}, {
    collection: "UserInfo"
});
mongoose.model("UserInfo", UserDetailSchema)