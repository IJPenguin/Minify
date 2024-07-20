import { Router } from "express";
import homeRouter from "./Routes/home.js";
import authRouter from "./Routes/auth.js";
import shortenUrlRouter from "./Routes/shortenUrl.js";
import deleteUrlRouter from "./Routes/deleteUrl.js";
import redirectRouter from "./Routes/redirect.js";
import getLinksRouter from "./Routes/getUrls.js";
const router = Router();

router.use(homeRouter);
router.use(authRouter);
router.use(shortenUrlRouter);
router.use(deleteUrlRouter);
router.use(getLinksRouter);
router.use(redirectRouter);
export default router;
