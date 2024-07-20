import express from "express";
import { sessionLink } from "../Models/linkModel.js";
import { createShortLink } from "../Middleware/utils.js";
import User from "../Models/userModel.js";
const router = express.Router();

router.post("/link/minify", async (req, res) => {
    try {
        const userType = req.userType;
        const id = req.isAuthenticated() ? req.user : req.session.id;
        switch (userType) {
            case "basic":
                const user = await User.findOne({ _id: id });
                if (user.numberOfUrlsCreated >= 50) {
                    return res.status(403).json({
                        message:
                            "Upgrade to premium subscription to get more links.",
                    });
                }
                break;
            case "session":
                const numberOfLinks = await sessionLink.countDocuments({
                    sessionId: id,
                });
                if (numberOfLinks >= 10) {
                    return res.status(403).json({
                        message: "Create an account to get more links.",
                    });
                }
                break;
            case "premium":
                break;
        }

        const url = req.body.originalUrl;

        if (!url) {
            return res.status(400).json({ message: "URL Not Provided." });
        }
        const expiresAt = req.body.expiresAt
            ? new Date(req.body.expiresAt)
            : null;

        try {
            const { link, shortUrl } = await createShortLink(
                userType,
                id,
                url,
                expiresAt
            );
            res.status(201).json({
                message: "Link Generated!",
                shortUrl: shortUrl,
                link: link,
            });
        } catch (err) {
            console.trace(err);
            res.status(500).json({ message: err.message });
        }
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error." });
    }
});

export default router;
