import mongoose from "mongoose";

// Function that connects to the database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.URI); // Wait for the connection to be established
        console.log("Database connection successful");
    } catch (err) {
        console.error("Database connection error:", err);
    }
};

export default connectDB;
