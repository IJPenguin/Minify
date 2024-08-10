import crypto from "crypto";

const validatePassword = (password, hash, salt) => {
    let curHash = crypto
        .pbkdf2Sync(password, salt, 310000, 64, "sha512")
        .toString("hex");
    const hashBuffer = Buffer.from(hash, "hex");
    const curHashBuffer = Buffer.from(curHash, "hex");
    const match = crypto.timingSafeEqual(hashBuffer, curHashBuffer);
    return match;
};

const generatePasswordHash = (password) => {
    const salt = crypto.randomBytes(32).toString("hex");
    const hash = crypto
        .pbkdf2Sync(password, salt, 310000, 64, "sha512")
        .toString("hex");

    return {
        salt: salt,
        hash: hash,
    };
};

export { validatePassword, generatePasswordHash };
