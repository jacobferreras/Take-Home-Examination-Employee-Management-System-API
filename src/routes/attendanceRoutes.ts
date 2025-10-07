import { Router } from "express";
import * as attendanceController from "../controllers/attendanceController";

const router = Router();

router.post("/time-in", attendanceController.timeIn);
router.post("/time-out", attendanceController.timeOut);

export default router;
