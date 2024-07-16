import { Router } from "express";
const router = Router();

router.get("/", (req, res, next) => {
    try {
        res.status(200).json({ message: "Hello from the server!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
