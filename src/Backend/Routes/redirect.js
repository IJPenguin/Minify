import { userLink, sessionLink } from "../Models/linkModel.js";
import { Router } from "express";
const router = Router();

router.get("/:shortUrl", async (req, res) => {
    try {
        const shortUrl = req.params.shortUrl;
        const userType = req.userType; // Ensure this is correctly set
        let url;

        if (userType === "session") {
            url = await sessionLink.findOne({ shortUrl });
        } else {
            url = await userLink.findOne({ shortUrl });
        }

        if (!url) {
            return res.status(404).json({ message: "URL not found" });
        }

        const longUrl = url.originalUrl;
        await url.updateOne({ $inc: { numberOfVisits: 1 } });
        return res.redirect(301, longUrl);
    } catch (err) {
        console.trace("Error retrieving short URL:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
