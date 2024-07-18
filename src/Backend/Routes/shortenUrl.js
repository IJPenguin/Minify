import express from "express";
import shortUrlGenerator from "../Middleware/shortUrlGen.js";
import { userLink, sessionLink } from "../Models/linkModel.js";
const router = express.Router();

router.post("/shorten", async (req, res) => {
    try {
        
        const url = req.body.originalUrl;
        if (!url) {
            return res.status(400).json({ message: "URL not provided" });
        }
        const shortUrl = await shortUrlGenerator(url);
        let link = null;
        if (req.isAuthenticated()) {
            // Save to Database using userid
            const newUserLink = new userLink({
                userId: req.user,
                originalUrl: url,
                shortUrl: shortUrl,
                createdAt: Date.now(),
                numberOfVisits: 0,
            });

            link = await newUserLink.save();
        } else {
            // Save to Database using sessionid
            const newSessionLink = new sessionLink({
                sessionId: req.session.id,
                originalUrl: url,
                shortUrl: shortUrl,
                createdAt: Date.now(),
                numberOfVisits: 0,
            });

            link = await newSessionLink.save();
        }
        console.log(shortUrl);
        res.status(200).json({
            message: "Link Generated",
            shortUrl: shortUrl,
            link: link,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
