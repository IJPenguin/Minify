import crypto from "crypto";
import { userLink, sessionLink } from "../Models/linkModel.js";

const shortUrlGenerator = async (longURL) => {
    const salt = crypto.randomBytes(32).toString("hex");
    const hash = crypto
        .createHash("sha256")
        .update(longURL + salt)
        .digest("hex");
    let shortUrl = "";
    let start = 0;

    for (let end = 6; end < hash.length; end += 7) {
        const temp = hash.slice(start, end + 1);
        if (
            (await userLink.findOne({ shortUrl: temp })) ||
            (await sessionLink.findOne({ shortLink: temp }))
        ) {
            start = end;
        } else {
            shortUrl = temp;
            break;
        }
    }

    if (!shortUrl) {
        throw new Error("Unable to generate unique short URL");
    }

    return shortUrl;
};

export default shortUrlGenerator;
