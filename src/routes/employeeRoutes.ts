import { Router } from "express";
import * as employeeController from "../controllers/employeeController";
import * as attendanceController from "../controllers/attendanceController";

const router = Router();

router.post("/create", employeeController.createEmployee);
router.get("/getAll", employeeController.getAllEmployees);
router.get("/getById/:id", employeeController.getEmployeeById);
router.put("/update/:id", employeeController.updateEmployee);
router.delete("/delete/:id", employeeController.deleteEmployee); // Soft delete

// Route to get attendance for a specific employee
router.get(
  "/:employeeId/attendance",
  attendanceController.getAttendanceRecords
);

export default router;
