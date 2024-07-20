import { userLink, sessionLink } from "../Models/linkModel.js";
import { Router } from "express";

const router = Router();

router.get("/deleteUrl", async (req, res) => {
    try {
        const userType = req.userType;

        // If session then delete from sessionLink
        // If user then delete from userlinks
    } catch (err) {
        console.trace(err);
        return res.status(500).json({ message: err.message });
    }
});

export default router;
