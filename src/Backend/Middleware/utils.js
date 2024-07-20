import { userLink, sessionLink } from "../Models/linkModel";
import User from "../Models/userModel";

const createShortLink = async (type, id, url, expiresAt) => {
    try {
        const shortUrl = await shortUrlGenerator(url);
        let link = null;
        if (type === "session") {
            const newSessionLink = new sessionLink({
                sessionId: id,
                originalUrl: url,
                shortUrl: shortUrl,
                createdAt: Date.now(),
                numberOfVisits: 0,
                expiresAt: expiresAt,
            });
            link = await newSessionLink.save();
        } else if (type === "user") {
            const newUserLink = new userLink({
                userId: id,
                originalUrl: url,
                shortUrl: shortUrl,
                createdAt: Date.now(),
                numberOfVisits: 0,
                expiresAt: expiresAt,
            });
            await User.updateOne(
                { _id: id },
                { $inc: { numberOfUrlsCreated: 1 } }
            );

            link = await newUserLink.save();
        } else {
            throw new Error("Invalid User Type Provided.");
        }
        return link;
    } catch (err) {
        console.trace(err);
        return res.send(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { createShortLink };
