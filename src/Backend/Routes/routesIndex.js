import { Router } from "express";
import homeRouter from "./home.js";
import authRouter from "./auth.js";
import shortenUrlRouter from "./shortenUrl.js";
const router = Router();

router.use(homeRouter);
router.use(authRouter);
router.use(shortenUrlRouter);

export default router;
