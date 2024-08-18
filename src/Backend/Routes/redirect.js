import { userLink, sessionLink } from "../Models/linkModel.js";
import { Router } from "express";
const router = Router();

router.get("/:shortUrl", async (req, res) => {
    try {
        const shortUrl = req.params.shortUrl;
        const userType = req.userType;
        let url = null;

        if (await sessionLink.exists({ shortUrl: shortUrl })) {
            console.log(sessionLink.exists({ shortUrl: shortUrl }));

            url = await sessionLink.findOne({ shortUrl: shortUrl });
            console.log("reaches here");
        } else if ( await userLink.exists({ shortUrl: shortUrl })) {
            url = await userLink.findOne({ shortUrl: shortUrl });
            console.log("reaches here 2");
        } else {
            return res.status(404).json({ message: "URL Not Found." });
        }

        const longUrl = url.originalUrl;
        await url.updateOne({ $inc: { numberOfVisits: 1 } });
        return res.redirect(302, longUrl);
    } catch (err) {
        console.trace("Error retrieving short URL:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
