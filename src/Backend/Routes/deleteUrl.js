import { userLink, sessionLink } from "../Models/linkModel.js";
import User from "../Models/userModel.js";
import { Router } from "express";

const router = Router();

const deleteUrl = async (id, userId, userType) => {
    let url = null;

    if (userType === "session") {
        url = await sessionLink.findOne({ _id: id });
    } else {
        url = await userLink.findOne({ _id: id });
    }

    if (!url) {
        throw new Error("URL not found!");
    }

    if (url.userId && url.userId.toString() !== userId) {
        throw new Error("Unauthorized Access!");
    }

    await url.deleteOne();
};

router.delete("/link/deleteUrl", async (req, res) => {
    try {
        const userType = req.userType;
        console.log(req.body);
        if (!req.body._id || !req.body.userId) {
            return res.status(400).json({
                message: "Please provide the Link Id and User Id!",
            });
        }

        deleteUrl(req.body._id, req.body.userId, userType);

        if (userType !== "session") {
            await User.updateOne(
                { _id: req.body.userId.$oid },
                { $inc: { numberOfUrlsCreated: -1 } }
            );
        }
        res.status(202).json({
            message: "Deleted URL successfully!",
        });
    } catch (err) {
        console.trace(err);
        return res.status(500).json({ message: err.message });
    }
});

export default router;
