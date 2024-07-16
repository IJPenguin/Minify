import express from "express";
import shortUrlGenerator from "../Middleware/shortUrlGen";
const router = express.Router();

router.post("/shorten", async (req, res) => {
    try {
        const shortUrl = await shortUrlGenerator(req.body.Url);
        res.status(200).json({ shortUrl: shortUrl });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
