import express from "express";
import { config } from "dotenv";
import compression from "compression";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import RedisStore from "connect-redis";
import { createClient } from "redis";

config();
const app = express();
const PORT = process.env.PORT || 6969;
const redisClient = createClient();
mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
redisClient.connect().catch(console.error);
const redisStore = new RedisStore({
	client: redisClient,
	prefix: "myapp:",
});

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(compression());
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
		store: redisStore,
		cookie: { maxAge: 60000 * 60 * 24 * 7 },
	})
);

app.listen(PORT, () => {
	console.log(`Server is started on http://localhost:${PORT}`);
});
