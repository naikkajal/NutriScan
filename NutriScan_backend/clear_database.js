const mongoose = require("mongoose");
require('dotenv').config();

const mongoUrl = process.env.MONGO_URL || "mongodb+srv://naikkajal0603:admin@cluster0.umsjdwh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose.connect(mongoUrl).then(async () => {
    console.log("Database connected");

    try {
        // Get all collections
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log("\nFound collections:", collections.map(c => c.name).join(', '));

        // Delete all documents from UserInfo collection
        const userResult = await mongoose.connection.db.collection('UserInfo').deleteMany({});
        console.log(`\n✅ Deleted ${userResult.deletedCount} documents from UserInfo collection`);

        // Delete all documents from FoodEntries collection (if exists)
        try {
            const foodResult = await mongoose.connection.db.collection('FoodEntries').deleteMany({});
            console.log(`✅ Deleted ${foodResult.deletedCount} documents from FoodEntries collection`);
        } catch (error) {
            console.log("FoodEntries collection doesn't exist or is empty");
        }

        console.log("\n🎉 Database cleared successfully!");

    } catch (error) {
        console.error("Error clearing database:", error);
    } finally {
        await mongoose.connection.close();
        console.log("\nDatabase connection closed");
        process.exit(0);
    }
}).catch((e) => {
    console.error("Database connection error:", e);
    process.exit(1);
});
