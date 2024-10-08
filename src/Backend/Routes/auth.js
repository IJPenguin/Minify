import { Router } from "express";
import { generatePasswordHash } from "../Middleware/passwordutils.js";
import User from "../Models/userModel.js";
const router = Router();
import passport from "passport";

router.post("/auth/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.status(200).json({ message: "Logged in successfully" });
        });
    })(req, res, next);
});

router.post("/auth/register", async (req, res) => {
    try {
        const { name, password, email } = req.body;

        if (!name || !password || !email) {
            return res.status(400).json({ message: "Data incomplete" });
        }

        const passHash = generatePasswordHash(password);
        const { hash, salt } = passHash;

        // Manage the links that are stored with session id and the user logs in

        const newUser = new User({
            name: name,
            hash: hash,
            salt: salt,
            email: email,
            premiumSubscription: false,
            numberOfUrlsCreated: 0,
            createdAt: Date.now(),
        });

        const user = await newUser.save();

        res.status(201).json({ message: "User created", user: user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/auth/logout", (req, res) => {
    try {
        req.logout((err) => {
            if (err)
                return res.status(500).json({ message: "Error logging out" });
        });
        res.status(200).json({ message: "Logged out" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
