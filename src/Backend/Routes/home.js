import { Router } from "express";
const router = Router();

router.get("/", (req, res, next) => {
    try {
        res.status(200).json({ message: "Hello from the server!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/debug/get-cookies", (req, res, next) => {
    const cookies = req.cookies;
    res.status(200).json({
        message: "cookies",
        cookies: cookies,
    });
});

export default router;
