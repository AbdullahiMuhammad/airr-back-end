import mongoose from "mongoose";


    

    const connectDB = mongoose.connect("mongodb+srv://muheey:Muheey%4025@incidents.s8i0vwj.mongodb.net/?appName=incidents")
    .then(() => {
        console.log("database connection successfully");
    }).catch((err) => {
        console.log(err)
    });

   


export default connectDB;