import { Request, Response, NextFunction } from "express";
import { getDb } from "../config/firebase";

export const createDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Department name is required" });
    }

    const departmentData = await getDb().collection("departments").add({
      name,
      createdAt: new Date(),
    });

    const newDepartment = {
      id: departmentData.id,
      name,
      createdAt: new Date(),
    };

    res.status(201).json({
      success: true,
      message: "Department created successfully",
      data: newDepartment,
    });
  } catch (error) {
    console.error("Error creating department:", error);
    res.status(500).json({ message: "Internal Server Error" });
    next(error);
  }
};

export const getAllDepartments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const departmentsSnapshot = await getDb().collection("departments").get();

    const departments = departmentsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json({
      success: true,
      message: "Departments retrieved successfully",
      data: departments,
    });
  } catch (error) {
    console.error("Error fetching departments:", error);
    res.status(500).json({ message: "Internal Server Error" });
    next(error);
  }
};

export const getDepartmentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const departmentDoc = await getDb().collection("departments").doc(id).get();

    if (!departmentDoc.exists) {
      return res.status(404).json({ message: "Department not found" });
    }

    const department = { id: departmentDoc.id, ...departmentDoc.data() };

    res.status(200).json({
      success: true,
      message: "Department retrieved successfully",
      data: department,
    });
  } catch (error) {
    console.error("Error fetching department:", error);
    res.status(500).json({ message: "Internal Server Error" });
    next(error);
  }
};

export const updateDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Department name is required" });
    }

    const departmentDoc = await getDb().collection("departments").doc(id).get();

    if (!departmentDoc.exists) {
      return res.status(404).json({ message: "Department not found" });
    }

    await getDb().collection("departments").doc(id).update({ name });

    const updatedDepartment = { id, name };

    res.status(200).json({
      success: true,
      message: "Department updated successfully",
      data: updatedDepartment,
    });
  } catch (error) {
    console.error("Error updating department:", error);
    res.status(500).json({ message: "Internal Server Error" });
    next(error);
  }
};

export const deleteDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const departmentDoc = await getDb().collection("departments").doc(id).get();

    if (!departmentDoc.exists) {
      return res.status(404).json({ message: "Department not found" });
    }

    await getDb().collection("departments").doc(id).delete();

    res.status(204).send({
      success: true,
      message: "Department deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting department:", error);
    res.status(500).json({ message: "Internal Server Error" });
    next(error);
  }
};
