import { Router } from "express";
const router = Router();

router.get("/auth/login", (req, res) => {
	res.send("Login Page");
});

router.post("/auth/register", (req, res) => {
	res.send("Register Page");
});

export default router;
