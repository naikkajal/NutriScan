const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require('dotenv').config();

app.use(express.json());
app.use(cors());

const mongoUrl = process.env.MONGO_URL || "mongodb+srv://naikkajal0603:admin@cluster0.umsjdwh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoUrl).then(() => {
    console.log("Database connected");
}).catch((e) => {
    console.log(e);
});

require("./userdetails");
const User = mongoose.model("UserInfo");

// Add a schema for food entries
const FoodEntrySchema = new mongoose.Schema({
    userId: String,
    mealType: String,
    foodItem: String,
    calories: Number
}, {
    collection: "FoodEntries"
});
const FoodEntry = mongoose.model("FoodEntries", FoodEntrySchema);

app.get("/", (req, res) => {
    res.send({ status: "Started" });
});

app.post('/register', async (req, res) => {
    console.log('Registration request received:', req.body);
    const { name, email, mobile, password, height, weight, dob, gender, activityLevel } = req.body;

    try {
        const oldUser = await User.findOne({ email: email });
        if (oldUser) {
            console.log('User already exists:', email);
            return res.send({ status: "error", data: "User already exists" });
        }

        console.log('Hashing password...');
        const encryptedPassword = await bcrypt.hash(password, 5);

        // Calculate age from DOB
        let age = null;
        let dailyCalorieIntake = null;

        if (dob && height && weight && gender && activityLevel) {
            const birthDate = new Date(dob);
            const today = new Date();
            age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            // Calculate BMR
            let BMR;
            if (gender === 'male') {
                BMR = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
            } else if (gender === 'female') {
                BMR = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
            }

            // Calculate daily calorie intake based on activity level
            const activityMultipliers = {
                'sedentary': 1.2,
                'lightly_active': 1.375,
                'moderately_active': 1.55,
                'very_active': 1.725,
                'extra_active': 1.9
            };

            if (BMR && activityMultipliers[activityLevel]) {
                dailyCalorieIntake = Math.round(BMR * activityMultipliers[activityLevel]);
            }
        }

        console.log('Creating user...');
        const newUser = await User.create({
            name,
            email,
            mobile,
            password: encryptedPassword,
            height,
            weight,
            dob: dob ? new Date(dob) : null,
            gender,
            activityLevel,
            dailyCalorieIntake
        });

        console.log('User created successfully:', newUser._id);
        res.send({
            status: "ok",
            data: "User Created",
            userId: newUser._id,
            user: {
                userId: newUser._id,
                name: newUser.name,
                email: newUser.email,
                mobile: newUser.mobile,
                height: newUser.height,
                weight: newUser.weight,
                dob: newUser.dob,
                gender: newUser.gender,
                activityLevel: newUser.activityLevel,
                dailyCalorieIntake: newUser.dailyCalorieIntake
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.send({ status: "error", data: error.message || error });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.send({ status: "error", data: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.send({ status: "error", data: "Invalid Password" });
    }

    const token = jwt.sign(
        { email: user.email },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
    );

    res.send({
        status: "ok",
        data: "Login successful",
        token: token,
        user: {
            userId: user._id,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            height: user.height,
            weight: user.weight,
            dob: user.dob,
            gender: user.gender,
            activityLevel: user.activityLevel,
            dailyCalorieIntake: user.dailyCalorieIntake
        }
    });
});

// Update user profile
app.post('/update-profile', async (req, res) => {
    try {
        const { userId, height, weight, activityLevel } = req.body;

        if (!userId) {
            return res.send({ status: 'error', data: 'User ID is required' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.send({ status: 'error', data: 'User not found' });
        }

        // Update fields
        if (height) user.height = height;
        if (weight) user.weight = weight;
        if (activityLevel) user.activityLevel = activityLevel;

        // Recalculate calories if we have all required data
        if (user.height && user.weight && user.dob && user.gender && user.activityLevel) {
            // Calculate age from DOB
            const birthDate = new Date(user.dob);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            // Calculate BMR
            let BMR;
            if (user.gender === 'male') {
                BMR = 88.362 + (13.397 * user.weight) + (4.799 * user.height) - (5.677 * age);
            } else if (user.gender === 'female') {
                BMR = 447.593 + (9.247 * user.weight) + (3.098 * user.height) - (4.330 * age);
            }

            // Calculate daily calorie intake
            const activityMultipliers = {
                'sedentary': 1.2,
                'lightly_active': 1.375,
                'moderately_active': 1.55,
                'very_active': 1.725,
                'extra_active': 1.9
            };

            if (BMR && activityMultipliers[user.activityLevel]) {
                user.dailyCalorieIntake = Math.round(BMR * activityMultipliers[user.activityLevel]);
            }
        }

        await user.save();

        res.send({
            status: 'ok',
            data: 'Profile updated successfully',
            user: {
                userId: user._id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                height: user.height,
                weight: user.weight,
                dob: user.dob,
                gender: user.gender,
                activityLevel: user.activityLevel,
                dailyCalorieIntake: user.dailyCalorieIntake
            }
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.send({ status: 'error', data: error.message });
    }
});


app.post('/calculate', (req, res) => {
    const { height, weight, age, gender, activityLevel } = req.body;

    console.log('Calculate request:', { height, weight, age, gender, activityLevel });

    let BMR;
    if (gender === 'male') {
        BMR = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else if (gender === 'female') {
        BMR = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    } else {
        return res.status(400).send({ error: 'Invalid gender' });
    }

    let dailyCalorieIntake;
    // Activity level multipliers based on standard fitness calculations
    switch (activityLevel) {
        case 'sedentary':
            dailyCalorieIntake = BMR * 1.2;
            break;
        case 'lightly_active':
            dailyCalorieIntake = BMR * 1.375;
            break;
        case 'moderately_active':
            dailyCalorieIntake = BMR * 1.55;
            break;
        case 'very_active':
            dailyCalorieIntake = BMR * 1.725;
            break;
        case 'extra_active':
            dailyCalorieIntake = BMR * 1.9;
            break;
        default:
            return res.status(400).send({ error: 'Invalid activity level' });
    }

    console.log('Calculated daily calorie intake:', Math.round(dailyCalorieIntake));
    res.send({ dailyCalorieIntake: Math.round(dailyCalorieIntake) });
});

// TEMPORARY: Clear database endpoint (REMOVE IN PRODUCTION!)
app.post('/admin/clear-database', async (req, res) => {
    try {
        const userResult = await User.deleteMany({});
        const foodResult = await FoodEntry.deleteMany({});

        res.send({
            status: 'ok',
            message: 'Database cleared successfully',
            deletedUsers: userResult.deletedCount,
            deletedFoodEntries: foodResult.deletedCount
        });
    } catch (error) {
        console.error('Error clearing database:', error);
        res.send({ status: 'error', message: error.message });
    }
});

app.listen(5011, () => {
    console.log("Server started on port 5011");
});
