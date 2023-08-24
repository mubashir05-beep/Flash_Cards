import { config } from "dotenv";
import mongoose from "mongoose";

// Load environment variables from a .env file
config();

const connectDB = async () => {
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI!);
    
};

export default connectDB;
