import { Request, Response, NextFunction } from "express";
import { getDb } from "../config/firebase";
import { nanoid } from "nanoid";
import { get } from "http";

export const createEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, email, positionId, departmentId } = req.body;

    if (!firstName || !lastName || !email || !positionId || !departmentId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const employeeId = `EMP-${nanoid(6).toUpperCase()}`;

    const employeeData = await getDb().collection("employees").add({
      employeeId,
      firstName,
      lastName,
      email,
      positionId,
      departmentId,
      isActive: true,
      hireDate: new Date(),
      createdAt: new Date(),
    });

    const newEmployee = {
      id: employeeData.id,
      employeeId,
      firstName,
      lastName,
      email,
      positionId,
      departmentId,
      isActive: true,
      hireDate: new Date(),
      createdAt: new Date(),
    };

    res.status(201).json({
      succes: true,
      message: "Employee created successfully",
      data: newEmployee,
    });
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ message: "Internal Server Error" });
    next(error);
  }
};

export const getAllEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const employeesSnapshot = await getDb()
      .collection("employees")
      .where("isActive", "==", true)
      .get();

    if (employeesSnapshot.empty) {
      return res.status(404).json({ message: "No employees found" });
    }

    const employees = employeesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json({
      success: true,
      message: "Employees retrieved successfully",
      data: employees,
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Internal Server Error" });
    next(error);
  }
};

export const getEmployeeById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const employeeDoc = await getDb().collection("employees").doc(id).get();

    if (!employeeDoc.exists || !employeeDoc.data()?.isActive) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const employee = { id: employeeDoc.id, ...employeeDoc.data() };

    res.status(200).json({
      success: true,
      message: "Employee retrieved successfully",
      data: employee,
    });
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ message: "Internal Server Error" });
    next(error);
  }
};

export const updateEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body, updatedAt: new Date() };

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    const employeeDoc = await getDb().collection("employees").doc(id).get();

    if (!employeeDoc.exists) {
      return res.status(404).json({ message: "Employee not found" });
    }

    await getDb().collection("employees").doc(id).update(updateData);

    const updatedEmployee = {
      id: employeeDoc.id,
      ...employeeDoc.data(),
      ...updateData,
    };

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      data: updatedEmployee,
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ message: "Internal Server Error" });
    next(error);
  }
};

export const deleteEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const employeeDoc = await getDb().collection("employees").doc(id).get();

    if (!employeeDoc.exists) {
      return res.status(404).json({ message: "Employee not found" });
    }

    await getDb().collection("employees").doc(id).update({ isActive: false });

    const deletedEmployee = { id: employeeDoc.id, ...employeeDoc.data() };

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
      data: deletedEmployee,
    });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: "Internal Server Error" });
    next(error);
  }
};
