import { userLink, sessionLink } from "../Models/linkModel.js";
import { Router } from "express";

const router = Router();

router.get("/:shortUrl", async (req, res) => {
    try {
        const shortUrl = req.params.shortUrl;
        const userType = req.userType;
        const url =
            userType === "session"
                ? await sessionLink.findOne({ shortUrl: shortUrl })
                : await userLink.findOne({ shortUrl: shortUrl });
        const longUrl = url.originalUrl;
        await url.updateOne({ $inc: { numberOfVisits: 1 } });
        res.redirect(301, longUrl);
    } catch (err) {
        console.trace("Error retrieving short URL:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
