import mongoose from "mongoose";
import { config } from "dotenv";
config();

const connection = mongoose
	.connect(process.env.MONGODB_CONNECTION_STRING)
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.error("MongoDB connection error:", err));

export default connection;
