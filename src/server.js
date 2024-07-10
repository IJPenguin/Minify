import express from "express";
import { config } from "dotenv";
import compression from "compression";
import mongoose from "mongoose";
import cors from "cors";
const PORT = process.env.PORT || 6969;
import User from "./Models/userModel.js";
import Link from "./Models/linkModel.js";
import session from "express-session";
import cookieParser from "cookie-parser";

const app = express();
config();
app.use(express.json());
app.use(cookieParser());
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: { maxAge: 60000 * 60 * 24 * 7 },
	})
);
app.use(compression());
app.use(cors());
mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

app.listen(PORT, () => {
	console.log(`Server is started on http://localhost:${PORT}`);
});
