import express from "express";
import shortUrlGenerator from "../Middleware/shortUrlGen.js";
import Link from "../Models/linkModel.js";
const router = express.Router();

router.post("/shorten", async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) {
            res.status(400).json({ message: "URL not provided" });
        }
        const shortUrl = await shortUrlGenerator(url);

        if (req.isAuthenticated()) {
            // Save to Database using userid
        } else {
            // Save to Database using sessionid
        }

        res.status(200).json({ shortUrl: shortUrl });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
