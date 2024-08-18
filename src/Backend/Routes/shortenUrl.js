import express from "express";
import { sessionLink, userLink } from "../Models/linkModel.js";
import { createShortLink, normalizeUrl } from "../Middleware/utils.js";
import User from "../Models/userModel.js";
const router = express.Router();

const checkIfAliasExistsInDB = async (alias, userType) => {
    if (
        (await sessionLink.exists({ shortUrl: alias })) ||
        (await userLink.exists({ shortUrl: alias }))
    ) {
        return false;
    } else {
        return true;
    }
};

router.post("/link/minify", async (req, res) => {
    try {
        if (!req.cookies) {
            return res.status(401).json({ message: "Unauthorized Access." });
        }
        if (!req.body.originalUrl) {
            return res.status(400).json({ message: "URL Not Provided." });
        }

        const userType = req.userType;
        const id = req.isAuthenticated() ? req.user : req.session.id;
        const url = normalizeUrl(req.body.originalUrl);

        const alias = req.body.alias ?? null;

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
            default:
                return res.status(403).json({ message: "Invalid User Type." });
        }

        if (alias) {
            const aliasExists = await checkIfAliasExistsInDB(alias, userType);
            if (!aliasExists) {
                return res
                    .status(400)
                    .json({ message: "Alias already exists." });
            }
        }

        const expiresAt = req.body.expiresAt
            ? new Date(req.body.expiresAt)
            : null;

        const { link, shortUrl } = await createShortLink(
            userType,
            id,
            url,
            expiresAt,
            alias
        );
        
        res.status(201).json({
            message: "Link Generated!",
            shortUrl: shortUrl,
            link: link,
        });
    } catch (err) {
        console.trace(err);
        res.status(500).json({ message: "Internal Server Error." });
    }
});

export default router;
