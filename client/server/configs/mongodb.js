import mongoose from "mongoose";

//Connecting to MongoDB

const connectDB = async () =>{
    mongoose.connection.on('connected',()=>{
        console.log('MongoDB Connected');
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/learnit`)
}

export default connectDB;