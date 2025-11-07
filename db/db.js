import mongoose from "mongoose";


    

    const connectDB = mongoose.connect("mongodb://127.0.0.1:27017/nmdpra")
    .then(() => {
        console.log("database connection successfully");
    }).catch((err) => {
        console.log(err)
    });

   


export default connectDB;