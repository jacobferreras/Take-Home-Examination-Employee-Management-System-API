import { Router } from "express";
import * as positionController from "../controller/positionController";

const router = Router();

router.post("/create", positionController.createPosition);
router.get("/getAll", positionController.getAllPositions);
router.get("/getById/:id", positionController.getPositionById);
router.put("/update/:id", positionController.updatePosition);
router.delete("/delete/:id", positionController.deletePosition);

export default router;
