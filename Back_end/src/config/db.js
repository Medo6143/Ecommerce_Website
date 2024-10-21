import mongoose  from "mongoose";

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DB connected");
    }catch(err){
        console.log("Error",err);
    }
}

export default connectDB