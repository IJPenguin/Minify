import { userLink, sessionLink } from "../Models/linkModel.js";
import User from "../Models/userModel.js";
import shortUrlGenerator from "./shortUrlGen.js";

export const createShortLink = async (type, id, url, expiresAt, alias) => {
    try {
        const shortUrl = alias ?? (await shortUrlGenerator(url));
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
        } else if (type === "basic" || type === "premium") {
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
        return { link, shortUrl };
    } catch (err) {
        console.trace(err);
        throw new Error(err.message);
    }
};
