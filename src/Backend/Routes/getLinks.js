import { Router } from "express";
import { userLink, sessionLink } from "../Models/linkModel.js";
const router = Router();

router.get("/link/get-links", async (req, res) => {
    try {
        const userType = req.userType;

        const links =
            userType === "session"
                ? await sessionLink.find({ sessionId: req.session.id })
                : await userLink.find({ _id: req.user });

        res.status(200).json({ links: links });
    } catch (err) {
        console.trace(err);
        res.status(500).json({ message: err.message });
    }
});

export default router;
