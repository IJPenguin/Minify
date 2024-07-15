import { Router } from "express";
import { generatePasswordHash } from "../Middleware/utils.js";
const router = Router();

router.get("/auth/login", (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.status(400).json({ message: "Invalid credentials" });
		}
		req.logIn(user, (err) => {
			if (err) {
				return next(err);
			}
			return res.status(200).json({ message: "Logged in successfully" });
		});
	})(req, res, next);
});

router.post("/auth/register", (req, res, next) => {
	const passHash = generatePasswordHash(req);

	const salt = passHash.salt;
	const hash = passHash.hash;

	const newUser = new User({
		username: req.body.username,
		hash: hash,
		salt: salt,
		email: req.body.email,
		premiumSubscription: false,
		numberOfUrlsCreated: 0,
		createdAt: Date.now(),
	});

	newUser
		.save()
		.then((user) => {
			res.status(201).json({
				message: "User created successfully",
				user: user,
			});
		})
		.catch((err) => {
			res.status(500).json({ error: err });
		});
});

export default router;
