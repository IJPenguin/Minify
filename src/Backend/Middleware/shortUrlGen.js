const shortURLGenerator = (longURL, value) => {
	letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	let shortURL = "";
	while (value > 0) {
		remainder = value % 62;
		value = Math.floor(value / 62);
		shortURL.concat(letters[remainder]);
	}
	return shortURL;
};

module.exports = { shortURLGenerator };
