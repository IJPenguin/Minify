import crypto from "crypto";

const validatePassword = (password, hash, salt) => {
	let curHash = crypto
		.pbkdf2Sync(password, salt, 10000, 64, "sha512")
		.toString("hex");
	return hash === curHash;
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
