import { Router } from "express";
import { healthCheck } from "./healthcheck-handlers";

const router: Router = Router();

router.get("/", healthCheck);

export default router;
