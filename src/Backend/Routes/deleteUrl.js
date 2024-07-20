import { userLink, sessionLink } from "../Models/linkModel.js";
import User from "../Models/userModel.js";
import { Router } from "express";

const router = Router();

router.delete("/link/deleteUrl", async (req, res) => {
    try {
        const userType = req.userType;

        if (!req.body._id || !req.body.userId) {
            return res.status(400).json({
                message: "Please provide the _id and userId!",
            });
        }

        const deletedUrl =
            userType === "session"
                ? await sessionLink.deleteOne({ _id: req.body._id.$oid })
                : await userLink.deleteOne({ _id: req.body._id.$oid });

        if (userType !== "session") {
            await User.updateOne(
                { _id: req.body.userId.$oid },
                { $inc: { numberOfUrlsCreated: -1 } }
            );
        }
        res.status(202).json({
            message: "Deleted URL successfully!",
            deletedUrl,
        });
    } catch (err) {
        console.trace(err);
        return res.status(500).json({ message: err.message });
    }
});

export default router;
