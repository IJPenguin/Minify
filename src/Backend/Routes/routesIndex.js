import { Router } from "express";
import homeRouter from "./home.js";
import authRouter from "./auth.js";
import shortenUrlRouter from "./shortenUrl.js";
import deleteUrlRouter from "./deleteUrl.js";
const router = Router();

router.use(homeRouter);
router.use(authRouter);
router.use(shortenUrlRouter);
router.use(deleteUrlRouter);
export default router;
