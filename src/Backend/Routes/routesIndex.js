import { Router } from "express";
import homeRouter from "./home.js";
import authRouter from "./auth.js";
const router = Router();

router.use(homeRouter);
router.use(authRouter);

export default router;
