import crypto from "crypto";
import Link from "../Models/linkModel";

const shortUrlGenerator = async (longURL) => {
    const secret = "minify";
    const hash = crypto
        .createHash("sha256")
        .update(longURL + secret)
        .digest("hex");
    let shortUrl = "";
    let start = 0;

    for (let end = 6; end < hash.length; end += 7) {
        const temp = hash.slice(start, end + 1);
        const linkExists = await Link.findOne({ shortUrl: temp });

        if (linkExists) {
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

export default shortUrlGenerator
