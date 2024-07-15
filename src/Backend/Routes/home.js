import router from "express";

router.get("/", (req, res, next) => {
	res.status(200).json({ message: "Hello from the server!" });
});

export default router;
