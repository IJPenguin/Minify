import express from "express";
import { config } from "dotenv";
import compression from "compression";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import MongoStore from "connect-mongo";
import routes from "./index.js";
import { userAuthenticationCheck } from "./Middleware/userAuthenticationCheck.js";
import "./Middleware/passport.js";
config();

const app = express();
const PORT = process.env.PORT || 6969;

const sessionStore = MongoStore.create({
    mongoUrl: process.env.MONGODB_CONNECTION_STRING,
    collectionName: "sessions",
    ttl: 60 * 60 * 24 * 14, // 14 days
    autoRemove: "native",
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
        store: sessionStore,
        cookie: { maxAge: 60000 * 60 * 24 * 14 },
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(userAuthenticationCheck);
app.use(routes);

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
