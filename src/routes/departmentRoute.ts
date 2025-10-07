import { Router } from "express";
import * as departmentController from "../controller/departmentController";

const router = Router();

router.post("/create", departmentController.createDepartment);
router.get("/getAll", departmentController.getAllDepartments);
router.get("/getById/:id", departmentController.getDepartmentById);
router.put("/update/:id", departmentController.updateDepartment);
router.delete("/delete/:id", departmentController.deleteDepartment);

export default router;
